import React,{useState} from 'react';
import axios from 'axios';

const Login = () => {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [occupation, setOccupation] = useState('')

  const handleUserName = (e) => {
    console.log(e.target.value)
    setName(e.target.value)
  }
  const handlePassword = (e) => {
    console.log(e.target.value)
    setPassword(e.target.value)
  }
  const handleOccupation = (e) => {
    console.log(e.target.value)
    setOccupation(e.target.value)
  }
  const handleSubmit = (e) =>{
    e.preventDefault()
    console.log("submitted");

    axios.post('/Login',{
      name:name,
      password:password,
      occupation:occupation
    })
    .then((response)=>{
      console.log(response.data)
    })
    .catch((err)=>{
      console.log(err)
      console.log(err.response)
    })
  }

  return (
      
    <form class="myForm" onSubmit={handleSubmit}>

  <div class="mb-3">
    <label htmlFor='name' class="form-label">Name</label>
    <input type="text" value={name} class="form-control" id="name" autoComplete='off' onChange={handleUserName} required/>
  </div>

  <div class="mb-3">
    <label htmlFor='password' class="form-label">Password</label>
    <input type="password" value={password}  class="form-control" id="password" onChange={handlePassword} required/>
  </div>

  <div class="mb-3">
  <label htmlFor='occupation' class="form-label">occupation</label>
    <input type="occupation" value={occupation}  class="form-control" id="occupation" onChange={handleOccupation}  required/>
  </div>

  <button type="submit" class="btn btn-primary">Submit</button>

</form>

  );
  };
  
  export default Login;
  