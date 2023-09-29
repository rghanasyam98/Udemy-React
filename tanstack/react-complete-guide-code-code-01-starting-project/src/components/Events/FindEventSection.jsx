import { useQuery } from '@tanstack/react-query';
import { useRef,useState } from 'react';
import { fetchEvents } from '../../utils/http';
import LoadingIndicator from '../UI/LoadingIndicator';
import ErrorBlock from '../UI/ErrorBlock';
import EventItem from './EventItem';

export default function FindEventSection() {
  const searchElement = useRef();
  const [searchTerm,setSearchTerm]=useState(undefined);

//  initially searchTerm is undefined,so no request should be sent 
// it is prevented with enabled property
   
  const { data,isPending,isError,error }=useQuery({
    queryKey:['events',{ search:searchTerm }] ,//there should be cached data for each search term so its is done dynamically
    queryFn: ({signal})=>fetchEvents({signal,searchTerm}),
    enabled: searchTerm !== undefined 
  })

  function handleSubmit(event) {
    event.preventDefault();
    setSearchTerm(searchElement.current.value);
  }
  
  let content=<p>Please enter a search term and to find events.</p>;

   if(isPending){
    content=<LoadingIndicator/>;
   }

   if(isError){
    content=<ErrorBlock title="An error occured" message={error.info?.message || "Failed to fetch events"} />;
   }

   if(data){
    content=<ul className='events-list'>
          {data.map((event)=> <li key={event.id}>
            <EventItem  event={event} />
          </li> )}
    </ul>
   }

  return (
    <section className="content-section" id="all-events-section">
      <header>
        <h2>Find your next event!</h2>
        <form onSubmit={handleSubmit} id="search-form">
          <input
            type="search"
            placeholder="Search events"
            ref={searchElement}
          />
          <button>Search</button>
        </form>
      </header>
      {content}
    </section>
  );
}
