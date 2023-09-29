import { Fragment } from "react";
import MainNavigation from "../components/MainNavigation";
import { Outlet,useNavigation } from "react-router-dom";

const RootLayout=()=>{
    // to get the current state of page navigation
    const navigation=useNavigation();
   return(
    <Fragment>
        <MainNavigation/>
      {/* {navigation.state === 'loading' &&  <p>Loading...</p>}  */}
        <main>
            <Outlet>

            </Outlet>
        </main>
    </Fragment>
   );
}

export default RootLayout;