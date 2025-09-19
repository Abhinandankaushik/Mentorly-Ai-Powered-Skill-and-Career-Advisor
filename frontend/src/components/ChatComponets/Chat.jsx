import React, { useEffect, useRef, useState } from 'react'
import PromptBox from './PromptBox';
import Response from './Response';
import Loader from './Loader';
import generateResponse from '../../utils/Generate'
import "../css/style.css"
import Features from './features';
function Chat({prompts}) {
    const [responses, setResponses] = useState([]);
    const bottomScroll = useRef(null);
    let count = 0;
    let career = "";
    let searchPrompt = "";

    if(responses.length > 0){
        career = responses[responses.length - 1].name;
        searchPrompt = responses[responses.length - 1].searchPrompt;
    }
    useEffect(()=>{

         if(prompts.length !== responses.length) {
            async function getData(){
                console.log("done",count++);
                let res = await generateResponse(prompts[prompts.length - 1]);
                setResponses(prev => [...prev,res]);
                // firstRender.current?.scrollIntoView({ behavior: "smooth" });
            }
            getData();
        }
    },[prompts]);
    return (
        <div className='flex-col h-150 max-w-xl'>
            <div ref={bottomScroll} className='w-full overflow-scroll h-145 mb-14 flex-col p-2 pb-0 gap-2 border-black border-2 no-scrollbar  overflow-y-auto rounded-2xl relative'>
                {
                    responses.map((response,index)=>{
                        return(
                            <>
                                <PromptBox prompt={prompts[index]}/>
                                <Response response={response} />
                            </>
                        );
                    })
                }
                {prompts.length !== responses.length && <PromptBox prompt={prompts[prompts.length - 1]} />}
                {prompts.length !== responses.length && <Loader /> }
            </div>
            <Features career={career} searchPrompt={searchPrompt} disable={prompts.length !== responses.length}/> 
        </div>
        
    )
}

export default Chat;