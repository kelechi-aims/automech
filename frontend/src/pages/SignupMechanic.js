import axios from 'axios';
import React, { useState } from 'react';

function MechanicSignup() {
  const [formData, setFormData] = useState({
    email: "",
    phoneNumber: "",
    password: "",
  })

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
      const response = await axios.post('http://localhost:5000/api/mechanics', formData, { withCredentials: true });

      console.log('signup successful:', response.data);
    } catch (error) {
      console.error('Signup failed:', error.response.data);
    }
  };
    
  return ( 
    <div className="mechanicreg">
      <h2>Registration Form</h2>
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
        type='text'
        name='phoneNumber'
        id='phoneNumber'
        placeholder='Phone Number'
        value={formData.phoneNumber}
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

        <input type="submit" value="Signup" />  
      </form>
      <p>Already have an account? <a href="/login">Login here</a></p> 
      
    </div>
  );
}

export default MechanicSignup;
