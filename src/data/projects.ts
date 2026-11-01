import type { Project, ProjectFilter, ProjectImage } from '../types/index.ts'

/** Desktop screenshot exported at 800w and 1440w (16:10). */
const shot = (base: string, alt: string, caption?: string): ProjectImage => ({
  src: `${base}-1440.webp`,
  srcSet: `${base}-800.webp 800w, ${base}-1440.webp 1440w`,
  width: 1440,
  height: 900,
  alt,
  caption,
})

/** Mobile screenshot exported at 780×1688 (390pt @2x). */
const phone = (src: string, alt: string): ProjectImage => ({ src, width: 780, height: 1688, alt })

const GH = 'https://github.com/milendrakumarbaghel'

export const filterLabels: Record<ProjectFilter | 'all', string> = {
  all: 'All',
  ai: 'AI & Intelligent Systems',
  fullstack: 'Backend & Full Stack',
  hackathon: 'Hackathons',
  web: 'Web Applications',
}

export const projects: Project[] = [
  // ───────────────────────────── Client work ─────────────────────────────
  {
    slug: 'anicx-media',
    kind: 'client',
    title: 'ANICX Media',
    tagline: 'We Create. We Animate. We Teach.',
    category: 'Creative Studio / Animation / Digital Brand Website',
    filters: ['web'],
    role: 'Design & development',
    summary:
      'A multi-page digital home for ANICX Media, an animation studio and creative academy in Seoni, Madhya Pradesh. The site presents original animated series, client services and practical animation training under one confident, editorial brand.',
    problem:
      'A studio that both produces animation and trains new animators needs to speak to two audiences at once: clients looking for production work and students looking for courses. The website has to show the work first, then route each visitor to the right enquiry.',
    features: [
      'Showreel-led home page with an editorial “We Create. We Animate. We Teach.” hero',
      'Services pages covering animation, websites, video editing and social media management',
      '“Our Work” portfolio with category filters across client and original work',
      'Dedicated pages for original series such as Panga Toonz and Raaz Wali Raat',
      'Academy section with courses, syllabus and a separate course enquiry flow',
      'Project and course enquiry forms routed from every page',
    ],
    stack: ['React', 'Vite', 'Motion', 'GSAP ScrollTrigger', 'Lenis', 'Vercel'],
    highlights: [
      'Strong typographic art direction: oversized headlines, generous white space and a single gold accent',
      'Visual storytelling that lets the studio’s 3D characters carry the page',
      'Smooth scrolling and restrained motion that respects reduced-motion preferences',
      'Responsive layouts designed separately for phone and desktop, not just scaled down',
    ],
    links: { live: 'https://anicx-media.vercel.app/' },
    cover: shot('/projects/anicx-media/home', 'ANICX Media home page with the headline “We Create. We Animate. We Teach.” above a 3D animated still'),
    mobile: phone('/projects/anicx-media/mobile.webp', 'ANICX Media home page on a phone'),
    gallery: [
      shot('/projects/anicx-media/work', 'ANICX Media “Our Work” page with portfolio filters', 'Portfolio with category filters'),
      shot('/projects/anicx-media/project', 'Panga Toonz project page on the ANICX Media website', 'Original series detail page'),
      shot('/projects/anicx-media/services', 'ANICX Media services page listing animation and web services', 'Services overview'),
    ],
    accent: '#C9A35B',
  },
  {
    slug: 'abhinandan-garden-restaurant',
    kind: 'client',
    title: 'Abhinandan Garden Restaurant',
    tagline: 'Where every moment becomes a memory.',
    category: 'Restaurant / Hospitality Website',
    filters: ['web'],
    role: 'Design & development',
    summary:
      'A warm, responsive digital experience for a family and garden restaurant in Barapathar, Seoni. It introduces the restaurant, presents signature dishes, showcases its garden setting and turns interest into table and celebration enquiries.',
    problem:
      'Families planning a meal or a celebration want to know three things quickly: what the food is like, whether the space suits the occasion, and how to book. The site answers each of those within a couple of scrolls.',
    features: [
      'Cinematic hero with direct “Explore our menu” and “Enquire for a table” actions',
      'Restaurant introduction and garden-dining story',
      'Signature menu presentation, from North Indian thali to sizzlers',
      'Celebrations section for birthdays, anniversaries, family gatherings and group dining',
      'Booking enquiry form with occasion selection',
      'Click-to-call, WhatsApp links, opening hours and location details',
    ],
    stack: ['React', 'Vite', 'Lenis', 'Vercel'],
    highlights: [
      'Warm palette of deep brown, cream and gold with an elegant serif display face',
      'Mobile-first enquiry flow: one tap to call, message or open the booking form',
      'Gallery, celebrations and menu layouts that stay readable on small screens',
    ],
    notes: [
      'Some photography on the live site is clearly labelled as sample imagery while the restaurant’s own photos and full menu are finalised.',
    ],
    links: { live: 'https://abhinandan-garden-restaurant.vercel.app/' },
    cover: shot('/projects/abhinandan-garden-restaurant/home', 'Abhinandan Garden Restaurant home page with the headline “Where Every Moment Becomes a Memory”'),
    mobile: phone('/projects/abhinandan-garden-restaurant/mobile.webp', 'Abhinandan Garden Restaurant home page on a phone'),
    gallery: [
      shot('/projects/abhinandan-garden-restaurant/menu', 'Signature dishes section of the Abhinandan Garden Restaurant website', 'Signature menu'),
      shot('/projects/abhinandan-garden-restaurant/celebrations', 'Celebrations section with birthday, anniversary and family gathering cards', 'Celebrations and events'),
    ],
    accent: '#C9A46A',
  },
  {
    slug: 'hotel-shantione',
    kind: 'client',
    title: 'Hotel Shantione',
    tagline: 'Where comfort meets tranquility.',
    category: 'Hotel / Hospitality / Booking Enquiries',
    filters: ['web'],
    role: 'Design & development',
    summary:
      'An elegant website for Hotel Shantione in Suktara, Seoni — opposite Redbird Airport on Badalpar Road, near the NH44 Nagpur Highway and Pench National Park. It shows the rooms exactly as they are and makes enquiring as easy as sending a WhatsApp message.',
    problem:
      'Travellers comparing places to stay near Seoni and Pench want honest photos, clear facilities and an easy way to ask about availability. The site leads with real photography and puts enquiry and directions one tap away.',
    features: [
      'Accommodation section presenting four room styles with real photography',
      'Filterable photo gallery across rooms, interiors, dining and outdoor spaces',
      'Facilities and amenities, including air-conditioned rooms, dining hall and garden',
      'Location section with directions from the airport, highway and Seoni city',
      'Booking enquiry form and WhatsApp-based enquiries',
      'Guest reviews and contact details on a custom domain',
    ],
    stack: ['Responsive web', 'Lenis', 'WhatsApp deep links', 'Custom domain'],
    highlights: [
      'Deep green and gold palette with arched image frames that echo the hotel’s architecture',
      'Real, unretouched photography presented in a cinematic gallery',
      'Booking intent captured through both a form and WhatsApp — the channel guests already use',
    ],
    links: { live: 'https://hotelshantione.in/' },
    cover: shot('/projects/hotel-shantione/home', 'Hotel Shantione home page with the headline “Where Comfort meets Tranquility” beside a photo of the hotel corridor'),
    mobile: phone('/projects/hotel-shantione/mobile.webp', 'Hotel Shantione home page on a phone'),
    gallery: [
      shot('/projects/hotel-shantione/rooms', 'Rooms section of the Hotel Shantione website with room photographs', 'Rooms made for slow mornings'),
      shot('/projects/hotel-shantione/gallery', 'Filterable photo gallery of the hotel exterior, rooms and garden', 'Filterable gallery'),
    ],
    accent: '#C5A46E',
  },

  // ─────────────────────────── Engineering & AI ───────────────────────────
  {
    slug: 'repomedic-ai',
    kind: 'engineering',
    title: 'RepoMedic AI',
    tagline: 'Find the failure. Understand the code. Verify the fix.',
    category: 'Developer Tooling · Repository Diagnostics',
    filters: ['ai', 'fullstack'],
    role: 'Solo project — design and full-stack development',
    summary:
      'A repository diagnostics and code-repair platform. Developers import a public GitHub repository or upload a ZIP, review line-referenced findings, compare a proposed change side by side, re-run real tests and download a Markdown report.',
    problem:
      'Debugging an unfamiliar codebase means jumping between failing tests, source files and guesses — and proposed fixes are rarely verified against the actual test suite before someone trusts them.',
    features: [
      'Import public GitHub repositories or upload ZIP archives',
      'Line-referenced diagnostics that quote the actual source line',
      'Side-by-side patch preview before anything is applied',
      'Apply a patch and re-run the real test process, keeping the original baseline visible',
      'Downloadable Markdown report and unified diff',
      'Optional AI advice via any chat-completions-compatible endpoint',
    ],
    stack: ['React 19', 'TypeScript', 'Tailwind CSS 4', 'Spring Boot 4', 'Java 25', 'Maven', 'Docker'],
    highlights: [
      'Fixes are labelled honestly — a rule-based fix is never presented as a model response',
      'AI advice is enabled only when an endpoint, key and model are configured server-side',
      'Uploaded code never executes on the host; only a byte-verified, audited demo fixture is run',
      'Single Docker image builds the UI and API together, runs the offline test suite and smoke-tests the packaged app',
      'Compose setup with health checks, a read-only root filesystem and a non-root runtime',
    ],
    sections: [
      {
        title: 'Verification flow',
        items: [
          'Run the baseline: the bundled demo starts at 3 passing and 3 failing tests.',
          'Open the finding: a percentage is applied as a whole number in cart.js.',
          'Preview the minimal patch side by side, then apply it.',
          'The real Node test process runs again and reports 6 passing, with the baseline preserved for comparison.',
        ],
      },
    ],
    notes: ['Packaged for local or self-hosted use with Docker. There is intentionally no public hosted deployment.'],
    links: {
      github: `${GH}/RepoMedic-AI`,
      demoVideo: `${GH}/RepoMedic-AI/raw/refs/heads/main/assets/repomedic-demo.mov`,
    },
    cover: { generative: 'diagnostics' },
    accent: '#4BDCF5',
  },
  {
    slug: 'metaboquest',
    kind: 'engineering',
    title: 'MetaboQuest',
    tagline: 'Metabolic-health education that is accurate, calm and easy to act on.',
    category: 'Health Education Platform',
    filters: ['hackathon', 'fullstack'],
    context: 'Steer Club Hackathon',
    role: 'Full-stack development',
    team: 'Collaborative hackathon build',
    summary:
      'Two connected experiences built for the Steer Club Hackathon: MetaboQuest, a mobile-first playable quiz, and Science Studio, a research-to-social-content workflow with a mandatory doctor-review step.',
    problem:
      'Metabolic-health information online is often fear-driven or promotional. The challenge was to make learning feel like play while keeping every claim sourced and reviewed.',
    features: [
      'No-login, three-question interactive quiz designed for phones',
      'Sourced educational explanation after every answer',
      'Shareable result cards and friend challenges',
      'Research ingestion and source-traceable content extraction',
      'Multi-format content generation with a doctor-review gate before export',
      'Rendered exports, scheduling and production-effort tracking',
    ],
    stack: ['Java 21', 'Spring Boot', 'Spring Security', 'Spring Data JPA', 'Flyway', 'PostgreSQL', 'React 19', 'TypeScript', 'Vite', 'Docker'],
    highlights: [
      'Two Spring Boot APIs sharing PostgreSQL with Flyway-managed migrations',
      'Tested with JUnit, MockMvc, Testcontainers, Vitest, React Testing Library and Playwright',
      'Optional OpenAI-compatible model access with a grounded, extractive fallback when no key is configured',
      'Content rules built into the product: no fear, shame, miracle claims or medicine promotion',
    ],
    sections: [
      {
        title: 'Two experiences',
        items: [
          'MetaboQuest — quiz, sessions, scoring, results and challenges for the public.',
          'Science Studio — papers, extraction, generation, doctor review, rendering, export and scheduling for the content team.',
        ],
      },
    ],
    notes: ['An educational prototype. It does not provide medical advice or diagnosis.'],
    links: { github: `${GH}/metaboquest` },
    cover: shot('/projects/metaboquest/landing', 'MetaboQuest landing page asking “GLP-1: how much is fact, and how much is fear?”'),
    mobile: phone('/projects/metaboquest/quiz-mobile.webp', 'MetaboQuest quiz question on a phone'),
    gallery: [shot('/projects/metaboquest/quiz', 'MetaboQuest quiz question with answer options and explanation panel', 'Quiz experience')],
    accent: '#D9825B',
  },
  {
    slug: 'visarjan-ghat-watch',
    kind: 'engineering',
    title: 'Visarjan Ghat Watch',
    tagline: 'Three years of buried water tests, turned into a ranked, evidence-backed action plan.',
    category: 'Environmental Monitoring · Decision Support',
    filters: ['hackathon', 'fullstack', 'web'],
    context: 'Claude Impact Lab × Cerebras Café Compute Hackathon, Bhopal — Track 2',
    period: 'October 2026',
    role: 'Team member',
    team: 'Five-person hackathon team',
    summary:
      'A decision-support platform for the municipal officer who plans Durga visarjan in Bhopal. It turns MP Pollution Control Board water-quality reports into a risk ranking of seven immersion ghats, with every number traceable to the source PDF page.',
    problem:
      'Water at Bhopal’s immersion ghats is tested before, during and after every festival, but the results sit in 90–120-page PDFs that are rarely compared against legal limits. Where to send cleaning, aeration and testing was decided from memory.',
    features: [
      'Dashboard with risk tiers by year and a water-quality snapshot',
      'Risk-based ranking of all seven ghats, with plain-language reasons in English and Hindi',
      'Ghat detail views comparing every reading with CPCB bathing limits',
      'Evidence explorer that opens the source report at the exact page',
      'Historical comparisons and analytics with a table view for every chart',
      'Bilingual A4 action brief that can be shared on WhatsApp, plus test schedules and field sheets',
    ],
    stack: ['React', 'TypeScript', 'Recharts', 'Leaflet', 'Java 25', 'Spring Boot', 'PostgreSQL', 'Vercel', 'Railway'],
    highlights: [
      'Weighted risk score across dissolved oxygen (50%), BOD (35%) and pH (15%) against CPCB class-B limits',
      'Missing tests are never treated as clean — they are shown as “not sampled” and trigger a testing suggestion',
      'Every claim is traceable to its report and page; readings entered later are labelled as such',
      'Automated tests reproduce the headline findings from the source data',
    ],
    sections: [
      {
        title: 'What the data showed',
        items: [
          '42 of 116 dissolved-oxygen tests were below the 5 mg/l bathing standard.',
          '100 of 112 BOD tests were above the 3 mg/l bathing limit.',
          'Dissolved oxygen read 0 mg/l four times at one kund.',
        ],
      },
    ],
    notes: ['Compares readings with published limits only — it makes no health claims and connects to no government system.'],
    links: {
      github: `${GH}/visarjan-ghat-watch`,
      live: 'https://visarjan-ghat-watch-frontend.vercel.app/',
    },
    cover: shot('/projects/visarjan-ghat-watch/home', 'Visarjan Ghat Watch home page: “Cleaner Festivals, Healthier Lakes, A Safer Bhopal”'),
    accent: '#2BB59A',
  },
  {
    slug: 'bhumi-vikas-sahayak',
    kind: 'engineering',
    title: 'Bhumi Vikas Sahayak',
    tagline: 'A bilingual, citation-first assistant for Madhya Pradesh building rules.',
    category: 'Regulatory Decision Support · Retrieval & Calculation',
    filters: ['ai', 'hackathon', 'fullstack'],
    context: 'Bhopal Impact Lab 2026 — Track 1',
    role: 'Backend development',
    team: 'Team Hack2Build',
    summary:
      'An informational assistant for building-permission clerks. A clerk asks a question in English or Hindi; the system finds the relevant Madhya Pradesh Bhumi Vikas Rules, runs deterministic calculations where needed and answers with rule numbers, exact source text and page references.',
    problem:
      'Building-rule questions — setbacks, FAR, height limits — require cross-referencing a long, amended regulation. Generated answers are only useful if every claim can be checked against the rule text.',
    features: [
      'English and Hindi rule queries with measurement extraction',
      'Hybrid PostgreSQL full-text retrieval with rule and clause priority',
      'Source citations with exact rule text and PDF page references',
      'Deterministic setback, FAR, fee, height and clearance calculations',
      'Sentence-level citation validation; unverifiable prose fails closed',
      'Deterministic fallback when the AI service is disabled or unavailable',
    ],
    stack: ['Java 25', 'Spring Boot', 'Spring Data JPA', 'Flyway', 'PostgreSQL', 'React 19', 'TypeScript', 'Python AI service'],
    highlights: [
      'The Java backend checks claims, citations, named rules and numbers before returning generated prose',
      'Effective-dated amendments with independent administrator review and audited supersession',
      'Regression checks against the official sample questions and isolated PostgreSQL integration tests',
    ],
    sections: [
      {
        title: 'Architecture',
        items: [
          'React + TypeScript frontend talks only to the Java backend.',
          'Spring Boot backend owns authentication, the rule corpus, search, validation and calculations.',
          'An internal Python service proposes grounded wording and runs calculators; Java verifies before anything is returned.',
        ],
      },
    ],
    notes: [
      'An informational decision-support aid — it does not grant permission, make legal decisions or replace verification by the competent authority.',
      'In active development: backend foundations are implemented; the clerk-facing interface is still being built.',
    ],
    links: { github: `${GH}/bhumi-vikas-sahayak` },
    cover: { generative: 'site-plan' },
    accent: '#E0B252',
  },
  {
    slug: 'e-valuate-ai',
    kind: 'engineering',
    title: 'E-Valuate AI',
    tagline: 'AI assists. Examiner decides.',
    category: 'AI-Driven Examination & On-Screen Marking',
    filters: ['ai', 'hackathon', 'fullstack'],
    context: 'MPOnline Idea & Innovation Hackathon 2026',
    period: '2026',
    role: 'Full-stack development',
    team: 'Team project',
    summary:
      'An AI-assisted examination evaluation and digital on-screen marking platform. Answer sheets are digitised and read with OCR, evaluated against rubrics with explainable feedback, and then marked by a human examiner who stays in full control of the final score.',
    problem:
      'Manual evaluation of physical answer sheets is slow, tiring and inconsistent between examiners. Automation only helps if examiners can see why a suggestion was made — and override it.',
    features: [
      'Answer-sheet digitisation with OpenCV preprocessing and OCR',
      'Question-wise segmentation of extracted answers',
      'Rubric-based AI evaluation showing matched and missing concepts',
      'Split-screen on-screen marking workspace to accept, adjust or override marks',
      'Moderation flags for low-confidence results and large AI-vs-examiner differences',
      'Analytics dashboards for throughput, question averages and difficulty',
    ],
    stack: ['React 19', 'Vite', 'Tailwind CSS', 'Recharts', 'Spring Boot', 'Spring Security', 'JWT', 'PostgreSQL', 'FastAPI', 'OpenCV', 'Tesseract OCR'],
    highlights: [
      'Role-guarded dashboards for administrators, examiners and moderators',
      'Mark overrides bounded on the server (0 ≤ marks ≤ maximum)',
      'Quality-control engine flags evaluations below 70% confidence or with a 3+ mark discrepancy',
      'LLM providers are pluggable, with a deterministic offline fallback',
    ],
    sections: [
      {
        title: 'Architecture',
        items: [
          'React frontend for marking, moderation and analytics.',
          'Spring Boot core for authentication, business rules, moderation and persistence.',
          'FastAPI microservice for OpenCV preprocessing, OCR, segmentation and evaluation.',
        ],
      },
    ],
    links: { github: `${GH}/AI-Driven-Examination-On-Screen-Marking-Transformation` },
    cover: {
      src: '/projects/e-valuate-ai/answer-sheet.webp',
      width: 960,
      height: 800,
      alt: 'Sample scanned answer sheet from the E-Valuate AI test data',
    },
    accent: '#8868FF',
  },
  {
    slug: 'insurance-management-system',
    kind: 'engineering',
    title: 'Insurance Policy & Claim Management',
    tagline: 'Policies, payments and claims — one secure workflow.',
    category: 'Enterprise Web Application',
    filters: ['fullstack', 'web'],
    period: 'May 2026 – July 2026',
    role: 'Co-developer',
    team: 'Three-person team',
    summary:
      'A full-stack insurance management system that digitises the insurance lifecycle — products and plans, policy issuance, premium payments and claim processing — for customers, operations officers and administrators.',
    problem:
      'Insurance workflows span several roles and sensitive documents. Each role needs its own view, and every state change has to be secure and traceable.',
    features: [
      'Role-based access for customers, insurance operations officers and administrators',
      'JWT authentication with access and refresh tokens, and token blacklisting on logout',
      'OTP verification over email and SMS, including password reset',
      'Product, plan and policy management',
      'Multi-step claim workflow with status history and document uploads',
      'Premium payment tracking and notifications',
    ],
    stack: ['Java 25', 'Spring Boot 4', 'Spring Security', 'JWT', 'MySQL 8', 'React 19', 'Vite', 'Tailwind CSS', 'Cloudinary', 'Twilio', 'Swagger/OpenAPI'],
    highlights: [
      'Rate limiting with Resilience4j to slow brute-force attempts',
      'Route protection enforced on both the frontend and the backend',
      'Cloudinary for claim documents; Twilio and Gmail SMTP for notifications',
    ],
    links: { github: `${GH}/InsurancePolicyAndClaimManagementSystem` },
    cover: { generative: 'policy-flow' },
    accent: '#6C8CFF',
  },
  {
    slug: 'ride-on',
    kind: 'engineering',
    title: 'Ride-On',
    tagline: 'Real-time ride booking between riders and captains.',
    category: 'Real-time Web Application',
    filters: ['fullstack', 'web'],
    period: 'January 2025 – March 2025',
    role: 'Solo project — full-stack development',
    summary:
      'A ride-booking application with a responsive React frontend, live rider–captain communication over WebSockets and Google Maps-powered locations and fares.',
    features: [
      'Rider and captain accounts secured with JWT',
      'Live ride requests and status updates over Socket.io',
      'Google Maps integration for locations and fare calculation',
      'Microservices version with gateway, user, captain, ride, maps and realtime services',
    ],
    stack: ['React', 'GSAP', 'Google Maps API', 'Socket.io', 'Node.js', 'Express', 'MongoDB', 'RabbitMQ', 'Docker'],
    highlights: [
      'API gateway built with express-http-proxy in front of independent services',
      'Services communicate asynchronously through RabbitMQ',
    ],
    links: { github: `${GH}/ride-on` },
    cover: { generative: 'route-network' },
    accent: '#F4D03F',
    archived: true,
  },
  {
    slug: 'payplus',
    kind: 'engineering',
    title: 'PayPlus',
    tagline: 'A virtual payment wallet.',
    category: 'Web Application · Fintech Concept',
    filters: ['web', 'fullstack'],
    role: 'Solo project — full-stack development',
    summary:
      'A digital wallet for sending and requesting money between users, with balance tracking, transaction history and Google sign-in.',
    features: [
      'Email/password and Google sign-in',
      'Send and request money between users',
      'Balance overview and transaction history',
    ],
    stack: ['React', 'Vite', 'Tailwind CSS', 'Node.js', 'Express', 'Prisma', 'PostgreSQL', 'Zod', 'JWT'],
    highlights: ['Request validation with Zod and a typed Prisma data layer on PostgreSQL'],
    links: { github: `${GH}/payplus`, live: 'https://payplus-nu.vercel.app/' },
    cover: shot('/projects/payplus/dashboard', 'PayPlus dashboard showing balance and send, request and history actions'),
    gallery: [shot('/projects/payplus/sign-in', 'PayPlus sign-in page with Google sign-in', 'Sign-in')],
    accent: '#3B82F6',
    archived: true,
  },
]

export const clientProjects = projects.filter((p) => p.kind === 'client')
export const engineeringProjects = projects.filter((p) => p.kind === 'engineering')

export const getProject = (slug: string | undefined) => projects.find((p) => p.slug === slug)
