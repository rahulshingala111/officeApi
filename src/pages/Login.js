import { useRef, useState, useEffect, useLayoutEffect } from 'react';


const Login = () => {

  const userRef = useRef();

  const[name ,setUser] = useState('');
  const[password ,setPwd] = useState('');
  const[occupation ,setOccu] = useState('');

  useEffect(()=>{
    userRef.current.focus();
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
  }

  return (
      
    <form onSubmit={handleSubmit}>

  <div class="mb-3">
    <label htmlFor='name' class="form-label">Name</label>
    <input type="text" class="form-control" id="name" ref={userRef} autoComplete='off' onChange={(e)=> setUser(e.target.value)} value={user} required/>
  </div>

  <div class="mb-3">
    <label htmlFor='password' class="form-label">Password</label>
    <input type="password" class="form-control" id="password" onChange={(e)=> setPwd(e.target.value)} value={pwd} required/>
  </div>

  <div class="mb-3">
  <label htmlFor='occupation' class="form-label">occupation</label>
    <input type="occupation" class="form-control" id="occupation" onChange={(e)=> setOccu(e.target.value)} value={occu} required/>
  </div>

  <button type="submit" class="btn btn-primary">Submit</button>

</form>

  );
  };
  
  export default Login;
  