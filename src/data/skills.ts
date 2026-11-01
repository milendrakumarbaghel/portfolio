import type { SkillGroup } from '../types/index.ts'

/**
 * `professional` = used in my roles at MPSeDC or Monocept.
 * `projects` = used in personal, hackathon or freelance projects.
 */
export const skillGroups: SkillGroup[] = [
  {
    id: 'backend',
    title: 'Backend & APIs',
    blurb: 'Where most of my professional work lives.',
    skills: [
      { name: 'Java', context: 'professional', match: ['java'] },
      { name: 'Spring Boot', context: 'professional', match: ['spring boot'] },
      { name: 'Spring Security', context: 'professional', match: ['spring security'] },
      { name: 'REST APIs', context: 'professional', match: ['spring boot', 'express', 'fastapi'] },
      { name: 'JWT', context: 'professional', match: ['jwt'] },
      { name: 'Java Servlets', context: 'professional', match: ['servlets'] },
      { name: 'JSP', context: 'professional', match: ['jsp'] },
      { name: 'Node.js', context: 'projects', match: ['node.js'] },
      { name: 'Express.js', context: 'projects', match: ['express'] },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    blurb: 'Interfaces for products and for clients.',
    skills: [
      { name: 'React', context: 'professional', match: ['react'] },
      { name: 'TypeScript', context: 'projects', match: ['typescript'] },
      { name: 'JavaScript', context: 'professional', match: ['react', 'node.js'] },
      { name: 'Tailwind CSS', context: 'projects', match: ['tailwind'] },
      { name: 'HTML', context: 'professional', match: ['jsp', 'responsive web'] },
      { name: 'CSS', context: 'professional', match: ['tailwind', 'responsive web'] },
    ],
  },
  {
    id: 'data',
    title: 'Databases',
    blurb: 'Relational first, document stores when they fit.',
    skills: [
      { name: 'MySQL', context: 'professional', match: ['mysql'] },
      { name: 'PostgreSQL', context: 'projects', match: ['postgresql'] },
      { name: 'MongoDB', context: 'projects', match: ['mongodb'] },
      { name: 'Prisma ORM', context: 'projects', match: ['prisma'] },
    ],
  },
  {
    id: 'cloud',
    title: 'Cloud & DevOps',
    blurb: 'Getting software built, shipped and served.',
    skills: [
      { name: 'Git', context: 'professional', match: ['git'] },
      { name: 'GitHub', context: 'professional', match: ['git'] },
      { name: 'Docker', context: 'projects', match: ['docker'] },
      { name: 'GitHub Actions', context: 'projects' },
      { name: 'AWS EC2', context: 'projects' },
      { name: 'AWS S3', context: 'projects' },
      { name: 'AWS CloudFront', context: 'projects' },
      { name: 'Nginx', context: 'projects' },
    ],
  },
  {
    id: 'tools',
    title: 'Engineering Tools',
    blurb: 'Testing, documenting and exploring APIs.',
    skills: [
      { name: 'Postman', context: 'professional', match: ['postman'] },
      { name: 'Swagger / OpenAPI', context: 'professional', match: ['swagger'] },
      { name: 'VS Code', context: 'professional' },
    ],
  },
]
