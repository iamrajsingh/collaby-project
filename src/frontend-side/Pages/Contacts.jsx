import React, { Component } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import apiService from "./../../service/apiService";
import Swal from "sweetalert2";

class Contacts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email_id: "",
      mobile: "",
      socialicon: "",
      query: "",
      successMessage: false,
    };
  }

  handleInputChange = (e) => {
    if (e.target.name === "socialicon") {
      // Handle dropdown selection
      this.setState({
        socialicon: e.target.value,
      });

      setTimeout(() => {
        if (this.state.socialicon == "telegram") {
          this.setState({
            telegram: "t.me/",
          });
        }
        else {
          this.setState({
            twitter: "",
          });
        }
      }, 10);

    } else {
      // Handle other input changes
      this.setState({
        [e.target.name]: e.target.value,
      });
    }
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name: this.state.name,
      email_id: this.state.email_id,
      mobile: this.state.mobile,
      query: this.state.query,
      telegram: this.state.telegram,
      twitter: this.state.twitter,
    };

    try {
      const response = await apiService.post(
        "front/contact_us/submit",
        null,
        formData
      );

      if (response.status === "200") {
        // Handle success, e.g., show a success message

        // Reset the form and show the success popup
        this.setState({
          name: "",
          email_id: "",
          mobile: "",
          query: "",
          //successMessage: "Thankyou for Contacting Us.",
        });
        Swal.fire({
          icon: 'success',
          title: 'Thank you for Contacting with us.',
          showConfirmButton: false,
          timer: 3000
        })
        // setTimeout(() => {
        //   this.setState({
        //     successMessage: false,
        //   });
        // }, 3000);
      }
      else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        })
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      })
    }
  };

  render() {
    return (
      <div>
        <Header />

        <div className="homeabout-Sec">
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-sm-12 col-xs-12">
                <div className="secHeading">
                  <h3>Get in touch with us</h3>
                </div>
              </div>

              <div className="col-md-2"></div>
              <div className="col-md-8 col-sm-12 col-xs-12">
                {this.state.successMessage && (
                  <div className="alert alert-success" role="alert">
                    Thankyou for Contacting Us.
                  </div>
                )}
                <div className="contactFormDfirst">
                  <div className="contactFormD">
                    {/* {this.state.successMessage && (
                    <div className="alert alert-success" role="alert">
                      Successfully Contact Added
                    </div>
                  )} */}
                    <form
                      className=""
                      action="#"
                      method="post"
                      onSubmit={this.handleSubmit}
                    >
                      <div className="row">
                        <div className="col-md-6 col-sm-6 col-xs-12">
                          <div className="form-group">
                            <label>Name:</label>
                            <input
                              type="text"
                              name="name"
                              className="form-control"
                              id="name"
                              placeholder="Enter Your Full Name"
                              value={this.state.name}
                              onChange={this.handleInputChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-6 col-sm-6 col-xs-12">
                          <div className="form-group">
                            <label>Phone Number:</label>
                            <input
                              name="mobile"
                              type="number"
                              className="form-control"
                              id="mob"
                              placeholder="Your Mobile Number"
                              value={this.state.mobile}
                              onChange={this.handleInputChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-12 col-sm-12 col-xs-12">
                          <div className="form-group">
                            <label>Email ID:</label>
                            <input
                              name="email_id"
                              type="email"
                              className="form-control"
                              id="mail"
                              placeholder="Enter Email ID"
                              value={this.state.email_id}
                              onChange={this.handleInputChange}
                              required
                            />
                          </div>
                        </div>


                        <div className="col-md-6 col-sm-6 col-xs-12">
                          <div className="form-group">
                            <label htmlFor="socialicon">Contact Medium:</label>
                            <select
                              className="form-control"
                              id="socialicon"
                              name="socialicon"
                              value={this.state.socialicon}
                              onChange={this.handleInputChange}
                              required
                            >
                              <option value="">--Select--</option>
                              <option value="telegram">Telegram</option>
                              <option value="twitter">Twitter</option>
                            </select>
                          </div>
                        </div>

                        <div className="col-md-6 col-sm-6 col-xs-12">
                          <div className="form-group">
                            <label htmlFor="socialId">
                              {this.state.socialicon === "telegram"
                                ? "Telegram"
                                : "Twitter"}{" "}
                              ID:
                            </label>
                            <input
                              type="id"
                              name={this.state.socialicon}
                              className="form-control"
                              id={this.state.socialicon}
                              placeholder={`Enter ${this.state.socialicon === "telegram"
                                ? "Telegram"
                                : "Twitter"
                                } ID`}
                              onChange={this.handleInputChange}
                              value={this.state[this.state.socialicon]}
                            />
                          </div>
                        </div>


                        <div className="col-md-12 col-sm-12 col-xs-12">
                          <div className="form-group">
                            <label>Description:</label>
                            <textarea
                              name="query"
                              className="form-control"
                              rows="5"
                              id="comment"
                              placeholder="Enter Description"
                              value={this.state.query}
                              onChange={this.handleInputChange}
                            ></textarea>
                          </div>
                        </div>
                        <div
                          className="col-md-12 col-sm-12 col-xs-12"
                          align="right"
                        >
                          <button type="submit" className="btn btn_gradiant">
                            Submit{" "}
                            <i
                              className="fa fa-chevron-circle-right"
                              aria-hidden="true"
                            ></i>{" "}
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
        />
      </div>
    );
  }
}

export default Contacts;
