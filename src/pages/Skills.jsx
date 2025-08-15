import { motion } from 'framer-motion';
import { skills } from '../data/skills';
import { GlassCard } from '../components/Cards/GlassCard';

export const Skills = () => {
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
      <div className="flex-1 overflow-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-1">
          {skills.map((skill, index) => (
            <SkillCard key={skill.name} {...skill} index={index} />
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
