// For assets in the public folder, reference them with an absolute path
// CRA serves files from `public` at the root URL, so use "/images/..." directly.

export const projects = [
  {
    id: 1,
    title: 'Ride Booking App',
    category: 'Web Applications',
    description: 'A modern ride booking application with real-time tracking, payment integration, and user management.',
    image: 'https://img.freepik.com/free-vector/taxi-app-interface-concept_23-2148494543.jpg?t=st=1742836996~exp=1742840596~hmac=2f13032a70497bc41b9e8a0a7f86e56747d2c1689edb85161bc3ff2afcef0785&w=2000',
    tech: ['React', 'Node.js', 'MongoDB', 'Express JS', 'TailwindCSS'],
    liveUrl: 'https://ride-on.milendra.site/',
    githubUrl: 'https://github.com/milendrakumarbaghel/ride-on',
    featured: true
  },
  {
    id: 2,
    title: 'Virtual Payment Wallet',
    category: 'Web Applications',
    description: 'A secure digital wallet for managing funds, transfers, and real-time transactions with a modern, responsive UI.',
    image: '/images/payplus.png',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Prisma', 'Express JS', 'TailwindCSS'],
    liveUrl: 'https://payplus-nu.vercel.app/',
    githubUrl: 'https://github.com/milendrakumarbaghel/payplus',
    featured: false
  },
  {
    id: 3,
    title: 'Portfolio Website',
    category: 'Web Applications',
    description: 'Modern portfolio website built with React and TailwindCSS featuring glassmorphism design.',
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&q=80',
    tech: ['React', 'TailwindCSS', 'Framer Motion', 'Vite'],
    liveUrl: 'https://milendra.site/',
    githubUrl: 'https://github.com/milendrakumarbaghel/portfolio',
    featured: false
  }
];
