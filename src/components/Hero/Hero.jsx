import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Mail, Github, Linkedin, Twitter } from 'lucide-react';

export const Hero = () => {
  const navigate = useNavigate();
  const [currentText, setCurrentText] = useState(0);
  const texts = [
    "Full-Stack Developer",
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
    <div className="h-full rounded-2xl flex items-center justify-center relative overflow-hidden">
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-accent-500/10 to-primary-600/10 animate-gradient"></div>

      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30px_30px,rgba(255,255,255,0.03)_2px,transparent_0)] bg-[length:60px_60px] opacity-30"></div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary-400/20 rounded-full"
            animate={{
              x: [0, 30, 0],
              y: [0, -30, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 4 + i * 2,
              repeat: Infinity,
              delay: i * 1.5,
            }}
            style={{
              left: `${25 + i * 25}%`,
              top: `${40 + i * 20}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        {/* Greeting */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-2"
        >
          <span className="text-sm md:text-base font-medium text-primary-300">
            Hello, I'm
          </span>
        </motion.div>

        {/* Main Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-2xl md:text-4xl lg:text-5xl font-bold mb-3"
        >
          <span className="gradient-text">Milendra Kumar Baghel</span>
          <br />
          <span className="text-white"></span>
        </motion.h1>

        {/* Animated Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-4"
        >
          <div className="text-base md:text-lg lg:text-xl text-gray-300 font-light h-5 md:h-6 flex items-center justify-center">
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
          className="text-sm md:text-base text-gray-400 mb-6 max-w-xl mx-auto leading-relaxed"
        >
          Crafting digital experiences with modern technologies.
          Passionate about creating beautiful, functional, and user-centric applications.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-6"
        >
          <button
            onClick={scrollToProjects}
            className="group glass-button px-5 py-2.5 rounded-lg text-white font-semibold text-sm flex items-center gap-2 hover:scale-105 transition-all duration-300"
          >
            <span>View Projects</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </button>

          <button
            onClick={scrollToContact}
            className="group glass px-5 py-2.5 rounded-lg text-white font-semibold text-sm flex items-center gap-2 hover:scale-105 transition-all duration-300 border-primary-500/30 hover:border-primary-400/50"
          >
            <Mail className="w-4 h-4" />
            <span>Contact Me</span>
          </button>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="flex justify-center gap-3"
        >
          <a
            href="https://github.com/milendrakumarbaghel"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 glass-card rounded-lg hover:scale-110 transition-all duration-300 group"
          >
            <Github className="w-4 h-4 text-gray-300 group-hover:text-primary-400 transition-colors duration-300" />
          </a>
          <a
            href="https://linkedin.com/in/milendra-kumar-baghel"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 glass-card rounded-lg hover:scale-110 transition-all duration-300 group"
          >
            <Linkedin className="w-4 h-4 text-gray-300 group-hover:text-primary-400 transition-colors duration-300" />
          </a>
          <a
            href="https://twitter.com/milendrabaghel"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 glass-card rounded-lg hover:scale-110 transition-all duration-300 group"
          >
            <Twitter className="w-4 h-4 text-gray-300 group-hover:text-primary-400 transition-colors duration-300" />
          </a>
        </motion.div>
      </div>
    </div>
  );
};
