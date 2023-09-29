import { Suspense, useEffect, useState } from 'react';

import EventsList from '../components/EventsList';
import { Await, defer, json, useLoaderData,useRouteLoaderData } from 'react-router-dom';

// Utilizing router specific loader and useLoaderData for http
function EventsPage() {
 
  // in case of returned the json parsed events
  // const events=useLoaderData();

  // loader feature automatically parse json we dont have to
   const { events }=useLoaderData();//since also consider defer object key

  

  // rendering error related component 
  // if(data.isError){
  //   return(
  //     <p>{data.message}</p>
  //   )
  // }

  // const events=data.events;

  
    return (
      // fallback content will be displayed upto events kittunna vare
  <Suspense  fallback={<p style={{textAlign:'center'}} >Loading!!!</p>} >
    {/* will be displayed in future, that is data kitti=y kazhinjal */}
    <Await resolve={events}>
          {(loadedEvents)=>(
             <EventsList events={loadedEvents} />
          )}
          
        </Await>
  </Suspense>
        
       
 
    );

  }
  
  export default EventsPage;

// for implementing defer concept make the code into  A separate function
async function loadEvents(){
   //loader defines the action to be performed before rendering eventspage
        // const response = await fetch('http://localhost:8080/qevents');//url to show error
        
        // correct url
        const response = await fetch('http://localhost:8080/events');

        if (!response.ok) {
         //dealing error
         //method 1
        //  return {isError: true,message:'fetching failed'};

        // method 2
        // wile throws an error automatically renders errorElement specified in router definition
        //in this case passed error data cant be fetched
        // throw {message:'fetching failed'};

        // method 3
        // to fetch passed error data use this method
        // throw new Response(JSON.stringify({
        //   message:"fetching failed Response",
        //   status:500
        // }));

        // method 4
        // this method doesnt needs json parsing in other end
        throw json({
          message:"Fetching failed json",
          status:500
        });



       } else {
        //  const resData = await response.json();
        //  return resData.events;

        // in case of using loader we only need to return response . the json parsing is done by useLoaderData automatically
        // return response;
        

        // since we are using defer
        const eventData=await response.json();
        return eventData.events;

         }
}



// the loader fn can be placed here and a pointer can be used at loader :
export const EventsLoader=()=>{
   return defer({
      events:loadEvents() //loadEvents execute cheyth kittunna results koode aan return aavunnath
   })
  
}













// normal method of loading a  component AND fetching hhtp with useEffect 

// function EventsPage() {
//   const [isLoading, setIsLoading] = useState(false);
//   const [fetchedEvents, setFetchedEvents] = useState();
//   const [error, setError] = useState();

//   useEffect(() => {
//     async function fetchEvents() {
//       setIsLoading(true);
//       const response = await fetch('http://localhost:8080/events');

//       if (!response.ok) {
//         setError('Fetching events failed.');
//       } else {
//         const resData = await response.json();
//         setFetchedEvents(resData.events);
//       }
//       setIsLoading(false);
//     }

//     fetchEvents();
//   }, []);
//   return (
//     <>
//       <div style={{ textAlign: 'center' }}>
//         {isLoading && <p>Loading...</p>}
//         {error && <p>{error}</p>}
//       </div>
//       {!isLoading && fetchedEvents && <EventsList events={fetchedEvents} />}
//     </>
//   );
// }

// export default EventsPage;