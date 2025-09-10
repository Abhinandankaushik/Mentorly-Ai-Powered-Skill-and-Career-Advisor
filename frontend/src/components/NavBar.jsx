import { useState } from 'react';
import { motion } from 'framer-motion';

const NavBar = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.nav
      className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[90%] md:w-[80%] max-w-6xl bg-white/5 backdrop-blur-lg text-white shadow-2xl rounded-3xl px-6 py-4 z-50 border border-slate-600/50  transition-all duration-300"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-between items-center">
        <a href="/" className="flex items-center space-x-3 group">
          <motion.img
            src="/weblogo.jpeg"
            alt="Mentorly Logo"
            className="h-12 w-12 object-cover rounded-full border-2 border-white/40 group-hover:border-white/60 transition-all duration-300"
            whileHover={{ scale: 1.1, rotate: 10 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className="text-2xl font-extrabold tracking-wide   transition-all duration-300"
            whileHover={{ scale: 1.05 }}
          >
            Mentorly
          </motion.span>
        </a>

        <div className="hidden md:flex space-x-6">
          {['Home', 'About', 'Services', 'Contact'].map((item) => (
            <a
              key={item}
              href={`/${item.toLowerCase()}`}
              className="relative hover:scale-105 active:scale-95 text-lg font-medium hover:text-blue-200 transition-colors duration-300 group"
            >
              {item}
              <span
                className={`absolute left-0 bottom-0 w-full h-0.5 bg-blue-200 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ${
                  isHovered ? 'scale-x-100' : ''
                }`}
              ></span>
            </a>
          ))}
        </div>

        <motion.button
          className="md:hidden text-white focus:outline-none"
          whileTap={{ scale: 0.9 }}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </motion.button>
      </div>
    </motion.nav>
  );
};

export default NavBar;