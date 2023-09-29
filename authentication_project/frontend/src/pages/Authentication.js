import { json, redirect } from 'react-router-dom';
import AuthForm from '../components/AuthForm';

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export async function action({request}){
  // cant use useSeachParams() hook for getting the query parameters inside a action fn
  // so we need another method given below
  const mode=new URL(request.url).searchParams.get('mode') || 'login';
  console.log(mode);
  if(mode !== 'login' && mode !== 'signup'){
    throw json({
      message:'unsupported mode',
      status:422
    });
  }
  const data=await request.formData();
  const authData={
    email:data.get('email'),
    password:data.get('password'),
  }
  console.log(authData);


  const response = await fetch('http://localhost:8080/'+mode,{
    method: 'POST',
    headers:{'Content-Type': 'application/json'},
    body: JSON.stringify(authData)
  })
  
  console.log(response);

  if(response.status === 422 || response.status === 401){
    return response;
  }


  if(!response.ok){
    throw json({
      message:"Authentication failed",
      status:500
    })
  }

  // authentication successful
  // successful authentication returns token
  const response_data=await response.json();
  const token=response_data.token;
  localStorage.setItem('token', token);

  // also storing an expiry field for this token by the current time  + 1 hr as expiry
  const expiration=new Date();//currrent date time
  expiration.setHours(expiration.getHours()+1); // current time + 1 hr
  localStorage.setItem('expiration', expiration.toISOString());
  return redirect('/');
}