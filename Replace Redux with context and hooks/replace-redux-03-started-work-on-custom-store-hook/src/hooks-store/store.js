import { useState,useEffect } from "react";

let globalState={};
let listeners=[];
let actions={};

const useStore=()=>{
    const setState=useState(globalState)[1];
    
}