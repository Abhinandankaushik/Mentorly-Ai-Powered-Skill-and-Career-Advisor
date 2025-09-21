import React, { useEffect, useRef, useState } from 'react'
import PromptBox from './PromptBox';
import Response from './Response';
import Loader from './Loader';
import generateResponse from '../../utils/Generate'
import "../css/style.css"
import Features from './Features';
import useStore from '../../store/responsestore';
function Chat() {
    const { response, questions, addResponse} = useStore();
    const bottomScroll = useRef(null);
    let count = 0;
    let career = "";
    let searchPrompt = "";

    if(response.length > 0){
        career = response[response.length - 1].name;
        searchPrompt = response[response.length - 1].searchPrompt;
    }
    useEffect(()=>{

         if(questions.length !== response.length) {
            async function getData(){
                console.log("done",count++);
                let res = await generateResponse(questions[questions.length - 1]);
                addResponse(res);
                console.log(questions);
                console.log(response)
                // firstRender.current?.scrollIntoView({ behavior: "smooth" });
            }
            getData();
        }
    },[questions]);
    return (
        <div className='flex-col h-150 max-w-xl'>
            <div ref={bottomScroll} className='w-full overflow-scroll h-145 mb-19 flex-col p-2 pb-0 gap-2 border-black border-2 no-scrollbar  overflow-y-auto rounded-2xl relative'>
                {
                    response.map((res,index)=>{
                        return(
                            <>
                                <PromptBox prompt={questions[index]}/>
                                <Response response={res} />
                            </>
                        );
                    })
                }
                {questions.length !== response.length && <PromptBox prompt={questions[questions.length - 1]} />}
                {questions.length !== response.length && <Loader /> }
            </div>
            <Features career={career} searchPrompt={searchPrompt} disable={response.length !== questions.length}/> 
        </div>
        
    )
}

export default Chat;