import React, { Component } from "react";
import AdminHeader from "./../AdminHeader";
import AdminSidebar from "./../AdminSidebar";
import apiService from "./../../../service/apiService";
import { Link } from "react-router-dom";

class ProjectListing extends Component {
  state = {
    showDeleteConfirmation: false,

    //   {
    //     p_id: 1,
    //     project_name: " collabaly",
    //     website: "www.ollabaly.com",
    //     image: "",
    //   },
    //   {
    //     p_id: 2,
    //     project_name: " dnd",
    //     website: "www.dnd.com",
    //     image: "",
    //   },
    //   // Add more lists as needed
    // ],
    lists: [],
    selectedListId: null,
  };

  componentDidMount() {
    this.fetchProjectLists();
  }

  fetchProjectLists = async () => {
    try {
      const response = await apiService.get("collably/admin/project");

      // Handle the response as needed

      // Filter out items with empty data
      const filteredLists = response.data.filter(
        (list) => list.project_name && list.website
      );

      //

      const sortedLists = filteredLists.sort((a, b) => b.p_id - a.p_id);

      // Update the state with the filtered and sorted lists
      this.setState({
        lists: sortedLists,
      });
    } catch (error) {
    }
  };

  handleDeleteClick = (listId) => {
    // Show the delete confirmation popup and store the selected list id
    this.setState({ showDeleteConfirmation: true, selectedListId: listId });
  };

  handleDeleteConfirmed = async () => {
    const { lists, selectedListId } = this.state;

    try {
      const response = await apiService.delete(
        "collably/admin/project/delete?p_id=" + selectedListId + ""
      );

      if (response) {
        // Handle the delete logic here
        const updatedPricess = lists.filter(
          (list) => list.p_id !== selectedListId
        );

        // Update the state with the new list list and close the delete confirmation popup
        this.setState({
          lists: updatedPricess,
          showDeleteConfirmation: false,
          selectedListId: null,
        });
      } else {
      }
    } catch (error) {
    }
  };

  handleDeleteCanceled = () => {
    // Close the delete confirmation popup
    this.setState({ showDeleteConfirmation: false, selectedListId: null });
  };

  render() {
    const { showDeleteConfirmation, lists } = this.state;

    return (
      <div>
        <AdminHeader />
        <div className="dashBoardSec">
          <AdminSidebar />
        </div>

        <div className="middleSec catbyMdl">
          <div className="headingD">
            <i className="fa fa-eye" aria-hidden="true"></i> Projects
            {/*
             */}
            <Link to="/admin/project/add" className="btn btn-default pull-right">
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
                          <th>Project Name</th>
                          <th>Website</th>
                          {/* <th>Image</th> */}
                        </tr>
                      </thead>

                      <tbody>
                        {lists &&
                          lists.map((list) => (
                            <tr className="trBack" key={list.p_id}>
                              <td>
                                <a
                                  id={`DelData${list.p_id}`}
                                  onClick={() =>
                                    this.handleDeleteClick(list.p_id)
                                  }
                                >
                                  <i
                                    className="fa fa-window-close"
                                    style={{ color: "red", title: "Delete" }}
                                  ></i>
                                </a>
                                &emsp;&nbsp;
                                <Link
                                  to={`/admin/project/edit/${list.p_id}`}
                                  state={{ teamInfo: list }}
                                >
                                  <i
                                    className="fa fa-pencil"
                                    aria-hidden="true"
                                    title="Edit"
                                  ></i>
                                </Link>
                              </td>
                              <td>{list.project_name}</td>
                              <td>{list.website}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            {showDeleteConfirmation && (
              <div className="popup">
                <div className="popup-content">
                  <span className="close" onClick={this.handleDeleteCanceled}>
                    &times;
                  </span>
                  <h4>Delete Confirmation</h4>
                  <p>Are you sure you want to delete this item?</p>
                  <div className="button-container">
                    <button onClick={this.handleDeleteConfirmed}>Delete</button>
                    <button onClick={this.handleDeleteCanceled}>Cancel</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default ProjectListing;
