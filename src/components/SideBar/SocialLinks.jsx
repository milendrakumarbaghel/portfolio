import { Github, Twitter, Linkedin, Instagram } from 'lucide-react';

const socialLinks = [
  { icon: Github, href: 'https://github.com/milendrakumarbaghel', label: 'GitHub' },
  { icon: Twitter, href: 'https://x.com/milendrabaghel', label: 'Twitter' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/milendra-kumar-baghel/', label: 'LinkedIn' },
  { icon: Instagram, href: 'https://instagram.com/milendrabaghel', label: 'Instagram' }
];

export const SocialLinks = () => (
  <div className="flex gap-3 justify-center">
    {socialLinks.map(({ icon: Icon, href, label }) => (
      <a
        key={href}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="p-3 bg-primary-500/20 rounded-xl hover:bg-primary-500/30 transition-all duration-300 group"
        title={label}
      >
        <Icon className="w-5 h-5 text-gray-300 group-hover:text-primary-400 transition-colors duration-300" />
      </a>
    ))}
  </div>
);
