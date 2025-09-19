import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import FloatingCards from '../components/Home/FloatingCards';
import SplitText from '../components/SplitText';
import HeroSection from '../components/Home/HeroSection';

const handleAnimationComplete = () => {
  console.log('All letters have animated!');
};

const Home = () => {
  const navigateToChat = useNavigate();

  return (
    <div className="min-h-screen  bg-white">
      {/* Navbar */}
      <NavBar/>

      {/* Hero Section */}
      <HeroSection/>

      {/* Page Content */}
      <div className='w-full h-96 bg-white flex-col text-center pageContent'>
        <div className='text-5xl font-extrabold text-gray-700'>Trending Career Searches</div>
        <main className="py-10 px-4 md:px-8">
          <FloatingCards />
        </main>
      </div>

      {/* Call to Action Button */}
      <button className='getStartedBtn mt-36  p-4 bg-black rounded-4xl mb-16 text-white text-xl font-bold cursor-pointer' onClick={()=>navigateToChat('/chat')}>Get Start</button>
    </div>
  );
};

export default Home;