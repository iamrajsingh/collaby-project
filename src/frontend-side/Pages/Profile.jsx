import React, { useState, useEffect } from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import apiService from "./../../service/apiService";
import { Modal } from "react-bootstrap";
import CountryDropdown from "../Components/Admin/CountryDropdown";
import ProjectDropdown from "../Components/Admin/ProjectDropdown";
import TargetKeywordDropdown from "../Components/Admin/TargetKeywordDropdown";
import Swal from "sweetalert2";

const Profile = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [project_name, setProjectName] = useState("");
  const [website, setWebsite] = useState("");
  const [country, setCountry] = useState("");
  const [official_email_id, setOfficialEmailId] = useState("");
  const [description, setDescription] = useState("");
  const [project_keyword, setProjectKeyword] = useState("");
  const [target_project_keyword, setTargetProjectKeyword] = useState("");
  const [contact_name, setContactName] = useState("");
  const [contact_number, setContactNumber] = useState("");
  const [show_contact_details, setShowContactDetails] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [telegram, setTelegram] = useState("");
  const [twitter, setTwitter] = useState("");
  const [p_id, setPId] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [reenterPassword, setReenterPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [isProfileTabEnabled, setIsProfileTabEnabled] = useState(true);
  const [isSecurityTabEnabled, setIsSecurityTabEnabled] = useState(false);
  const [logoutConfirmationVisibility, setLogoutConfirmationVisibility] =
    useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  useEffect(() => {
    const loggedInUserInfo = JSON.parse(
      localStorage.getItem("frontendUserInfo")
    );

    if (loggedInUserInfo) {
      setProjectName(loggedInUserInfo.project_name);
      setWebsite(loggedInUserInfo.website);
      setCountry(loggedInUserInfo.country);
      setOfficialEmailId(loggedInUserInfo.official_email_id);
      setDescription(loggedInUserInfo.description);
      setProjectKeyword(loggedInUserInfo.project_keyword);
      setTargetProjectKeyword(loggedInUserInfo.target_project_keyword);
      setContactName(loggedInUserInfo.contact_name);
      setContactNumber(loggedInUserInfo.contact_number);
      setWhatsapp(loggedInUserInfo.whatsapp);
      setTwitter(loggedInUserInfo.twitter);
      setTelegram("t.me/" + loggedInUserInfo.telegram);
      setShowContactDetails(loggedInUserInfo.show_contact_details);
      setPId(loggedInUserInfo.p_id);
      setUserInfo(loggedInUserInfo);
    }
  }, []);

  const onProjectChange = (e) => {
    setProjectName(e.target.value);
  };

  const onWebsiteChange = (e) => {
    setWebsite(e.target.value);
  };

  const onCountryChange = (e) => {
    setCountry(e);
  };

  const onEmailChange = (e) => {
    setOfficialEmailId(e.target.value);
  };

  const onDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const onProjectKeywordChange = (values) => {
    const keywordsArr = values?.map((el) => el.value);
    const keywordsStr = keywordsArr.join(",");
    setProjectKeyword(keywordsStr);
  };

  const onTargetChange = (values) => {
    const keywordsArr = values?.map((el) => el.value);
    const keywordsStr = keywordsArr.join(",");
    setTargetProjectKeyword(keywordsStr);
  };

  const onContactnmChange = (e) => {
    setContactName(e.target.value);
  };

  const oncontactnumberChange = (e) => {
    setContactNumber(e.target.value);
  };

  const onWhatsappChange = (e) => {
    setWhatsapp(e.target.value);
  };

  const onTwitterChange = (e) => {
    setTwitter(e.target.value);
  };

  const onTelegramChange = (e) => {
    setTelegram(e.target.value);
  };

  const onNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
    setPasswordMismatch(false); // Reset the passwordMismatch state when the new password changes
  };

  const oldPasswordChange = (e) => {
    setOldPassword(e.target.value);
  };

  const onReenterPasswordChange = (e) => {
    setReenterPassword(e.target.value);
    setPasswordMismatch(false); // Reset the passwordMismatch state when the re-entered password changes
  };

  const onSubmitPassword = async (e) => {
    e.preventDefault();
    // Check if passwords match
    if (newPassword !== reenterPassword) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Confirm password has not Matched!",
      });
    } else {
      const formData = new FormData();
      formData.append("old_password", oldPassword);
      formData.append("new_password", newPassword);
      formData.append("p_id", p_id);

      try {
        const response = await apiService.post(
          "front/users/update_password",
          formData
        );
        if (response.status === "200") {
          setNewPassword("");
          setReenterPassword("");
          setOldPassword("");
          setPasswordMismatch(false);
          Swal.fire({
            icon: "success",
            title: "Password Changed Successfully.",
            showConfirmButton: false,
            timer: 3000,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "You have entered wrong password!",
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    }
  };

  const onUpdateUserprofile = async (e) => {
    e.preventDefault();
    //API Call
    try {
      const formData = {
        project_name,
        website,
        country,
        official_email_id,
        description,
        project_keyword,
        target_project_keyword,
        contact_name,
        contact_number,
        whatsapp,
        twitter,
        telegram,
        show_contact_details,
        p_id,
      };
      const response = await apiService.post(
        "front/users/update",
        null,
        formData
      );

      if (response.status === "200") {
        localStorage.setItem("frontendUserInfo", JSON.stringify(response.data));

        Swal.fire({
          icon: "success",
          title: "Profile Updated Successfully.",
          showConfirmButton: false,
          timer: 3000,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong! Please try again later.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  const onClickProfileTab = () => {
    setIsProfileTabEnabled(true);
    setIsSecurityTabEnabled(false);
  };

  const onClickSecurityTab = () => {
    setIsProfileTabEnabled(false);
    setIsSecurityTabEnabled(true);
  };

  const showLogoutConfirmationModal = () => {
    setLogoutConfirmationVisibility(true);
  };

  const hideLogoutConfirmationModal = () => {
    setLogoutConfirmationVisibility(false);
  };

  // Updated logout handler
  const logoutHandler = () => {
    // Hide the logout confirmation modal
    hideLogoutConfirmationModal();

    // Perform logout action
    localStorage.removeItem("frontendUserInfo");
    window.location.reload();
  };

  return (
    <div>
      <Header />

      <div className="homeabout-Sec">
        <div className="container">
          <div className="row">
            <div className="col-md-4 col-sm-4 col-xs-12">
              <div className="left-profilemainD">
                <div className="left-profileD">
                  <img src={require("./../Images/image-8.png")} alt="image" />
                  <h4>
                    {userInfo?.project_name}{" "}
                    <i
                      className="fa fa-chevron-circle-down"
                      aria-hidden="true"
                    ></i>
                  </h4>
                  <p>{userInfo?.official_email_id}</p>
                  <div className="clearfix"></div>
                  <ul className="nav nav-pills flex-column">
                    <li className={`${isProfileTabEnabled ? "active" : ""}`}>
                      <a
                        data-toggle="pill"
                        href="javascript:void(0);"
                        onClick={onClickProfileTab}
                      >
                        <i className="fa fa-user-o" aria-hidden="true"></i>{" "}
                        &emsp; Profile{" "}
                        <i
                          className="fa fa-angle-right pull-right"
                          aria-hidden="true"
                        ></i>
                      </a>
                    </li>
                    <li className={`${!isProfileTabEnabled ? "active" : ""}`}>
                      <a
                        data-toggle="pill"
                        href="javascript:void(0);"
                        onClick={onClickSecurityTab}
                      >
                        <i className="fa fa-lock" aria-hidden="true"></i> &emsp;
                        Security{" "}
                        <i
                          className="fa fa-angle-right pull-right"
                          aria-hidden="true"
                        ></i>
                      </a>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <hr />
                    </li>
                    <li>
                      <a
                        href="javascript:void(0);"
                        onClick={showLogoutConfirmationModal}
                      >
                        <i className="fa fa-sign-out" aria-hidden="true"></i>{" "}
                        Logout
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-md-8 col-sm-8 col-xs-12">
              <div className="profileFormD">
                <div className="tab-content">
                  {isProfileTabEnabled && (
                    <div id="home">
                      <div className="contactFormD">
                        {successMessage && (
                          <div className="alert alert-success" role="alert">
                            Profile updated!
                          </div>
                        )}
                        <form onSubmit={onUpdateUserprofile}>
                          <div className="row">
                            <div className="col-md-6 col-sm-6 col-xs-12">
                              <div className="form-group">
                                <label htmlFor="project_name">
                                  Project Name:
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="project_name"
                                  name="project_name"
                                  value={project_name}
                                  onChange={onProjectChange}
                                  placeholder="Enter Your Project Name"
                                  required
                                />
                              </div>
                            </div>
                            <div className="col-md-6 col-sm-6 col-xs-12">
                              <div className="form-group">
                                <label htmlFor="website">Website:</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="website"
                                  name="website"
                                  value={website}
                                  onChange={onWebsiteChange}
                                  placeholder="Enter Your Website"
                                  required
                                />
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}
                  {isSecurityTabEnabled && (
                    <div id="menu1">
                      <div className="contactFormD">
                        <form className="" onSubmit={onSubmitPassword}>
                          {false && (
                            <div className="alert alert-success Add">
                              <strong>Password changed Successfully!</strong>
                            </div>
                          )}
                          <div className="row">
                            <div className="col-md-12 col-sm-12 col-xs-12">
                              <div className="form-group">
                                <label for="opass">Old Password:</label>
                                <input
                                  type="password"
                                  className="form-control"
                                  id="opass"
                                  placeholder="Enter Old Password"
                                  onChange={oldPasswordChange}
                                  required
                                />
                              </div>
                            </div>
                            <div className="col-md-12 col-sm-12 col-xs-12">
                              <div className="form-group">
                                <label htmlFor="npass">New Password:</label>
                                <input
                                  type="password"
                                  className="form-control"
                                  id="npass"
                                  placeholder="Enter New Password"
                                  onChange={onNewPasswordChange}
                                  required
                                />
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        show={logoutConfirmationVisibility}
        onHide={hideLogoutConfirmationModal}
      >
        <Modal.Body align="center">
          <h4 className="modal-title mart30">Do you want to logout?</h4>

          <button
            type="submit"
            className="btn btn_gradiant"
            onClick={logoutHandler}
          >
            Yes{" "}
          </button>

          <span className="btnbrdrGrad">
            <button
              type="button"
              className="btn btn_gradiant_brdr"
              onClick={hideLogoutConfirmationModal}
            >
              No
            </button>
          </span>
        </Modal.Body>
      </Modal>
      <Footer />
    </div>
  );
};

export default Profile;
