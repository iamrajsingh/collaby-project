import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import AdminHeader from "./../../Components/AdminHeader";
import AdminSidebar from "./../../Components/AdminSidebar";

class ProjectAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
      project_name: "",
      website: "",
      official_email_id: "",
      country: "",
      project_keyword: "",
      target_project_keyword: "",
      contact_name: "",
      contact_number: "",
      whatsapp: "",

      twitter: "",
      telegram: "t.me/",

      show_contact_details: "YES",
      isLoading: false,
      errorMessage: null,
      successMessageVisible: false,
      timeoutId: null, // Store the timeout ID in the state
    };
  }

  componentWillUnmount() {
    // Clear the timeout when the component unmounts
    const { timeoutId } = this.state;
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  }

  // handleInputChange = (e) => {
  //   this.setState({
  //     [e.target.name]: e.target.value,
  //   });
  // };

  handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "project_keyword") {
      // If the input is project_keyword , format the value
      const formattedValue = value
        .split(",")
        .map((keyword) => keyword.trim())
        .join(",");

      this.setState({
        [name]: formattedValue,
      });
    } else {
      // For other inputs, set the value directly
      this.setState({
        [name]: value,
      });
    }
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const apiEndpoint = "https://ohkolkata.com/collably/admin/project/save";

    const formData = {
      description: this.state.description,
      project_name: this.state.project_name,
      website: this.state.website,
      official_email_id: this.state.official_email_id,
      country: this.state.country,
      project_keyword: this.state.project_keyword,
      target_project_keyword: this.state.target_project_keyword,
      contact_name: this.state.contact_name,
      contact_number: this.state.contact_number,
      whatsapp: this.state.whatsapp,

      twitter: this.state.twitter,
      telegram: this.state.telegram,

      show_contact_details: this.state.show_contact_details,
    };

    try {
      const response = await axios.post(apiEndpoint, {}, { params: formData });

      if (response.status === 200) {
        // Handle success, e.g., show a success message

        // Reset the form and show the success popup
        this.setState({
          description: "",
          project_name: "",
          website: "",
          official_email_id: "",
          country: "",
          project_keyword: "",
          target_project_keyword: "",
          contact_name: "",
          contact_number: "",
          whatsapp: "",

          twitter: "",
          telegram: "",
          show_contact_details: "YES",
          isLoading: false,
          successMessageVisible: true,
        });

        // Display the success popup
        document.querySelector(".alert-success.Add").style.display = "block";

        // Clear the previous timeout if exists
        const { timeoutId } = this.state;
        if (timeoutId) {
          clearTimeout(timeoutId);
        }

        // Set a new timeout to hide the success popup after 3 seconds (adjust the timeout as needed)
        const newTimeoutId = setTimeout(() => {
          document.querySelector(".alert-success.Add").style.display = "none";
        }, 3000);

        // Update the timeout ID in the state
        this.setState({
          timeoutId: newTimeoutId,
        });
      } else {
        // Handle error, e.g., show an error message
      }
    } catch (error) {
    }
  };

  render() {
    return (
      <div>
        <AdminHeader />
        <div className="dashBoardSec">
          <AdminSidebar />
          <div className="middleSec catbyMdl">
            <form method="post" id="addfrm" onSubmit={this.handleSubmit}>
              <div className="headingD">
                <i className="fa fa-plus-square-o" aria-hidden="true"></i> Add
                Project
                <Link
                  to="/admin/project/listing"
                  className="btn btn-default pull-right"
                >
                  {" "}
                  <i className="fa fa-arrow-left" aria-hidden="true"></i> Back
                </Link>
                &emsp;
              </div>
              <div
                className="alert alert-success Add"
                style={{ display: "none" }}
              >
                <strong>Successfully Added Your Data!</strong>
              </div>
              {this.state.errorMessage && (
                <div className="error-message">{this.state.errorMessage}</div>
              )}
              <div className="addPageSec catbyMdl">
                <div className="container-fluid">
                  <div className="row">
                    {/* Other form fields */}
                    <div className="form-group">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <label>Project</label>
                        <input
                          type="text"
                          name="project_name"
                          id="project_name"
                          className="form-control"
                          required
                          value={this.state.project_name}
                          onChange={this.handleInputChange}
                        />
                        <br />
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <label>Website</label>
                        <input
                          type="text"
                          name="website"
                          id="website"
                          className="form-control"
                          required
                          value={this.state.website}
                          onChange={this.handleInputChange}
                        />
                        <br />
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <label htmlFor="email">Email</label>
                        <input
                          type="email"
                          name="official_email_id"
                          id="official_email_id"
                          className="form-control"
                          required
                          value={this.state.official_email_id}
                          onChange={this.handleInputChange}
                        />
                        <br />
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <label>Country</label>
                        <input
                          type="text"
                          name="country"
                          id="country"
                          className="form-control"
                          required
                          value={this.state.country}
                          onChange={this.handleInputChange}
                        />
                        <br />
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <label>Full Description</label>
                        <input
                          type="text"
                          name="description"
                          id="description"
                          className="form-control"
                          required
                          maxLength="300"
                          value={this.state.description}
                          onChange={this.handleInputChange}
                        />
                        <br />
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <label>Project Keywords</label>
                        <input
                          type="text"
                          name="project_keyword"
                          id="project_keyword"
                          className="form-control"
                          required
                          value={this.state.project_keyword}
                          onChange={this.handleInputChange}
                        />
                        <br />
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <label>Target Keywords</label>
                        <input
                          type="text"
                          name="target_project_keyword"
                          id="target_project_keyword"
                          className="form-control"
                          required
                          value={this.state.target_project_keyword}
                          onChange={this.handleInputChange}
                        />
                        <br />
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <label>Contact Person 1</label>
                        <input
                          type="text"
                          name="contact_name"
                          id="contact_name"
                          className="form-control"
                          required
                          value={this.state.contact_name}
                          onChange={this.handleInputChange}
                        />
                        <br />
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <label>Contact Number 1</label>
                        <input
                          type="number"
                          name="contact_number"
                          id="contact_number"
                          className="form-control"
                          required
                          value={this.state.contact_number}
                          onChange={this.handleInputChange}
                        />
                        <br />
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <label>Whatsapp</label>
                        <input
                          type="number"
                          name="whatsapp"
                          id="whatsapp"
                          className="form-control"
                          value={this.state.whatsapp}
                          onChange={this.handleInputChange}
                        />
                        <br />
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <label>Twitter</label>
                        <input
                          type="id"
                          name="twitter"
                          id="twitter"
                          className="form-control"
                          value={this.state.twitter}
                          onChange={this.handleInputChange}
                        />
                        <br />
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <label>Telegram</label>
                        <input
                          type="id"
                          name="telegram"
                          id="telegram"
                          className="form-control"
                          value={this.state.telegram}
                          onChange={this.handleInputChange}
                        />
                        <br />
                      </div>
                    </div>

                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <label>Do You Want To Show Contact Details</label>
                      <br />
                      <input
                        type="radio"
                        id="yes"
                        name="show_contact_details"
                        value="YES"
                        checked={this.state.show_contact_details === "YES"}
                        onChange={this.handleInputChange}
                      />
                      <label>Yes</label>
                      <input
                        type="radio"
                        id="no"
                        name="show_contact_details"
                        value="NO"
                        checked={this.state.show_contact_details === "NO"}
                        onChange={this.handleInputChange}
                      />
                      <label>No</label> <br />
                    </div>
                    {/* Add other form fields as needed */}
                    <div className="form-group">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <button
                          type="submit"
                          className="btn btn-primary addbtn"
                        >
                          <i className="fa fa-floppy-o" aria-hidden="true"></i>{" "}
                          Save
                        </button>
                        {this.state.isLoading && (
                          <button className="btn btn-primary addload buttonload">
                            <i
                              className="fa fa-spinner fa-spin"
                              style={{
                                marginLeft: "-12px",
                                marginRight: "8px",
                              }}
                            ></i>
                            Please Wait
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default ProjectAdd;
