import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function Accordion({phase}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  function handleClick(){
    
  }

  return (
    <div className="border border-green-200 rounded-lg overflow-hidden  mb-2">
        {/* Accordion Header */}
        <div
            onClick={toggleAccordion}
            className="bg-green-100 hover:bg-green-200 transition-colors duration-300 cursor-pointer p-4 flex justify-between items-center"
        >
            <h3 className="text-lg font-semibold text-green-800">
            {phase.title}
            </h3>
            <ChevronDown
            className={`w-5 h-5 text-green-700 transition-transform duration-300 ${
                isOpen ? 'rotate-180' : ''
            }`}
            />
        </div>

        {/* Accordion Content */}
        <div
            className={`bg-white transition-all duration-500 ease-in-out overflow-hidden ${
            isOpen ? 'max-h-500px opacity-100' : 'max-h-0 opacity-0'
            }`}
        >
            <div className="p-4 text-gray-700 leading-relaxed">
                <p className="mb-4">
                    {phase.phaseDescription}
                </p>
                
                <h4 className="font-semibold text-gray-800 mb-3">Steps:</h4>
                
                <ul className="space-y-2 mb-4">
                    {phase.steps.map((step)=>{
                        return(
                            <li className="flex items-start">
                                <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                <span>{step}</span>
                            </li>
                        )
                    })}
                </ul>
                <button className='bg-blue-500 hover:bg-blue-600 border-none cursor-pointer text-white shadow-lg shadow-cyan-500/50 p-3 rounded-3xl ' onClick={handleClick}>Get your tutor</button>
            </div>
        </div>
    </div>
  );
}