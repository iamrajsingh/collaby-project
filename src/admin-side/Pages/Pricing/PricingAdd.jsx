import React, { Component } from "react";
import AdminHeader from "./../../Components/AdminHeader";
import AdminSidebar from "./../../Components/AdminSidebar";
import axios from "axios";
import { Link } from "react-router-dom";
// import ReactQuill from "react-quill";

class PricingAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      package: "",
      short_description: "",
      price: "",
      pakage_details: [],
      priceing_type: "",

      isLoading: false,
      errorMessage: null,
      successMessageVisible: false,
      timeoutId: null, // Store the timeout ID in the state
    };
  }

  componentWillUnmount() {
    // Clear the timeout when the component unmounts
    const { timeoutId } = this.state;
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  }
  // handelAdd = () => {
  //   const abc = [...this.state.pakage_details, []];
  //   this.setState({pakage_details: abc });
  // }
  // handelPakageDetails = (e, i) => {
  //   const inputdata = [...this.state];
  //   inputdata[i] = e.target.value;
  //   this.setState({ pakage_details: inputdata });
  // }
  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const apiEndpoint = "https://ohkolkata.com/collably/admin/pricing/save";

    const formData = {
      package: this.state.package,
      short_description: this.state.short_description,
      price: this.state.price,
      pakage_details: this.state.pakage_details,
      priceing_type: this.state.priceing_type,

    };

    try {
      const response = await axios.post(apiEndpoint, {}, { params: formData });

      if (response.status === 200) {
        // Handle success, e.g., show a success message

        // Reset the form and show the success popup
        this.setState({
          package: "",
          short_description: "",
          price: "",
          pakage_details: "",

          isLoading: false,
          successMessageVisible: true,
        });

        // Display the success popup
        document.querySelector(".alert-success.Add").style.display = "block";

        const { timeoutId } = this.state;
        if (timeoutId) {
          clearTimeout(timeoutId);
        }

        // Set a new timeout to hide the success popup after 3 seconds (adjust the timeout as needed)
        const newTimeoutId = setTimeout(() => {
          document.querySelector(".alert-success.Add").style.display = "none";
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
            <form method="post" id="addfrm" onSubmit={this.handleSubmit}>
              <div className="headingD">
                <i className="fa fa-plus-square-o" aria-hidden="true"></i> Add
                Pricing
                <Link
                  to="/admin/pricing/listing"
                  className="btn btn-default pull-right"
                >
                  <i className="fa fa-arrow-left" aria-hidden="true"></i> Back
                </Link>
                &emsp;
              </div>
              <div
                className="alert alert-success Add"
                style={{ display: "none" }}
              >
                <strong>Successfully Added Your Data!</strong>
              </div>
              <div className="addPageSec catbyMdl">
                <div className="container-fluid">
                  <div className="row">
                    <div className="form-group">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <label>Package</label>
                        <input
                          type="text"
                          name="package"
                          id="meta_keyword"
                          className="form-control"
                          required
                          placeholder="Enter Project Name"
                          value={this.state.package}
                          onChange={this.handleInputChange}
                        />
                        <br />
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <label>Short Description</label>
                        <input
                          type="text"
                          name="short_description"
                          id="meta_keyword"
                          className="form-control"
                          required
                          placeholder="Enter Project Name"
                          value={this.state.short_description}
                          onChange={this.handleInputChange}
                        />
                        <br />
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <label>Price</label>
                        <input
                          type="number"
                          name="price"
                          id="blog_title"
                          className="form-control"
                          required
                          placeholder="Enter Price Here"
                          value={this.state.price}
                          onChange={this.handleInputChange}
                        />
                        <br />
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <label>Pakage Details</label>                  
                              <input
                                type="text"
                                name="pakage_details"
                                id="pakage_details"
                                className="form-control"
                                required
                                placeholder="Enter Type"
                                value={this.state.pakage_details}
                                onChange={this.handleInputChange}
                              />
                              <br />
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <label>Package Type</label>
                        <select name="priceing_type" className="form-control" id="priceing_type" onChange={this.handleInputChange}>
                          <option value="default">--Select--</option>
                          <option value="Monthly">Monthly</option>
                          <option value="Yearly">Yearly</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <button
                          type="submit"
                          className="btn btn-primary addbtn"
                        >
                          <i className="fa fa-floppy-o" aria-hidden="true"></i>{" "}
                          Save
                        </button>
                        <button
                          className="btn btn-primary addload buttonload"
                          style={{ display: "none" }}
                        >
                          <i
                            className="fa fa-spinner fa-spin"
                            style={{
                              marginLeft: "-12px",
                              marginRight: "8px",
                            }}
                          ></i>
                          Please Wait
                        </button>
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

export default PricingAdd;
