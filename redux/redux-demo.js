// importing redux package
const redux=require('redux');

// we need store,reducer,subscriber

// creating a reducer fn
// state={counter:0} is to initialize the first state
const counterReducer=(state={counter:0},action)=>{

    if(action.type === 'increment'){
        return {
            counter:state.counter + 1
        };
    }

    if(action.type === 'decrement'){
        return {
            counter:state.counter - 1
        };
    }
    return {
        counter:state.counter
    };
   
}

// creating a central store
// counterReducer is responsible for manipulating the state in store
const store=redux.createStore(counterReducer);

// console.log(store.getState());


const counterSubscriber=()=>{
    // to get the latest state
   const latestState= store.getState();
   console.log("$",latestState);
}

// now to make the redux store aware of the subscriber fn
store.subscribe(counterSubscriber);


// to trigger a state change WE  need to dispatch an action
// this will chnage the state to the number of iterations of loop
// dispatch 10 increment actions
for(let i=1; i<=10; i++){
    store.dispatch(
        {
            type:'increment'
        }
    );
}

// dispatch 5 decrement actions
for(let i=1; i<=5; i++){
    store.dispatch(
        {
            type:'decrement'
        }
    );
}


store.dispatch(
    {
        type:''
    }
);