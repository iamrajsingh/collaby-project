import React, { Component } from "react";
import AdminHeader from "./../AdminHeader";
import AdminSidebar from "./../AdminSidebar";
import apiService from "./../../../service/apiService";
import { withRouter } from "./../../../utils/withRouter";
import { Link } from "react-router-dom";

class ProjectEdit extends Component {
  state = {
    project_name: "",
    website: "",
    country: "",
    official_email_id: "",
    description: "",
    project_keyword: "",
    target_project_keyword: "",
    contact_name: "",
    contact_number: "",
    show_contact_details: "",
    p_id: "",
    isDataUpdated: false,
    timeoutId: null,
  };

  componentDidMount() {
    const teamInfo = this.props?.router?.location?.state?.teamInfo;
    if (teamInfo) {
      this.setState({
        project_name: teamInfo.project_name,
        website: teamInfo.website,
        country: teamInfo.country,
        official_email_id: teamInfo.official_email_id,
        description: teamInfo.description,
        project_keyword: teamInfo.project_keyword,
        target_project_keyword: teamInfo.target_project_keyword,
        contact_name: teamInfo.contact_name,
        contact_number: teamInfo.contact_number,
        show_contact_details: teamInfo.show_contact_details,
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

  onProjectChange = (e) => {
    this.setState({
      project_name: e.target.value,
    });
  };

  onWebsiteChange = (e) => {
    this.setState({
      website: e.target.value,
    });
  };

  onCountryChange = (e) => {
    this.setState({
      country: e.target.value,
    });
  };

  onEmailChange = (e) => {
    this.setState({
      official_email_id: e.target.value,
    });
  };

  onDescriptionChange = (e) => {
    this.setState({
      description: e.target.value,
    });
  };

  onProjectKeywordChange = (e) => {
    this.setState({
      project_keyword: e.target.value,
    });
  };

  onTargetChange = (e) => {
    this.setState({
      target_project_keyword: e.target.value,
    });
  };

  onContactnmChange = (e) => {
    this.setState({
      contact_name: e.target.value,
    });
  };

  oncontactnumberChange = (e) => {
    this.setState({
      contact_number: e.target.value,
    });
  };

  onUpdateTeam = async (e) => {
    e.preventDefault();
    //API Call
    try {
      const formData = {
        project_name: this.state.project_name,
        website: this.state.website,
        country: this.state.country,
        official_email_id: this.state.official_email_id,
        description: this.state.description,
        project_keyword: this.state.project_keyword,
        target_project_keyword: this.state.target_project_keyword,
        contact_name: this.state.contact_name,
        contact_number: this.state.contact_number,
        show_contact_details: this.state.show_contact_details,
        p_id: this.state.p_id,
      };
      const response = await apiService.put(
        "collably/admin/project/update",
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
              <i className="fa fa-pencil" aria-hidden="true"></i> Edit Project{" "}
              <Link
                to="/admin/project/listing"
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
                      <label>Project</label>
                      <input
                        type="text"
                        name="project_name"
                        id="blog_title"
                        className="form-control"
                        required
                        value={this.state.project_name}
                        onChange={this.onProjectChange}
                        // defaultValue="What is the best way to buy Cryptocurrency for beginners?"
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
                        id="meta_title"
                        className="form-control"
                        required
                        value={this.state.website}
                        onChange={this.onWebsiteChange}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        name="official_email_id"
                        id="email"
                        className="form-control"
                        required
                        value={this.state.official_email_id}
                        onChange={this.onEmailChange}
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
                      <label>Country</label>
                      <input
                        type="text"
                        name="country"
                        id="meta_keyword"
                        className="form-control"
                        required
                        value={this.state.country}
                        onChange={this.onCountryChange}
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
                        value={this.state.description}
                        onChange={this.onDescriptionChange}
                      />
                      <br />
                      {/* <ReactQuill
                        value={this.state.content}
                        onChange={this.handleChange}
                      /> */}
                      <br />
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <label>Project Keywords</label>
                      <input
                        type="text"
                        name="project_keyword"
                        id="meta_keyword"
                        className="form-control"
                        required
                        value={this.state.project_keyword}
                        onChange={this.onProjectKeywordChange}
                      />
                      <br />
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <label>Target Keywords</label>
                      <input
                        type="text"
                        name="meta_keyword"
                        id="meta_keyword"
                        className="form-control"
                        required
                        value={this.state.target_project_keyword}
                        onChange={this.onTargetChange}
                      />
                      <br />
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <label>Contact Name</label>
                      <input
                        type="text"
                        name=""
                        id="meta_keyword"
                        className="form-control"
                        required
                        value={this.state.contact_name}
                        onChange={this.onContactnmChange}
                      />
                      <br />
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <label>Contact Number</label>
                      <input
                        type="number"
                        name=""
                        id="meta_keyword"
                        className="form-control"
                        required
                        value={this.state.contact_number}
                        onChange={this.oncontactnumberChange}
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

export default withRouter(ProjectEdit);
