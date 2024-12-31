import { Eye } from 'lucide-react';

export const ProjectCard = ({ title, category, image }) => (
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
