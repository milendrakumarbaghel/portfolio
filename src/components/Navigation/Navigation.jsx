import { NavItem } from './NavItem';
import { navigationItems } from './navigationItems';

export const Navigation = () => (
  <nav className="bg-[#2b2b2b]/75 backdrop-blur border border-[#2b2b2b] rounded-t-[20px] fixed bottom-0 left-0 w-full lg:w-auto lg:static lg:rounded-[20px_0_20px_0] z-50">
    <ul className="flex justify-center items-center gap-5 p-5">
      {navigationItems.map((item) => (
        <NavItem key={item} item={item} />
      ))}
    </ul>
  </nav>
);
