import React, { Component } from "react";

import AdminHeader from "./../../Components/AdminHeader";
import AdminSidebar from "./../../Components/AdminSidebar";
import apiService from "./../../../service/apiService";
import { withRouter } from "./../../../utils/withRouter";
import { Link } from "react-router-dom";

class PartnerEdit extends Component {
  state = {
    p_name: "",
    p_website: "",
    p_logo: "",

    p_id: "",
    isDataUpdated: false,
    timeoutId: null,
    showImage:false,
  };

  componentDidMount() {
    const teamInfo = this.props?.router?.location?.state?.teamInfo;
    if (teamInfo) {
      this.setState({
        p_name: teamInfo.p_name,
        p_website: teamInfo.p_website,
        p_logo: teamInfo.p_logo,
        showImage:true,

        p_id: teamInfo.p_id,
      });
    }
  }

  componentWillUnmount() {
    // Clear the timeout when the component unmounts
    const { timeoutId } = this.state;
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  }

  onPartnerNameChange = (e) => {
    this.setState({
      p_name: e.target.value,
    });
  };

  onWebsiteChange = (e) => {
    this.setState({
      p_website: e.target.value,
    });
  };

  // onLogoChange = (e) => {
  //   this.setState({
  //     p_logo: e.target.value,
  //   });
  // };

  onLogoChange = (e) => {
    // Assuming e.target.files is an array of selected files
    const selectedFile = e.target.files[0];

    // Update the state with the selected file
    this.setState({
      p_logo: selectedFile,
      showImage:false,
    });
  };

  onUpdateTeam = async (e) => {
    e.preventDefault();
    //API Call
    try {
      const formData = {
        p_name: this.state.p_name,
        p_website: this.state.p_website,
        p_logo: this.state.p_logo,

        p_id: this.state.p_id,
      };
      const response = await apiService.post(
        "admin/partner/update",
        null,
        formData
      );
      if (response.status === "200") {
        this.setState({
          isDataUpdated: true,
        });

        // Clear the previous timeout if exists
        const { timeoutId } = this.state;
        if (timeoutId) {
          clearTimeout(timeoutId);
        }

        // Set a new timeout to clear the success message after 3000 milliseconds
        const newTimeoutId = setTimeout(() => {
          this.setState({
            isDataUpdated: false,
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
        </div>
        <div className="middleSec catbyMdl">
          <form method="post" id="editfrm" onSubmit={this.onUpdateTeam}>
            <div className="headingD">
              <i className="fa fa-pencil" aria-hidden="true"></i> Edit Partner{" "}
              <Link
                to="/admin/partner/listing"
                className="btn btn-default pull-right"
              >
                <i className="fa fa-arrow-left" aria-hidden="true"></i> Back
              </Link>
              &emsp;
            </div>
            {this.state.isDataUpdated && (
              <div className="alert alert-success Add">
                <strong>Successfully Edited Your Data!</strong>
              </div>
            )}
            <div className="addPageSec catbyMdl">
              <div className="container-fluid">
                <div className="row">
                  <div className="form-group">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <label>Partner Name</label>
                      <input
                        type="text"
                        name="blog_title"
                        id="blog_title"
                        className="form-control"
                        required
                        value={this.state.p_name}
                        onChange={this.onPartnerNameChange}
                        // defaultValue="What is the best way to buy Cryptocurrency for beginners?"
                      />
                      <br />
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <label>Logo</label>
                      <input
                        type="file"
                        name="blog_image"
                        id="blog_image"
                        className="form-control"
                        // value={this.state.p_logo}
                        onChange={this.onLogoChange}
                      />
                      {this.state.showImage && <img
                          src={this.state.p_logo}
                          width={100}
                          height={100}
                          alt={this.state.title}
                        />}
                      <input
                        type="hidden"
                        name="old_image"
                        defaultValue="blog_1644047811.jpeg"
                      />
                      <input type="hidden" name="blog_id" defaultValue="MTc=" />
                      <input
                        type="hidden"
                        name="update"
                        defaultValue="blog_update"
                      />
                      <br />
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <label>Website</label>
                      <input
                        type="text"
                        name="p_website"
                        id="blog_title"
                        className="form-control"
                        required
                        placeholder=""
                        value={this.state.p_website}
                        onChange={this.onWebsiteChange}
                        // defaultValue="What is the best way to buy Cryptocurrency for beginners?"
                      />
                      <br />
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <button type="submit" className="btn btn-primary addbtn">
                        <i className="fa fa-floppy-o" aria-hidden="true"></i>{" "}
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(PartnerEdit);
