import React, { Component } from "react";
import AdminHeader from "../../Components/AdminHeader";
import AdminSidebar from "../../Components/AdminSidebar";
import apiService from "../../../service/apiService";
import { Link } from "react-router-dom";

class PartnerListing extends Component {
  state = {
    showDeleteConfirmation: false,
    partners: [],
    selectedPartnerId: null,
  };

  componentDidMount() {
    this.fetchPartnerLists();
  }

  fetchPartnerLists = async () => {
    try {
      const response = await apiService.get("admin/partner");

      if (response.data && Array.isArray(response.data)) {
        // Filter out items with empty data
        const filteredPartner = response.data.filter(
          (partner) => partner.p_name && partner.p_website
        );

        // Sort the filtered lists
        const sortedLists = filteredPartner.sort((a, b) => b.p_id - a.p_id);

        // Update the state with the filtered and sorted lists
        this.setState({
          partners: sortedLists,
        });
      } else {
      }
    } catch (error) {
    }
  };

  handleDeleteClick = (partnerId) => {
    // Show the delete confirmation popup and store the selected partner id
    this.setState({
      showDeleteConfirmation: true,
      selectedPartnerId: partnerId,
    });
  };

  handleDeleteConfirmed = async () => {
    const { partners, selectedPartnerId } = this.state;

    try {
      const response = await apiService.post(
        "admin/partner/delete?p_id=" + selectedPartnerId + ""
      );

      if (response) {
        // Handle the delete logic here
        const updatedPricess = partners.filter(
          (partner) => partner.p_id !== selectedPartnerId
        );

        // Update the state with the new partner list and close the delete confirmation popup
        this.setState({
          partners: updatedPricess,
          showDeleteConfirmation: false,
          selectedPartnerId: null,
        });
      } else {
      }
    } catch (error) {
    }
  };

  handleDeleteCanceled = () => {
    // Close the delete confirmation popup
    this.setState({ showDeleteConfirmation: false, selectedPartnerId: null });
  };
  render() {
    const { showDeleteConfirmation, partners } = this.state;
    return (
      <div>
        <AdminHeader />
        <div className="dashBoardSec">
          <AdminSidebar />

          <div className="middleSec catbyMdl">
            <div className="headingD">
              <i className="fa fa-eye" aria-hidden="true"></i> Partners
              {/*
               */}
              <Link
                to="/admin/partner/add"
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
                            <th>Partner Name</th>
                            <th>Website</th>
                          </tr>
                        </thead>

                        <tbody>
                          {partners &&
                            partners.map((partner) => (
                              <tr className="trBack" key={partner.p_id}>
                                <td>
                                  <button
                                    id={`DelData${partner.p_id}`}
                                    onClick={() =>
                                      this.handleDeleteClick(partner.p_id)
                                    }
                                  >
                                    <i
                                      className="fa fa-window-close"
                                      style={{ color: "red", title: "Delete" }}
                                    ></i>
                                  </button>
                                  &emsp;&nbsp;
                                  <Link
                                    to={`/admin/partner/edit/${partner.p_id}`}
                                    state={{ teamInfo: partner }}
                                  >
                                    <i
                                      className="fa fa-pencil"
                                      aria-hidden="true"
                                      title="Edit"
                                    ></i>
                                  </Link>
                                </td>
                                <td>{partner.p_name}</td>
                                <td>{partner.p_website}</td>
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

export default PartnerListing;
