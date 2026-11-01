export const education = [
  {
    degree: 'Master of Computer Applications (MCA)',
    institution: 'Maulana Azad National Institute of Technology (NIT Bhopal)',
    period: 'July 2023 – May 2026',
    grade: 'CGPA 8.50 / 10',
    location: 'Bhopal, India',
  },
  {
    degree: 'Bachelor of Computer Applications (BCA)',
    institution: 'Makhanlal Chaturvedi National University of Journalism and Communication',
    period: 'July 2018 – May 2021',
    grade: 'CGPA 8.83 / 10',
    location: 'Bhopal, India',
  },
]

/** Hackathon builds — each links to its case study. */
export const hackathons = [
  { event: 'MPOnline Idea & Innovation Hackathon 2026', project: 'E-Valuate AI', slug: 'e-valuate-ai' },
  { event: 'Claude Impact Lab × Cerebras Café Compute, Bhopal', project: 'Visarjan Ghat Watch', slug: 'visarjan-ghat-watch' },
  { event: 'Bhopal Impact Lab 2026', project: 'Bhumi Vikas Sahayak', slug: 'bhumi-vikas-sahayak' },
  { event: 'Steer Club Hackathon', project: 'MetaboQuest', slug: 'metaboquest' },
]

export const certifications = [
  {
    title: 'Java (Basic) Certification',
    issuer: 'HackerRank',
    year: '2024',
    href: 'https://www.hackerrank.com/certificates/01c73b87445d',
  },
  {
    title: 'Certificate of Participation — Geeks Challenge 1.0',
    issuer: 'NIT Patna',
    year: 'July 2024',
    note: 'Ranked in the top 100',
    href: 'https://media.geeksforgeeks.org/certificates/1721656537/f73a4bd350aa0c2e12d93852767d904b.pdf',
  },
  {
    title: 'MongoDB Basics for Students',
    issuer: 'MongoDB Inc.',
    year: '2025',
    href: 'https://www.credly.com/badges/6b28f5c4-ca07-4cd0-a146-65560b614680',
  },
  {
    title: 'Certificate of Excellence — Databases for Developers: Foundations',
    issuer: 'Oracle',
    href: 'https://drive.google.com/file/d/1Btm6lyAX-odyCbsnrx5wQcuTDlPjYv3D/view?usp=sharing',
  },
]

export const services = [
  { id: 'business', title: 'Business & portfolio websites', body: 'A clear, fast website that explains what you do and makes it easy to get in touch.' },
  { id: 'hospitality', title: 'Restaurant & hospitality websites', body: 'Menus, rooms, galleries and enquiry flows built around how guests actually book.' },
  { id: 'react', title: 'React web applications', body: 'Interactive, component-driven interfaces with clean state and solid accessibility.' },
  { id: 'fullstack', title: 'Full-stack development', body: 'React frontends backed by Spring Boot or Node.js APIs and a well-modelled database.' },
  { id: 'motion', title: 'Interactive & animated websites', body: 'Scroll-driven storytelling, motion and 3D — used with restraint, never at the cost of speed.' },
  { id: 'redesign', title: 'Redesign & modernisation', body: 'Bring an outdated site up to date: new design, responsive layouts and modern tooling.' },
  { id: 'ui', title: 'Frontend UI implementation', body: 'Turning designs into responsive, pixel-careful, production-ready components.' },
] as const

export const projectTypes = [
  'Website for my business',
  'Web application',
  'Redesign of an existing site',
  'Job or internship opportunity',
  'Collaboration',
  'Something else',
] as const
