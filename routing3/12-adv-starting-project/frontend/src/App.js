// Challenge / Exercise

// 1. Add five new (dummy) page components (content can be simple <h1> elements)
//    - HomePage
//    - EventsPage
//    - EventDetailPage
//    - NewEventPage
//    - EditEventPage
// 2. Add routing & route definitions for these five pages
//    - / => HomePage
//    - /events => EventsPage
//    - /events/<some-id> => EventDetailPage
//    - /events/new => NewEventPage
//    - /events/<some-id>/edit => EditEventPage
// 3. Add a root layout that adds the <MainNavigation> component above all page components
// 4. Add properly working links to the MainNavigation
// 5. Ensure that the links in MainNavigation receive an "active" class when active
// 6. Output a list of dummy events to the EventsPage
//    Every list item should include a link to the respective EventDetailPage
// 7. Output the ID of the selected event on the EventDetailPage
// BONUS: Add another (nested) layout route that adds the <EventNavigation> component above all /events... page components


import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import HomePage from './pages/Home';
import EventsPage,{EventsLoader} from './pages/Events';
import EventDetailPage, { eventDetailLoader,action as eventDeleteAction } from './pages/EventDetail';
import NewEventPage from './pages/NewEvent';
import EditEventPage from './pages/EditEvent';
import RootLayout from './pages/Root';
import { Children } from 'react';
import EventRoot from './pages/EventRoot';
import ErrorPage from './pages/ErrorPage';
import { action as newOReditEventaction } from './components/EventForm';
import NewsletterPage,{action as newsletterAction } from './pages/Newsletter';


const router=createBrowserRouter([
  {
    path:'/',
    element:<RootLayout/>,
    errorElement:<ErrorPage/>,//if knowinly or unknowingly throws an error this will be rendered
    children:[
      {index:true, element:<HomePage/>},
      {
        path:'events',
        element:<EventRoot/>,
        children:[
          {index:true,element:<EventsPage/>,loader:EventsLoader },//EventsLoader is actually defined in  <EventsPage/>
          {
            path:':eventId',
            loader:eventDetailLoader,//this loader is know accessible to all the children of this route with useRouteLoaderData() hook not with useLoaderData()
            id:'event-detail',//to access loader returned data we need this id since mulpile route access
            children:[
              {index:true, path:'',element:<EventDetailPage/>,action:eventDeleteAction},
              {path:'edit',element:<EditEventPage/> , action:newOReditEventaction},
            ]
           
          },
          // if a form is submitted in NewEventPage then newEventAction will be called
          {path:'new',element:<NewEventPage/>, action:newOReditEventaction },
         
             
        ]
      },
      {
        path: 'newsletter',
        element: <NewsletterPage />,
        action: newsletterAction,
      },
      
    ]
  },
  
])

function App() {
  return <RouterProvider router={router} />;
}

export default App;
