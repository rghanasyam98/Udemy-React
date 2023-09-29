import { useEffect } from 'react';
import classes from './NewsletterSignup.module.css';
import { useFetcher } from 'react-router-dom';

function NewsletterSignup() {
    const fetcher=useFetcher();
    const {data,state} = fetcher

    useEffect(()=>{
        if( data && data.message && state === 'idle'){
            window.alert("submited successfully");
        }
    
    },[data,state])
    
  return (
    // not used form or Form 
    // since we need action of another route 
    // so need to fetch it by useFetcher
    <fetcher.Form action='/newsletter'  method="post" className={classes.newsletter}>
      <input
        type="email"
        name='email'
        placeholder="Sign up for newsletter..."
        aria-label="Sign up for newsletter"
      />
      <button>Sign up</button>
    </fetcher.Form>
  );
}

export default NewsletterSignup;