import { Mail, MapPin } from 'lucide-react';

export const ContactInfo = () => (
  <div className="space-y-4">
    <ContactItem
      title="Email"
      content="baghelmilendrakumar@gmail.com"
      href="mailto:baghelmilendrakumar@gmail.com"
    />
    <ContactItem
      title="Location"
      content="Seoni, Madhya Pradesh, INDIA"
    />
  </div>
);

const ContactItem = ({ title, content, href }) => {
  const Icon = title === 'Email' ? Mail : title === 'Location' ? MapPin : null;

  return (
    <div className="flex items-center gap-4">
      <div className="bg-[#2b2b2b] w-8 h-8 rounded-lg flex items-center justify-center">
        {Icon && <Icon className="w-4 h-4 text-[#ffd700]" />}
      </div>
      <div>
        <p className="text-gray-400 text-xs uppercase">{title}</p>
        {href ? (
          <a href={href} className="text-white text-sm">{content}</a>
        ) : (
          <p className="text-white text-sm">{content}</p>
        )}
      </div>
    </div>
  );
};
