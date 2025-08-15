import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skills } from '../data/skills';
import { GlassCard } from '../components/Cards/GlassCard';

export const Skills = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', ...new Set(skills.map(skill => skill.category))];

  const filteredSkills = selectedCategory === 'All' 
    ? skills 
    : skills.filter(skill => skill.category === selectedCategory);

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

      {/* Category Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-6"
      >
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 text-sm ${
                selectedCategory === category 
                  ? 'glass-button text-white shadow-lg shadow-primary-500/25' 
                  : 'glass text-gray-300 hover:text-white hover:border-primary-500/30'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Skills Grid */}
      <div className="flex-1 overflow-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-1"
          >
            {filteredSkills.map((skill, index) => (
              <SkillCard key={skill.name} {...skill} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

const SkillCard = ({ name, icon, level, index }) => {
  const levelColors = {
    'Advanced': 'from-green-500/20 to-emerald-500/20 text-green-400',
    'Intermediate': 'from-yellow-500/20 to-orange-500/20 text-yellow-400',
    'Beginner': 'from-blue-500/20 to-cyan-500/20 text-blue-400'
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="group"
    >
      <GlassCard 
        className="text-center relative overflow-hidden"
        padding="p-6"
        height="h-auto"
      >
        {/* Background glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-accent-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Icon container */}
        <div className="relative flex items-center justify-center mb-4 h-16">
          <motion.div 
            className="relative"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-accent-500/20 rounded-xl blur-sm group-hover:blur-md transition-all duration-300"></div>
            <div className="relative bg-white/10 backdrop-blur-sm rounded-xl p-3 group-hover:bg-white/20 transition-all duration-300 border border-white/10 group-hover:border-primary-500/30">
              <img 
                src={icon} 
                alt={name} 
                className="h-10 w-10 transition-all duration-300 group-hover:scale-110 group-hover:brightness-125 drop-shadow-lg" 
              />
            </div>
          </motion.div>
        </div>

        {/* Skill name */}
        <h3 className="font-semibold transition-colors duration-300 group-hover:text-primary-300 text-base mb-2 relative z-10">
          {name}
        </h3>

        {/* Level badge */}
        <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${levelColors[level]} border border-current/20`}>
          <div className={`w-2 h-2 rounded-full mr-2 ${
            level === 'Advanced' ? 'bg-green-400' :
            level === 'Intermediate' ? 'bg-yellow-400' : 'bg-blue-400'
          }`}></div>
          {level}
        </div>

        {/* Hover effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-accent-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
      </GlassCard>
    </motion.div>
  );
};
