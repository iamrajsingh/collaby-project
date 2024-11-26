import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import "./../Style/Style.css";
import "./../Style/Custom.css";
import "./../Style/Animate.css";

import Logo from "../Images/logo.svg";
import apiService from "./../../service/apiService";
import LinkedInLoginButton from "./LinkedInOAuth";
import Swal from "sweetalert2";

class Header extends Component {
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
    isProfileDropDownVisible: false,
    userInfo: null,
    isMenuOpen: false,
    forgotPasswordSuccessMsg: false,
  };

  componentDidMount() {
    const loggedInUserInfo = JSON.parse(
      localStorage.getItem("frontendUserInfo")
    );

    if (loggedInUserInfo && loggedInUserInfo.p_id) {
      this.setState({
        loginSuccess: true,
        userInfo: loggedInUserInfo,
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

  toggleMenu = () => {
    this.setState((prevState) => ({
      isMenuOpen: !prevState.isMenuOpen,
    }));
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
        //window.location.assign("/#/projects");

        // Reset the form and show the success popup
        this.setState({
          email: "",

          password: "",
          isLoading: false,
          successMessageVisible: false,
          errorMessage: null,
          loginSuccess: false,
          loginFailed: false,
          loginModalVisibility: false,
        });

        Swal.fire({
          icon: 'success',
          title: "Logged In Successfully.",
          showConfirmButton: false,
          timer: 2500
        });

        setTimeout(() => {
          window.location.assign("/");
        }, 2400)

      } else {
        // Handle error, e.g., show an error message
        this.setState({
          //errorMessage: "Invalid credentials. Please try again.",
          successMessageVisible: false, // Hide success message on failed login
          loginSuccess: false,
          loginFailed: true,
        });
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Please enter correct Email or Password !',
        });

        // Set a timeout to clear the error message after a certain time
        const timeoutId = setTimeout(() => {
          this.setState({
            errorMessage: null,
            loginFailed: false,
          });
        }, 3000); // Adjust the timeout duration as needed

        // Save the timeoutId in the state for clearing it later
        this.setState({
          timeoutId,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'An error occurred. Please try again later.',
      });
      this.setState({
        //errorMessage: "An error occurred. Please try again later.",
        successMessageVisible: false, // Hide success message on error
        loginSuccess: false,
        loginFailed: true,
      });
    }
  };

  //   e.preventDefault();

  //   const formData = {
  //     email: this.state.email,
  //     password: this.state.password,
  //   };

  //   try {
  //     const response = await apiService.post(
  //       "collably/front/users/login",
  //       null,
  //       formData
  //     );

  //     if (response.status === "200") {
  //       localStorage.removeItem("frontendUserInfo");
  //       localStorage.setItem("frontendUserInfo", JSON.stringify(response.data));

  //       // Redirect to "/projects" after successful login
  //       window.location.assign("/#/projects");

  //       // Reset the form and show the success popup
  //       this.setState({
  //         email: "",
  //         password: "",
  //         isLoading: false,
  //         successMessageVisible: true,
  //         errorMessage: null,
  //         loginSuccess: true,
  //         loginFailed: false,
  //         loginModalVisibility: false,
  //       });
  //     } else {
  //       // Handle error, e.g., show an error message
  //       console.error("Failed to Login");
  //       this.setState({
  //         errorMessage: "Invalid credentials. Please try again.",
  //         successMessageVisible: false, // Hide success message on failed login
  //         loginSuccess: false,
  //         loginFailed: true,
  //       });

  //       // Set a timeout to clear the error message after a certain time
  //       const timeoutId = setTimeout(() => {
  //         this.setState({
  //           errorMessage: null,
  //           loginFailed: false,
  //         });
  //       }, 5000); // Adjust the timeout duration as needed

  //       // Save the timeoutId in the state for clearing it later
  //       this.setState({
  //         timeoutId,
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Error occurred:", error);
  //     this.setState({
  //       errorMessage: "An error occurred. Please try again later.",
  //       successMessageVisible: false, // Hide success message on error
  //       loginSuccess: false,
  //       loginFailed: true,
  //     });
  //   }
  // };

  // handleFacebookClick = () => {
  //   window.open("https://www.facebook.com", "_blank");
  // };

  // handleGoogleClick = () => {
  //   window.open("https://www.google.com", "_blank");
  // };

  onChangeForgotPasswordEmail = (e) => {
    this.setState({
      forgotPasswordEmail: e.target.value,
    });
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
    Swal.fire({
      icon: 'success',
      title: 'Logged out successfully.',
      showConfirmButton: false,
      timer: 3000
    });
    setTimeout(() => {
      window.location.reload();
    }, 3000);

  };

  toggleProfileMenu = () => {
    this.setState({
      isProfileDropDownVisible: !this.state.isProfileDropDownVisible,
    });
  };

  handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      email: this.state.forgotPasswordEmail,
    };

    try {
      const response = await apiService.post(
        "front/users/forgot_password",
        null,
        formData
      );

      if (response.status === "200") {
        // Handle success, e.g., show a success message
        Swal.fire({
          icon: 'success',
          title: 'Please check your Email',
          showConfirmButton: false,
          timer: 2000
        });

        this.setState({ forgotPasswordSuccessMsg: false });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Please Enter Correct Email ID.',
        });
        // Handle error, e.g., show an error message
        this.setState({ forgotPasswordSuccessMsg: false });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      });
      // Handle error, e.g., show an error message
      this.setState({ forgotPasswordSuccessMsg: false });
    }
  };

  handleLinkedInLoginSuccess = (data) => {
    // Handle successful LinkedIn login data
  };

  handleLinkedInLoginFailure = (error) => {
    // Handle failed LinkedIn login error
  };

  render() {
    const { isMenuOpen } = this.state;

    return (
      <div>
        <div className="header-nav">
          <div className="container">
            <div className="row borderClass">
              <div className="col-md-3 col-sm-5 col-6 padleft0">
                <div className="header_logo">
                  <Link to="/">
                    <img src={Logo} className="img-fluid" alt="" />
                  </Link>
                </div>
              </div>

              {!this.state.loginSuccess && (
                <div className="col-sm-5 col-4 hidden-lg" style={{ textAlign: "right" }}>
                  <div className="logsingBTN">
                    <a
                      href="javascript:void(0)"
                      className="btn btn_gradiant"
                      onClick={this.showLoginModalHandler}
                    >
                      Login
                    </a>
                    {/* <Link to="/register" className="btn btn_gradiant">
                      Sign up
                    </Link> */}
                  </div>
                </div>
              )}
              {this.state.loginSuccess && (
                <div className="col-sm-5 col-4 hidden-lg padright0" align="right">
                  <div className="logsingBTN">
                    <div className="dropdown">
                      <button
                        className="btn btn_gradiant dropdown-toggle"
                        type="button"
                        data-toggle="dropdown"
                        onClick={this.toggleProfileMenu}
                      >
                        {this.state?.userInfo?.project_name}
                        <span className="caret"></span>
                      </button>
                      {this.state.isProfileDropDownVisible && (
                        <ul className="profile-drop-down dropdown-menu">
                          <li>
                            <Link to="/profile">Profile</Link>
                          </li>
                          <li>
                            <a
                              href="javascript:void(0);"
                              data-toggle="modal"
                              data-target="#myModal"
                              onClick={this.showLogoutConfirmationModal}
                            >
                              Logout
                            </a>
                          </li>
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <div className="hidden-lg col-sm-2 col-2">
                <div className="navbar-header">
                  <button
                    type="button"
                    className="navbar-toggle headerHamMenu navbar-toggle-custom"
                    data-toggle="collapse"
                    data-target="#quickLH"
                    onClick={this.toggleMenu}
                  >
                    <i className="fa fa-bars" aria-hidden="true"></i>
                  </button>
                </div>
              </div>

              <div className="col-md-7 col-12">
                <div
                  className={`sitemapH collapse-test navbar-collapse padleftright0 ${isMenuOpen ? "open" : ""
                    }`}
                  id="quickLH"
                >
                  {/* className="sitemapH collapse-test navbar-collapse padleftright0  ${this.state.isMenuOpen ? 'open' : ''}" */}

                  <div className="siteMiddle">
                    {/* <ul className={isMenuOpen ? "open" : ""}> */}
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
                      {/* <li>
                        <Link to="/pricing">Pricing</Link>
                      </li> */}
                      <li>
                        <Link to="/contacts">Contact Us</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {!this.state.loginSuccess && (
                <div
                  className="col-md-2 hidden-xs padright0"
                  style={{ textAlign: "right" }}
                >
                  <div className="logsingBTN">
                    <a
                      href="javascript:void(0)"
                      className="btn btn_gradiant"
                      onClick={this.showLoginModalHandler}
                    >
                      Login
                    </a>
                    {/* <Link to="/register" className="btn btn_gradiant">
                      Sign up
                    </Link> */}
                  </div>
                </div>
              )}
              {this.state.loginSuccess && (
                <div
                  className="col-md-2 hidden-xs padright0"
                  align="right"
                >
                  <div className="logsingBTN">
                    <div className="dropdown">
                      <button
                        className="btn btn_gradiant dropdown-toggle"
                        type="button"
                        data-toggle="dropdown"
                        onClick={this.toggleProfileMenu}
                      >
                        {this.state?.userInfo?.project_name}
                        <span className="caret"></span>
                      </button>
                      {this.state.isProfileDropDownVisible && (
                        <ul className="profile-drop-down dropdown-menu">
                          <li>
                            <Link to="/profile">Profile</Link>
                          </li>
                          <li>
                            <a
                              href="javascript:void(0);"
                              data-toggle="modal"
                              data-target="#myModal"
                              onClick={this.showLogoutConfirmationModal}
                            >
                              Logout
                            </a>
                          </li>
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <Modal
            show={this.state.loginModalVisibility}
            size="lg"
            onHide={this.hideLoginModalHandler}
          >
            <Modal.Body className="modalback">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                onClick={this.hideLoginModalHandler}
              >
                ×
              </button>

              {this.state.errorMessage && (
                <div className="alert alert-danger" role="alert">
                  {this.state.errorMessage}
                </div>
              )}

              {this.state.successMessageVisible && (
                <div className="alert alert-success" role="alert">
                  Login Successful
                </div>
              )}
              <div className="regisModalD" id="logID">
                <div className="row">
                  <div className="col-md-7 col-sm-7 col-xs-12 padleftright0">
                    {!this.state.isForgotPassword && (
                      <div className="regisModalDform" id="regisModalDform">
                        <h3>Login</h3>

                        <form
                          method="post"
                          id="LoginForm"
                          onSubmit={this.handleSubmit}
                        >
                          <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input
                              type="username"
                              name="email"
                              className="form-control"
                              id="email"
                              placeholder="Enter Email ID"
                              value={this.state.email}
                              onChange={this.handleInputChange}
                              required
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <input
                              type="password"
                              name="password"
                              className="form-control"
                              id="password"
                              placeholder="Enter Password"
                              value={this.state.password}
                              onChange={this.handleInputChange}
                              required
                            />
                          </div>
                          <a
                            href="javascript:void(0);"
                            id="OpenForgot"
                            onClick={this.forgotPasswordHandler}
                          >
                            Forgot Password?
                          </a>

                          <div className="row">
                            <div className="col">
                              <button
                                type="submit"
                                className="btn btn_gradiant login_button"
                              >
                                <span>Login</span>{" "}
                                <i
                                  className="fa fa-paper-plane"
                                  aria-hidden="true"
                                ></i>
                              </button>
                            </div>
                          </div>
                        </form>

                        <div className="col-md-12 col-sm-12 col-xs-12">
                          <hr />
                        </div>

                        <div className="row">
                          <div className="col" align="center">
                            {/* <Link
                              to="https://www.linkedin.com"
                              className="btn facebook_btn width100"
                              target="_blank"
                            >
                              <i
                                className="fa-brands fa-linkedin"
                                aria-hidden="true"
                                style={{ marginRight: "10px" }}
                              ></i>
                              Linkedin Login
                            </Link> */}
                            <LinkedInLoginButton
                              handleSuccess={this.handleLinkedInLoginSuccess}
                              handleFailure={this.handleLinkedInLoginFailure}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    {this.state.isForgotPassword && (
                      <div
                        className="regisModalDform nodisplay"
                        id="ForgotModalDform"
                      >
                        <h3>Forgot Password</h3>
                        <div className="clearfix"></div>
                        <form
                          id="ForgotForm"
                          method="post"
                          onSubmit={this.handleForgotPasswordSubmit}
                          novalidate="novalidate"
                        >
                          <div className="form-group">
                            <label htmlFor="email">Email ID:</label>
                            <input
                              name="email"
                              type="email"
                              className="form-control"
                              id="email"
                              placeholder="Enter Email ID"
                              value={this.state.forgotPasswordEmail}
                              onChange={this.onChangeForgotPasswordEmail}
                              required
                            />
                          </div>

                          <div className="form-group">
                            <button
                              type="submit"
                              className="btn btn_gradiant forgot_button"
                            >
                              Submit
                            </button>
                          </div>
                        </form>
                        <br />
                        {this.state.forgotPasswordSuccessMsg && (
                          <div class="alert alert-success" role="alert">
                            Please check your Email!
                          </div>
                        )}

                        <br />
                        <a
                          href="javascript:void(0);"
                          id="OpenLogin"
                          onClick={this.forgotPasswordHandler}
                        >
                          Back To Login
                        </a>
                      </div>
                    )}
                  </div>
                  <div className="col-md-5 col-sm-5 col-xs-12 padleftright0">
                    <div className="regisModalDtext" align="center">
                      <h3>Register</h3>
                      <p>
                        Don’t have an account? <br></br> Sign Up
                      </p>
                      <br />

                      <Link
                        to="/register"
                        className="btn btn_whitebrdr"
                        onClick={this.hideLoginModalHandler}
                      >
                        Register
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </Modal.Body>
          </Modal>

          <Modal
            size="md"
            show={this.state.logoutConfirmationVisibility}
            onHide={this.hideLogoutConfirmationModal}
          >
            <Modal.Body align="center">
              <h4 className="modal-title mart30">Do you want to logout?</h4>

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
        </div>
      </div>
    );
  }
}

export default Header;
