import { test } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { projects } from '../src/data/projects.ts'
import { experience } from '../src/data/experience.ts'
import { skillGroups } from '../src/data/skills.ts'
import { hackathons, certifications } from '../src/data/achievements.ts'
import { personal, navItems } from '../src/data/personal.ts'
import { validateContact } from '../api/_lib/validate.ts'
import type { ProjectImage } from '../src/types/index.ts'

const publicPath = (p: string) => fileURLToPath(new URL(`../public${p}`, import.meta.url))
const srcsOf = (img: ProjectImage) => [img.src, ...(img.srcSet?.split(',').map((s) => s.trim().split(' ')[0]) ?? [])]

test('project slugs are unique and URL-safe', () => {
  const slugs = projects.map((p) => p.slug)
  assert.equal(new Set(slugs).size, slugs.length)
  for (const s of slugs) assert.match(s, /^[a-z0-9]+(-[a-z0-9]+)*$/)
})

test('every project has the content a card and case study need', () => {
  for (const p of projects) {
    assert.ok(p.title && p.summary && p.tagline && p.role, `${p.slug}: missing core copy`)
    assert.ok(p.features.length >= 3, `${p.slug}: needs at least 3 features`)
    assert.ok(p.stack.length >= 2, `${p.slug}: needs a stack`)
    assert.ok(p.highlights.length >= 1, `${p.slug}: needs highlights`)
    assert.match(p.accent, /^#[0-9a-f]{6}$/i)
  }
})

test('client projects have a live site; engineering projects link to source', () => {
  for (const p of projects) {
    if (p.kind === 'client') assert.ok(p.links.live, `${p.slug}: client work needs a live URL`)
    else assert.ok(p.links.github, `${p.slug}: engineering work needs a GitHub URL`)
  }
})

test('all external links are absolute https URLs', () => {
  const urls = [
    ...projects.flatMap((p) => Object.values(p.links)),
    ...certifications.map((c) => c.href),
  ]
  for (const u of urls) assert.match(String(u), /^https:\/\/[^\s]+$/)
})

test('every referenced image exists in /public', () => {
  const images: ProjectImage[] = projects.flatMap((p) => [
    ...('generative' in p.cover ? [] : [p.cover]),
    ...(p.mobile ? [p.mobile] : []),
    ...(p.gallery ?? []),
  ])
  for (const img of images) {
    assert.ok(img.alt.length > 10, `${img.src}: alt text too short`)
    for (const src of srcsOf(img)) assert.ok(existsSync(publicPath(src)), `missing ${src}`)
  }
  for (const src of srcsOf(personal.portrait as ProjectImage)) assert.ok(existsSync(publicPath(src)), `missing ${src}`)
  assert.ok(existsSync(publicPath(personal.resume.href)), 'résumé PDF missing')
  assert.ok(existsSync(publicPath('/projects/ride-on/logo.webp')), 'Ride-On logo missing')
})

test('hackathon entries point at real case studies', () => {
  for (const h of hackathons) assert.ok(projects.some((p) => p.slug === h.slug), `${h.slug} not found`)
})

test('experience and skills are populated', () => {
  assert.equal(experience[0].shortName, 'MPSeDC')
  const names = skillGroups.flatMap((g) => g.skills.map((s) => s.name))
  assert.equal(new Set(names).size, names.length, 'duplicate skill')
  assert.ok(names.includes('Java') && names.includes('Spring Boot') && names.includes('React'))
})

test('navigation covers every home section exactly once', () => {
  const sections = navItems.flatMap((n) => n.sections)
  assert.equal(new Set(sections).size, sections.length)
  for (const id of ['top', 'freelance', 'about', 'experience', 'work', 'services', 'skills', 'education', 'contact'])
    assert.ok(sections.includes(id), `${id} not in nav`)
})

test('contact validation accepts good input and rejects bad input', () => {
  const ok = validateContact({ name: 'Asha', email: 'asha@example.com', projectType: 'Web application', message: 'I would like a website for my bakery in Bhopal.' })
  assert.ok(ok.data)
  assert.deepEqual(ok.errors, {})

  const bad = validateContact({ name: 'A', email: 'not-an-email', projectType: '', message: 'short' })
  assert.equal(bad.data, undefined)
  assert.deepEqual(Object.keys(bad.errors).sort(), ['email', 'message', 'name', 'projectType'])

  assert.ok(validateContact(null).errors.email)
  assert.ok(validateContact({ name: 'Asha', email: 'a@b.co', projectType: 'x'.repeat(5), message: 'y'.repeat(4001) }).errors.message)
})
