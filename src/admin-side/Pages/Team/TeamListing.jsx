import React, { Component } from "react";
import AdminHeader from "../../Components/AdminHeader";
import AdminSidebar from "../../Components/AdminSidebar";
import apiService from "../../../service/apiService";
import { Link } from "react-router-dom";

class TeamListing extends Component {
  state = {
    showDeleteConfirmation: false,
    teams: [],
    selectedTeamId: null,
  };

  componentDidMount() {
    this.fetchTeamLists();
  }

  fetchTeamLists = async () => {
    try {
      const response = await apiService.post("admin/team");

      if (response.data && Array.isArray(response.data)) {
        // Filter out items with empty data
        const filteredTeams = response.data.filter(
          (team) => team.t_name && team.t_designation
        );

        // Sort the filtered lists
        const sortedLists = filteredTeams.sort((a, b) => b.t_id - a.t_id);

        // Update the state with the filtered and sorted lists
        this.setState({
          teams: sortedLists,
        });
      } else {
      }
    } catch (error) {
    }
  };

  handleDeleteClick = (teamId) => {
    // Show the delete confirmation popup and store the selected team id
    this.setState({ showDeleteConfirmation: true, selectedTeamId: teamId });
  };

  handleDeleteConfirmed = async () => {
    const { teams, selectedTeamId } = this.state;

    try {
      const response = await apiService.post(
        "admin/team/delete?t_id=" + selectedTeamId + ""
      );

      if (response) {
        // Handle the delete logic here
        const updatedTeams = teams.filter(
          (team) => team.t_id !== selectedTeamId
        );

        // Update the state with the new team list and close the delete confirmation popup
        this.setState({
          teams: updatedTeams,
          showDeleteConfirmation: false,
          selectedTeamId: null,
        });
      } else {
      }
    } catch (error) {
    }
  };

  handleDeleteCanceled = () => {
    // Close the delete confirmation popup
    this.setState({ showDeleteConfirmation: false, selectedTeamId: null });
  };

  render() {
    const { showDeleteConfirmation, teams } = this.state;

    return (
      <div>
        <AdminHeader />
        <div className="dashBoardSec">
          <AdminSidebar />

          <div className="middleSec catbyMdl">
            <div className="headingD">
              <i className="fa fa-eye" aria-hidden="true"></i> Teams
              <Link to="/admin/team/add" className="btn btn-default pull-right">
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
                            <th>Team Name</th>
                            <th>Designation</th>
                          </tr>
                        </thead>

                        <tbody>
                          {teams &&
                            teams.map((team) => (
                              <tr className="trBack" key={team.t_id}>
                                <td>
                                  <button
                                    t_id={`DelData${team.t_id}`}
                                    onClick={() =>
                                      this.handleDeleteClick(team.t_id)
                                    }
                                  >
                                    <i
                                      className="fa fa-window-close"
                                      style={{ color: "red", title: "Delete" }}
                                    ></i>
                                  </button>
                                  &emsp;&nbsp;
                                  {/* <a href={`/admin/team/edit/${team.t_id}`}>
                                    <i
                                      className="fa fa-pencil"
                                      aria-hidden="true"
                                      title="Edit"
                                    ></i>
                                  </a> */}
                                  {/* <Link
                                    to={{
                                      pathname: `/admin/team/edit/${team.t_id}`,
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
                                    to={`/admin/team/edit/${team.t_id}`}
                                    state={{ teamInfo: team }}
                                  >
                                    <i
                                      className="fa fa-pencil"
                                      aria-hidden="true"
                                      title="Edit"
                                    ></i>
                                  </Link>
                                  {/* <Link to={`/admin/team/edit/${team.t_id}`}>
                                    <i
                                      className="fa fa-pencil"
                                      aria-hidden="true"
                                      title="Edit"
                                    ></i>
                                  </Link> */}
                                </td>
                                <td>{team.t_name}</td>
                                <td>{team.t_designation}</td>
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

export default TeamListing;
