import { Outlet, useNavigation, useRouteLoaderData, useSubmit } from 'react-router-dom';

import MainNavigation from '../components/MainNavigation';
import { useEffect } from 'react';
import { getTokenExpiry } from '../utils/authToken';

function RootLayout() {
  // const navigation = useNavigation();
  const submit=useSubmit();
  const token=useRouteLoaderData('authToken');
  // for automatic logout after 1 hr
  useEffect(()=>{
       if(!token){
        return;
       }
       if(token==="EXPIRED"){
        submit(null,{ action:'/logout' ,method:'post'});
       }

       const tokenExpiry = getTokenExpiry();
       console.log(tokenExpiry);

       setTimeout(()=>{
        // triggering action without Form 
          submit(null,{ action:'/logout' ,method:'post'});
       },tokenExpiry); //tokenExpiry will contain the remaining time from the storing of token in local storage to page refreshed time 
  },[token,submit])

  return (
    <>
      <MainNavigation />
      <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
