import axios from 'axios';
import React, { useState } from 'react'
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext';

const DEFAULT_LOGIN_FIELDS = {
  email: "",
  password: ""
}
const Login = () => {
  const [inputs, setInputs] = useState(DEFAULT_LOGIN_FIELDS);
  const [error, setError] = useState(null)
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    })
  }

  const { currentUser, login } = useContext(AuthContext)

  console.log(currentUser);
  const submitLoginForm = async (e) => {
    e.preventDefault()
    try {
      const response = await login(inputs);
      
        navigate("/");

    } catch (err) {
      console.log(err);
      setError(err.response.data)
    }
    setInputs(DEFAULT_LOGIN_FIELDS);
  }

  return (
    <div className="auth">
      <h1>Login</h1>
      <form>
        <input onChange={handleChange} type="text" name="email" value={inputs.email} placeholder="email" />
        <input onChange={handleChange} type="password" name="password" value={inputs.password} placeholder="password" />
        <button onClick={submitLoginForm}>Login</button>
        {
          error && <p>{error}</p>
        }
        <span>Don't have an account? <Link to="/register">Register</Link></span>
      </form>
    </div>
  )
}

export default Login