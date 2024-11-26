import React, { Component } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import apiService from "./../../service/apiService";
import LinkedInLoginButton from "./LinkedInOAuth";
import { projectsList } from "../../utils/ProjectList";

class ProjectList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: projectsList,
      filteredProjects: [],
      searchQuery: "",
      filterSectionShow: false,
      checkboxFormData: [],
      keywordCheckboxItems: {},
      selectedKeywords: [],
      user_id: null,
      loginModalVisibility: false,
      email: "",
      password: "",
      isForgotPassword: false,
      isLoading: false,
      errorMessage: null,
      successMessageVisible: false,
      timeoutId: null,
      // loginSuccess: false,
      loginFailed: false,
      forgotPasswordEmail: "",
      isProfileDropDownVisible: false,
      userInfo: null,

      forgotPasswordSuccessMsg: false,
    };
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

  handleLinkedInLoginSuccess = (data) => {
    // Handle successful LinkedIn login data
  };

  handleLinkedInLoginFailure = (error) => {
    // Handle failed LinkedIn login error
  };

  componentDidMount() {
    const frontendUserInfo = JSON.parse(
      localStorage.getItem("frontendUserInfo")
    );
    if (frontendUserInfo) {
      //When user is logged IN
      this.fetchProjectListsForLoggedInUser();
    } else {
      //when user is not logged in
      this.fetchProjectLists();
    }

    this.fetchCheckboxFormData();
    this.getUserInfo();
  }

  fetchProjectListsForLoggedInUser = async () => {
    try {
      const frontendUserInfo = JSON.parse(
        localStorage.getItem("frontendUserInfo")
      );
      //Ex. selectedKeywords = ['Web3 Infrastructure', 'Exchange', 'CEX']
      //Ex. el.project_keyword 'Web3 Infrastructure', 'Exchange', 'CEX'
      const projectKeywordsString = frontendUserInfo.target_project_keyword; //Ex.'Web3 Infrastructure', 'Exchange', 'CEX'
      const projectKeywordsArray = projectKeywordsString.split(","); //['Web3 Infrastructure', 'Exchange', 'CEX']

      //API for project list for logged in user
      const response = await apiService.get("front/project/filter", {
        filter: projectKeywordsArray,
      });

      const modifiedResponse = response?.data?.map((list) => {
        let socialIcon = "";
        let socialMediaLink = "";
        if (list.twitter) {
          socialIcon = "fa-square-x-twitter";
          socialMediaLink = "https://twitter.com/" + list.twitter;
        } else if (list.telegram) {
          socialIcon = "fa-telegram";
          socialMediaLink = "https://t.me/" + list.telegram;
        } else if (list.whatsapp) {
          socialIcon = "fa-square-whatsapp";
          socialMediaLink = "https://wa.me/" + list.whatsapp;
        }

        return {
          ...list,
          socialIcon,
          socialMediaLink,
        };
      });

      // Filter out items with empty data
      //
      const filteredLists = modifiedResponse?.filter(
        (list) => list.project_name
      );

      const sortedLists = filteredLists.sort((a, b) => b.p_id - a.p_id);

      //API for highlighted projects
      const highlightedProjects = await apiService.get(
        "front/project/for_register_user",
        {
          // user: 11,
          user: frontendUserInfo.p_id,
        }
      );

      let finalList = [...sortedLists];

      if (highlightedProjects.data && highlightedProjects.data.length > 0) {
        finalList = finalList.map((list) => {
          let isHighlighted = 0;
          const findHighlight = highlightedProjects.data.find(
            (el) => el.p_id == list.p_id
          );
          if (findHighlight && findHighlight.highlight == 1) {
            isHighlighted = 1;
          }
          return {
            ...list,
            highlight: isHighlighted,
          };
        });
      }
      // Update the state with the filtered and sorted lists
      this.setState({
        lists: finalList,
        filteredProjects: finalList, // Initially set filteredProjects to the entire list
      });
    } catch (error) {}
  };

  getUserInfo = () => {
    const frontendUserInfo = JSON.parse(
      localStorage.getItem("frontendUserInfo")
    );
    if (frontendUserInfo && frontendUserInfo.p_id) {
      //TODO:Set the user id in state
      this.setState({
        //user_id: frontendUserInfo.official_email_id, //TODO. To be replaced by user id. P_id is the project id not user id
        //user_id: 11,
        user_id: frontendUserInfo.p_id,
      });
    }
  };

  fetchProjectLists = async () => {
    try {
      const response = await apiService.get("front/project/");

      const modifiedResponse = response.data.map((list) => {
        let socialIcon = "";
        let socialMediaLink = "";
        if (list.twitter) {
          socialIcon = "fa-square-x-twitter";
          socialMediaLink = "https://twitter.com/" + list.twitter;
        } else if (list.telegram) {
          socialIcon = "fa-telegram";
          socialMediaLink = "https://t.me/" + list.telegram;
        } else if (list.whatsapp) {
          socialIcon = "fa-square-whatsapp";
          socialMediaLink = "https://wa.me/" + list.whatsapp;
        }

        return {
          ...list,
          socialIcon,
          socialMediaLink,
        };
      });

      // Filter out items with empty data
      //
      const filteredLists = modifiedResponse.filter(
        (list) => list.project_name
      );

      const sortedLists = filteredLists.sort((a, b) => b.p_id - a.p_id);
      const newData = sortedLists.slice(0, 25);

      // Update the state with the filtered and sorted lists
      this.setState({
        lists: newData,
        filteredProjects: newData, // Initially set filteredProjects to the entire list
      });
    } catch (error) {}
  };

  fetchCheckboxFormData = async () => {
    try {
      const frontendUserInfo = JSON.parse(
        localStorage.getItem("frontendUserInfo")
      );
      if (frontendUserInfo && frontendUserInfo.target_project_keyword) {
        const projectKeywords = frontendUserInfo.target_project_keyword; //Ex."Web3 Infrastructure,Exchange,CEX"
        const projectKeywordsArray = projectKeywords.split(","); //["Web3 Infrastructure","Exchange","CEX"]
        const optionsArray = projectKeywordsArray.map((el) => {
          return [el, false];
        });
        const checkboxOptions = Object.fromEntries(optionsArray);
        this.setState({
          keywordCheckboxItems: checkboxOptions,
        });
      }
    } catch (error) {}
  };

  //for hightlight data
  handleStarClick = async (projectId) => {
    if (!this.state.user_id) {
      //TODO:navigate to login
      return;
    }

    try {
      const response = await apiService.post("front/project/highlight", null, {
        p_id: projectId,
        user_id: this.state.user_id,
        //user_id: 11, //TODO: Dont know user ID
      });

      const filteredList = this.state.lists.map((list) =>
        list.p_id === projectId ? { ...list, highlight: !list.highlight } : list
      );
      this.setState({
        filteredProjects: filteredList,
        lists: filteredList,
      });
    } catch (error) {}
  };

  handleLoginInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleInputChange = (e) => {
    const searchQuery = e.target.value;
    const filteredProjects = this.state.lists.filter((list) => {
      const projectFields = [
        list.project_name,
        list.official_email_id,
        list.contact_name,
        list.description,
        list.website,
      ];

      // Check if the search query is present in any of the fields
      return projectFields
        .filter((field) => field) // Filter out null or undefined fields
        .some((field) =>
          field.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    this.setState({ searchQuery, filteredProjects });
  };

  showHideFilterSection = () => {
    this.setState({
      filterSectionShow: !this.state.filterSectionShow,
    });
  };

  handleCheckboxChange = (option) => {
    const { keywordCheckboxItems } = this.state;

    // Toggle the checkbox value
    keywordCheckboxItems[option] = !keywordCheckboxItems[option];

    // Update the selected values array based on checked keywordCheckboxItems
    const updatedSelectedValues = Object.keys(keywordCheckboxItems).filter(
      (checkbox) => keywordCheckboxItems[checkbox]
    );

    this.setState({
      keywordCheckboxItems,
      selectedKeywords: updatedSelectedValues,
    });
  };

  filterProjectsByKeywords = async (e) => {
    e.preventDefault();
    const { selectedKeywords } = this.state;
    if (selectedKeywords && selectedKeywords.length > 0) {
      try {
        //Ex. selectedKeywords = ['Web3 Infrastructure', 'Exchange', 'CEX']
        //Ex. el.project_keyword 'Web3 Infrastructure', 'Exchange', 'CEX'

        const response = await apiService.get("front/project/filter", {
          filter: selectedKeywords,
        });

        const modifiedResponse = response.data.map((list) => {
          let socialIcon = "";
          let socialMediaLink = "";
          if (list.twitter) {
            socialIcon = "fa-twitter";
            socialMediaLink = "https://twitter.com/" + list.twitter;
          } else if (list.telegram) {
            socialIcon = "fa-telegram";
            socialMediaLink = "https://t.me/" + list.telegram;
          } else if (list.whatsapp) {
            socialIcon = "fa-whatsapp";
            socialMediaLink = "https://wa.me/" + list.whatsapp;
          }

          return {
            ...list,
            socialIcon,
            socialMediaLink,
          };
        });

        // Filter out items with empty data
        //
        const filteredLists = modifiedResponse.filter(
          (list) => list.project_name
        );

        const sortedLists = filteredLists.sort((a, b) => b.p_id - a.p_id);

        // Update the state with the filtered and sorted lists
        this.setState({
          lists: sortedLists,
          filteredProjects: sortedLists, // Initially set filteredProjects to the entire list
        });
      } catch (error) {}
    } else {
      //when no no keyword selected in filter
      //return all for that logged in user
      this.fetchProjectListsForLoggedInUser();
    }
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
        // window.location.assign("/");
        // Reset the form and show the success popup
        this.setState({
          email: "",
          password: "",
          isLoading: false,
          successMessageVisible: true,
          errorMessage: null,
          // loginSuccess: true,
          loginFailed: false,
          loginModalVisibility: false,
        });
      } else {
        // Handle error, e.g., show an error message
        this.setState({
          errorMessage: "Invalid credentials. Please try again.",
          successMessageVisible: false, // Hide success message on failed login
          // loginSuccess: false,
          loginFailed: true,
        });
      }
    } catch (error) {
      this.setState({
        errorMessage: "An error occurred. Please try again later.",
        successMessageVisible: false, // Hide success message on error
        // loginSuccess: false,
        loginFailed: true,
      });
    }
  };

  onChangeForgotPasswordEmail = (e) => {
    this.setState({
      forgotPasswordEmail: e.target.value,
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

        this.setState({ forgotPasswordSuccessMsg: true });
      } else {
        // Handle error, e.g., show an error message
        this.setState({ forgotPasswordSuccessMsg: false });
      }
    } catch (error) {
      // Handle error, e.g., show an error message
      this.setState({ forgotPasswordSuccessMsg: false });
    }
  };

  render() {
    const { filteredProjects, searchQuery, filterSectionShow, user_id } =
      this.state;

    return (
      <div>
        <div className="projrctMain-Sec">
          <div className="container">
            <div className="row">
              <div className="col-md-4 col-sm-4 col-xs-12">
                <div className="searchProject">
                  <form>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={this.handleInputChange}
                      />
                      <div className="input-group-btn">
                        <button className="btn btn-default" type="submit">
                          <i className="fa fa-search" aria-hidden="true"></i>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              {user_id && (
                <div className="col-md-8 col-sm-8 col-xs-12">
                  <div
                    className="projectFilter-btnD"
                    style={{ textAlign: "right" }}
                  >
                    <span className="btnbrdrGrad">
                      <button type="button" className="btn btn_gradiant_brdr">
                        <i className="fa fa-star-o" aria-hidden="true"></i>{" "}
                        Highlight
                      </button>
                    </span>
                    <span className="btnbrdrGrad">
                      <button
                        type="button"
                        className="btn btn_gradiant_brdr"
                        id="filterBtnid"
                        onClick={this.showHideFilterSection}
                      >
                        <i className="fa fa-filter" aria-hidden="true"></i>{" "}
                        Filter
                      </button>
                    </span>
                  </div>
                </div>
              )}
              {!user_id && (
                <div className="col-md-8 col-sm-8 col-xs-12">
                  <div
                    className="projectFilter-btnD"
                    style={{ textAlign: "right" }}
                  >
                    <span className="btnbrdrGrad">
                      <button
                        type="button"
                        className="btn btn_gradiant_brdr"
                        onClick={this.showLoginModalHandler}
                      >
                        <i className="fa fa-star-o" aria-hidden="true"></i>{" "}
                        Highlight
                      </button>
                    </span>
                    <span className="btnbrdrGrad">
                      <button
                        className="btn btn_gradiant_brdr"
                        onClick={this.showLoginModalHandler}
                      >
                        <i className="fa fa-filter" aria-hidden="true"></i>
                        Filter
                      </button>
                    </span>
                  </div>
                </div>
              )}

              <div className="col-md-12 col-sm-12 col-xs-12">
                {filterSectionShow && (
                  <div className="filtermegamenuD" id="filtermegamenuD">
                    <div className="filterSubD">
                      <h4>Target Keyword</h4>
                      <hr />

                      <form onSubmit={this.filterProjectsByKeywords}>
                        {Object.keys(this.state.keywordCheckboxItems).map(
                          (option) => (
                            <label key={option} className="checkstyle">
                              {option}
                              <input
                                type="checkbox"
                                checked={
                                  this.state.keywordCheckboxItems[option]
                                }
                                onChange={() =>
                                  this.handleCheckboxChange(option)
                                }
                              />
                              <span className="checkmark"></span>
                            </label>
                          )
                        )}

                        <div className="clearfix"></div>
                        <button
                          className="btn btn_gradiant pull-right"
                          type="submit"
                        >
                          Submit
                        </button>
                        <div className="clearfix"></div>
                      </form>
                    </div>
                  </div>
                )}
              </div>

              <div className="col-md-12 col-sm-12 col-xs-12">
                <div className="projectTableD table-responsive catby">
                  <table className="table">
                    <thead>
                      <tr>
                        <th style={{ width: "1%" }}></th>
                        <th style={{ width: "2%" }}>#</th>
                        <th style={{ width: "15%" }}>
                          <i className="fa fa-suitcase" aria-hidden="true"></i>{" "}
                          Project
                        </th>
                        <th style={{ width: "18%" }}>
                          <i className="fa fa-list-ul" aria-hidden="true"></i>{" "}
                          Keywords
                        </th>
                        <th style={{ width: "28%" }}>
                          <i
                            className="fa fa-align-left"
                            aria-hidden="true"
                          ></i>{" "}
                          Description
                        </th>
                        <th style={{ width: "10%" }}>
                          <i className="fa fa-link" aria-hidden="true"></i>{" "}
                          Website
                        </th>
                        <th style={{ width: "15%" }}>
                          <i
                            className="fa fa-envelope-o"
                            aria-hidden="true"
                          ></i>{" "}
                          Email ID
                        </th>
                        <th style={{ width: "15%" }}>
                          <i className="fa fa-user-o" aria-hidden="true"></i>{" "}
                          Contact Person
                        </th>
                        <th style={{ width: "1%" }}>
                          <i
                            // className="fa-solid fa-users"
                            className="fa-solid fa-link"
                            aria-hidden="true"
                          ></i>

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
                                <div
                                  className="alert alert-danger"
                                  role="alert"
                                >
                                  {this.state.errorMessage}
                                </div>
                              )}

                              {this.state.successMessageVisible && (
                                <div
                                  className="alert alert-success"
                                  role="alert"
                                >
                                  Login Successful
                                </div>
                              )}
                              <div className="regisModalD" id="logID">
                                <div className="row">
                                  <div className="col-md-7 col-sm-7 col-xs-12 padleftright0">
                                    {!this.state.isForgotPassword && (
                                      <div
                                        className="regisModalDform"
                                        id="regisModalDform"
                                      >
                                        <h3>Login</h3>

                                        <form
                                          method="post"
                                          id="LoginForm"
                                          onSubmit={this.handleSubmit}
                                        >
                                          <div className="form-group">
                                            <label htmlFor="email">
                                              Username:
                                            </label>
                                            <input
                                              type="username"
                                              name="email"
                                              className="form-control"
                                              id="email"
                                              placeholder="Enter Username"
                                              value={this.state.email}
                                              onChange={
                                                this.handleLoginInputChange
                                              }
                                              required
                                            />
                                          </div>
                                          <div className="form-group">
                                            <label htmlFor="password">
                                              Password:
                                            </label>
                                            <input
                                              type="password"
                                              name="password"
                                              className="form-control"
                                              id="password"
                                              placeholder="Enter Password"
                                              value={this.state.password}
                                              onChange={
                                                this.handleLoginInputChange
                                              }
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
                                            <LinkedInLoginButton
                                              handleSuccess={
                                                this.handleLinkedInLoginSuccess
                                              }
                                              handleFailure={
                                                this.handleLinkedInLoginFailure
                                              }
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
                                          onSubmit={
                                            this.handleForgotPasswordSubmit
                                          }
                                          novalidate="novalidate"
                                        >
                                          <div className="form-group">
                                            <label htmlFor="email">
                                              Email ID:
                                            </label>
                                            <input
                                              name="email"
                                              type="email"
                                              className="form-control"
                                              id="email"
                                              placeholder="Enter Email ID"
                                              value={
                                                this.state.forgotPasswordEmail
                                              }
                                              onChange={
                                                this.onChangeForgotPasswordEmail
                                              }
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
                                        {this.state
                                          .forgotPasswordSuccessMsg && (
                                          <div
                                            class="alert alert-success"
                                            role="alert"
                                          >
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
                                    <div
                                      className="regisModalDtext"
                                      align="center"
                                    >
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
                            size="sm"
                            show={this.state.logoutConfirmationVisibility}
                            onHide={this.hideLogoutConfirmationModal}
                          >
                            <Modal.Body>
                              <h4 className="modal-title mart30">
                                Do you want to logout?
                              </h4>

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
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {projectsList &&
                        projectsList.map((list, index) => (
                          <tr key={list.p_id}>
                            {user_id && (
                              <td>
                                <i
                                  className={`fa ${
                                    list.highlight
                                      ? "fa-star highlightStar"
                                      : "fa-star-o"
                                  }`}
                                  aria-hidden="true"
                                  onClick={() =>
                                    this.handleStarClick(list.p_id)
                                  }
                                ></i>
                              </td>
                            )}

                            {!user_id && (
                              <td>
                                <i
                                  className={`fa ${
                                    list.highlight
                                      ? "fa-star highlightStar"
                                      : "fa-star-o"
                                  }`}
                                  aria-hidden="true"
                                  onClick={this.showLoginModalHandler}
                                ></i>
                              </td>
                            )}

                            <td>{index + 1}.</td>
                            <td>
                              <Link to="#" className="proTitle">
                                {" "}
                                {list.project_name}
                              </Link>
                            </td>

                            <td>
                              <span className="proTblKye">
                                {list.project_keyword
                                  .split(",")
                                  .map((keyword, index) => (
                                    <span className="btnbrdrGrad" key={index}>
                                      <Link to="#" className="btn btn_keyword">
                                        {keyword.trim()}
                                      </Link>
                                    </span>
                                  ))}
                              </span>
                            </td>

                            <td>
                              <span className="proTblDes">
                                {list.description.slice(0, 300)}
                              </span>
                            </td>
                            <td>{list.website}</td>
                            <td>{list.official_email_id}</td>
                            <td>{list.contact_name}</td>

                            {user_id && (
                              <td>
                                <Link
                                  to={`${list.socialMediaLink}`}
                                  target="_blank"
                                  className="sid"
                                >
                                  <i
                                    className={`fa ${list.socialIcon}`}
                                    aria-hidden="true"
                                  ></i>
                                </Link>
                              </td>
                            )}

                            {!user_id && (
                              <td className="sid">
                                <i
                                  className={`fa ${list.socialIcon}`}
                                  aria-hidden="true"
                                  onClick={this.showLoginModalHandler}
                                ></i>
                              </td>
                            )}
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProjectList;
