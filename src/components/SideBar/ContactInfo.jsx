import { Mail, MapPin, Phone } from 'lucide-react';

export const ContactInfo = () => (
  <div className="space-y-4">
    <ContactItem
      title="Email"
      content="baghelmilendrakumar@gmail.com"
      href="mailto:baghelmilendrakumar@gmail.com"
      icon={Mail}
    />
    <ContactItem
      title="Phone"
      content="+91 98765 43210"
      href="tel:+919876543210"
      icon={Phone}
    />
    <ContactItem
      title="Location"
      content="Seoni, Madhya Pradesh, INDIA"
      icon={MapPin}
    />
  </div>
);

const ContactItem = ({ title, content, href, icon: Icon }) => {
  return (
    <div className="flex items-center gap-4 group">
      <div className="bg-primary-500/20 w-10 h-10 rounded-xl flex items-center justify-center group-hover:bg-primary-500/30 transition-all duration-300">
        <Icon className="w-5 h-5 text-primary-400" />
      </div>
      <div>
        <p className="text-gray-400 text-xs uppercase font-medium tracking-wider">{title}</p>
        {href ? (
          <a 
            href={href} 
            className="text-white text-sm hover:text-primary-300 transition-colors duration-300"
          >
            {content}
          </a>
        ) : (
          <p className="text-white text-sm">{content}</p>
        )}
      </div>
    </div>
  );
};
