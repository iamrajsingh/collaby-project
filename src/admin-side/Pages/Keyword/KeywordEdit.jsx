import React, { Component } from "react";
import AdminHeader from "./../../Components/AdminHeader";
import AdminSidebar from "./../../Components/AdminSidebar";
import apiService from "./../../../service/apiService";
import { withRouter } from "./../../../utils/withRouter";
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";

class KeywordEdit extends Component {
  state = {
    keyward: "",
    id: "",
    isDataUpdated: false,
    timeoutId: null,
  };

  componentDidMount() {
    const teamInfo = this.props?.router?.location?.state?.teamInfo;
    if (teamInfo) {
      this.setState({
        keyward: teamInfo.keyward,
        id: teamInfo.id,
      });
    }
  }

  onNameChange = (e) => {
    this.setState({
      keyward: e.target.value,
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
      const formData = {
        keyward: this.state.keyward,
        id: this.state.id,
      };

      const response = await apiService.post(
        "admin/keywards/update",
        null,
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
                <i className="fa fa-pencil" aria-hidden="true"></i> Edit Keyword{" "}
                <Link
                  to="/admin/keyword/listing"
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
                        <label>Target Keyword</label>
                        <input
                          type="text"
                          name="keyward"
                          id="keyward"
                          className="form-control"
                          required
                          placeholder="Enter Keyword"
                          value={this.state.keyward}
                          onChange={this.onNameChange}
                          // defaultValue="What is the best way to buy Cryptocurrency for beginners?"
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

export default withRouter(KeywordEdit);
