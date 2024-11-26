import React, { Component } from "react";
import AdminHeader from "./../AdminHeader";
import AdminSidebar from "./../AdminSidebar";
import axios from "axios";
import { Link } from "react-router-dom";

class PartnerAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      p_name: "",
      p_website: "",
      p_logo: "",
      isLoading: false,
      errorMessage: null,
      successMessageVisible: false,
      timeoutId: null,
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
    if (e.target.name === "p_logo") {
      this.setState({
        [e.target.name]: e.target.files[0],
      });
    } else {
      this.setState({
        [e.target.name]: e.target.value,
      });
    }
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const apiEndpoint =
      "https://workunderprogress.com/collably/admin/partner/save";

    const formData = {
      p_name: this.state.p_name,
      p_website: this.state.p_website,
      p_logo: this.state.p_logo,
    };

    try {
      const response = await axios.post(apiEndpoint, {}, { params: formData });

      if (response.status === 200) {

        this.setState({
          p_name: "",
          p_website: "",
          p_logo: "",
          isLoading: false,
          successMessageVisible: true,
        });

        // Clear the previous timeout if exists
        const { timeoutId } = this.state;
        if (timeoutId) {
          clearTimeout(timeoutId);
        }

        // Set a new timeout to hide the success popup after 3 seconds (adjust the timeout as needed)
        const newTimeoutId = setTimeout(() => {
          this.setState({
            successMessageVisible: false,
          });
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
                Partner
                <Link
                  to="/admin/partner/listing"
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
                        <label>Partner Name</label>
                        <input
                          type="text"
                          name="p_name"
                          id="blog_title"
                          className="form-control"
                          required
                          placeholder="Enter Partner Name"
                          value={this.state.p_name}
                          onChange={this.handleInputChange}
                        />
                        <br />
                      </div>

                      <div className="form-group">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                          <label>Logo</label>
                          <input
                            type="file"
                            name="p_logo"
                            id="blog_image"
                            className="form-control"
                            onChange={this.handleInputChange}
                          />
                          <br />
                        </div>
                      </div>

                      <div className="form-group">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                          <label>Website</label>
                          <input
                            type="website"
                            name="p_website"
                            id="blog_website"
                            className="form-control"
                            placeholder="Enter Your Website"
                            required
                            value={this.state.p_website}
                            onChange={this.handleInputChange}
                          />
                          <br />
                        </div>
                      </div>

                      <div className="form-group">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                          <button
                            type="submit"
                            className="btn btn-primary addbtn"
                          >
                            <i
                              className="fa fa-floppy-o"
                              aria-hidden="true"
                            ></i>{" "}
                            Save
                          </button>
                        </div>
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

export default PartnerAdd;
