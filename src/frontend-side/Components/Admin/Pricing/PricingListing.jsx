import React, { Component } from "react";
import AdminHeader from "./../AdminHeader";
import AdminSidebar from "./../AdminSidebar";
import apiService from "./../../../service/apiService";
import { Link } from "react-router-dom";

class PricingListing extends Component {
  state = {
    showDeleteConfirmation: false,
    prices: [],
    selectedPriceId: null,
  };

  componentDidMount() {
    this.fetchPriceLists();
  }

  fetchPriceLists = async () => {
    try {
      const response = await apiService.get("collably/admin/pricing");

      if (response.data && Array.isArray(response.data)) {
        // Filter out items with empty data
        const filteredPrices = response.data.filter(
          (price) => price.package && price.pakage_details
        );

        // Sort the filtered lists
        const sortedLists = filteredPrices.sort((a, b) => b.id - a.id);

        // Update the state with the filtered and sorted lists
        this.setState({
          prices: sortedLists,
        });
      } else {
      }
    } catch (error) {
    }
  };

  handleDeleteClick = (priceId) => {
    // Show the delete confirmation popup and store the selected price id
    this.setState({ showDeleteConfirmation: true, selectedPriceId: priceId });
  };

  handleDeleteConfirmed = async () => {
    const { prices, selectedPriceId } = this.state;
    const api_url="https://ohkolkata.com/collably/admin/pricing/delete";

    try {
      const response = await apiService.delete(`${api_url}/${selectedPriceId}`);

      if (response) {
        // Handle the delete logic here
        const updatedPricess = prices.filter(
          (price) => price.id !== selectedPriceId
        );

        // Update the state with the new price list and close the delete confirmation popup
        this.setState({
          prices: updatedPricess,
          showDeleteConfirmation: false,
          selectedPriceId: null,
        });
      } else {
      }
    } catch (error) {
    }
  };

  handleDeleteCanceled = () => {
    // Close the delete confirmation popup
    this.setState({ showDeleteConfirmation: false, selectedPriceId: null });
  };
  render() {
    const { showDeleteConfirmation, prices } = this.state;

    return (
      <div>
        <AdminHeader />
        <div className="dashBoardSec">
          <AdminSidebar />

          <div className="middleSec catbyMdl">
            <div className="headingD">
              <i className="fa fa-eye" aria-hidden="true"></i> Pricing
              {/*
               */}
              <Link
                to="/admin/pricing/add"
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
                            <th>Package</th>
                            <th>Price</th>
                            <th>Pakage Details</th>
                          </tr>
                        </thead>

                        <tbody>
                          {prices &&
                            prices.map((price) => (
                              <tr className="trBack" key={price.id}>
                                <td>
                                  <a
                                    id={`DelData${price.id}`}
                                    onClick={() =>
                                      this.handleDeleteClick(price.id)
                                    }
                                  >
                                    <i
                                      className="fa fa-window-close"
                                      style={{ color: "red", title: "Delete" }}
                                    ></i>
                                  </a>
                                  &emsp;&nbsp;
                                  {/* <a href={`/admin/pricing/edit/${price.id}`}>
                                    <i
                                      className="fa fa-pencil"
                                      aria-hidden="true"
                                      title="Edit"
                                    ></i>
                                  </a> */}
                                  <Link
                                    to={`/admin/pricing/edit/${price.id}`}
                                    state={{ teamInfo: price }}
                                  >
                                    <i
                                      className="fa fa-pencil"
                                      aria-hidden="true"
                                      title="Edit"
                                    ></i>
                                  </Link>
                                </td>
                                <td>{price.package}</td>
                                <td>{price.price}</td>
                                <td>{price.pakage_details}</td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                {showDeleteConfirmation && (
                  <div className="popup">
                    <div className="popup-content">
                      <span
                        className="close"
                        onClick={this.handleDeleteCanceled}
                      >
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
      </div>
    );
  }
}

export default PricingListing;
