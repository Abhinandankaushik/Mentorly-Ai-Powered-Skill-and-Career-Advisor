import React, { useEffect, useRef, useState } from 'react'
import PromptBox from './PromptBox';
import Response from './Response';
import Loader from './Loader';
import generateResponse from '../../utils/Generate'
import "../css/style.css"
import {v4 as uuidv4} from "uuid";
import Features from './features';
function Chat({prompts}) {
    const [responses, setResponses] = useState([]);
    const bottomScroll = useRef(null);
    const [firstRender,setFirstRender] = useState(true);
    let count = 0;
    let career = "";
    if(responses.length > 0){
        career = responses[responses.length - 1].name;
    }
    useEffect(()=>{
        if(firstRender){
            setFirstRender(false);
        }
        else if(prompts.length !== responses.length) {
            async function getData(){
                console.log("done",count++);
                let res = await generateResponse(prompts[prompts.length - 1]);
                setResponses(prev => [...prev,res]);
                firstRender.current?.scrollIntoView({ behavior: "smooth" });
            }
            getData();
        }
    },[prompts]);
    return (
        <div ref={bottomScroll} className='max-w-xl overflow-scroll h-145 flex-col p-2 pb-0 gap-2 border-green-500 border-2 no-scrollbar  overflow-y-auto rounded-2xl relative'>
            {
                responses.map((response,index)=>{
                    return(
                        <>
                            <PromptBox prompt={prompts[index]}/>
                            <Response response={response} />
                        </>
                    )
                })
            }
            {prompts.length !== responses.length && <PromptBox prompt={prompts[prompts.length - 1]} />}
            {prompts.length !== responses.length && <Loader /> }
            <Features career={career}/>
        </div>
    )
}

export default Chat;