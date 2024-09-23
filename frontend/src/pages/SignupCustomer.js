import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CustomerSignup() {
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
      const response = await axios.post('http://localhost:5000/api/customers', formData, { withCredentials: true });

      console.log('signup successful:', response.data);
      sessionStorage.setItem('token', response.data.token);
      navigate('/about');
    } catch (error) {
      console.error('Signup failed:', error);
      navigate('/carownersignup');
    }
  };
    
  return ( 
    <div className="mechanicreg">
      <h2>Sign Up</h2>
      <form id='registerForm' onSubmit={handleSubmit}>
        <input
        type='email'
        name='email'
        id='email'
        placeholder='Email'
        value={formData.email}
        onChange={handleChange}
        required
        />

        <input 
        type="password" 
        id="password" 
        name="password" 
        placeholder="Password" 
        value={formData.password} 
        onChange={handleChange} 
        required 
        />    

<input type="checkbox" id="rememberMe" name="rememberMe" /> <label htmlFor="rememberMe">Remember me</label>
        <input type="submit" value="Signup" />  
      </form>
      <p>Already have an account? <a href="/login">Login here</a></p> 
      
    </div>
  );
}

export default CustomerSignup;
