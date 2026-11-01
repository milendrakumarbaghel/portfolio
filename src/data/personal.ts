import type { NavItem } from '../types/index.ts'

export const SITE_URL = 'https://milendra.site'

export const personal = {
  name: 'Milendra Kumar Baghel',
  firstName: 'Milendra',
  positioning: 'Software Engineer · Java Backend Developer · Full-Stack Developer · Freelance Web Developer',
  headline: 'I build reliable systems & immersive digital experiences.',
  intro:
    'Software Engineer specializing in Java, Spring Boot, React, and full-stack applications. I also build AI-powered solutions and memorable digital experiences for real-world clients.',
  roles: [
    'Software Engineer',
    'Java Backend Developer',
    'Full-Stack Developer',
    'Creative Web Developer',
    'AI Project Builder',
  ],
  current: {
    role: 'Graduate Engineer Trainee (Java Developer)',
    organisation: 'MPSeDC',
  },
  location: 'Bhopal, Madhya Pradesh, India',
  email: 'baghelmilendrakumar@gmail.com',
  phone: '+91 89898 28591',
  phoneHref: 'tel:+918989828591',
  resume: {
    href: '/resume/Milendra_Kumar_Baghel_Resume.pdf',
    downloadName: 'Milendra_Kumar_Baghel_Resume.pdf',
  },
  portrait: {
    src: '/images/portrait-850.webp',
    srcSet: '/images/portrait-480.webp 480w, /images/portrait-850.webp 850w',
    width: 850,
    height: 850,
    alt: 'Portrait of Milendra Kumar Baghel',
  },
} as const

export const socials = [
  { id: 'github', label: 'GitHub', handle: 'milendrakumarbaghel', href: 'https://github.com/milendrakumarbaghel' },
  { id: 'linkedin', label: 'LinkedIn', handle: 'milendra-kumar-baghel', href: 'https://www.linkedin.com/in/milendra-kumar-baghel/' },
  { id: 'x', label: 'X', handle: '@milendrabaghel', href: 'https://x.com/milendrabaghel' },
  { id: 'instagram', label: 'Instagram', handle: '@milendrabaghel', href: 'https://www.instagram.com/milendrabaghel/' },
] as const

export type SocialId = (typeof socials)[number]['id']

export const navItems: NavItem[] = [
  { id: 'top', label: 'Home', sections: ['top'] },
  { id: 'about', label: 'About', sections: ['about'] },
  { id: 'experience', label: 'Experience', sections: ['experience'] },
  { id: 'work', label: 'Work', sections: ['work'] },
  { id: 'skills', label: 'Skills', sections: ['skills', 'education'] },
  { id: 'freelance', label: 'Freelance', sections: ['freelance', 'services'] },
  { id: 'contact', label: 'Contact', sections: ['contact'] },
]
