import React, { Component } from "react";
import AdminHeader from "../../Components/AdminHeader";
import AdminSidebar from "../../Components/AdminSidebar";
import apiService from "../../../service/apiService";
import { Link } from "react-router-dom";

class Slider3Add extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      image: "",
      link: "",
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
    if (e.target.name === "image") {
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

    // Create a FormData object
    const formData = new FormData();
    formData.append("title", this.state.title);
    formData.append("image", this.state.image);
    formData.append("link", this.state.link);

    try {
      const response = await apiService.post(
        "admin/third_slider/save",
        formData
      );

      if (response.status === "200") {

        this.setState({
          title: "",
          image: "",
          link: "",
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
                Slider 3
                <Link
                  to="/admin/slider3/listing"
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
                        <label>Title</label>
                        <input
                          type="text"
                          name="title"
                          id="blog_title"
                          className="form-control"
                          required
                          placeholder="Enter title"
                          value={this.state.title}
                          onChange={this.handleInputChange}
                        />
                        <br />
                      </div>

                      <div className="form-group">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                          <label>Image</label>
                          <input
                            type="file"
                            name="image"
                            id="blog_image"
                            className="form-control"
                            onChange={this.handleInputChange}
                          />
                          <br />
                        </div>
                      </div>

                      <div className="form-group">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                          <label>Link</label>
                          <input
                            type="text"
                            name="link"
                            id="blog_website"
                            className="form-control"
                            placeholder="Enter link"
                            required
                            value={this.state.link}
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

export default Slider3Add;
