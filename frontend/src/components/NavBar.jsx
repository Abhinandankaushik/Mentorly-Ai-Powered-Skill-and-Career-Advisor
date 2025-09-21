import { useState } from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
const NavBar = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className=' h-16 top-0 w-full bg-gray-100 sticky navbar flex justify-between items-center border-b-black'>
      <div className='w-32 h-18 flex justify-around items-center '>
        <img src="/weblogo.jpeg" alt="" className='object-cover h-12 w-12'/>
        <span className='text-black font-bold text-3xl m-4'>Mento<span className='text-orange-500'>r</span>ly</span>
      </div>
      <div className='flex justify-around gap-5 content-center'>
        <div className={" hidden md:block"}> <NavLink to={"/"} className={({isActive})=>isActive? "text-orange-500":"text-black "}>Home</NavLink></div>
        <div className={" hidden md:block"}><NavLink to={"/testimonial"} className={({isActive})=>isActive? "text-orange-500":"text-black"}>Testimonial</NavLink></div>
        <div className={" hidden md:block"}><NavLink to={"/aboutUs"} className={({isActive})=>isActive? "text-orange-500":"text-black"}>About us</NavLink></div>
      </div>
      <div>
        <button className='btn1'>SignUp</button>
        <button className='btn2'>Login</button>
      </div>
    </div>
  );
};

export default NavBar;