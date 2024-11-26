import React, { Component } from "react";
import { Link, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// import "./../../Style/style1.css";
import "./../../Style/Style.css;";
import "@fortawesome/fontawesome-free/css/all.css";

class AdminHeader extends Component {
  state = {
    showDeleteConfirmation: false,
    isOpenHeaderMenuDropDown: false,
    isProfilePopupVisible: false,
    isPasswordVisible: false,
    isLogoutPopupVisible: false,
    profile: {
      name: "abc",
      phoneNumber: "123",
      email: "user@example.com",
    },
    password: {
      oldPassword: "1233",
      newPassword: "",
      cnfNewPassword: "",
    },
    loginSuccess: true,
  };

  handleLogoutConfirmed = () => {
    // Add logic for handling logout (e.g., clear session, redirect to login page)
    localStorage.removeItem("loginSuccess");
    this.setState({
      loginSuccess: false,
      isLogoutPopupVisible: false, // Close the logout popup
    });
  };

  handleLogoutCanceled = () => {
    // Close the logout popup
    this.setState({ isLogoutPopupVisible: false });
  };

  toggleDropdown = () => {
    this.setState((prevState) => ({
      isOpenHeaderMenuDropDown: !prevState.isOpenHeaderMenuDropDown,
    }));
  };

  toggleProfilePopup = () => {
    this.setState((prevState) => ({
      isProfilePopupVisible: !prevState.isProfilePopupVisible,
    }));
  };

  togglePasswordPopup = () => {
    this.setState((prevState) => ({
      isPasswordVisible: !prevState.isPasswordVisible,
    }));
  };

  toggleLogoutPopup = () => {
    this.setState((prevState) => ({
      isLogoutPopupVisible: !prevState.isLogoutPopupVisible,
    }));
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("profile")) {
      this.setState((prevState) => ({
        profile: {
          ...prevState.profile,
          [name.replace("profile_", "")]: value,
        },
      }));
    } else if (name.startsWith("password")) {
      this.setState((prevState) => ({
        password: {
          ...prevState.password,
          [name.replace("password_", "")]: value,
        },
      }));
    }
  };

  handleSaveProfile = () => {
    this.toggleProfilePopup();
  };

  // handleSavePassword = () => {
  //   console.log("Updated Password:", this.state.password);
  //   this.togglePasswordPopup();
  // };

  handleSavePassword = () => {
    const { oldPassword, newPassword, cnfNewPassword } = this.state.password;

    // Check if new password and confirm password match
    if (newPassword !== cnfNewPassword) {
      alert("New password and confirm password must match.");
      return;
    }

    // Continue with password update logic if passwords match
    this.togglePasswordPopup();
  };

  render() {
    const { isProfilePopupVisible, profile } = this.state;
    const { isPasswordVisible, password } = this.state;

    return (
      <div>
        {!this.state.loginSuccess ? (
          <Navigate replace to="/admin/login" />
        ) : null}
        <div className="topHeader">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-2 col-sm-2 col-xs-12">
                <div className="comLogo">
                  <Link to="/admin/dashboard">
                    <img
                      src={require("./../../Images/logo.png")}
                      className="img-responsive"
                      alt=""
                    />
                  </Link>
                </div>
              </div>
              <div className="col-md-5 col-sm-5"></div>
              <div className="col-md-3 col-sm-3 col-xs-12 padright0"></div>
              <div className="col-md-2 col-sm-2 col-xs-12">
                <div className="notiSec">
                  <ul>
                    <li className="dropdown open" title="Notifications">
                      <a
                        href="#"
                        className="dropdown-toggle"
                        data-toggle="dropdown"
                        onClick={this.toggleDropdown}
                      >
                        <i className="fa fa-cog" aria-hidden="true"></i>
                      </a>
                      {this.state.isOpenHeaderMenuDropDown && (
                        <ul className="dropdown-menu drpul">
                          <li>
                            <a
                              href="#"
                              data-toggle="modal"
                              data-target="#ProfileMoadal"
                              onClick={this.toggleProfilePopup}
                            >
                              Profile
                            </a>
                          </li>
                          {/* Profile modal pop-up */}
                          {isProfilePopupVisible && (
                            <div className="profile-modal">
                              <div className="profile-modal-content">
                                <span
                                  className="close"
                                  onClick={this.toggleProfilePopup}
                                >
                                  &times;
                                </span>
                                <h4>Profile Update</h4>
                                <div>
                                  <label htmlFor="profile_name">Name:</label>
                                  <input
                                    type="text"
                                    id="profile_name"
                                    name="profile_name"
                                    value={profile.name}
                                    onChange={this.handleInputChange}
                                  />
                                </div>
                                <div>
                                  <label htmlFor="profile_phoneNumber">
                                    Phone Number:
                                  </label>
                                  <input
                                    type="text"
                                    id="profile_phoneNumber"
                                    name="profile_phoneNumber"
                                    value={profile.phoneNumber}
                                    onChange={this.handleInputChange}
                                  />
                                </div>
                                <div>
                                  <label htmlFor="profile_email">Email:</label>
                                  <input
                                    type="text"
                                    id="profile_email"
                                    name="profile_email"
                                    value={profile.email}
                                    readOnly
                                  />
                                </div>
                                <div className="button-container">
                                  <button onClick={this.handleSaveProfile}>
                                    Save
                                  </button>

                                  <button onClick={this.toggleProfilePopup}>
                                    Close
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                          <li>
                            <a
                              href="#"
                              data-toggle="modal"
                              data-target="#ProfileMoadal"
                              onClick={this.togglePasswordPopup}
                            >
                              Change Password
                            </a>
                          </li>
                          {isPasswordVisible && (
                            <div className="profile-modal">
                              <div className="profile-modal-content">
                                <span
                                  className="close"
                                  onClick={this.togglePasswordPopup}
                                >
                                  &times;
                                </span>
                                <h4>Profile Password Update</h4>
                                <div>
                                  <label htmlFor="password_oldPassword">
                                    Old Password:
                                  </label>
                                  <input
                                    type="password"
                                    id="password_oldPassword"
                                    name="password_oldPassword"
                                    value={password.oldPassword}
                                    onChange={this.handleInputChange}
                                  />
                                </div>
                                <div>
                                  <label htmlFor="password_newPassword">
                                    New Password:
                                  </label>
                                  <input
                                    type="password"
                                    id="password_newPassword"
                                    name="password_newPassword"
                                    value={password.newPassword}
                                    onChange={this.handleInputChange}
                                  />
                                </div>
                                <div>
                                  <label htmlFor="password_cnfNewPassword">
                                    Confirm New Password:
                                  </label>
                                  <input
                                    type="password"
                                    id="password_cnfNewPassword"
                                    name="password_cnfNewPassword"
                                    value={password.cnfNewPassword}
                                    onChange={this.handleInputChange}
                                  />
                                </div>
                                <div className="button-container">
                                  <button onClick={this.handleSavePassword}>
                                    Save
                                  </button>

                                  <button onClick={this.togglePasswordPopup}>
                                    Close
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                          <li>
                            <a
                              href="#"
                              data-toggle="modal"
                              data-target="#ProfileMoadal"
                              onClick={this.toggleLogoutPopup}
                            >
                              Logout
                            </a>
                          </li>
                          {/* Logout modal pop-up */}
                          {this.state.isLogoutPopupVisible && (
                            <div className="popup" id="LogoutModal">
                              <div className="popup-content">
                                <span
                                  className="close"
                                  onClick={this.toggleLogoutPopup}
                                >
                                  &times;
                                </span>
                                <h4>Logout Confirmation</h4>
                                <p>Are you sure you want to logout?</p>
                                <div className="button1">
                                  <button onClick={this.handleLogoutConfirmed}>
                                    Logout
                                  </button>
                                  <button onClick={this.handleLogoutCanceled}>
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                        </ul>
                      )}
                    </li>
                  </ul>
                  <div className="clearfix"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminHeader;
