import React from "react";
import LinkedInLogin from "react-linkedin-login-oauth2";

const LoginLinkedin = () => {
  const handleSuccess = (data) => {
    // Handle the successful login, you may want to send the received data to your server for further processing.
  };

  const handleFailure = (error) => {
    // Handle the login failure.
  };

  return (
    <LinkedInLogin
      clientId="86thdaj7c7nw76"
      redirectUri="http://localhost:3000/auth/linkedin/callback"
      onSuccess={handleSuccess}
      onFailure={handleFailure}
    >
      Login with LinkedIn
    </LinkedInLogin>
  );
};

export default LoginLinkedin;
