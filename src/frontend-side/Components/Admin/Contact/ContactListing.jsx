import React, { Component } from "react";
import AdminHeader from "../AdminHeader";
import AdminSidebar from "../AdminSidebar";

import apiService from "./../../../service/apiService";

class ContactListing extends Component {
  state = {
    showDeleteConfirmation: false,
    lists: [
      // Add more lists as needed
    ],
    selectedListId: null,
  };

  componentDidMount() {
    this.fetchContactLists();
  }

  fetchContactLists = async () => {
    try {
      const response = await apiService.get("collably/admin/contact");

      if (response.data && Array.isArray(response.data)) {
        // Filter out items with empty data
        const filteredLists = response.data.filter(
          (list) => list.name && list.mobile
        );

        // Sort the filtered lists
        const sortedLists = filteredLists.sort((a, b) => b.id - a.id);

        // Update the state with the filtered and sorted lists
        this.setState({
          lists: sortedLists,
        });
      } else {
      }
    } catch (error) {
    }
  };

  handleDeleteClick = (listId) => {
    // Show the delete confirmation popup and store the selected list id
    this.setState({ showDeleteConfirmation: true, selectedListId: listId });
  };

  // handleDeleteConfirmed = () => {
  //   const { lists, selectedListId } = this.state;

  //   // Use the selectedListId to construct the API endpoint
  //   const apiUrl = `https://workunderprogress.com/collably/admin/contact/delete?id=${selectedListId}`;

  //   // Send a DELETE request to the API
  //   axios
  //     .delete(apiUrl)
  //     .then((response) => {
  //       if (response.status === 200) {
  //         // If the delete request was successful, update the state
  //         const updatedLists = lists.filter(
  //           (list) => list.id !== selectedListId
  //         );

  //         this.setState({
  //           lists: updatedLists,
  //           showDeleteConfirmation: false,
  //           selectedListId: null,
  //         });
  //       } else {
  //         // Handle other response statuses or errors if needed
  //         console.error(`Failed to delete item. Status: ${response.status}`);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error deleting item", error);
  //     })
  //     .finally(() => {
  //       // Always reset the selectedListId and hide the confirmation popup
  //       this.setState({
  //         selectedListId: null,
  //         showDeleteConfirmation: false,
  //       });
  //     });
  // };

  handleDeleteConfirmed = async () => {
    const { lists, selectedListId } = this.state;

    try {
      const response = await apiService.delete(
        "collably/admin/contact/delete?id=" + selectedListId + ""
      );

      if (response) {
        // Handle the delete logic here
        const updatedLists = lists.filter((list) => list.id !== selectedListId);

        // Update the state with the new list list and close the delete confirmation popup
        this.setState({
          lists: updatedLists,
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
          <div className="middleSec catbyMdl">
            <div className="headingD">
              <i className="fa fa-eye" aria-hidden="true"></i> Contact
              {/*
               */}
              {/* <a
                href="/admin/dashboard/admin-add"
                className="btn btn-default pull-right"
              >
                <i className="fa-regular fa-square-plus"></i> Add New
              </a> */}
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
                            <th>Name</th>
                            <th>Phone Number</th>
                            <th>Email</th>
                            <th>Description</th>
                          </tr>
                        </thead>

                        <tbody>
                          {lists &&
                            lists.map((list) => (
                              <tr className="trBack" key={list.id}>
                                <td>
                                  <button
                                    id={`DelData${list.id}`}
                                    onClick={() =>
                                      this.handleDeleteClick(list.id)
                                    }
                                  >
                                    <i
                                      className="fa fa-window-close"
                                      style={{ color: "red", title: "Delete" }}
                                    ></i>
                                  </button>
                                  &emsp;&nbsp;
                                  {/* <a
                                  href={`/admin/dashboard/admin-edit/${list.id}`}
                                >
                                  <i
                                    className="fa fa-pencil"
                                    aria-hidden="true"
                                    title="Edit"
                                  ></i>
                                </a> */}
                                </td>
                                <td>{list.name}</td>
                                <td>{list.mobile}</td>
                                <td>{list.email_id}</td>
                                <td>{list.query}</td>
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

export default ContactListing;
