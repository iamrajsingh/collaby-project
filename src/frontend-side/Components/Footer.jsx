import React, { useState } from "react";
import { Link } from "react-router-dom";
import apiService from "./../../service/apiService";
import Logo from "../Images/logo.svg";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const sendEmail = async () => {
    try {
      // Check if the email field is empty before making the API call
      if (!email.trim()) {
        // Optionally, you can show an error message to the user
        return;
      }

      const response = await apiService.post("front/users/email_subscriber", {
        email: email,
      });

      if (response && response.status === "200") {
        // Optionally, you can reset the email state or show a success message here
        setSuccessMessage("Email sent successfully");
        setTimeout(() => {
          setSuccessMessage(false);
        }, 3000);
      } else {
        // Handle error, maybe show an error message to the user
      }
    } catch (error) {
      // Handle error, maybe show an error message to the user
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <>
      <div className="footer-Sec">
        <div className="container">
          <div className="row">
            <div className="col-md-4 col-sm-12 col-12">
              <div className="footSubD">
                <Link to="/projects">
                  <img src={Logo} className="img-fluid" alt="image" />
                </Link>
                <p>Match Your Project With Potential Partners</p>
                {successMessage && (
                  <div className="alert alert-success" role="alert">
                    Email Sent Successfully
                  </div>
                )}
                <div className="em_quote_form">
                  <form
                    method="post"
                    role="form"
                    id="SearchForm"
                    autoComplete="off"
                    action="#"
                  >
                    <div className="quite_form_field">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email here"
                        value={email}
                        onChange={handleEmailChange}
                        required
                      />
                      <button
                        type="button"
                        className="quote_button"
                        onClick={sendEmail}
                      >
                        <i className="fa fa-arrow-right" aria-hidden="true"></i>
                      </button>
                    </div>
                  </form>

                  <div id="display"></div>
                </div>
              </div>
            </div>
            <div className="col-md-1 hidden"></div>
            <div className="col-md-2 col-sm-4 col-12">
              <div className="footSubD">
                <h4>Support</h4>
                <ul>
                  <li>
                    <Link to="/contacts">Help centre</Link>
                  </li>
                  <li>
                    <Link to="/about-us">About</Link>
                  </li>
                  <li>
                    <Link to="/contacts">Contact us</Link>
                  </li>
                  <li>
                    <Link to="/pricing">Our Pricing</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-3 col-sm-4 col-12">
              <div className="footSubD">
                <h4>Help and Solution</h4>
                <ul>
                  <li>
                    <Link to="/contacts">Talk to support</Link>
                  </li>
                  <li>
                    <Link to="/contacts">Support docs</Link>
                  </li>
                  <li>
                    <Link to="/contacts">System status</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-2 col-sm-4 col-12">
              <div className="footSubD">
                <h4>Social Links</h4>
                <ul>
                  <li>
                    <Link
                      to="https://www.facebook.com/CollablyNetwork"
                      target="_blank"
                    >
                      <i className="fa fa-facebook-square" aria-hidden="true"></i>{" "}
                      Facebook
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="https://twitter.com/CollablyNetwork"
                      target="_blank"
                    >
                      <i className="fa fa-square-x-twitter" aria-hidden="true"></i>{" "}
                      Twitter
                    </Link>
                  </li>
                  <li>
                    <Link to="https://t.me/CollablyNetwork" target="_blank">
                      <i className="fa fa-telegram" aria-hidden="true"></i>{" "}
                      Telegram
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="https://www.instagram.com/collablynetwork/"
                      target="_blank"
                    >
                      <i className="fa fa-instagram" aria-hidden="true"></i>{" "}
                      Instagram
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="https://www.linkedin.com/company/collably-network/"
                      target="_blank"
                    >
                      <i className="fa fa-linkedin-square" aria-hidden="true"></i>{" "}
                      Linkedin
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="https://www.youtube.com/channel/UCqUbuUtv-gcQzmKooNp0axg"
                      target="_blank"
                    >
                      <i className="fa fa-youtube-play" aria-hidden="true"></i>{" "}
                      Youtube
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lastfooter-Sec">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-sm-6 col-xs-12">
              <div className="lastfootSubD">
                <p>
                  © {currentYear} Collably Inc. Copyright and rights
                  reserved
                </p>
              </div>
            </div>
            <div
              className="col-md-6 col-sm-6 col-xs-12"
              style={{ textAlign: "right" }}
            >
              <div className="lastfootSubD">
                <p>
                  <Link to="#">Terms and Conditions</Link>&emsp;.&emsp;
                  <Link to="#">Privacy Policy</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
      />
    </>
  );
};

export default Footer;
