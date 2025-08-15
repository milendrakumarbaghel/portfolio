import { motion } from 'framer-motion';
import { Eye, ExternalLink, Github } from 'lucide-react';
import { projects } from '../data/projects';
import { GlassCard } from '../components/Cards/GlassCard';

export const Projects = () => {
  return (
    <div className="h-full flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-6"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-2">
          <span className="gradient-text">Projects</span>
        </h2>
        <p className="text-lg text-gray-400">
          Explore my latest work and creative solutions
        </p>
      </motion.div>

      {/* Projects Grid */}
      <div className="flex-1 overflow-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-1">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} {...project} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

const ProjectCard = ({ title, category, description, image, tech, liveUrl, githubUrl, index }) => (
  <GlassCard 
    delay={index * 0.1}
    className="flex flex-col"
    height="h-auto"
  >
    {/* Project Image */}
    <div className="relative h-48 rounded-xl overflow-hidden mb-4">
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3">
        <a 
          href={liveUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300"
        >
          <ExternalLink className="text-white w-4 h-4" />
        </a>
        <a 
          href={githubUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300"
        >
          <Github className="text-white w-4 h-4" />
        </a>
      </div>
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
      />
    </div>

    {/* Project Info */}
    <div className="flex-1 flex flex-col">
      <div className="flex-1">
        <span className="text-xs font-medium text-primary-400 uppercase tracking-wider">{category}</span>
        <h3 className="text-lg font-bold text-white mt-1 mb-2">{title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-3">{description}</p>
      </div>

      {/* Tech Stack */}
      <div className="flex flex-wrap gap-1 mb-3">
        {tech.map((techItem) => (
          <span 
            key={techItem}
            className="px-2 py-1 text-xs font-medium bg-primary-500/20 text-primary-300 rounded-full border border-primary-500/30"
          >
            {techItem}
          </span>
        ))}
      </div>

      {/* View Details Button */}
      <button className="w-full glass-button py-2 rounded-xl text-white font-medium hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 text-sm">
        <span>View Details</span>
        <Eye className="w-3 h-3" />
      </button>
    </div>
  </GlassCard>
);
