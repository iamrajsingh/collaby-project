import React, { Component } from "react";
import { Link, Navigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./../Style/Style.css";
import "./../Style/Animate.css";
import Logo from "../Images/logo.svg";
import apiService from "./../../service/apiService";

class ProfileHeader extends Component {
  state = {
    email: "",
    password: "",
    loginModalVisibility: false,
    isForgotPassword: false,
    isLoading: false,
    errorMessage: null,
    successMessageVisible: false,
    timeoutId: null,
    loginSuccess: false,
    loginFailed: false,
    forgotPasswordEmail: "",
  };

  componentDidMount() {
    const loggedInUserInfo = JSON.parse(
      localStorage.getItem("frontendUserInfo")
    );

    if (loggedInUserInfo && loggedInUserInfo.p_id) {
      this.setState({
        loginSuccess: true,
      });
    }
  }

  showLoginModalHandler = () => {
    this.setState({
      loginModalVisibility: true,
    });
  };
  hideLoginModalHandler = () => {
    this.setState({
      loginModalVisibility: false,
    });
  };
  forgotPasswordHandler = () => {
    this.setState({
      isForgotPassword: !this.state.isForgotPassword,
    });
  };

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      email: this.state.email,
      password: this.state.password,
    };

    try {
      const response = await apiService.post(
        "front/users/login",
        null,
        formData
      );

      if (response.status === "200") {
        localStorage.removeItem("frontendUserInfo");
        localStorage.setItem("frontendUserInfo", JSON.stringify(response.data));

        // Redirect to "/projects" after successful login
        // window.location.assign("/projects");

        // Reset the form and show the success popup
        this.setState({
          email: "",
          password: "",
          isLoading: false,
          successMessageVisible: true,
          errorMessage: null,
          loginSuccess: true,
          loginFailed: false,
          loginModalVisibility: false,
        });
      } else {
        // Handle error, e.g., show an error message
        this.setState({
          errorMessage: "Invalid credentials. Please try again.",
          successMessageVisible: false, // Hide success message on failed login
          loginSuccess: false,
          loginFailed: true,
        });
      }
    } catch (error) {
      this.setState({
        errorMessage: "An error occurred. Please try again later.",
        successMessageVisible: false, // Hide success message on error
        loginSuccess: false,
        loginFailed: true,
      });
    }
  };

  // Function to show the logout confirmation modal
  showLogoutConfirmationModal = () => {
    this.setState({
      logoutConfirmationVisibility: true,
    });
  };

  // Function to hide the logout confirmation modal
  hideLogoutConfirmationModal = () => {
    this.setState({
      logoutConfirmationVisibility: false,
    });
  };

  // Updated logout handler
  logoutHandler = () => {
    // Hide the logout confirmation modal
    this.hideLogoutConfirmationModal();

    // Perform logout action
    localStorage.removeItem("frontendUserInfo");
    window.location.reload();
  };

  render() {
    return (
      <>
        <div className="header-nav">
          <div className="container">
            <div className="row borderClass">
              <div className="col-md-3 col-sm-3 col-xs-8 padleft0">
                <div className="header_logo">
                  <Link to="/">
                    <img src={Logo} className="img-responsive" alt="image" />
                  </Link>
                </div>
              </div>

              <div className="hidden-lg hidden-md hidden-sm col-xs-4">
                <div className="navbar-header">
                  <button
                    type="button"
                    className="navbar-toggle headerHamMenu"
                    data-toggle="collapse"
                    data-target="#quickLH"
                  >
                    <i className="fa fa-bars" aria-hidden="true"></i>
                  </button>
                </div>
              </div>

              <div className="col-md-6 col-sm-6 col-xs-12">
                <div
                  className="sitemapH collapse-test navbar-collapse padleftright0"
                  id="quickLH"
                >
                  <div className="siteMiddle">
                    <ul className="sitemaphUl">
                      <li>
                        <Link to="/projects">Project</Link>
                      </li>
                      <li>
                        <Link to="/roadmaps">Roadmap</Link>
                      </li>
                      <li>
                        <Link to="/teams">Team</Link>
                      </li>
                      <li>
                        <Link to="/partners">Partner</Link>
                      </li>
                      <li>
                        <Link to="/contacts">Contact Us</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div
                className="col-md-3 col-sm-3 hidden-xs padright0"
                align="right"
              >
                <div className="logsingBTN">
                  <div className="dropdown">
                    <button
                      className="btn btn_gradiant dropdown-toggle"
                      type="button"
                      data-toggle="dropdown"
                    >
                      Robiatur Ryee
                      <span className="caret"></span>
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <a href="#">Profile</a>
                      </li>
                      <li>
                        <a href="#" data-toggle="modal" data-target="#myModal">
                          Logout
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal
          show={this.state.logoutConfirmationVisibility}
          onHide={this.hideLogoutConfirmationModal}
          class="modal-body"
          align="center"
        >
          <Modal.Body>
            <h4 className="modal-title mart30">Are you want to logout?</h4>

            <button
              type="submit"
              className="btn btn_gradiant"
              onClick={this.logoutHandler}
            >
              Yes{" "}
            </button>

            <span className="btnbrdrGrad">
              <button
                type="button"
                className="btn btn_gradiant_brdr"
                onClick={this.hideLogoutConfirmationModal}
              >
                No
              </button>
            </span>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default ProfileHeader;
