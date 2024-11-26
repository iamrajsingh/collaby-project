import React from "react";
import { useLinkedIn } from "react-linkedin-login-oauth2";

const LinkedInLoginButton = ({ handleSuccess, handleFailure }) => {
  const handleLogin = (data) => {
    // Handle successful LinkedIn login
    handleSuccess(data);
  };

  const handleLoginFailure = (error) => {
    // Handle failed LinkedIn login
    handleFailure(error);
  };

  const { linkedInLogin } = useLinkedIn({
    //clientId: "775vxg5mswcgsh",
    //redirectUri: "http://localhost:3000", // for Next.js, you can use `${typeof window === 'object' && window.location.origin}/linkedin`
    clientId: "86thdaj7c7nw76",
    //redirectUri: `${window.location.origin}`,
    redirectUri: `${window.location.origin}/linkedin`,
    onSuccess: (code) => {
      handleLogin(code);
    },
    onError: (error) => {
      handleLoginFailure(error);
    },
    scope: "email profile",
  });

  return (
    // <LinkedInLogin
    //   clientId="86thdaj7c7nw76"
    //   onFailure={handleLoginFailure}
    //   onSuccess={handleLogin}
    //   redirectUri="your-redirect-uri"
    // >
    //   <img
    //     src="https://content.linkedin.com/content/dam/developer/global/en_US/site/img/signin-button.png"
    //     alt="Login with LinkedIn"
    //     style={{ maxWidth: "180px" }}
    //   />
    // </LinkedInLogin>
    <img
      onClick={linkedInLogin}
      src="https://content.linkedin.com/content/dam/developer/global/en_US/site/img/signin-button.png"
      alt="Sign in with Linked In"
      style={{ maxWidth: "180px" }}
    />
  );
};

export default LinkedInLoginButton;
