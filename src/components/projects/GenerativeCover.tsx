import { useId } from 'react'
import type { GenerativeCover as Kind } from '../../types/index.ts'

interface Props {
  kind: Kind
  title: string
  accent: string
}

const W = 800
const H = 500

function Backdrop({ id, accent }: { id: string; accent: string }) {
  return (
    <>
      <defs>
        <radialGradient id={`${id}-glow`} cx="72%" cy="30%" r="70%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.28" />
          <stop offset="100%" stopColor="#08090d" stopOpacity="0" />
        </radialGradient>
        <pattern id={`${id}-grid`} width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M32 0H0V32" fill="none" stroke="#fff" strokeOpacity="0.05" />
        </pattern>
      </defs>
      <rect width={W} height={H} fill="#0d0f15" />
      <rect width={W} height={H} fill={`url(#${id}-grid)`} />
      <rect width={W} height={H} fill={`url(#${id}-glow)`} />
    </>
  )
}

function Label({ title, caption }: { title: string; caption: string }) {
  return (
    <g>
      <text x="40" y={H - 64} fill="#f5f7fa" fontFamily="Space Grotesk Variable, sans-serif" fontWeight="600" fontSize="34" letterSpacing="-1">
        {title}
      </text>
      <text x="40" y={H - 36} fill="#9296a5" fontFamily="JetBrains Mono Variable, monospace" fontSize="12" letterSpacing="2">
        {caption.toUpperCase()}
      </text>
    </g>
  )
}

/** Repository diagnostics: a file minimap with failing and passing markers, crossed by a pulse line. */
function Diagnostics({ accent, title }: { accent: string; title: string }) {
  const rows = [180, 120, 220, 90, 160, 200, 110, 240, 140, 170]
  const failing = new Set([2, 5, 7])
  return (
    <>
      {rows.map((w, i) => (
        <g key={i} transform={`translate(${460} ${60 + i * 26})`}>
          <rect width={w} height="12" rx="3" fill="#fff" fillOpacity={failing.has(i) ? 0.1 : 0.06} />
          <circle cx={-16} cy="6" r="4" fill={failing.has(i) ? '#ff6b6b' : '#3ddc97'} fillOpacity="0.9" />
        </g>
      ))}
      <path
        d="M0 250 H180 l18 -60 l22 120 l20 -150 l18 110 l14 -20 H800"
        fill="none"
        stroke={accent}
        strokeWidth="2.5"
        strokeLinejoin="round"
        style={{ filter: `drop-shadow(0 0 10px ${accent})` }}
      />
      <g fontFamily="JetBrains Mono Variable, monospace" fontSize="12" fill="#9296a5">
        <text x="40" y="70">baseline  3 passed · 3 failed</text>
        <text x="40" y="94" fill={accent}>patched   6 passed · 0 failed</text>
      </g>
      <Label title={title} caption="Diagnose · Patch · Verify" />
    </>
  )
}

/** Building rules: a plot with setback offsets, a building footprint and dimension lines. */
function SitePlan({ accent, title }: { accent: string; title: string }) {
  const hatch = `hatch-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`
  return (
    <>
      <defs>
        <pattern id={hatch} width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="8" stroke={accent} strokeOpacity="0.35" strokeWidth="1" />
        </pattern>
      </defs>
      <rect x="420" y="50" width="320" height="300" fill="none" stroke="#f5f7fa" strokeOpacity="0.5" strokeDasharray="6 6" />
      <rect x="470" y="110" width="220" height="190" fill={`url(#${hatch})`} stroke={accent} strokeWidth="1.5" />
      <g stroke="#9296a5" strokeWidth="1" fill="none">
        <path d="M420 80 H470 M426 74 l-6 6 l6 6 M464 74 l6 6 l-6 6" />
        <path d="M580 50 V110 M574 56 l6 -6 l6 6 M574 104 l6 6 l6 -6" />
        <path d="M690 330 H740" />
      </g>
      <g fontFamily="JetBrains Mono Variable, monospace" fontSize="11" fill="#9296a5" letterSpacing="1">
        <text x="425" y="70">SIDE SETBACK</text>
        <text x="590" y="84">FRONT</text>
        <text x="540" y="210" fill="#f5f7fa">FAR · HEIGHT</text>
        <text x="40" y="70">Rule 42 → cited · page ref</text>
        <text x="40" y="94" fill={accent}>EN / हिन्दी</text>
      </g>
      <g transform="translate(760 70)" stroke="#f5f7fa" strokeOpacity="0.6" fill="none">
        <path d="M0 18 L0 -14 M-6 -6 L0 -14 L6 -6" />
        <text x="-4" y="34" fill="#9296a5" stroke="none" fontSize="11" fontFamily="JetBrains Mono Variable, monospace">N</text>
      </g>
      <Label title={title} caption="Retrieve · Calculate · Cite" />
    </>
  )
}

/** Claims lifecycle: a shield and a small state machine. */
function PolicyFlow({ accent, title }: { accent: string; title: string }) {
  const states = [
    { x: 420, y: 90, label: 'SUBMITTED' },
    { x: 600, y: 90, label: 'IN REVIEW' },
    { x: 600, y: 210, label: 'APPROVED' },
    { x: 420, y: 210, label: 'SETTLED' },
  ]
  return (
    <>
      <path
        d="M170 70 L250 100 V170 C250 220 215 250 170 270 C125 250 90 220 90 170 V100 Z"
        fill="none"
        stroke={accent}
        strokeWidth="2"
        style={{ filter: `drop-shadow(0 0 12px ${accent})` }}
        transform="translate(-50 0)"
      />
      <path d="M95 165 l22 22 l40 -46" fill="none" stroke="#f5f7fa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <g fill="none" stroke="#9296a5" strokeOpacity="0.6">
        <path d="M545 104 H590 M584 98 l6 6 l-6 6" />
        <path d="M665 128 V196 M659 190 l6 6 l6 -6" />
        <path d="M590 224 H545 M551 218 l-6 6 l6 6" />
      </g>
      {states.map((s, i) => (
        <g key={s.label} transform={`translate(${s.x} ${s.y})`}>
          <rect width="128" height="30" rx="15" fill={i === 2 ? accent : '#fff'} fillOpacity={i === 2 ? 0.2 : 0.05} stroke={i === 2 ? accent : '#fff'} strokeOpacity={i === 2 ? 0.8 : 0.15} />
          <text x="64" y="19" textAnchor="middle" fill="#f5f7fa" fontFamily="JetBrains Mono Variable, monospace" fontSize="11" letterSpacing="1.5">
            {s.label}
          </text>
        </g>
      ))}
      <g fontFamily="JetBrains Mono Variable, monospace" fontSize="11" fill="#9296a5" letterSpacing="1">
        <text x="420" y="290">CUSTOMER · OFFICER · ADMIN</text>
      </g>
      <Label title={title} caption="JWT · OTP · Role-based access" />
    </>
  )
}

/** Ride booking: a street grid with a live route between pick-up and drop-off. */
function RouteNetwork({ accent, title }: { accent: string; title: string }) {
  return (
    <>
      <g stroke="#fff" strokeOpacity="0.08" strokeWidth="10" strokeLinecap="round">
        <path d="M380 40 V360 M520 40 V360 M660 40 V360 M340 120 H780 M340 240 H780 M340 330 H780" />
      </g>
      <path d="M400 330 H520 V240 H660 V120 H740" fill="none" stroke={accent} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="1 12" />
      <path d="M400 330 H520 V240 H660 V120 H740" fill="none" stroke={accent} strokeOpacity="0.35" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
      {[
        [400, 330],
        [740, 120],
      ].map(([x, y], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          <circle r="14" fill={accent} fillOpacity="0.2" />
          <circle r="6" fill={i ? '#f5f7fa' : accent} />
        </g>
      ))}
      <image href="/projects/ride-on/logo.webp" x="40" y="44" width="150" height="132" preserveAspectRatio="xMidYMid meet" opacity="0.95" />
      <g fontFamily="JetBrains Mono Variable, monospace" fontSize="11" fill="#9296a5" letterSpacing="1">
        <text x="40" y="214">socket.io · live ride status</text>
      </g>
      <Label title={title} caption="Rider ↔ Captain · Real time" />
    </>
  )
}

/** Abstract cover art for projects without a public screenshot. Clearly illustrative, never a fake UI. */
export function GenerativeCover({ kind, title, accent }: Props) {
  const id = `gc-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`
  const Art = { diagnostics: Diagnostics, 'site-plan': SitePlan, 'policy-flow': PolicyFlow, 'route-network': RouteNetwork }[kind]
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" className="h-full w-full" role="img" aria-label={`Illustrative cover artwork for ${title}`}>
      <Backdrop id={id} accent={accent} />
      <Art accent={accent} title={title} />
    </svg>
  )
}
