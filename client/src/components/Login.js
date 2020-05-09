import React, {useState} from "react";

import {axiosWithAuth} from '../utils/axiosWithAuth.js';

import axios from 'axios'

const Login = (props) => {
  console.log("TCL: Login -> props", props)
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [state, setState] = useState (
    { credentials: {
      username: '',
      password: ''
    }}
  )

  const handleChange = e => {
    setState({
      credentials: {
        ...state.credentials,
        [e.target.name]: e.target.value
      }
    })
  }

  const login = e => {
    e.preventDefault();
    axios
    .post('http://localhost:5000/api/login', state.credentials)
    // .post('login', state)
    .then(res => {
    console.log("TCL: Login -> res", res)
      localStorage.setItem('token', res.data.payload)
      props.history.push('/bubble-page')
    })
    .catch(err => console.log(err.response))
  }


  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <p>Build a login page here</p>
      <form onSubmit={login}>
      <label> Username:
        <input 
          type='text'
          name='username'
          value={state.credentials.username} 
          onChange={handleChange}
        />
        <label>Password:
        <input 
          type='password'
          name='password'
           value={state.credentials.password} 
           onChange={handleChange}
        />
        </label>
      </label>
      <button>Log in</button>
      </form>
    </>
  );
};

export default Login;
