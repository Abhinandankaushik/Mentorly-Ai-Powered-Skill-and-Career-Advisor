import React from 'react'
import NavBar from '../NavBar'
function HeroSection() {
  return (
    <div className='w-full h-130 flex justify-between items-center bg-white hero'>
      <div className='flex flex-col h-120 heroSection bg-white justify-center items-start p-10'>
        <div className='text-8xl font-bold text-black'>From <span className='text-orange-400'>Confusion</span></div>
        <div className='text-8xl font-bold text-orange-400'>To <span className='text-black'>Clarity</span></div>
        <div className='text-8xl font-bold text-black'>Mento<span className='text-orange-400'>r</span>ly</div>
        <div className='text-xl text-black'>AI powered <span className='text-orange-400'>Career</span> & <span className='text-orange-400'>Skill</span> advisor</div>
      </div>
      <div className='h-120 heroSection object-contain heroImg'>
        <img src="/HeroSection.jpeg" alt="" className='w-full h-130'/>
      </div>
    </div>
  )
}

export default HeroSection