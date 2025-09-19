import React from 'react'
import { useNavigate } from 'react-router-dom';

function Features({career,searchPrompt, disable}) {
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
    <div className='p-4 w-full cursor-pointer rounded-2xl py-4 flex justify-around items-center bg-white border-2 border-black'>
        <button className= {` p-3 ${disable?"bg-gray-500 cursor-not-allowed":"bg-black cursor-pointer"} rounded-2xl  outline-none text-white   `} onClick={handleRoadmap}>Flowchart</button>
        <button className={`p-3 rounded-2xl ${disable?"bg-gray-500 cursor-not-allowed":"bg-black cursor-pointer"} outline-none text-white  `} onClick={realityCheck} >Statistics</button>
        <button onClick={()=>Navigate(`/get-your-tutor/${searchPrompt}`)} className={` p-3 ${disable?"bg-gray-500 cursor-not-allowed":"bg-black cursor-pointer"} rounded-2xl  text-white outline-none`} >Get Tutor</button>
    </div>
  )
}

export default Features