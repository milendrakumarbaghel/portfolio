import { GlassCard } from './GlassCard';

export const ServiceCard = ({ icon: Icon, title, description }) => (
  <GlassCard className="flex flex-col group" height="h-auto">
    <div className="bg-primary-500/20 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary-500/30 transition-all duration-300">
      <Icon className="w-6 h-6 text-primary-400" />
    </div>
    <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-primary-300 transition-colors duration-300">
      {title}
    </h4>
    <p className="text-gray-400 text-sm leading-relaxed">
      {description}
    </p>
  </GlassCard>
);
