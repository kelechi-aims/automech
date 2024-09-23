import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Handle form submission logic here
    console.log(formData);

    try {
      const response = await axios.post('http://localhost:5000/api/login', formData, { withCredentials: true });

      console.log('login successful:', response.data);
      localStorage.setItem('token', response.data.token);
      navigate('/about');
    } catch (error) {
      console.error('login failed:', error);
      navigate('/login');
    }
  };
    
  return ( 
    <div className="mechanicreg">
      <h2>Login</h2>
      <form id='loginForm' onSubmit={handleSubmit}>
        <input
        type='email'
        name='email'
        id='email'
        placeholder='Type your email here...'
        value={formData.email}
        onChange={handleChange}
        required
        />

        <input 
        type="password" 
        id="password" 
        name="password" 
        placeholder="Type your password here..." 
        value={formData.password} 
        onChange={handleChange} 
        required 
        />    

        <input type="checkbox" id="rememberMe" name="rememberMe" /> <label htmlFor="rememberMe">Remember me</label>
        <span className='forgot'><a href="https://www.linkedin.com/in/kelechi-denise" target="_blank" rel="noopener noreferrer">Forgot Password?</a></span>
        <input type="submit" value="Log in" />  
      </form>
      <p>Don't Have an Account? <a href="/carownersignup">Create Account</a></p> 
      
    </div>
  );
}

export default Login;
