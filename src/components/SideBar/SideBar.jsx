import { useState } from 'react';
import { ContactInfo } from './ContactInfo';
import { SocialLinks } from './SocialLinks';
import { ExpandButton } from './ExpandButton';

export const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <aside className="bg-[#1e1e1e] rounded-[20px] p-8 relative">
      <div className={`transition-all duration-500 ease-in-out overflow-hidden
        ${isExpanded ? 'max-h-[800px]' : 'max-h-[180px] lg:max-h-full'}`}>

        <div className="flex items-center gap-4 lg:flex-col">
          <div className="bg-gradient-to-br from-[#404040] to-[#303030] rounded-[20px] p-1
            transform transition-transform duration-300 hover:scale-105">
            <img
              src="/images/p2.png"
              alt="Profile"
              className="w-[80px] h-[80px] lg:w-[150px] lg:h-[150px] rounded-[15px] object-cover
              transition-all duration-300 hover:rounded-[5px]"
            />
          </div>

          <div className="text-center">
            <h1 className="text-white text-xl font-medium mb-2">Milendra Kumar Baghel</h1>
            <span className="bg-[#2b2b2b] text-white text-xs px-3 py-1 rounded-lg
              transform transition-all duration-300 hover:scale-110 hover:bg-[#363636]">
              Web Developer
            </span>
          </div>
        </div>

        <div className={`transition-all duration-500 ${isExpanded ? 'opacity-100' : 'opacity-0 lg:opacity-100'}`}>
          <div className="h-px bg-[#2b2b2b] my-6" />
          <ContactInfo />
          <div className="h-px bg-[#2b2b2b] my-6" />
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
