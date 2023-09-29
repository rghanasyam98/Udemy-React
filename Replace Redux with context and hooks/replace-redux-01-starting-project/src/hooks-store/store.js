import { useState,useEffect } from "react";

let globalState={};
let listeners=[];
let actions={};

export const useStore=()=>{
    const setState=useState(globalState)[1];

const dispatch=(actionIdentifier,payload)=>{
    const newState=actions[actionIdentifier](globalState,payload);
    globalState={...globalState,...newState};

    for(const listener of listeners){
        listener(globalState);
    }
}

    // this useEffect will execute only once
    useEffect(()=>{
       listeners.push(listeners);

    //    cleanup fn
       return ()=>{
            listeners=listeners.filter((li)=>li!==setState);
       }
    },[setState]);

    return [globalState,dispatch];
}

export const initStore=(userActions,initialState)=>{
    if(initialState){
        globalState={...globalState,...initialState};
    }
    actions={...actions,...userActions};
};