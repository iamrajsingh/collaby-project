import React, { Component } from "react";
import AdminHeader from "../../Components/AdminHeader";
import AdminSidebar from "../../Components/AdminSidebar";
import apiService from "../../../service/apiService";
import { Link } from "react-router-dom";

class Slider1Listing extends Component {
  state = {
    sliders: [],
    showDeleteConfirmation: false,
    selectedListId: null,
  };

  componentDidMount() {
    this.fetchSliderLists();
  }

  fetchSliderLists = async () => {
    try {
      const response = await apiService.get("admin/first_slider/");

      if (response.data && Array.isArray(response.data)) {
        this.setState({
          sliders: response.data,
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

  handleDeleteConfirmed = async () => {
    const { lists, selectedListId } = this.state;

    try {
      const response = await apiService.post(
        "admin/first_slider/delete?fs_id=" + selectedListId + ""
      );

      this.setState({
        showDeleteConfirmation: false,
      });

      if (response) {
        // Handle the delete logic here
        // const updatedPricess = lists.filter(
        //   (list) => list.p_id !== selectedListId
        // );
        this.fetchSliderLists();
        // Update the state with the new list list and close the delete confirmation popup
        this.setState({
          showDeleteConfirmation: false,
          selectedListId: null
        });
      }
    } catch (error) {
    }
  };

  handleDeleteCanceled = () => {
    // Close the delete confirmation popup
    this.setState({ showDeleteConfirmation: false, selectedListId: null });
  };

  render() {
    const { sliders } = this.state;

    return (
      <div>
        <AdminHeader />
        <div className="dashBoardSec">
          <AdminSidebar />

          <div className="middleSec catbyMdl">
            <div className="headingD">
              <i className="fa fa-eye" aria-hidden="true"></i> Sliders 1
              {/*
               */}
              <Link
                to="/admin/slider1/add"
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
                            <th>Title</th>
                            <th>Image</th>
                            <th>Link</th>
                          </tr>
                        </thead>

                        <tbody>
                          {sliders &&
                            sliders.map((slider) => (
                              <tr className="trBack" key={slider.fs_id}>
                                <td>
                                  <button
                                    id={`DelData${slider.fs_id}`}
                                    onClick={() =>
                                      this.handleDeleteClick(slider.fs_id)
                                    }
                                  >
                                    <i
                                      className="fa fa-window-close"
                                      style={{ color: "red", title: "Delete" }}
                                    ></i>
                                  </button>
                                  <Link
                                    to={`/admin/slider1/edit/${slider.fs_id}`}
                                    state={{ sliderInfo: slider }}
                                  >
                                    <i
                                      className="fa fa-pencil"
                                      aria-hidden="true"
                                      title="Edit"
                                    ></i>
                                  </Link>
                                </td>
                                <td>{slider.title}</td>
                                <td>
                                  <img
                                    src={slider.image}
                                    alt={slider.title}
                                    className="img-responsive"
                                    height={100}
                                    width={100}
                                  />
                                </td>
                                <td>{slider.link}</td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {this.state.showDeleteConfirmation && <div className="popup">
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

            }
          </div>
        </div>
      </div>
    );
  }
}

export default Slider1Listing;
