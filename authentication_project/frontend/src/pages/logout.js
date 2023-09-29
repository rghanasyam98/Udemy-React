import { redirect } from "react-router-dom";

export function action(){
    console.log("logout action");
    localStorage.removeItem('token');
    return redirect('/');
}

