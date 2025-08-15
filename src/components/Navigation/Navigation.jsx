import { NavItem } from './NavItem';
import { navigationItems } from './navigationItems';

export const Navigation = () => (
  <nav className="glass mb-6 rounded-2xl p-4">
    <ul className="flex justify-center items-center gap-2">
      {navigationItems.map((item) => (
        <NavItem key={item} item={item} />
      ))}
    </ul>
  </nav>
);
