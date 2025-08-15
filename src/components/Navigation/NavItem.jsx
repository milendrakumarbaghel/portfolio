import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

export const NavItem = ({ item }) => (
  <motion.li
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <NavLink
      to={item === 'About' ? '/about' : `/${item.toLowerCase()}`}
      className={({ isActive }) =>
        `text-sm font-medium px-4 py-2 rounded-xl transition-all duration-300 relative
        ${isActive
          ? 'glass-button text-white'
          : 'text-gray-300 hover:text-white hover:bg-white/10'
        }`
      }
    >
      {({ isActive }) => (
        <>
          {item}
          {isActive && (
            <motion.span
              layoutId="underline"
              className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-accent-500/20 rounded-xl -z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </>
      )}
    </NavLink>
  </motion.li>
);
