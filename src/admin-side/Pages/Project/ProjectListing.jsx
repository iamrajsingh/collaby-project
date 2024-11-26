import React, { Component } from "react";
import AdminHeader from "./../../Components/AdminHeader";
import AdminSidebar from "./../../Components/AdminSidebar";
import apiService from "./../../../service/apiService";
import { Link } from "react-router-dom";
import axios from "axios";

class ProjectListing extends Component {
  state = {
    showDeleteConfirmation: false,

    lists: [],
    selectedListId: null,
    showCsv: false,
    file: null,
  };

  componentDidMount() {
    this.fetchProjectLists();
  }

  fetchProjectLists = async () => {
    try {
      const response = await apiService.get("admin/project");

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
      const response = await apiService.post(
        "admin/project/delete?p_id=" + selectedListId + ""
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
  visibleCsv = (() => {
    this.setState({ showCsv: true, })
  });


  handleOnChange = (e) => {
    this.setState({ file: e.target.files[0] });
  };

  handleOnSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", this.state.file);

    axios.post("https://ohkolkata.com/collably/admin/project/bulk_save", formData)
      .then((res) => {
        setTimeout(() => {
          this.setState({ showCsv: false, });
        }, 2000);

      })
      .catch((err) => {
      })
  };
  handleCanceled = (() => {
    this.setState({ showCsv: false, })
  });


  render() {
    const { showDeleteConfirmation, lists, showCsv } = this.state;

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
            <button className="btn btn-default pull-right" onClick={this.visibleCsv}>
              <i className="fa-regular fa-square-plus"></i> Add Csv
            </button>
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
                                <button
                                  id={`DelData${list.p_id}`}
                                  onClick={() =>
                                    this.handleDeleteClick(list.p_id)
                                  }
                                >
                                  <i
                                    className="fa fa-window-close"
                                    style={{ color: "red", title: "Delete" }}
                                  ></i>
                                </button>
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

            {showCsv && (
              <div className="popup">
                <div className="popup-content">
                  <h3>CSV Import</h3>
                  <hr />
                  <form>
                    <input
                      className="form-control"
                      type="file"
                      name="file"
                      id="csvFileInput"
                      accept=".csv"
                      onChange={this.handleOnChange}
                    />
                    <div className="pt-3">
                      <button className="btn btn-primary" onClick={this.handleOnSubmit}>Submit</button>
                      <button className="btn btn-danger" onClick={this.handleCanceled}>Cancel</button>
                    </div>

                  </form>
                  <div className="button-container">
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
