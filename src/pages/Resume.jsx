import { motion } from 'framer-motion';
import { Download } from 'lucide-react';

export const Resume = () => {
  return (
    <article>
      <h2 className="text-3xl text-white font-semibold mb-8 pb-2 border-b-2 border-[#ffd700] w-fit">
        Resume
      </h2>

      <div className="flex justify-center items-center h-[calc(100vh-200px)]">
        <motion.button
          onClick={() => window.open('./assets/resume.pdf')}
          className="group relative px-8 py-4 text-lg bg-[#2b2b2b] text-[#ffd700]
            rounded-xl overflow-hidden transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ y: [0, 3, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Download className="w-5 h-5" />
            </motion.div>
            <span>Download Resume</span>
          </div>
          <motion.div
            className="absolute inset-0 border-2 border-[#ffd700] rounded-xl"
            initial={{ opacity: 0, scale: 0.9 }}
            whileHover={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          />
        </motion.button>
      </div>
    </article>
  );
};
