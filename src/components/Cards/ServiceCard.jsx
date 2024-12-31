export const ServiceCard = ({ icon: Icon, title, description }) => (
    <div className="bg-gradient-to-br from-[#2b2b2b] to-[#1e1e1e] p-6 rounded-xl border border-[#2b2b2b]">
      <div className="bg-[#2b2b2b] w-12 h-12 rounded-lg flex items-center justify-center mb-4">
        <div className="text-[#ffd700]"><Icon /></div>
      </div>
      <h4 className="text-white text-lg font-medium mb-2">{title}</h4>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  );
