import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import FloatingCards from '../components/FloatingCards';
import SplitText from '../components/SplitText';

const handleAnimationComplete = () => {
  console.log('All letters have animated!');
};

const Home = () => {
  const navigateToChat = useNavigate();

  return (
    <div className="min-h-screen ">
      {/* Navbar */}
      <NavBar />

      {/* Hero Section */}
      <motion.div
        className="min-h-[60vh] mt-20 flex flex-col items-center justify-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <SplitText
          text="Confusion To Clarity"
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-purple-300 text-center"
          delay={100}
          duration={0.5}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-10px"
          textAlign="center"
          onLetterAnimationComplete={handleAnimationComplete}
        />
        <motion.p
          className="mt-6 text-lg sm:text-xl md:text-2xl text-blue-100/90 font-medium text-center max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          Your Personalized Skill and Career Advisor
        </motion.p>
      </motion.div>

      {/* Page Content */}
      <main className="py-12 px-4 md:px-8">
        <FloatingCards />
      </main>

      {/* Call to Action Button */}
      <motion.div
        className="flex justify-center pb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        <motion.button
          onClick={() => navigateToChat('/chat')}
          className="px-8 py-4 rounded-full bg-white/10 backdrop-blur-lg text-white font-semibold text-lg border border-white/20 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:shadow-blue-500/30 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-blue-900/20"
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          Get Started Now
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Home;