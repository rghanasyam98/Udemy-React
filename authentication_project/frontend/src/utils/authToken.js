 import { redirect } from "react-router-dom";
 
  export function getTokenExpiry(){
     const storedexpiration=localStorage.getItem('expiration');
     const expirationDate=new Date(storedexpiration);
     const now=new Date();
     const duration=expirationDate.getTime()-now.getTime();
     return duration;
 }
 
 const getToken=()=>{
    const token=localStorage.getItem('token');
    const tokenExpiry=getTokenExpiry();
    if(!token){
        return null;
    }
    // case of token expired
    if(tokenExpiry<0){
        return "EXPIRED";
    }
    return token;

}

export default getToken;

export function getTokenLoader(){
    return getToken();
}

// if we try to access route that graphically not possible but when types on search bar
// in that case if it need to be protected then check for token ,if no token then redirect
export function checkingForTokenLoader(){
    const token = getToken();
    if(!token){
        return redirect("/auth");
    }
}