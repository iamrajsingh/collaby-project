import React, { Component } from "react";
import AdminHeader from "../../Components/AdminHeader";
import AdminSidebar from "../../Components/AdminSidebar";
import apiService from "../../../service/apiService";
import { Link } from "react-router-dom";

class KeywordListing extends Component {
  state = {
    showDeleteConfirmation: false,
    keywords: [],
    selectedTeamId: null,
  };

  componentDidMount() {
    this.fetchTeamLists();
  }

  fetchTeamLists = async () => {
    try {
      const response = await apiService.get("admin/keywards");

      if (response.data && Array.isArray(response.data)) {
        // Filter out items with empty data
        const filteredTeams = response.data.filter(
          (keyword) => keyword.keyward
        );

        // Sort the filtered lists
        const sortedLists = filteredTeams.sort((a, b) => b.id - a.id);

        // Update the state with the filtered and sorted lists
        this.setState({
          keywords: sortedLists,
        });
      }
    } catch (error) {
      console.error("");
    }
  };

  handleDeleteClick = (teamId) => {
    // Show the delete confirmation popup and store the selected keyword id
    this.setState({ showDeleteConfirmation: true, selectedTeamId: teamId });
  };

  handleDeleteConfirmed = async () => {
    const { keywords, selectedTeamId } = this.state;

    try {
      const response = await apiService.post(
        "/admin/keywards/delete?id=" + selectedTeamId + ""
      );

      if (response) {
        // Handle the delete logic here
        const updatedTeams = keywords.filter(
          (keyword) => keyword.id !== selectedTeamId
        );

        // Update the state with the new keyword list and close the delete confirmation popup
        this.setState({
          keywords: updatedTeams,
          showDeleteConfirmation: false,
          selectedTeamId: null,
        });
      } else {
        // console.error("Invalid or empty response:", response);
      }
    } catch (error) {
      console.error("error:",error);
    }
  };

  handleDeleteCanceled = () => {
    // Close the delete confirmation popup
    this.setState({ showDeleteConfirmation: false, selectedTeamId: null });
  };

  render() {
    const { showDeleteConfirmation, keywords } = this.state;

    return (
      <div>
        <AdminHeader />
        <div className="dashBoardSec">
          <AdminSidebar />

          <div className="middleSec catbyMdl">
            <div className="headingD">
              <i className="fa fa-eye" aria-hidden="true"></i> Target Keywords
              <Link
                to="/admin/keyword/add"
                className="btn btn-default pull-right"
              >
                <i className="fa-regular fa-square-plus"></i> Add New
              </Link>
            </div>

            <div className="showPageSec">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 padleftright0">
                    <div className="table-responsive dataTable catbyMdl">
                      <table
                        id="myTable"
                        className="display table"
                        style={{ width: "100%" }}
                      >
                        <thead>
                          <tr>
                            <th>Action</th>
                            <th>Target Keywords</th>
                          </tr>
                        </thead>

                        <tbody>
                          {keywords &&
                            keywords.map((keyword) => (
                              <tr className="trBack" key={keyword.id}>
                                <td>
                                  <button
                                    id={`DelData${keyword.id}`}
                                    onClick={() =>
                                      this.handleDeleteClick(keyword.id)
                                    }
                                  >
                                    <i
                                      className="fa fa-window-close"
                                      style={{ color: "red", title: "Delete" }}
                                    ></i>
                                  </button>
                                  &emsp;&nbsp;
                                  {/* <a href={`/admin/keyword/edit/${keyword.id}`}>
                                    <i
                                      className="fa fa-pencil"
                                      aria-hidden="true"
                                      title="Edit"
                                    ></i>
                                  </a> */}
                                  {/* <Link
                                    to={{
                                      pathname: `/admin/keyword/edit/${keyword.id}`,
                                      state: { username: "JohnDoe" },
                                    }}
                                  >
                                    <i
                                      className="fa fa-pencil"
                                      aria-hidden="true"
                                      title="Edit"
                                    ></i>
                                  </Link> */}
                                  <Link
                                    to={`/admin/keyword/edit/${keyword.id}`}
                                    state={{ teamInfo: keyword }}
                                  >
                                    <i
                                      className="fa fa-pencil"
                                      aria-hidden="true"
                                      title="Edit"
                                    ></i>
                                  </Link>
                                  {/* <Link to={`/admin/keyword/edit/${keyword.id}`}>
                                    <i
                                      className="fa fa-pencil"
                                      aria-hidden="true"
                                      title="Edit"
                                    ></i>
                                  </Link> */}
                                </td>
                                <td>{keyword.keyward}</td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              {showDeleteConfirmation && (
                <div key="deleteConfirmation" className="popup">
                  <div className="popup-content">
                    <span className="close" onClick={this.handleDeleteCanceled}>
                      &times;
                    </span>
                    <h4>Delete Confirmation</h4>
                    <p>Are you sure you want to delete this item?</p>
                    <div className="button1">
                      <button onClick={this.handleDeleteConfirmed}>
                        Delete
                      </button>
                      <button onClick={this.handleDeleteCanceled}>
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default KeywordListing;
