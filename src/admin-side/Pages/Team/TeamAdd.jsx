import React, { Component } from "react";
import AdminHeader from "./../../Components/AdminHeader";
import AdminSidebar from "./../../Components/AdminSidebar";
import apiService from "../../../service/apiService";
import { Link } from "react-router-dom";

class TeamAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      t_name: "",
      t_designation: "",
      linkdin_id: "",
      twitter_id: "",
      photo: "",
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

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleFileChange = (e) => {
    // Handle file changes for the photo
    this.setState({
      photo: e.target.files[0],
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    // const apiEndpoint = "https://collably.network/api/admin/team/save";

    // const formData = new FormData();
    // formData.append("t_name", this.state.t_name);
    // formData.append("t_designation", this.state.t_designation);
    // formData.append("linkdin_id", this.state.linkdin_id);
    // formData.append("twitter_id", this.state.twitter_id);
    // formData.append("photo", this.state.photo); // Append the photo to FormData

    // try {
    //   const response = await axios.post(apiEndpoint, formData);

    const formData = new FormData();
    formData.append("t_name", this.state.t_name);
    formData.append("t_designation", this.state.t_designation);
    formData.append("linkdin_id", this.state.linkdin_id);
    formData.append("twitter_id", this.state.twitter_id);
    formData.append("photo", this.state.photo);

    try {
      const response = await apiService.post(
        "admin/team/save",
        formData
      );

      if (response.status === 200) {

        this.setState({
          t_name: "",
          t_designation: "",
          linkdin_id: "",
          twitter_id: "",
          photo: "",
          isLoading: false,
          successMessageVisible: true,
        });

        const { timeoutId } = this.state;
        if (timeoutId) {
          clearTimeout(timeoutId);
        }

        const newTimeoutId = setTimeout(() => {
          this.setState({
            successMessageVisible: false,
          });
        }, 3000);

        this.setState({
          timeoutId: newTimeoutId,
        });
      } else {
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
                Team
                <Link
                  to="/admin/team/listing"
                  className="btn btn-default pull-right"
                >
                  <i className="fa fa-arrow-left" aria-hidden="true"></i> Back
                </Link>
                &emsp;
              </div>
              <div
                className="alert alert-success Add"
                style={{
                  display: this.state.successMessageVisible ? "block" : "none",
                }}
              >
                <strong>Successfully Added Your Data!</strong>
              </div>
              {this.state.errorMessage && (
                <div className="error-message">{this.state.errorMessage}</div>
              )}
              <div className="addPageSec catbyMdl">
                <div className="container-fluid">
                  <div className="row">
                    <div className="form-group">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <label>Name</label>
                        <input
                          type="text"
                          name="t_name"
                          id="t_name"
                          className="form-control"
                          required
                          placeholder="Enter Team Name"
                          value={this.state.t_name}
                          onChange={this.handleInputChange}
                        />
                        <br />
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <label>Twitter ID</label>
                        <input
                          type="text"
                          name="twitter_id"
                          id="twitter_id"
                          className="form-control"
                          placeholder="Enter Twitter ID"
                          value={this.state.twitter_id}
                          onChange={this.handleInputChange}
                        />

                        <br />
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <label>Designation</label>
                        <input
                          type="text"
                          name="t_designation"
                          id="t_designation"
                          className="form-control"
                          required
                          placeholder="Enter Designation"
                          value={this.state.t_designation}
                          onChange={this.handleInputChange}
                        />
                        <br />
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <label>Linkdin ID</label>
                        <input
                          type="text"
                          name="linkdin_id"
                          id="linkdin_id"
                          className="form-control"
                          placeholder="Enter Linkdin ID"
                          value={this.state.linkdin_id}
                          onChange={this.handleInputChange}
                        />

                        <br />
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <label>Photo</label>
                        <input
                          type="file"
                          name="photo"
                          id="photo"
                          className="form-control"
                          onChange={this.handleFileChange}
                        />
                        <br />
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        {/* <button type="reset" className="btn btn-default">
                          <i className="fa fa-repeat" aria-hidden="true"></i>{" "}
                          Reset
                        </button> */}
                        <button
                          type="submit"
                          className="btn btn-primary addbtn"
                        >
                          <i className="fa fa-floppy-o" aria-hidden="true"></i>{" "}
                          Save
                        </button>
                        <button
                          className="btn btn-primary addload buttonload"
                          style={{ display: "none" }}
                        >
                          <i
                            className="fa fa-spinner fa-spin"
                            style={{
                              marginLeft: "-12px",
                              marginRight: "8px",
                            }}
                          ></i>
                          Please Wait
                        </button>
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

export default TeamAdd;
