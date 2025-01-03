import { useState } from 'react';
import { Eye } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'Finance',
    category: 'Web Applications',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&q=80',
  },
  {
    id: 2,
    title: 'Brawlhalla',
    category: 'Mobile Applications',
    image: 'https://images.unsplash.com/photo-1556438064-2d7646166914?w=800&h=600&q=80',
  },
];

export const Projects = () => {
  const [filter, setFilter] = useState('All');

  const filteredProjects = projects.filter((project) =>
    filter === 'All' ? true : project.category === filter
  );

  return (
    <article>
      <h2 className="text-3xl text-white font-semibold mb-8 pb-2 border-b-2 border-[#ffd700] w-fit">
        Projects
      </h2>

      <div className="flex gap-6 mb-8">
        {['All', 'Web Applications', 'Mobile Applications'].map((category) => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`text-sm ${
              filter === category ? 'text-[#ffd700]' : 'text-gray-400 hover:text-gray-300'
            } transition-colors`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </div>
    </article>
  );
};

const ProjectCard = ({ title, category, image }) => (
  <div className="group relative">
    <div className="relative h-48 rounded-xl overflow-hidden">
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <Eye className="text-white w-8 h-8" />
      </div>
      <img src={image} alt={title} className="w-full h-full object-cover" />
    </div>
    <h3 className="text-white font-medium mt-4 mb-1">{title}</h3>
    <p className="text-gray-400 text-sm">{category}</p>
  </div>
);
