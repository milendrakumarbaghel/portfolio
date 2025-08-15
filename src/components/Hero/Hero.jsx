import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Mail, Download, Github, Linkedin, Twitter } from 'lucide-react';

export const Hero = () => {
  const navigate = useNavigate();
  const [currentText, setCurrentText] = useState(0);
  const texts = [
    "Full-Stack Developer",
    "UI/UX Enthusiast",
    "Problem Solver",
    "Creative Coder"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % texts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [texts.length]);

  const scrollToProjects = () => {
    navigate('/projects');
  };

  const scrollToContact = () => {
    navigate('/contact');
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 via-accent-500/20 to-primary-600/20 animate-gradient"></div>

      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30px_30px,rgba(255,255,255,0.05)_2px,transparent_0)] bg-[length:60px_60px] opacity-30"></div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary-400/30 rounded-full"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: i * 1.5,
            }}
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Greeting */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4"
        >
          <span className="text-lg md:text-xl font-medium text-primary-300">
            Hello, I'm
          </span>
        </motion.div>

        {/* Main Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl lg:text-3xl font-bold mb-6"
        >
          <span className="gradient-text">Milendra Kumar</span>
          <br />
          <span className="text-white">Baghel</span>
        </motion.h1>

        {/* Animated Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-8"
        >
          <div className="text-xl md:text-2xl lg:text-3xl text-gray-300 font-light h-8 md:h-10 flex items-center justify-center">
            <motion.span
              key={currentText}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="gradient-text"
            >
              {texts[currentText]}
            </motion.span>
          </div>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          Crafting digital experiences with modern technologies.
          Passionate about creating beautiful, functional, and user-centric applications.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          <button
            onClick={scrollToProjects}
            className="group glass-button px-8 py-4 rounded-2xl text-white font-semibold text-lg flex items-center gap-3 hover:scale-105 transition-all duration-300"
          >
            <span>View Projects</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>

          <button
            onClick={scrollToContact}
            className="group glass px-8 py-4 rounded-2xl text-white font-semibold text-lg flex items-center gap-3 hover:scale-105 transition-all duration-300 border-primary-500/30 hover:border-primary-400/50"
          >
            <Mail className="w-5 h-5" />
            <span>Contact Me</span>
          </button>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="flex justify-center gap-4 mb-8"
        >
          <a
            href="https://github.com/milendrakumarbaghel"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 glass-card rounded-xl hover:scale-110 transition-all duration-300 group"
          >
            <Github className="w-6 h-6 text-gray-300 group-hover:text-primary-400 transition-colors duration-300" />
          </a>
          <a
            href="https://linkedin.com/in/milendra-kumar-baghel"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 glass-card rounded-xl hover:scale-110 transition-all duration-300 group"
          >
            <Linkedin className="w-6 h-6 text-gray-300 group-hover:text-primary-400 transition-colors duration-300" />
          </a>
          <a
            href="https://twitter.com/milendrabaghel"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 glass-card rounded-xl hover:scale-110 transition-all duration-300 group"
          >
            <Twitter className="w-6 h-6 text-gray-300 group-hover:text-primary-400 transition-colors duration-300" />
          </a>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="grid grid-cols-3 gap-8 max-w-md mx-auto"
        >
          <div className="text-center">
            <div className="text-2xl font-bold gradient-text">3+</div>
            <div className="text-sm text-gray-400">Years Experience</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold gradient-text">20+</div>
            <div className="text-sm text-gray-400">Projects</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold gradient-text">15+</div>
            <div className="text-sm text-gray-400">Technologies</div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-primary-400/50 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-primary-400 rounded-full mt-2"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};
