import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

const GoogleSignup = () => {
    const onSuccess = (CredentialResponse) => {

      console.log('Login Success:', CredentialResponse);

      
      const token = CredentialResponse.credential;

      // Send the Google ID token to backend for verification and user creation
      axios.post("/api/auth/google", { token })
        .then((response) => {
          // Handle successful response
          console.log('User save:', response.data);
        })
        .catch((error) => {
          // Handle error
          console.error('Error:', error);
        });
    };

    const onError = (error) => {
      console.log('Login Failed:', error);
    };
    return (
      <div>
       <GoogleLogin onSuccess={onSuccess} onError={onError} />
      </div>
    
    )
};



export default GoogleSignup;
