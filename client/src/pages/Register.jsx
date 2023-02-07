import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./Register.scss"
const DEFAULT_INPUT_FIELDS = {
  username: "",
  email: "",
  password: ""
}
const Register = () => {
  const [inputs, setInputs] = useState(DEFAULT_INPUT_FIELDS)
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = e => {
    setInputs(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))

  }

  const handleRegisterForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/auth/register", inputs)
      if(response.status === 200) {
        navigate("/");
      }
    } catch (err) {
      setError(err.response.data)
    }
    setInputs(DEFAULT_INPUT_FIELDS);
  }

  return (
    <div className="auth">
      <h1>Register</h1>
      <form>
        <input onChange={handleChange} type="text" name="username" value={inputs.username} placeholder="username" required />
        <input onChange={handleChange} type="email" name="email" value={inputs.email} placeholder="email" required />
        <input onChange={handleChange} type="password" name="password" value={inputs.password} placeholder="password" required />
        <button onClick={handleRegisterForm} >Register</button>
        {
          error && <p>{error}</p>
        }

        <span>Already have an account? <Link to="/login">Register</Link></span>
      </form>
    </div>
  )
}

export default Register