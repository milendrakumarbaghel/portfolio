import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

export const NavItem = ({ item }) => (
  <motion.li
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <NavLink
      to={item === 'About' ? '/' : `/${item.toLowerCase()}`}
      className={({ isActive }) =>
        `text-sm relative px-3 py-2 transition-all duration-300
        ${isActive ? 'text-[#ffd700]' : 'text-gray-300 hover:text-gray-400'}`
      }
    >
      {({ isActive }) => (
        <>
          {item}
          {isActive && (
            <motion.span
              layoutId="underline"
              className="absolute bottom-0 left-0 w-full h-0.5 bg-[#ffd700]"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </>
      )}
    </NavLink>
  </motion.li>
);
