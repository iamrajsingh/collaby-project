import React, { useState, useEffect } from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import CountryDropdown from "../Components/Admin/CountryDropdown";
import apiService from "./../../service/apiService";
import ProjectDropdown from "../Components/Admin/ProjectDropdown";
import TargetKeywordDropdown from "../Components/Admin/TargetKeywordDropdown";
import Swal from "sweetalert2";

const Register = () => {
  const [formData, setFormData] = useState({
    project_name: "",
    website: "",
    official_email_id: "",
    description: "",
    contact_name: "",
    contact_number: "",
    password: "",
    rpass: "",
    show_contact_details: "yes",
    whatsapp: "",
    socialicon: "",
    country: "",
    project_keyword: "",
    target_project_keyword: "",
  });

  useEffect(() => {
    return () => {
      clearTimeout(formData.timeoutId);
    };
  }, [formData.timeoutId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "socialicon") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
        telegram: value === "telegram" ? "t.me/" : "",
        twitter: value === "twitter" ? "" : "",
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleCountryChange = (selectedCountry) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      country: selectedCountry,
    }));
  };

  const handleProjectKeywordChange = (values) => {
    const keywordsArr = values?.map((el) => el.value);
    const keywordsStr = keywordsArr.join(",");
    setFormData((prevFormData) => ({
      ...prevFormData,
      project_keyword: keywordsStr,
    }));
  };

  const handleTargetKeywordChange = (values) => {
    const keywordsArr = values?.map((el) => el.value);
    const keywordsStr = keywordsArr.join(",");
    setFormData((prevFormData) => ({
      ...prevFormData,
      target_project_keyword: keywordsStr,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiService.post(
        "front/users/register",
        null,
        formData
      );

      if (response.status === "200") {
        setFormData((prevFormData) => ({
          ...prevFormData,
          successMessageVisible: true,
        }));

        Swal.fire({
          icon: "success",
          title: "Your data has been accepted.",
          showConfirmButton: false,
          timer: 2500,
        });

        const { timeoutId } = formData;
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }

    setTimeout(() => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        successMessageVisible: false,
      }));
    }, 2000);
  };

  return (
    <div>
      <Header />

      <div className="homeabout-Sec">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-sm-12 col-xs-12">
              <div className="secHeading">
                <h3>Register with us</h3>
              </div>
            </div>
            {formData.successMessageVisible && (
              <div className="alert alert-success" role="alert">
                Successfully registered user
              </div>
            )}
            <div className="col-md-2 col-sm-2"></div>
            <div className="col-md-8 col-sm-8 col-xs-12">
              <div className="contactFormD">
                <form
                  className=""
                  action="#"
                  method="post"
                  onSubmit={handleSubmit}
                >
                  <div className="row">
                    <div className="col-md-6 col-sm-6 col-xs-12">
                      <div className="form-group">
                        <label htmlFor="project_name">Project Name:</label>
                        <input
                          type="text"
                          name="project_name"
                          className="form-control"
                          id="project_name"
                          value={formData.project_name}
                          onChange={handleInputChange}
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
                          name="website"
                          className="form-control"
                          id="website"
                          value={formData.website}
                          onChange={handleInputChange}
                          placeholder="Website Link"
                          required
                        />
                      </div>
                    </div>

                    <CountryDropdown
                      onChangeCountryProp={handleCountryChange}
                      style={{ width: "100%" }}
                    />

                    <div className="col-md-6 col-sm-6 col-xs-12">
                      <div className="form-group">
                        <label htmlFor="official_email_id">Email ID:</label>
                        <input
                          type="email"
                          name="official_email_id"
                          className="form-control"
                          id="official_email_id"
                          placeholder="Official Email ID"
                          onChange={handleInputChange}
                          value={formData.official_email_id}
                          required
                        />
                      </div>
                    </div>

                    <div className="col-md-12 col-sm-12 col-xs-12">
                      <div className="form-group">
                        <label htmlFor="description">Description:</label>
                        <textarea
                          className="form-control"
                          name="description"
                          rows="3"
                          id="description"
                          placeholder="Description"
                          maxLength="300"
                          onChange={handleInputChange}
                          value={formData.description}
                          required
                        ></textarea>
                      </div>
                    </div>

                    <ProjectDropdown
                      onChangeProjectKeywordProp={handleProjectKeywordChange}
                    />

                    <TargetKeywordDropdown
                      onChangeTargetKeywordProp={handleTargetKeywordChange}
                    />

                    <div className="col-md-6 col-sm-6 col-xs-12">
                      <div className="form-group">
                        <label htmlFor="contact_name">Conatct Person:</label>
                        <input
                          type="text"
                          name="contact_name"
                          className="form-control"
                          id="contact_name"
                          placeholder="Enter Conatct Person Name"
                          onChange={handleInputChange}
                          value={formData.contact_name}
                          required
                        />
                      </div>
                    </div>

                    <div className="col-md-6 col-sm-6 col-xs-12">
                      <div className="form-group">
                        <label htmlFor="socialicon">Contact Medium:</label>
                        <select
                          className="form-control"
                          id="socialicon"
                          name="socialicon"
                          value={formData.socialicon}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">--Select--</option>
                          <option value="telegram">Telegram</option>
                          <option value="twitter">Twitter</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-md-6 col-sm-6 col-xs-12">
                      <div className="form-group">
                        <label htmlFor="socialId">
                          {formData.socialicon === "telegram"
                            ? "Telegram"
                            : "Twitter"}{" "}
                          ID:
                        </label>
                        <input
                          type="id"
                          name={formData.socialicon}
                          className="form-control"
                          id={formData.socialicon}
                          placeholder={`Enter ${formData.socialicon === "telegram"
                            ? "Telegram"
                            : "Twitter"
                            } ID`}
                          onChange={handleInputChange}
                          value={formData[formData.socialicon]}
                        />
                      </div>
                    </div>

                    <div className="col-md-6 col-sm-6 col-xs-12">
                      <div className="form-group">
                        <label htmlFor="password">Create Password:</label>
                        <input
                          type="password"
                          name="password"
                          className="form-control"
                          id="password"
                          placeholder="Create Strong Password"
                          onChange={handleInputChange}
                          value={formData.password}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6 col-xs-12">
                      <div className="form-group">
                        <label htmlFor="rpass">Re-enter Password:</label>
                        <input
                          type="password"
                          name="rpass"
                          className="form-control"
                          id="rpass"
                          placeholder="Confirm Password"
                          onChange={handleInputChange}
                          value={formData.rpass}
                          required
                        />
                      </div>
                    </div>

                    <div className="col-md-12 col-sm-12 col-xs-12">
                      <div className="form-group">
                        <label htmlFor="show_contact_details">
                          Do you want to show contact details?:
                        </label>
                      </div>
                      <label className="checkstyle">
                        Yes
                        <input
                          type="radio"
                          name="optradio"
                          checked={formData.show_contact_details === "yes"}
                          onChange={() =>
                            setFormData((prevFormData) => ({
                              ...prevFormData,
                              show_contact_details: "yes",
                            }))
                          }
                        />
                        <span className="checkmark"></span>
                      </label>
                      <label className="checkstyle">
                        No
                        <input
                          type="radio"
                          name="optradio"
                          checked={formData.show_contact_details === "no"}
                          onChange={() =>
                            setFormData((prevFormData) => ({
                              ...prevFormData,
                              show_contact_details: "no",
                            }))
                          }
                        />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                    <br />

                    <div className="col-md-12 col-sm-12 col-xs-12">
                      <button
                        type="submit"
                        className="btn btn_gradiant"
                      >
                        Register{" "}
                        <i
                          className="fa fa-chevron-circle-right"
                          aria-hidden="true"
                        ></i>{" "}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
      />
    </div>
  );
};

export default Register;
