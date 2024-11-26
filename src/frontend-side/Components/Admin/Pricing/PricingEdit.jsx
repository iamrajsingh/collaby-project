import React, { Component } from "react";
import AdminHeader from "./../AdminHeader";
import AdminSidebar from "./../AdminSidebar";
import apiService from "./../../../service/apiService";
import { withRouter } from "./../../../utils/withRouter";
import { Link } from "react-router-dom";

class PricingEdit extends Component {
  state = {
    package: "",
    short_description: "",
    price: "",
    pakage_details: "",
    id: "",
    isDataUpdated: false,
    timeoutId: null,
  };

  componentDidMount() {
    const teamInfo = this.props?.router?.location?.state?.teamInfo;
    if (teamInfo) {
      this.setState({
        package: teamInfo.package,
        short_description: teamInfo.short_description,
        price: teamInfo.price,
        pakage_details: teamInfo.pakage_details,
        id: teamInfo.id,
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

  onPackageNameChange = (e) => {
    this.setState({
      package: e.target.value,
    });
  };

  onPriceChange = (e) => {
    this.setState({
      price: e.target.value,
    });
  };

  onPakageChange = (e) => {
    this.setState({
      pakage_details: e.target.value,
    });
  };

  onDescChange = (e) => {
    this.setState({
      short_description: e.target.value,
    });
  };

  onUpdateTeam = async (e) => {
    e.preventDefault();
    //API Call
    try {
      const formData = {
        package: this.state.package,
        short_description: this.state.short_description,
        price: this.state.price,
        pakage_details: this.state.pakage_details,
        id: this.state.id,
      };
      const response = await apiService.put(
        "collably/admin/pricing/update",
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
              <i className="fa fa-pencil" aria-hidden="true"></i> Edit Pricing{" "}
              <Link
                to="/admin/pricing/listing"
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
                    <div className="form-group">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <label>Package Name</label>
                        <input
                          type="text"
                          name="package"
                          id="meta_keyword"
                          className="form-control"
                          required
                          placeholder="Enter Project Name"
                          value={this.state.package}
                          onChange={this.onPackageNameChange}
                        />
                        <input
                          type="hidden"
                          name="blog_id"
                          defaultValue="MTc="
                        />
                        <input
                          type="hidden"
                          name="update"
                          defaultValue="blog_update"
                        />
                        <br />
                      </div>
                    </div>

                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <label>Price</label>
                      <input
                        type="number"
                        name="price"
                        id="blog_title"
                        className="form-control"
                        required
                        placeholder="Enter Price"
                        value={this.state.price}
                        onChange={this.onPriceChange}
                        // defaultValue="What is the best way to buy Cryptocurrency for beginners?"
                      />
                      <br />
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <label>Description</label>
                      <input
                        type="text"
                        name="short_description"
                        id="meta_title"
                        className="form-control"
                        required
                        placeholder="Enter Type"
                        value={this.state.short_description}
                        onChange={this.onDescChange}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <label>Pakage Details</label>
                      <input
                        type="text"
                        name="pakage_details"
                        id="meta_title"
                        className="form-control"
                        required
                        placeholder="Enter Type"
                        value={this.state.pakage_details}
                        onChange={this.onPakageChange}
                      />
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

export default withRouter(PricingEdit);
