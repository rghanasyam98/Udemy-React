import { Link, useNavigate, useParams } from 'react-router-dom';

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import { useQuery,useMutation } from '@tanstack/react-query';
import { fetchEvent, queryClient, updateEvent } from '../../utils/http.js';
import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';

export default function EditEvent() {
  const navigate = useNavigate();
  const params=useParams();
  const {data,isLoading,isError,error}=useQuery({
    queryKey:['event',params.id],
    queryFn:({signal})=>fetchEvent({signal,id:params.id})
  });

  // chnage immediately refelects on ui because we manipulate the cache with submitted data
  // in case of backend error rolling back to previous 
  const { mutate }=useMutation({
    mutationFn:updateEvent,
    onMutate:async(data)=>{
      const submittedDataForUpdation=data.event;
      await queryClient.cancelQueries({queryKey:['event',params.id]});
      const prevEvent=queryClient.getQueryData(['event',params.id]);
      queryClient.setQueryData(['event',params.id],submittedDataForUpdation);
      console.log("prevevent",prevEvent);
      return { prevEvent };
    },
    onError:(error,data,context)=>{
      console.log("onerror",context.prevEvent);
      queryClient.setQueryData(['event',params.id],context.prevEvent);

    },
    onSettled:()=>{
      console.log("onSettled",)
      queryClient.invalidateQueries({queryKey:['event',params.id]});
    }
  })

  function handleSubmit(formData) {
    // triggering update action
    mutate({id:params.id,event:formData});
    navigate('../');
  }

  function handleClose() {
    navigate('../');
  }

  let content;
  if(isLoading){
    content=<div className='center'>
        <LoadingIndicator/>
    </div>
  }

  if(isError){
  content= <>
               <ErrorBlock title="failed to load" message={error.info?.message || 'something went wrong'} />
               <div className='form-actions'>
                      <Link to="../" className='button'>Okay</Link>
               </div>
         </>
  }

  if(data){
    content=<EventForm inputData={data} onSubmit={handleSubmit}>
    <Link to="../" className="button-text">
      Cancel
    </Link>
    <button type="submit" className="button">
      Update
    </button>
  </EventForm>
  }

  return (
    <Modal onClose={handleClose}>
      {content}
    </Modal>
  );
}
