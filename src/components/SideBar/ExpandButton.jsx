import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export const ExpandButton = ({ isExpanded, onClick }) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={`absolute top-4 right-4 bg-[#2b2b2b] text-[#ffd700] px-4 py-2
    transition-all duration-300 hover:bg-[#363636]
    ${isExpanded ? 'rounded-bl-xl' : 'rounded-tr-xl'}`}
  >
    <div className="flex items-center gap-2">
      <span>{isExpanded ? 'Show Less' : 'Show More'}</span>
      <motion.div
        animate={{ rotate: isExpanded ? 180 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <ChevronDown className="w-4 h-4" />
      </motion.div>
    </div>
  </motion.button>
);
