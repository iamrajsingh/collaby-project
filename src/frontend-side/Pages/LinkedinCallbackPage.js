import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const LinkedInCallbackPage = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);

  // Extract LinkedIn authentication parameters
  const error = params.get("error");
  const errorDescription = params.get("error_description");
  const code = params.get("code");
  const state = params.get("state");

  useEffect(() => {
    const getUserInfoFromLinkedin = async () => {
      try {
        const accessToken = await exchangeCodeForToken(code);
        const userEmail = await fetchUserEmail(accessToken);
      } catch (error) {
        console.log(error);
      }
    };

    // Call the getUserInfoFromLinkedin function when the component mounts
    getUserInfoFromLinkedin();
  }, [code]);

  const exchangeCodeForToken = async (code) => {
    // Make a request to your server or LinkedIn API to exchange the code for an access token
    const response = await axios.post(
      "https://www.linkedin.com/oauth/v2/accessToken",
      {
        grant_type: "authorization_code",
        code,
        redirect_uri: `${window.location.origin}/linkedin`,
        //client_id: "86thdaj7c7nw76",
        //client_secret: "byBtynko9HoxaPhd",

        client_id: "775vxg5mswcgsh",
        client_secret: "nePkudZchoSJ1fJw",
      }
    );
    console.log("response", response);

    if (response.ok) {
      return response.data.access_token;
    } else {
      throw new Error("Failed to exchange code for token");
    }
  };

  const fetchUserEmail = async (accessToken) => {
    const response = await fetch(
      "https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Connection: "Keep-Alive",
        },
      }
    );

    const data = await response.json();

    if (response.ok) {
      // Assuming the email address is available in the response
      const userEmail = data.elements[0]["handle~"].emailAddress;
      console.log("User Email:", userEmail);
      return userEmail;
    } else {
      throw new Error(data.error_description || "Failed to fetch user email");
    }
  };

  // Handle errors or process the authentication code
  if (error) {
    return <div>Error: {errorDescription}</div>;
  } else if (code) {
    // Handle the successful authentication code (e.g., send it to your server)
    // You can also store it in a state management solution like React Query.
    return <div>Authentication successful! Code: {code}</div>;
  } else {
    return <div>Invalid LinkedIn authentication callback</div>;
  }
};

export default LinkedInCallbackPage;
