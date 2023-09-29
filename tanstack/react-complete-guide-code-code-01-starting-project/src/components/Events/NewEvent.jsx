import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import { createNewEvent } from '../../utils/http.js';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import { queryClient } from '../../utils/http.js';

export default function NewEvent() {
  const navigate = useNavigate();

  // Inorder to send a POST request with tanstack query we use useMutation
  // mutation function will not automatically executes,
  // for execution we need to mutate
 const { mutate,isPending,isError,error }= useMutation({
    mutationFn:createNewEvent,
    // actions too be performed after successful execution of mutation function
    onSuccess:()=>{
      // after adding a new event successfully then invalidate query of events
      //  with that particular key makes invalidated and initiating refeching
      queryClient.invalidateQueries({queryKey:['events']});
      navigate("/events");
    }
  })

  function handleSubmit(formData) {
    // calling the mutation function and passing the form data to POST request body
       mutate({event:formData});
  }

  return (
    <Modal onClose={() => navigate('../')}>
      <EventForm onSubmit={handleSubmit}>
        {isPending && 'Submitting...'}
        {!isPending && (<>
          <Link to="../" className="button-text">
            Cancel
          </Link>
          <button type="submit" className="button">
            Create
          </button>
        </>) }
        
      </EventForm>
      
      {isError && <ErrorBlock title="Failed to submit" message={error.info?.message || 'something went wrong'} /> }

    </Modal>
  );
}
