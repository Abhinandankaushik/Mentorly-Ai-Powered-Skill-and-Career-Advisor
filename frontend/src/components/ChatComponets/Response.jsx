import React from 'react'
import Accordion from './Accordion';

function Response({response}) {
  return (
    <div className='response max-w-xl p-4  flex-col  content-around bg-white border-green-100 rounded-2xl'>
        <div className='text-gray-700 p-4'>{response.description}</div>
        {response.phases.map((phase)=>{
            return(
               <Accordion phase={phase}/>
            )
        })}
    </div>
  )
}

export default Response;