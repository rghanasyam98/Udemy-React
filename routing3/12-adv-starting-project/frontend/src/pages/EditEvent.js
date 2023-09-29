import { useRouteLoaderData } from "react-router-dom";
import EventForm from "../components/EventForm";



const EditEventPage=()=>{
    // this loader is also used in detail view page
    // if a loader fn is accessed by multiple routes then we need useRouteLoaderData with an id instead of userLoaderData 
    const data=useRouteLoaderData('event-detail');
    return(
        <EventForm method="PATCH" event={data.event} />
    );
}

export default EditEventPage;