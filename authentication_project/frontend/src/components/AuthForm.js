import { useState } from 'react';
import { Form,Link,useActionData,useSearchParams } from 'react-router-dom';

import classes from './AuthForm.module.css';

function AuthForm() {
  const responseData=useActionData();

  const [queryParams] =useSearchParams();
  const isLogin=queryParams.get('mode') === 'login';

  // initially managing it with state for toggling between login and signup forms 
  // but replaced with routing specific query parameters
  // const [isLogin, setIsLogin] = useState(true);

  // function switchAuthHandler() {
  //   setIsLogin((isCurrentlyLogin) => !isCurrentlyLogin);
  // }

  return (
    <>
      <Form method="post" className={classes.form}>
        <h1>{isLogin ? 'Log in' : 'Create a new user'}</h1>

       {/* this error will happen when signup with already used mail */}
       {responseData && responseData.errors && <ul>
         {Object.values(responseData.errors).map((error) => <li key={error}>{error}</li>)}
        </ul>}
        {responseData && responseData.message && <p>{responseData.message}</p>}

        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </p>
        <p>
          <label htmlFor="image">Password</label>
          <input id="password" type="password" name="password" required />
        </p>
        <div className={classes.actions}>
          <Link to={`?mode=${isLogin ? 'signup':'login'}`}>
            {isLogin ? 'Create new user' : 'Login'}
          </Link>
          <button>Save</button>
        </div>
      </Form>
    </>
  );
}

export default AuthForm;
