import { useParams,useLoaderData, useRouteLoaderData, json, redirect } from "react-router-dom";
import EventItem from "../components/EventItem";

const EventDetailPage=()=>{
    const params=useParams();
      // useLoaderData is used if only one route access returned data if multiple routes we neeed useRouteLoaderData
    // const data=useLoaderData();

    // for multiple route access we need to use useRouteLoaderData and to specify the id mentioned in route definitions
    const data=useRouteLoaderData('event-detail');

    return(
        <>    
        <EventItem event={data.event} />
        {/* <h1>EventDetailPage</h1>
        <p>Event ID:{params.eventId}</p> */}
        </>
    
    );
}

export default EventDetailPage;

// loader function for the case of dynamic detail view with an id in the url
export async function eventDetailLoader({request,params}){
    const id=params.eventId;
    const response=await fetch('http://localhost:8080/events/'+id);
    if(!response.ok){
        throw json({
            status:500,
            message:"error fetching event"
        })
    }
    else{
        return response;
    }
}

export async function action({request,params}){
    const id=params.eventId;
    const response=await fetch('http://localhost:8080/events/'+id,{
        method:'DELETE',
    });
    if(!response.ok){
        throw json({
            status:500,
            message:"error deleting event"
        })
    }
    else{
        return redirect('/events');
    }
}