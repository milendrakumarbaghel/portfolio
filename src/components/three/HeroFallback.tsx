/**
 * Static, hand-drawn version of the hero monolith. Used for reduced motion,
 * devices without WebGL, low-power devices and while the 3D chunk loads.
 */
export function HeroFallback({ className }: { className?: string }) {
  const traces = [
    'M210 150 h40 v60 h-30 v50',
    'M250 120 v40 h50 v70',
    'M200 300 h60 v-30 h40',
    'M230 360 v40 h70',
    'M300 300 v60 h-30 v60',
    'M210 430 h50 v40 h40',
    'M280 180 h20 v40',
    'M220 520 h60 v-30',
  ]
  return (
    <svg viewBox="0 0 500 700" className={className} role="img" aria-label="Illustration of a dark engineering monolith with glowing circuit traces, surrounded by a ring of connected nodes">
      <defs>
        <radialGradient id="fb-glow" cx="50%" cy="48%" r="50%">
          <stop offset="0%" stopColor="#8868ff" stopOpacity="0.38" />
          <stop offset="55%" stopColor="#4b3fb0" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#08090d" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="fb-front" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1c1f2b" />
          <stop offset="55%" stopColor="#0f1118" />
          <stop offset="100%" stopColor="#151826" />
        </linearGradient>
        <linearGradient id="fb-side" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0b0c12" />
          <stop offset="100%" stopColor="#1a1d29" />
        </linearGradient>
        <linearGradient id="fb-rim" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#b2a1ff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#4bdcf5" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id="fb-trace" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8868ff" />
          <stop offset="100%" stopColor="#4bdcf5" />
        </linearGradient>
      </defs>
      <ellipse cx="250" cy="340" rx="250" ry="300" fill="url(#fb-glow)" />
      {/* Orbit ring (back half) */}
      <ellipse cx="250" cy="370" rx="215" ry="62" fill="none" stroke="#8868ff" strokeOpacity="0.22" strokeDasharray="2 7" />
      {/* Monolith */}
      <path d="M330 95 l38 22 v440 l-38 -22 z" fill="url(#fb-side)" />
      <path d="M180 95 l38 22 h150 l-38 -22 z" fill="#232735" />
      <rect x="180" y="95" width="150" height="440" rx="10" fill="url(#fb-front)" stroke="url(#fb-rim)" strokeOpacity="0.55" />
      <g fill="none" stroke="url(#fb-trace)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" opacity="0.85">
        {traces.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
      <g fill="#9fe9f7">
        {[[210, 150], [220, 260], [300, 230], [200, 300], [300, 270], [300, 400], [270, 420], [300, 470], [280, 490], [250, 120]].map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="2.6" />
        ))}
      </g>
      <circle cx="196" cy="110" r="2.4" fill="#4bdcf5" />
      <circle cx="205" cy="110" r="2.4" fill="#8868ff" />
      <circle cx="214" cy="110" r="2.4" fill="#8868ff" />
      <rect x="198" y="512" width="114" height="1.5" fill="#b2a1ff" />
      {/* Orbit ring (front half) with nodes */}
      <path d="M35 370 a215 62 0 0 0 430 0" fill="none" stroke="#8868ff" strokeOpacity="0.4" />
      {[[52, 395], [110, 420], [190, 431], [280, 431], [360, 421], [430, 398], [80, 340], [440, 345]].map(([x, y]) => (
        <circle key={`n-${x}`} cx={x} cy={y} r="4.5" fill="#0e1017" stroke="#4bdcf5" strokeWidth="1.5" />
      ))}
      {/* Glass panels */}
      <rect x="62" y="150" width="78" height="104" rx="6" fill="#a99bff" fillOpacity="0.05" stroke="#c9c0ff" strokeOpacity="0.3" transform="rotate(-8 100 200)" />
      <rect x="385" y="470" width="66" height="88" rx="6" fill="#a99bff" fillOpacity="0.05" stroke="#c9c0ff" strokeOpacity="0.3" transform="rotate(7 418 514)" />
    </svg>
  )
}
