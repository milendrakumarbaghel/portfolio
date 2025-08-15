import { motion } from 'framer-motion';
import { skills } from '../data/skills';
import { GlassCard } from '../components/Cards/GlassCard';

export const Skills = () => {
  const categories = ['All', ...new Set(skills.map(skill => skill.category))];

  return (
    <div className="h-full flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-6"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-2">
          <span className="gradient-text">Skills</span>
        </h2>
        <p className="text-lg text-gray-400">
          Technologies and tools I use to bring ideas to life
        </p>
      </motion.div>

      {/* Skills Grid */}
      <div className="flex-1 overflow-hidden">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 h-full">
          {skills.map((skill, index) => (
            <SkillCard key={skill.name} {...skill} index={index} />
          ))}
        </div>
      </div>

      {/* Skills by Category */}
      <div className="mt-6">
        <h3 className="text-xl font-bold text-white mb-4">
          Skills by Category
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.slice(1).map((category) => (
            <CategorySkills key={category} category={category} skills={skills} />
          ))}
        </div>
      </div>
    </div>
  );
};

const SkillCard = ({ name, icon, level, index }) => (
  <GlassCard 
    delay={index * 0.05}
    className="text-center group"
    padding="p-4"
    height="h-auto"
  >
    <div className="flex items-center justify-center mb-3 h-12">
      <img 
        src={icon} 
        alt={name} 
        className="h-8 w-8 transition-transform duration-300 group-hover:scale-110" 
      />
    </div>
    <h3 className="font-medium transition-colors duration-300 group-hover:text-primary-300 text-sm">
      {name}
    </h3>
    <span className="text-xs text-gray-500 mt-1 block">{level}</span>
  </GlassCard>
);

const CategorySkills = ({ category, skills }) => {
  const categorySkills = skills.filter(skill => skill.category === category);
  
  return (
    <GlassCard className="p-4">
      <h4 className="text-lg font-semibold text-primary-400 mb-3">{category}</h4>
      <div className="space-y-2">
        {categorySkills.map((skill) => (
          <div key={skill.name} className="flex items-center justify-between">
            <span className="text-sm text-white">{skill.name}</span>
            <span className="text-xs text-gray-400">{skill.level}</span>
          </div>
        ))}
      </div>
    </GlassCard>
  );
};
