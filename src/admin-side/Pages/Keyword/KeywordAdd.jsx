import React, { Component } from "react";
import AdminHeader from "./../../Components/AdminHeader";
import AdminSidebar from "./../../Components/AdminSidebar";
import { Link } from "react-router-dom";
import axios from "axios";

class KeywordAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyward: "",

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

  handleSubmit = async (e) => {
    e.preventDefault();

    const apiEndpoint = "https://ohkolkata.com/collably/admin/keywards/save";

    const formData = {
      keyward: this.state.keyward,
    };

    try {
      const response = await axios.post(apiEndpoint, {}, { params: formData });

      if (response.status === 200) {
        // Handle success, e.g., show a success message

        this.setState({
          keyward: "",

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
                Target Keyword
                <Link
                  to="/admin/keyword/listing"
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
                        <label>Target Keyword</label>
                        <input
                          type="text"
                          name="keyward"
                          id="keyward"
                          className="form-control"
                          required
                          placeholder="Enter Keyword"
                          value={this.state.keyward}
                          onChange={this.handleInputChange}
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

export default KeywordAdd;
