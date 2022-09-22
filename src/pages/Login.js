import React,{ useRef, useState, useEffect, useLayoutEffect } from 'react';
import axios from 'axios';
import { response } from 'express';

const Login = () => {

  const userRef = useRef();

  const[name ,setUser] = useState('');
  const[password ,setPwd] = useState('');
  const[occupation ,setOccu] = useState('');
  const[success ,setSuccess] = useState(false);

  useEffect(()=>{
    userRef.current.focus();
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(true);
    console.log("sucess");
    axios.post('/Login',{
      name: name,
      password: password,
      occupation: occupation
    })
    .then((response)=>{
      console.log(response.data);
    })
  }

  return (
      
    <form onSubmit={handleSubmit}>

  <div class="mb-3">
    <label htmlFor='name' class="form-label">Name</label>
    <input type="text" class="form-control" id="name" ref={userRef} autoComplete='off' onChange={(e)=> setUser(e.target.value)} required/>
  </div>

  <div class="mb-3">
    <label htmlFor='password' class="form-label">Password</label>
    <input type="password" class="form-control" id="password" onChange={(e)=> setPwd(e.target.value)} required/>
  </div>

  <div class="mb-3">
  <label htmlFor='occupation' class="form-label">occupation</label>
    <input type="occupation" class="form-control" id="occupation" onChange={(e)=> setOccu(e.target.value)}  required/>
  </div>

  <button type="submit" class="btn btn-primary">Submit</button>

</form>

  );
  };
  
  export default Login;
  