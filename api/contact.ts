/**
 * POST /api/contact — Vercel serverless function.
 *
 * Sends contact-form submissions to my inbox through Resend's REST API.
 * Required env:  RESEND_API_KEY
 * Optional env:  CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL, ALLOWED_ORIGINS (comma-separated)
 *
 * Without RESEND_API_KEY the function answers 503 `not_configured` and the
 * client offers a pre-filled mailto fallback instead of pretending it sent.
 */
import { MIN_FILL_MS, validateContact } from './_lib/validate.js'

const RATE_WINDOW_MS = 10 * 60 * 1000
const RATE_MAX = 5
// Best effort only: memory is per warm instance. Use a shared store (e.g. Upstash) for strict limits.
const hits = new Map<string, number[]>()

const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
  })

function rateLimited(ip: string) {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  return recent.length > RATE_MAX
}

function originAllowed(request: Request) {
  const origin = request.headers.get('origin')
  if (!origin) return false
  const host = request.headers.get('x-forwarded-host') ?? request.headers.get('host')
  const allowed = (process.env.ALLOWED_ORIGINS ?? '')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean)
  try {
    return new URL(origin).host === host || allowed.includes(origin)
  } catch {
    return false
  }
}

export async function POST(request: Request): Promise<Response> {
  if (!originAllowed(request)) return json(403, { error: 'forbidden' })

  const ip = (request.headers.get('x-forwarded-for') ?? 'unknown').split(',')[0].trim()
  if (rateLimited(ip)) return json(429, { error: 'rate_limited' })

  let body: Record<string, unknown>
  try {
    body = (await request.json()) as Record<string, unknown>
  } catch {
    return json(400, { error: 'invalid_json' })
  }

  // Honeypot: real visitors never see this field. Pretend success so bots learn nothing.
  if (typeof body.website === 'string' && body.website.trim() !== '') return json(200, { ok: true })

  const startedAt = Number(body.startedAt)
  if (!Number.isFinite(startedAt) || Date.now() - startedAt < MIN_FILL_MS) return json(400, { error: 'too_fast' })

  const { data, errors } = validateContact(body)
  if (!data) return json(422, { error: 'validation', fields: errors })

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return json(503, { error: 'not_configured' })

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { authorization: `Bearer ${apiKey}`, 'content-type': 'application/json' },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL ?? 'Portfolio Contact <onboarding@resend.dev>',
      to: [process.env.CONTACT_TO_EMAIL ?? 'baghelmilendrakumar@gmail.com'],
      reply_to: data.email,
      subject: `Portfolio enquiry · ${data.projectType} · ${data.name}`,
      text: [`Name: ${data.name}`, `Email: ${data.email}`, `About: ${data.projectType}`, '', data.message].join('\n'),
    }),
  })

  if (!res.ok) {
    console.error('Resend error', res.status, await res.text().catch(() => ''))
    return json(502, { error: 'send_failed' })
  }
  return json(200, { ok: true })
}
