import React, { Component } from "react";
import { Link } from "react-router-dom";
import AdminHeader from "../AdminHeader";
import AdminSidebar from "../AdminSidebar";

class AdminListing extends Component {
  state = {
    showDeleteConfirmation: false,
    lists: [
      { id: 1, name: " Name 1", date: "01-01-2023", image: "" },
      { id: 2, name: " Name 2", date: "02-02-2021", image: "" },
      // Add more lists as needed
    ],
    selectedListId: null,
  };

  handleDeleteClick = (listId) => {
    // Show the delete confirmation popup and store the selected list id
    this.setState({ showDeleteConfirmation: true, selectedListId: listId });
  };

  handleDeleteConfirmed = () => {
    const { lists, selectedListId } = this.state;

    // Handle the delete logic here
    const updatedPrices = lists.filter((list) => list.id !== selectedListId);

    // Update the state with the new list list and close the delete confirmation popup
    this.setState({
      lists: updatedPrices,
      showDeleteConfirmation: false,
      selectedListId: null,
    });
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
              <i className="fa fa-eye" aria-hidden="true"></i> Blogs
              {/*
               */}
              <Link to="/admin/blogs/add" className="btn btn-default pull-right">
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
                            <th>Blog Title</th>
                            <th>Date</th>
                          </tr>
                        </thead>

                        <tbody>
                          {lists.map((list) => (
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
                                <Link to={`/admin/blogs/edit/${list.id}`}>
                                  <i
                                    className="fa fa-pencil"
                                    aria-hidden="true"
                                    title="Edit"
                                  ></i>
                                </Link>
                              </td>
                              <td>{list.name}</td>
                              <td>{list.date}</td>
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

export default AdminListing;
