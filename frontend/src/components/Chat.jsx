import React, { useEffect, useRef, useState } from 'react'
import PromptBox from './PromptBox';
import Response from './Response';
import Loader from './Loader';
import generateResponse from '../utils/Generate';
import "./css/style.css"
import {v4 as uuidv4} from "uuid";
function Chat({prompts}) {
    const [responses, setResponses] = useState([]);
    const bottomScroll = useRef(null);
    const [firstRender,setFirstRender] = useState(0);
    useEffect(()=>{
        async function getData(){
            let res = await generateResponse(prompts[prompts.length - 1]);
            setResponses([...responses,res]);
            firstRender.current?.scrollIntoView({ behavior: "smooth" });
        }
        getData();
    },[prompts]);
    return (
        <div ref={bottomScroll} className='max-w-xl overflow-scroll h-150 flex-col gap-2 border-green-500 border-2 no-scrollbar overflow-y-auto rounded-2xl'>
            {
                responses.map((response,index)=>{
                    return(
                        <>
                            <PromptBox key={uuidv4()} prompt={prompts[index]}/>
                            <Response key={uuidv4()} response={response} />
                        </>
                    )
                })
            }
            {prompts.length !== responses.length && <PromptBox key={uuidv4()} prompt={prompts[prompts.length - 1]} />}
            {prompts.length !== responses.length && <Loader key={uuidv4}/> }
        </div>
    )
}

export default Chat;