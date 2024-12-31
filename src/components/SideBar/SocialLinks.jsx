import { Github, Twitter, Linkedin } from 'lucide-react';

const socialLinks = [
  { icon: Github, href: 'https://github.com/milendrakumarbaghel' },
  { icon: Twitter, href: 'https://x.com/milendrabaghel' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/milendra-kumar-baghel/' }
];

export const SocialLinks = () => (
  <div className="flex gap-4 px-2">
    {socialLinks.map(({ icon: Icon, href }) => (
      <a key={href} href={href} target="_blank" rel="noopener noreferrer">
        <Icon className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
      </a>
    ))}
  </div>
);
