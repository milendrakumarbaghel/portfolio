import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, Phone, MapPin, Github, Linkedin, Twitter, Instagram } from 'lucide-react';

export const Contact = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    subject: '',
    message: '',
  });

  const [focused, setFocused] = useState({
    fullname: false,
    email: false,
    subject: false,
    message: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Implement email sending logic here
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFocus = (field) => {
    setFocused(prev => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field) => {
    setFocused(prev => ({ ...prev, [field]: false }));
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'baghelmilendrakumar@gmail.com',
      link: 'mailto:baghelmilendrakumar@gmail.com'
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+91 8989828591',
      link: 'tel:+918989828591'
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Seoni, Madhya Pradesh, India',
      link: '#'
    }
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/milendrakumarbaghel', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/milendra-kumar-baghel', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com/milendrabaghel', label: 'Twitter' },
    { icon: Instagram, href: 'https://instagram.com/milendrabaghel', label: 'Instagram' }
  ];

  return (
    <div className="h-full flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-6"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-2">
          <span className="gradient-text">Contact</span>
        </h2>
        <p className="text-lg text-gray-400">
          Let's work together! Get in touch for collaborations or just to say hello.
        </p>
      </motion.div>

      <div className="flex-1 grid lg:grid-cols-2 gap-6">
        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h3 className="text-xl font-bold text-white mb-4">Get in Touch</h3>

          <div className="space-y-4 mb-6">
            {contactInfo.map((info, index) => (
              <motion.a
                key={info.title}
                href={info.link}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                className="flex items-center gap-3 p-3 glass-card rounded-xl hover:scale-105 transition-all duration-300 group"
              >
                <div className="p-2 bg-primary-500/20 rounded-lg group-hover:bg-primary-500/30 transition-colors duration-300">
                  <info.icon className="w-5 h-5 text-primary-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm">{info.title}</h4>
                  <p className="text-gray-400 text-xs">{info.value}</p>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-3">Follow Me</h4>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  className="p-3 glass-card rounded-xl hover:glow transition-all duration-300"
                >
                  <social.icon className="w-5 h-5 text-gray-300 hover:text-primary-400 transition-colors duration-300" />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h3 className="text-xl font-bold text-white mb-4">Send Message</h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="relative">
                <input
                  type="text"
                  name="fullname"
                  required
                  value={formData.fullname}
                  onChange={handleChange}
                  onFocus={() => handleFocus('fullname')}
                  onBlur={() => handleBlur('fullname')}
                  className="w-full bg-transparent text-white border border-white/20 rounded-xl px-4 py-3 focus:border-primary-500 focus-ring outline-none transition-all duration-300 text-sm"
                />
                <label className={`absolute left-4 transition-all duration-300 ${
                  focused.fullname || formData.fullname
                    ? 'top-1 text-xs text-primary-400'
                    : 'top-3 text-gray-400 text-sm'
                }`}>
                  Full Name
                </label>
              </div>

              {/* Email */}
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => handleFocus('email')}
                  onBlur={() => handleBlur('email')}
                  className="w-full bg-transparent text-white border border-white/20 rounded-xl px-4 py-3 focus:border-primary-500 focus-ring outline-none transition-all duration-300 text-sm"
                />
                <label className={`absolute left-4 transition-all duration-300 ${
                  focused.email || formData.email
                    ? 'top-1 text-xs text-primary-400'
                    : 'top-3 text-gray-400 text-sm'
                }`}>
                  Email Address
                </label>
              </div>
            </div>

            {/* Subject */}
            <div className="relative">
              <input
                type="text"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                onFocus={() => handleFocus('subject')}
                onBlur={() => handleBlur('subject')}
                className="w-full bg-transparent text-white border border-white/20 rounded-xl px-4 py-3 focus:border-primary-500 focus-ring outline-none transition-all duration-300 text-sm"
              />
              <label className={`absolute left-4 transition-all duration-300 ${
                focused.subject || formData.subject
                  ? 'top-1 text-xs text-primary-400'
                  : 'top-3 text-gray-400 text-sm'
              }`}>
                Subject
              </label>
            </div>

            {/* Message */}
            <div className="relative">
              <textarea
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
                onFocus={() => handleFocus('message')}
                onBlur={() => handleBlur('message')}
                rows={4}
                className="w-full bg-transparent text-white border border-white/20 rounded-xl px-4 py-3 focus:border-primary-500 focus-ring outline-none resize-none transition-all duration-300 text-sm"
              />
              <label className={`absolute left-4 transition-all duration-300 ${
                focused.message || formData.message
                  ? 'top-1 text-xs text-primary-400'
                  : 'top-3 text-gray-400 text-sm'
              }`}>
                Your Message
              </label>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full glass-button py-3 rounded-xl text-white font-semibold flex items-center justify-center gap-2 hover:scale-105 transition-all duration-300"
            >
              <Send className="w-4 h-4" />
              <span>Send Message</span>
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};
