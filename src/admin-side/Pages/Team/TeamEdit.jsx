import React, { Component } from "react";
import AdminHeader from "./../../Components/AdminHeader";
import AdminSidebar from "./../../Components/AdminSidebar";
import apiService from "./../../../service/apiService";
import { withRouter } from "./../../../utils/withRouter";
import { Link } from "react-router-dom";

class TeamEdit extends Component {
  state = {
    t_name: "",
    t_designation: "",
    linkdin_id: "",
    twitter_id: "",
    t_id: "",
    photo: "",
    isDataUpdated: false,
    showImage: false,
    timeoutId: null,
  };

  componentDidMount() {
    const teamInfo = this.props?.router?.location?.state?.teamInfo;
    if (teamInfo) {
      this.setState({
        t_name: teamInfo.t_name,
        t_designation: teamInfo.t_designation,
        linkdin_id: teamInfo.linkdin_id,
        twitter_id: teamInfo.twitter_id,
        t_id: teamInfo.t_id,
        photo: teamInfo.photo,
        showImage: true,
      });
    }
  }

  onLnkidChange = (e) => {
    this.setState({
      linkdin_id: e.target.value,
    });
  };

  onTwtidChange = (e) => {
    this.setState({
      twitter_id: e.target.value,
    });
  };

  onNameChange = (e) => {
    this.setState({
      t_name: e.target.value,
    });
  };

  onDesignationChange = (e) => {
    this.setState({
      t_designation: e.target.value,
    });
  };

  handleFileChange = (e) => {
    // Handle file changes for the photo
    this.setState({
      photo: e.target.files[0],
      showImage: false,
    });
  };

  componentWillUnmount() {
    // Clear the timeout when the component unmounts
    const { timeoutId } = this.state;
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  }

  onUpdateTeam = async (e) => {
    e.preventDefault();

    // API Call
    try {
      // const formData = {
      //   t_name: this.state.t_name,
      //   t_designation: this.state.t_designation,
      //   linkdin_id: this.state.linkdin_id,
      //   twitter_id: this.state.twitter_id,
      //   t_id: this.state.t_id,
      //   photo: this.state.photo,
      // };

      const formData = new FormData();

      formData.append("t_name", this.state.t_name);
      formData.append("t_designation", this.state.t_designation);
      formData.append("linkdin_id", this.state.linkdin_id);
      formData.append("twitter_id", this.state.twitter_id);
      formData.append("t_id", this.state.t_id);
      formData.append("photo", this.state.photo);

      const response = await apiService.post(
        "admin/team/update",

        formData
      );

      if (response.status === "200") {

        // Display the success popup
        this.setState({
          isDataUpdated: true,
        });

        const { timeoutId } = this.state;
        if (timeoutId) {
          clearTimeout(timeoutId);
        }

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

          <div className="middleSec catbyMdl">
            <form method="post" id="editfrm" onSubmit={this.onUpdateTeam}>
              <div className="headingD">
                <i className="fa fa-pencil" aria-hidden="true"></i> Edit Team{" "}
                <Link
                  to="/admin/team/listing"
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
                        <label>Name</label>
                        <input
                          type="text"
                          name="t_name"
                          id="name"
                          className="form-control"
                          required
                          placeholder="Enter Name"
                          value={this.state.t_name}
                          onChange={this.onNameChange}
                        // defaultValue="What is the best way to buy Cryptocurrency for beginners?"
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
                          id="blog_image"
                          className="form-control"
                          required
                          placeholder="Enter Name"
                          value={this.state.t_designation}
                          onChange={this.onDesignationChange}
                        />

                        <br />
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <label>Linkdin Id</label>
                        <input
                          type="text"
                          name="linkdin_id"
                          id="meta_keyword"
                          className="form-control"
                          required
                          placeholder=""
                          value={this.state.linkdin_id}
                          onChange={this.onLnkidChange}
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
                          id="blog_image"
                          className="form-control"
                          required
                          placeholder=""
                          value={this.state.twitter_id}
                          onChange={this.onTwtidChange}
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
                        {this.state.showImage && <img
                          src={this.state.photo}
                          width={100}
                          height={100}
                          alt={this.state.title}
                        />}

                        <br />
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        {/* <button type="reset" className="btn btn-default">
                          <i className="fa fa-repeat" aria-hidden="true"></i>{" "}
                          Reset
                        </button> */}
                        {/* <Link to=""> */}
                        <button
                          type="submit"
                          className="btn btn-primary addbtn"
                        >
                          <i className="fa fa-floppy-o" aria-hidden="true"></i>{" "}
                          Save
                        </button>
                        {/* </Link> */}
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

export default withRouter(TeamEdit);
