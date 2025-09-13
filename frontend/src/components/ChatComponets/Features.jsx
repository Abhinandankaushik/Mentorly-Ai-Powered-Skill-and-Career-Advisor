import React from 'react'
import { useNavigate } from 'react-router-dom';

function Features({career,searchPrompt}) {
  const Navigate = useNavigate();
  function handleRoadmap(){
    career = career.replace(/ /g, "+");
    Navigate(`/roadmap/${career}`);
  }
  function realityCheck(){
    career = career.replace(/ /g, "+");
    Navigate(`/analytics/${career}`);
    console.log(career)
  }
   
  (()=>(searchPrompt = searchPrompt.replace(/ /g,'%20')))

  return (
    <div className='p-4 w-full cursor-pointer py-6 flex justify-around items-center bg-green-300 bottom-0 sticky'>
        <button className='p-4 rounded-2xl bg-amber-400 outline-none cursor-pointer hover:scale-105 active:scale-95' onClick={handleRoadmap}>Roadmap</button>
        <button className='p-4 rounded-2xl bg-amber-400 outline-none cursor-pointer hover:scale-105 active:scale-95'onClick={realityCheck} >Reality Check</button>
        <button onClick={()=>Navigate(`/get-your-tutor/${searchPrompt}`)} className='hover:scale-105 active:scale-95 p-4 rounded-2xl bg-amber-400 outline-none cursor-pointer' >Get Tutor</button>
    </div>
  )
}

export default Features