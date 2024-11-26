import React, { Component } from "react";
import { Link } from "react-router-dom";

class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }
  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
  };

  render() {
    return (
      <>
        <div id="myModal" className="modal fade" role="dialog">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-body modalback">
                {/* <button type="submit" className="close" data-dismiss="modal"> */}
                <button type="submit" className="close">
                  ×
                </button>

                <div className="regisModalD" id="logID">
                  <div className="">
                    <div className="col-md-7 col-sm-7 col-xs-12 padleftright0">
                      <div
                        className="regisModalDform"
                        id="regisModalDform"
                        // style=""
                      >
                        <h3>Login</h3>
                        <div className="clearfix"></div>

                        <form
                          method="post"
                          id="LoginForm"
                          onSubmit={this.handleSubmit}
                        >
                          <div className="form-group">
                            <label htmlFor="email">Username:</label>
                            <input
                              type="email"
                              name="email"
                              className="form-control"
                              id="email"
                              placeholder="Enter Username"
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
                          {/* <a href="javascript:void(0);" id="OpenForgot">
                            Forgot Password?
                          </a> */}
                          <br />
                          <br />
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
                        </form>

                        <div className="clearfix"></div>

                        <div className="col-md-12 col-sm-12 col-xs-12">
                          <hr />
                        </div>
                        <div className="col-md-6 col-sm-6 col-xs-6 padleft0">
                          <a
                            href="javascript:void(0);"
                            onclick="FBLogin();"
                            className="btn facebook_btn width100"
                          >
                            <i
                              className="fa fa-facebook"
                              aria-hidden="true"
                            ></i>{" "}
                            Facebook Login
                          </a>
                        </div>
                        <div className="col-md-6 col-sm-6 col-xs-6 padright0">
                          <div id="gSignInWrapper" className="Log_gole">
                            <div id="customBtn" className="customGPlusSignIn">
                              <a
                                href="javascript:void(0);"
                                className="btn google_btn width100"
                              >
                                <i
                                  className="fa fa-google-plus"
                                  aria-hidden="true"
                                ></i>{" "}
                                Google Login
                              </a>
                            </div>
                          </div>
                          <div id="name"></div>
                          <script>startApp();</script>
                        </div>

                        <div className="clearfix"></div>
                      </div>
                      <div
                        // className="regisModalDform nodisplay"
                        id="ForgotModalDform"
                        // style="display: none;"
                      >
                        <h3>Forgot Password</h3>
                        <div className="clearfix"></div>
                        <form
                          id="ForgotForm"
                          method="post"
                          // novalidate="novalidate"
                        >
                          <div className="form-group">
                            <label htmlFor="fmail">Email ID:</label>
                            <input
                              type="email"
                              className="form-control"
                              id="fmail"
                              placeholder="Enter Email ID"
                              required
                            />
                          </div>
                          {/* <button
                            type="submit"
                            className="btn btn_gradiant forgot_button"
                          >
                            Submit
                          </button> */}
                        </form>
                        <br />
                        <a href="javascript:void(0);" id="OpenLogin">
                          Back To Login
                        </a>
                      </div>
                    </div>
                    <div className="col-md-5 col-sm-5 col-xs-12 padleftright0">
                      <div className="regisModalDtext" align="center">
                        <h3>Register</h3>
                        <p>Don’t have an account? Sign Up</p>
                        <br />

                        <Link to="/register" className="btn btn_whitebrdr">
                          Register
                        </Link>
                      </div>
                    </div>
                    <div className="clearfix"></div>
                  </div>
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
  }
}

export default LoginModal;
