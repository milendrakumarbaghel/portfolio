import React from 'react';
import { motion } from 'framer-motion';

export const GlassCard = ({ 
  children, 
  className = '', 
  hover = true, 
  padding = 'p-6',
  height = 'h-full',
  onClick,
  delay = 0,
  ...props 
}) => {
  const baseClasses = `glass-card ${padding} ${height} transition-all duration-300 ${className}`;
  const hoverClasses = hover ? 'card-hover' : '';
  
  const MotionComponent = motion.div;
  
  return (
    <MotionComponent
      className={`${baseClasses} ${hoverClasses}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={hover ? { scale: 1.02 } : {}}
      onClick={onClick}
      {...props}
    >
      {children}
    </MotionComponent>
  );
};
