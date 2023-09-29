
import { useQuery } from '@tanstack/react-query';

import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import EventItem from './EventItem.jsx';
import { fetchEvents } from '../../utils/http.js';

export default function NewEventsSection() {
 
const { data,isPending,isError,error }= useQuery({
   queryKey:['events',{max:3}],//to identify each request
   queryFn:({signal})=>fetchEvents({signal,max:3}) ,
   //this fn contains the syntax for fetching backend
 //etra tym nu shesham nxt request send cheyyanm. ver page poyit tirich vanalum 5 sec vare new request ayakkilla. will use cached data .default 0
  //  staleTime:5000,
  //  gcTime:5000,//how much time keeps cached data
 })
  

  let content;

  if (isPending) {
    content = <LoadingIndicator />;
  }

  if (error) {
    content = (
      <ErrorBlock
        title="An error occurred"
        message={error.info?.message || "failed to fetch events"}
      />
    );
  }

  if (data) {
    content = (
      <ul className="events-list">
        {data.map((event) => (
          <li key={event.id}>
            <EventItem event={event} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section className="content-section" id="new-events-section">
      <header>
        <h2>Recently added events</h2>
      </header>
      {content}
    </section>
  );
}
