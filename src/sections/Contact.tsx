import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, Check, Copy, Download, FileText, LoaderCircle, Mail, MapPin, Phone, Send } from 'lucide-react'
import { useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react'
import { personal, socials } from '../data/personal.ts'
import { projectTypes } from '../data/achievements.ts'
import { LIMITS, validateContact, type ContactErrors, type ContactPayload } from '../../api/_lib/validate.ts'
import { SectionHeading } from '../components/ui/SectionHeading.tsx'
import { Reveal } from '../components/animations/Reveal.tsx'
import { socialIcons } from '../components/ui/BrandIcons.tsx'
import { Magnetic } from '../components/ui/Magnetic.tsx'
import { EASE_OUT } from '../lib/motion.ts'
import { cn } from '../lib/cn.ts'

type Status = 'idle' | 'submitting' | 'success' | 'error'
type Failure = 'unavailable' | 'rate_limited' | 'generic'

const empty: ContactPayload = { name: '', email: '', projectType: '', message: '' }

const mailtoFor = (v: ContactPayload) =>
  `mailto:${personal.email}?subject=${encodeURIComponent(`Portfolio enquiry · ${v.projectType || 'Hello'}`)}&body=${encodeURIComponent(
    `${v.message}\n\n— ${v.name}${v.email ? ` (${v.email})` : ''}`,
  )}`

function Field({ id, label, error, hint, children }: { id: keyof ContactPayload; label: string; error?: string; hint?: string; children: ReactNode }) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between gap-4">
        <label htmlFor={`contact-${id}`} className="text-sm font-medium text-fg-soft">
          {label}
        </label>
        {hint && <span className="font-mono text-[0.68rem] text-muted">{hint}</span>}
      </div>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            id={`contact-${id}-error`}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-2 text-sm text-[#ff9b9b]"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

const inputCls = (invalid: boolean) =>
  cn(
    'w-full rounded-xl border bg-ink-900/70 px-4 text-[0.95rem] text-fg placeholder:text-muted/70',
    'transition-[border-color,box-shadow] duration-300 focus:outline-none focus:ring-4',
    invalid ? 'border-[#ff9b9b]/70 focus:ring-[#ff9b9b]/15' : 'border-line focus:border-violet/70 focus:ring-violet/15',
  )

export function Contact() {
  const [values, setValues] = useState<ContactPayload>(empty)
  const [honeypot, setHoneypot] = useState('')
  const [errors, setErrors] = useState<ContactErrors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [failure, setFailure] = useState<Failure>('generic')
  const [copied, setCopied] = useState(false)
  const startedAt = useRef<number | null>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const markStarted = () => {
    startedAt.current ??= Date.now()
  }

  const update = (key: keyof ContactPayload) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    markStarted()
    setValues((v) => ({ ...v, [key]: e.target.value }))
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }))
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const { data, errors: found } = validateContact(values)
    if (!data) {
      setErrors(found)
      const first = (Object.keys(found) as (keyof ContactPayload)[])[0]
      formRef.current?.querySelector<HTMLElement>(`#contact-${first}`)?.focus()
      return
    }

    setStatus('submitting')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ ...data, website: honeypot, startedAt: startedAt.current ?? Date.now() }),
      })
      const body = (await res.json().catch(() => null)) as { ok?: boolean; error?: string; fields?: ContactErrors } | null
      // Only a JSON `{ ok: true }` from the function counts as delivered.
      if (res.ok && body?.ok === true) {
        setStatus('success')
        setValues(empty)
        startedAt.current = null
        return
      }
      if (res.status === 422 && body?.fields) {
        setErrors(body.fields)
        setStatus('idle')
        return
      }
      setFailure(res.status === 429 ? 'rate_limited' : res.status === 503 || res.status === 404 || res.status === 405 ? 'unavailable' : 'generic')
      setStatus('error')
    } catch {
      setFailure('unavailable')
      setStatus('error')
    }
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personal.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${personal.email}`
    }
  }

  const failureCopy: Record<Failure, string> = {
    unavailable: 'The form couldn’t reach my inbox just now. Your message is still here — send it by email instead and it will arrive straight away.',
    rate_limited: 'That’s a few messages in a short time. Please send this one by email instead.',
    generic: 'Something went wrong while sending. Your message is still here — please try again or send it by email.',
  }

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-x-clip py-28 md:py-40">
      <div aria-hidden="true" className="absolute -bottom-1/3 left-1/2 -z-10 h-[60vmax] w-[90vmax] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(136_104_255/0.14),transparent)]" />
      <div className="container-x grid gap-16 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <SectionHeading id="contact-title" index="08" eyebrow="Contact" title="Let’s build something together." accent={['together.']} align="stack" />
          <Reveal delay={0.1} className="mt-8 max-w-md text-lg leading-relaxed text-muted">
            Have a project, a role or an idea worth exploring? Send a message — I read every one and reply personally.
          </Reveal>

          <Reveal delay={0.15}>
            <ul className="mt-10 divide-y divide-line border-y border-line">
              <li className="flex items-center justify-between gap-4 py-4">
                <a href={`mailto:${personal.email}`} className="group flex min-w-0 items-center gap-4">
                  <Mail size={17} className="shrink-0 text-violet-soft" aria-hidden="true" />
                  <span className="min-w-0">
                    <span className="block text-xs text-muted">Email</span>
                    <span className="link-underline block truncate text-fg">{personal.email}</span>
                  </span>
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line text-muted transition-colors hover:border-line-strong hover:text-fg"
                  aria-label={copied ? 'Email address copied' : 'Copy email address'}
                >
                  {copied ? <Check size={15} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}
                </button>
              </li>
              <li className="py-4">
                <a href={personal.phoneHref} className="group flex items-center gap-4">
                  <Phone size={17} className="shrink-0 text-violet-soft" aria-hidden="true" />
                  <span>
                    <span className="block text-xs text-muted">Phone</span>
                    <span className="link-underline text-fg">{personal.phone}</span>
                  </span>
                </a>
              </li>
              <li className="flex items-center gap-4 py-4">
                <MapPin size={17} className="shrink-0 text-violet-soft" aria-hidden="true" />
                <span>
                  <span className="block text-xs text-muted">Based in</span>
                  <span className="text-fg">{personal.location}</span>
                </span>
              </li>
              <li className="flex flex-wrap items-center justify-between gap-4 py-4">
                <span className="flex items-center gap-4">
                  <FileText size={17} className="shrink-0 text-violet-soft" aria-hidden="true" />
                  <span>
                    <span className="block text-xs text-muted">Résumé</span>
                    <span className="text-fg">PDF · 1 page</span>
                  </span>
                </span>
                <span className="flex gap-2">
                  <a href={personal.resume.href} target="_blank" rel="noopener" className="inline-flex h-9 items-center rounded-full border border-line px-3.5 text-xs text-fg-soft hover:border-line-strong hover:text-fg" aria-label="View résumé (PDF, opens in a new tab)">
                    View
                  </a>
                  <a href={personal.resume.href} download={personal.resume.downloadName} className="inline-flex h-9 items-center gap-1.5 rounded-full bg-fg px-3.5 text-xs font-medium text-ink-950" aria-label="Download résumé (PDF)">
                    <Download size={13} aria-hidden="true" /> Download
                  </a>
                </span>
              </li>
            </ul>
            <ul className="mt-6 flex gap-2" aria-label="Social profiles">
              {socials.map((s) => {
                const Icon = socialIcons[s.id]
                return (
                  <li key={s.id}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`${s.label} (opens in a new tab)`} className="grid h-11 w-11 place-items-center rounded-full border border-line text-muted transition-colors hover:border-line-strong hover:text-fg">
                      <Icon size={17} />
                    </a>
                  </li>
                )
              })}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="lg:col-span-7">
          <div className="surface relative p-6 sm:p-8 md:p-10">
            <AnimatePresence mode="wait" initial={false}>
              {status === 'success' ? (
                <motion.div
                  key="success"
                  role="status"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: EASE_OUT }}
                  className="flex min-h-[28rem] flex-col items-start justify-center"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-cyan/15 text-cyan">
                    <Check size={22} aria-hidden="true" />
                  </span>
                  <h3 className="mt-6 font-display text-3xl font-semibold tracking-[-0.025em]">Message sent.</h3>
                  <p className="mt-3 max-w-md text-muted">Thank you for reaching out. It’s in my inbox, and I’ll reply to the email address you gave.</p>
                  <button type="button" onClick={() => setStatus('idle')} className="link-underline mt-8 text-sm text-fg">
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  ref={formRef}
                  noValidate
                  onSubmit={onSubmit}
                  onFocus={markStarted}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                  aria-describedby="contact-form-note"
                >
                  <div className="grid gap-6 sm:grid-cols-2">
                    <Field id="name" label="Name" error={errors.name}>
                      <input
                        id="contact-name"
                        name="name"
                        autoComplete="name"
                        value={values.name}
                        onChange={update('name')}
                        maxLength={LIMITS.name[1]}
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? 'contact-name-error' : undefined}
                        className={cn(inputCls(!!errors.name), 'h-12')}
                        placeholder="Your name"
                      />
                    </Field>
                    <Field id="email" label="Email" error={errors.email}>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        value={values.email}
                        onChange={update('email')}
                        maxLength={LIMITS.email}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? 'contact-email-error' : undefined}
                        className={cn(inputCls(!!errors.email), 'h-12')}
                        placeholder="you@company.com"
                      />
                    </Field>
                  </div>

                  <Field id="projectType" label="What’s this about?" error={errors.projectType}>
                    <select
                      id="contact-projectType"
                      name="projectType"
                      value={values.projectType}
                      onChange={update('projectType')}
                      aria-invalid={!!errors.projectType}
                      aria-describedby={errors.projectType ? 'contact-projectType-error' : undefined}
                      className={cn(inputCls(!!errors.projectType), 'h-12 appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2712%27 height=%2712%27 fill=%27none%27 stroke=%27%239296a5%27 stroke-width=%271.5%27%3E%3Cpath d=%27M2 4l4 4 4-4%27/%3E%3C/svg%3E")] bg-[length:12px] bg-[right_1rem_center] bg-no-repeat pr-10', !values.projectType && 'text-muted')}
                    >
                      <option value="" disabled>
                        Choose one
                      </option>
                      {projectTypes.map((t) => (
                        <option key={t} value={t} className="bg-ink-850 text-fg">
                          {t}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field id="message" label="Message" error={errors.message} hint={`${values.message.length}/${LIMITS.message[1]}`}>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={6}
                      value={values.message}
                      onChange={update('message')}
                      maxLength={LIMITS.message[1]}
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? 'contact-message-error' : undefined}
                      className={cn(inputCls(!!errors.message), 'resize-y py-3.5 leading-relaxed')}
                      placeholder="A few lines about what you have in mind — goals, timeline, links."
                    />
                  </Field>

                  {/* Honeypot: hidden from people and assistive tech, tempting to bots. */}
                  <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                    <label htmlFor="contact-website">Website</label>
                    <input id="contact-website" name="website" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
                  </div>

                  <div aria-live="polite">
                    {status === 'error' && (
                      <div role="alert" className="rounded-xl border border-[#ff9b9b]/30 bg-[#ff9b9b]/[0.06] p-4 text-sm">
                        <p className="text-fg-soft">{failureCopy[failure]}</p>
                        <a href={mailtoFor(values)} className="mt-3 inline-flex items-center gap-1.5 font-medium text-fg underline-offset-4 hover:underline">
                          Send by email instead <ArrowUpRight size={14} aria-hidden="true" />
                        </a>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row sm:items-center">
                    <p id="contact-form-note" className="text-xs text-muted">
                      Sent securely to my inbox. Your details are only used to reply.
                    </p>
                    <Magnetic>
                      <button
                        type="submit"
                        disabled={status === 'submitting'}
                        className="group inline-flex h-12 items-center gap-2.5 rounded-full bg-fg px-6 text-sm font-medium text-ink-950 transition-colors hover:bg-white disabled:opacity-70"
                      >
                        {status === 'submitting' ? (
                          <>
                            <LoaderCircle size={16} className="animate-spin" aria-hidden="true" /> Sending…
                          </>
                        ) : (
                          <>
                            Send message <Send size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
                          </>
                        )}
                      </button>
                    </Magnetic>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
