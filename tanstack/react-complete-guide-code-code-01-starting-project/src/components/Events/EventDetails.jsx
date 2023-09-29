import { Link, Outlet, useNavigate, useParams } from "react-router-dom";

import Header from "../Header.jsx";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchEvent, queryClient, deleteEvent } from "../../utils/http.js";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import { useState } from "react";
import Modal from "../UI/Modal.jsx";

export default function EventDetails() {
  const params = useParams();
  const navigate = useNavigate();
  const [isDeleting,setIsDeleting]=useState(false);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["event", params.id],
    queryFn: ({ signal }) => fetchEvent({ signal, id: params.id }),
  });

  // useMutation is also used for DELETE requests
  const { mutate, isLoading:isLoadingDelete, isError:isErrorDelete, error:errorDelete } = useMutation({//alias to avoid duplication
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"], refetchType:'none' }); //for refetching events
      navigate("/events");
    },
  });

  const deleteHandler = () => {
    mutate({ id: params.id });
  };

  function startDeletion(){
    setIsDeleting(true);
  }

  function stopDeletion(){
    setIsDeleting(false);

  }

  let content;

  if (isLoading) {
    content = (
      <div id="event-details-content" className="center">
        <p>Fetching event details...</p>
      </div>
    );
  }

  if (isError) {
    content = (
      <div id="event-details-content" className="center">
        <ErrorBlock
          title="loading falied"
          message={error.info?.message || "something went wrong"}
        />
      </div>
    );
  }

  if (data) {
    content = (
      <>
        <header>
          <h1>{data.title}</h1>
          <nav>
            <button onClick={startDeletion}>Delete</button>
            <Link to="edit">Edit</Link>
          </nav>
        </header>
        <div id="event-details-content">
          <img src={`http://localhost:3000/${data.image}`} alt={data.title} />
          <div id="event-details-info">
            <div>
              <p id="event-details-location">{data.location}</p>
              <time dateTime={`Todo-DateT$Todo-Time`}>
                {data.date} @ {data.time}
              </time>
            </div>
            <p id="event-details-description">{data.description}</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>

    {isDeleting &&  
      <Modal>
      <h2>Are you sure?</h2>
      <p>do you really want to delete...</p>
      {isLoadingDelete && <p>Deleting...</p>}
      {!isLoadingDelete && 
       <div className="form-action">
        <button onClick={stopDeletion} className="button-text" >Cancel</button>
        <button  onClick={deleteHandler}className="button" >Delete</button>
      </div>}
      {isErrorDelete && 
        <ErrorBlock title="failed to delete" message={errorDelete.info?.message || "something went wrong"} />
      }
     </Modal>
}
      <Outlet />
      <Header>
        <Link to="/events" className="nav-item">
          View all Events
        </Link>
      </Header>
      <article id="event-details">{content}</article>
    </>
  );
}
