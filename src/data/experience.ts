import type { ExperienceEntry } from '../types/index.ts'

export const experience: ExperienceEntry[] = [
  {
    id: 'mpsedc',
    organisation: 'M.P. State Electronics Development Corporation Ltd.',
    shortName: 'MPSeDC',
    role: 'Graduate Engineer Trainee — Java Developer',
    period: 'September 2026 – Present',
    location: 'Bhopal, India',
    summary:
      'Developing the Work Management System (WMS), an e-Governance platform for public works departments such as WRD, NVDA and PWD.',
    points: [
      'Building secure REST APIs with Java 21, Spring Boot 3, Spring Data JPA and MySQL 8.',
      'Implementing authentication and authorisation with Spring Security and JWT.',
      'Working with React and metadata-driven dynamic forms.',
    ],
    details: [
      'Documenting and consuming APIs with Swagger/OpenAPI.',
      'Working on SSO integration.',
      'Integrating C-DAC Aadhaar eSign / DSC.',
      'Shipping through Azure DevOps CI/CD pipelines.',
    ],
    stack: ['Java 21', 'Spring Boot 3', 'Spring Data JPA', 'Spring Security', 'JWT', 'MySQL 8', 'React', 'Swagger/OpenAPI', 'Azure DevOps'],
  },
  {
    id: 'monocept',
    organisation: 'Monocept Consulting Pvt. Ltd.',
    shortName: 'Monocept',
    role: 'Software Intern',
    period: 'January 2026 – July 2026',
    location: 'India',
    summary: 'Backend-focused internship building secure services and web applications in Java.',
    points: [
      'Developed secure REST APIs with Spring Boot and Spring Security, following SOLID principles.',
      'Built web applications with Java Servlets, JSP and session management.',
      'Applied Core Java, OOP, multithreading, Streams and lambda expressions in backend work.',
    ],
    details: [
      'Used JDBC and MySQL for database operations.',
      'Tested with JUnit and Postman.',
      'Version control with Git and GitHub.',
    ],
    stack: ['Java', 'Spring Boot', 'Spring Security', 'Servlets', 'JSP', 'JDBC', 'MySQL', 'JUnit', 'Postman', 'Git'],
  },
  {
    id: 'freelance',
    organisation: 'Independent Web Development',
    shortName: 'Freelance',
    role: 'Freelance Web Developer',
    period: 'Project-based',
    location: 'Madhya Pradesh, India',
    summary:
      'Designing and developing modern, responsive websites and digital experiences for businesses — from an animation studio to restaurants and hotels.',
    points: [
      'Designed and built ANICX Media, a multi-page site for an animation studio and creative academy.',
      'Designed and built websites for Abhinandan Garden Restaurant and Hotel Shantione in Seoni.',
      'Own each project end to end: structure, visual design, development, responsive testing and launch.',
    ],
    details: [
      'Enquiry flows built around how local customers actually get in touch: forms, phone and WhatsApp.',
      'Deployed on Vercel and custom domains.',
    ],
    stack: ['React', 'Vite', 'Tailwind CSS', 'Motion', 'Lenis', 'Vercel'],
    link: { label: 'See client work', href: '#freelance' },
  },
]
