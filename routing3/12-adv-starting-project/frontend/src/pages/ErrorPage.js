import { useRouteError } from "react-router-dom";
import PageContent from "../components/PageContent";
import { Fragment } from "react";
import MainNavigation from "../components/MainNavigation";

function ErrorPage(){
    const error=useRouteError();//to access the error message paased when throwing an error

    //corresponds to  method 4
    let title="Error occured";
    let message="something went wrong";
    if(error.data.status===500){
        message=error.data.message;
    }
    if(error.status===404){
        title="not found";
        message="could not find the requested page"
    }



    // corresponds to method 3
    // const errorContent=JSON.parse(error.data);
    // let title="Error occured";
    // let message="something went wrong";
    // if(errorContent.status===500){
    //     message=errorContent.message;
    // }
    // if(error.status===404){
    //     title="not found";
    //     message="could not find the requested page"
    // }

    
    return <Fragment>
        <MainNavigation/>
        <main>
        <PageContent title={title}>
        <p>{message}</p>
        </PageContent>
        </main>
       </Fragment>
}
export default ErrorPage;