import { AppRoutes } from '../../routes';
import { Navigation } from '../Navigation/Navigation';

export const MainContent = () => {
  return (
    <div className="flex-1">
      <Navigation />
      <div className="bg-[#1e1e1e] rounded-[20px] p-8 min-h-[calc(100vh-180px)]">
        <AppRoutes />
      </div>
    </div>
  );
};
