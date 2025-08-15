import { motion } from 'framer-motion';
import { Download, ExternalLink, FileText, Eye, ArrowDown } from 'lucide-react';
import { GlassCard } from '../components/Cards/GlassCard';

export const Resume = () => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/Resume.pdf';
    link.download = 'Milendra_Kumar_Baghel_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="h-full flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-4"
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-1">
          <span className="gradient-text">Resume</span>
        </h2>
        <p className="text-sm md:text-base text-gray-400">
          View and download my professional experience and skills
        </p>
      </motion.div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4 min-h-0">
        {/* PDF Preview - Takes 2/3 of the space */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-2 h-full min-h-0"
        >
          <GlassCard className="h-full p-0 overflow-hidden relative group">
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-r from-dark-900/90 to-dark-800/90 backdrop-blur-sm p-2 border-b border-white/10">
              <div className="flex items-center gap-2 text-xs text-gray-300">
                <FileText className="w-3 h-3" />
                <span>Resume Preview</span>
                <div className="flex gap-1 ml-auto">
                  <div className="w-2 h-2 rounded-full bg-red-500/60"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-500/60"></div>
                  <div className="w-2 h-2 rounded-full bg-green-500/60"></div>
                </div>
              </div>
            </div>

            {/* PDF Container */}
            <div className="h-full pt-8">
              <iframe
                src="/Resume.pdf#view=FitH"
                title="Resume Preview"
                className="w-full h-full rounded-b-2xl"
              />
            </div>

            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </GlassCard>
        </motion.div>

        {/* Download Section - Takes 1/3 of the space */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="h-full flex flex-col gap-4 min-h-0"
        >
          {/* Download Card */}
          <GlassCard className="flex-1 p-4">
            <div className="h-full flex flex-col justify-center items-center text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="mb-4"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500/20 to-accent-500/20 rounded-xl flex items-center justify-center mb-3 mx-auto">
                  <FileText className="w-8 h-8 text-primary-400" />
                </div>
              </motion.div>

              <h3 className="text-lg font-semibold mb-1 text-white">Download Resume</h3>
              <p className="text-gray-400 mb-4 text-xs">
                Get a copy of my resume in PDF format
              </p>

              <motion.button
                onClick={handleDownload}
                className="group relative w-full px-4 py-3 glass-button rounded-xl overflow-hidden transition-all duration-300 mb-3"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-center gap-2">
                  <motion.div
                    animate={{ y: [0, 2, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <Download className="w-4 h-4" />
                  </motion.div>
                  <span className="font-medium text-sm">Download PDF</span>
                </div>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-accent-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '0%' }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>

              <motion.a
                href="/Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-primary-300 hover:text-primary-200 transition-colors duration-300 text-xs"
                whileHover={{ x: 2 }}
              >
                <Eye className="w-3 h-3" />
                <span>Open in new tab</span>
                <ExternalLink className="w-2 h-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.a>
            </div>
          </GlassCard>

          {/* Quick Stats */}
          <GlassCard className="p-3">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <ArrowDown className="w-3 h-3 text-primary-400" />
                <span className="text-xs font-medium text-gray-300">Last Updated</span>
              </div>
              <div className="text-xs text-gray-400">
                {new Date().toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
};
