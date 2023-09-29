import { useState } from "react";
import Output from "./Output";

const Greeting=()=>{
const [changeText,setChangeText]=useState(false);
function changeHandler(){
    setChangeText(true);
}

 return(
    <div>
        <h2>Hello world!</h2>
       {!changeText && <p>It's good to see you!</p>} 
       {/* if conditional rendering is removed test fails.button click cheytaal good to see you dont show   */}
      {/* <p>It's good to see you!</p> */}

       {changeText && <p>changed</p>} 

      <Output>some text</Output>

        <button onClick={changeHandler} >change</button>
    </div>
 )
}

export default Greeting;