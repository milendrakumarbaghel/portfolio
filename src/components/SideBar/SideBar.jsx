import { useState } from 'react';
import { ContactInfo } from './ContactInfo';
import { SocialLinks } from './SocialLinks';
import { ExpandButton } from './ExpandButton';

export const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <aside className="glass-card p-8 relative">
      <div className={`transition-all duration-500 ease-in-out overflow-hidden
        ${isExpanded ? 'max-h-[800px]' : 'max-h-[180px] lg:max-h-full'}`}>

        <div className="flex items-center gap-4 lg:flex-col">
          <div className="relative">
            <div className="bg-gradient-to-br from-primary-500/20 to-accent-500/20 rounded-2xl p-2
              transform transition-transform duration-300 hover:scale-105">
              <img
                src="/images/p2.png"
                alt="Profile"
                className="w-[100px] h-[100px] lg:w-[150px] lg:h-[175px] rounded-xl
                object-cover transition-all duration-300 hover:rounded-lg"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&q=80';
                }}
              />
            </div>
            {/* Floating glow effect */}
            <div className="absolute -inset-2 bg-gradient-to-r from-primary-500/20 to-accent-500/20 rounded-2xl blur-xl opacity-0 hover:opacity-100 transition-opacity duration-300 -z-10"></div>
          </div>

          <div className="text-center">
            <h1 className="text-white text-xl font-bold mb-2">Milendra Kumar Baghel</h1>
            <span className="glass-button text-white text-xs px-4 py-2 rounded-xl font-medium
              transform transition-all duration-300 hover:scale-110">
              Full-Stack Developer
            </span>
          </div>
        </div>

        <div className={`transition-all duration-500 ${isExpanded ? 'opacity-100' : 'opacity-0 lg:opacity-100'}`}>
          <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-6" />
          <ContactInfo />
          <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-6" />
          <SocialLinks />
        </div>
      </div>

      <div className="lg:hidden">
        <ExpandButton
          isExpanded={isExpanded}
          onClick={() => setIsExpanded(!isExpanded)}
        />
      </div>
    </aside>
  );
};
