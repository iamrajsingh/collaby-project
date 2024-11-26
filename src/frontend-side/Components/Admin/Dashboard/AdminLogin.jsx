import React, { Component } from "react";

import { Link, Navigate } from "react-router-dom";
import apiService from "./../../../service/apiService";

class AdminLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLogin: true,
      showForgetPassword: false,
      loginSuccess: false,
      loginFailed: false,
      forgetSuccess: false,
      forgetTryAgain: false,
      forgetFailed: false,
      userName: "",
      password: "",
      showForgetSuccessMessage: false,
      successTimeout: null, // Added timeout state
      loginFailedTimeout: null,
    };
  }
  componentDidMount() {
    const alreadyLoggedIn = localStorage.getItem("loginSuccess");
    if (alreadyLoggedIn) {
      this.setState({ loginSuccess: true });
    }
  }

  handleForgetClick = () => {
    this.setState({
      showLogin: false,
      showForgetPassword: true,
    });
  };

  handleBackClick = () => {
    this.setState({
      showLogin: true,
      showForgetPassword: false,
    });
  };

  handleUserNameChange = (e) => {
    this.setState({
      userName: e.target.value,
    });
  };
  handlePassordChange = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  handleForgetSubmit = async (event) => {
    event.preventDefault();

    try {
      this.setState({
        showForgetSuccessMessage: true,
        forgetTryAgain: false,
        forgetFailed: false,
      });
      const successTimeout = setTimeout(() => {
        this.setState({
          showForgetSuccessMessage: false,
        });
      }, 2000);

      // Store the timeout ID in the component state
      this.setState({
        successTimeout,
      });
    } catch (error) {
      // Display failure message
      this.setState({
        showForgetSuccessMessage: false,
        forgetTryAgain: true,
        forgetFailed: true,
      });
    }
  };

  handleLogin = async (event) => {
    event.preventDefault();

    try {
      // const response = await axios.post(
      //   "https://workunderprogress.com/collably/admin/login",
      //   {},
      //   {
      //     params: {
      //       user_name: this.state.userName,
      //       password: this.state.password,
      //     },
      //   }
      // );
      // console.log("response", response);
      const response = await apiService.post("collably/admin/login", null, {
        user_name: this.state.userName,
        password: this.state.password,
      });

      if (response && response.status == 200) {
        localStorage.clear();
        localStorage.setItem("loginSuccess", true);
        this.setState({ loginSuccess: true, loginFailed: false });
      } else {
        this.setState({
          loginSuccess: false,
          loginFailed: true,
        });
      }
      // Set a timeout to hide the login failure popup after 2 seconds
      const loginFailedTimeout = setTimeout(() => {
        this.setState({
          loginFailed: false,
        });
      }, 2000);

      // Store the timeout ID in the component state
      this.setState({
        loginFailedTimeout,
      });
    } catch (error) {
      this.setState({
        loginSuccess: false,
        loginFailed: true,
      });
    }
  };

  componentWillUnmount() {
    // Clear the timeout when the component is unmounted
    const { successTimeout, loginFailedTimeout } = this.state;
    if (successTimeout) {
      clearTimeout(successTimeout);
    }
    if (loginFailedTimeout) {
      clearTimeout(loginFailedTimeout);
    }
  }

  render() {
    return (
      <div>
        {this.state.loginSuccess ? (
          <Navigate replace to="/admin/dashboard" />
        ) : null}
        <div className="loginSec">
          <div className="container">
            <div className="row">
              <div className="col-md-4 col-sm-4"></div>
              <div className="col-md-4 col-sm-4 col-xs-12">
                <div className="loginSecD">
                  {this.state.loginSuccess && (
                    <div className="alert alert-success LoginSuccMsg">
                      <strong>Authentication Successful!</strong>
                    </div>
                  )}
                  {this.state.loginFailed && (
                    <div className="alert alert-danger LoginFailedMsg">
                      <strong> Please Enter Correct Email or Password!</strong>
                    </div>
                  )}

                  <div
                    className="alert alert-danger ForgotFailed"
                    style={{ display: "none" }}
                  >
                    <strong>Please Enter Correct Email ID!</strong>
                  </div>
                  <div
                    className="alert alert-success ForgotSuccess"
                    style={{
                      display: this.state.showForgetSuccessMessage
                        ? "block"
                        : "none",
                    }}
                  >
                    <strong>Please Check Your Mail Box!</strong>
                  </div>
                  <div
                    className="alert alert-warning ForgotTryagain"
                    style={{ display: "none" }}
                  >
                    <strong>Please Try After Some Time!</strong>
                  </div>
                  <Link to="/admin/dashboard">
                    {/* <img
                      src={require("./../../../Images/logo.png")}
                      className="img-responsive"
                      style={{ display: "block" }}
                      alt=""
                    /> */}
                  </Link>

                  <div
                    className="loginSecDsub"
                    id="loginID"
                    style={{ display: this.state.showLogin ? "block" : "none" }}
                  >
                    {" "}
                    <h4>Login</h4>
                    <form id="login_form" method="post">
                      <div className="form-group">
                        <div className="input-group">
                          <span className="input-group-addon">
                            <i className="glyphicon glyphicon-user"></i>
                          </span>
                          <input
                            type="text"
                            className="form-control"
                            name="user_name"
                            placeholder="User Name"
                            required
                            onChange={this.handleUserNameChange}
                          />
                        </div>{" "}
                        <input type="hidden" name="login" value="user_login" />
                        <br />
                      </div>
                      <div className="form-group">
                        <div className="input-group">
                          <span className="input-group-addon">
                            <i className="glyphicon glyphicon-lock"></i>
                          </span>
                          <input
                            type="password"
                            className="form-control"
                            name="password"
                            placeholder="Password"
                            required
                            onChange={this.handlePassordChange}
                          />
                        </div>
                      </div>

                      <div className="clearfix"></div>
                      <button
                        // type="submit"
                        // name=""
                        className="btn btn-primary loginbtn"
                        onClick={this.handleLogin}
                      >
                        <i className="fa fa-sign-in" aria-hidden="true"></i>{" "}
                        Login
                      </button>
                      <button
                        className="btn btn-primary loginbtnload buttonload"
                        style={{ display: "none" }}
                      >
                        <i className="fa fa-spinner fa-spin"></i>Please Wait
                      </button>
                    </form>
                    <button
                      type="button"
                      onClick={this.handleForgetClick}
                      className="btn btn_forget pull-right"
                      style={{
                        background: "none",
                        border: "none",
                        color: "#337ab7",
                        fontWeight: "bold",
                        fontSize: "13px",
                      }}
                    >
                      Forget Password?
                    </button>
                  </div>

                  <div
                    className="loginSecDsub frgtSecD"
                    id="forgetPassD"
                    style={{
                      display: this.state.showForgetPassword ? "block" : "none",
                    }}
                  >
                    <h4>Forget Password</h4>
                    <form id="forget_form" method="post">
                      <div className="form-group">
                        <div className="input-group">
                          <span className="input-group-addon">
                            <i className="glyphicon glyphicon-envelope"></i>
                          </span>
                          <input
                            type="email"
                            className="form-control"
                            name="email"
                            placeholder="Email ID"
                            required
                          />
                        </div>
                        <input
                          type="hidden"
                          name="forgot"
                          value="forgot_pass"
                        />{" "}
                        <br />
                      </div>

                      <div className="clearfix"></div>
                      <button
                        type="submit"
                        name=""
                        className="btn btn-primary forget_button"
                        onClick={this.handleForgetSubmit}
                      >
                        <i
                          className="fa fa-paper-plane-o"
                          aria-hidden="true"
                        ></i>{" "}
                        Send
                      </button>
                      <button
                        className="btn btn-primary buttonload forgetload"
                        style={{ display: "none" }}
                      >
                        <i className="fa fa-spinner fa-spin"></i>Please Wait
                      </button>
                    </form>
                    <button
                      type="button"
                      onClick={this.handleBackClick}
                      className="btn btn_forget pull-right"
                      style={{
                        color: "#337ab7",
                        fontWeight: "bold",
                        fontSize: "13px",
                      }}
                    >
                      Back to Login?
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-sm-4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminLogin;
