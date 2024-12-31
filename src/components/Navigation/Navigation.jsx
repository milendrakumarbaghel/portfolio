import { NavItem } from './NavItem';
import { navigationItems } from './navigationItems';

export const Navigation = () => (
  <nav className="bg-[#2b2b2b]/75 backdrop-blur border border-[#2b2b2b] rounded-3xl mb-2 fixed bottom-0 left-0 w-full lg:w-auto lg:static z-50">
    <ul className="flex justify-center items-center gap-5 p-5">
      {navigationItems.map((item) => (
        <NavItem key={item} item={item} />
      ))}
    </ul>
  </nav>
);
