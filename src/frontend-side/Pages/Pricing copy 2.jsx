import React, { Component } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Shape from "../Images/Shape.png";
import Checkcircle from "../Images/checkcircle.png";
import apiService from "./../../service/apiService";

class Pricing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMonthly: true,
      monthlyData: [],
      yearlyData: [],
    };
  }
  componentDidMount() {
    this.fetchMonthlyPrice();
    this.fetchYearlyPrice();
  }
  fetchMonthlyPrice = async () => {
    try {
      const response = await apiService.get("front/pricing/monthly");

      if (response.data && Array.isArray(response.data)) {
        this.setState({
          monthlyData: response.data,
        });
        console.log("data monthly", response);
      } else {
        console.error("Invalid or empty response:", response);
      }
    } catch (error) {
      console.error("error", error.message);
    }
  };

  fetchYearlyPrice = async () => {
    try {
      const response = await apiService.get("front/pricing/yearly");

      if (response.data && Array.isArray(response.data)) {
        this.setState({
          yearlyData: response.data,
        });
        console.log("data yearly", response);
      } else {
        console.error("Invalid or empty response:", response);
      }
    } catch (error) {
      console.error("error", error.message);
    }
  };
  render() {
    const { isMonthly } = this.state;
    return (
      <div>
        <Header />

        <div className="Pricing-Sec">
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-sm-12 col-xs-12" align="center">
                <div className="secHeading">
                  <h3>Collably Pricing</h3>
                  <p>No contracts. No surprise fees.</p>
                </div>
              </div>
              <div className="col-md-12 col-sm-12 col-xs-12">
                <div className="tavSec">
                  <div className="pillWid">
                    <ul className="nav nav-pills">
                      <li className="nav-item">
                        <a
                          className={`nav-link ${isMonthly ? "active" : ""}`}
                          data-bs-toggle="pill"
                          // href="#home"
                          onClick={() => this.setState({ isMonthly: true })}
                        >
                          MONTHLY
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className={`nav-link ${!isMonthly ? "active" : ""}`}
                          data-bs-toggle="pill"
                          // href="#menu1"
                          onClick={() => this.setState({ isMonthly: false })}
                        >
                          YEARLY
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div className="tab-content">
                    <div
                      className={`tab-pane container ${isMonthly ? "active" : "fade"
                        }`}
                      id="home"
                    >
                      <div className="row pricingMainBGD">
                        {/* <div className="col-md-3 col-sm-3 col-12 padleftright0">
                          <div className="pricingMainD">
                            <h3>
                              $0<small>/month</small>
                            </h3>
                            <h4>Free</h4>
                            <p>
                              For most businesses that want to otpimize web
                              queries
                            </p>
                            <ul>
                              <li>
                                <img src={Shape} /> Project Name
                              </li>
                              <li>
                                <img src={Shape} /> Website
                              </li>
                              <li>
                                <img src={Shape} /> Description
                              </li>
                            </ul>

                            <a href="#" className="btn btn-pricing">
                              Choose plan
                            </a>
                          </div> 
                         </div> */}
                        {/* <div className="col-md-3 col-sm-3 col-12 padleftright0">
                          <div className="pricingMainD">
                            <h3>
                              $50<small>/month</small>
                            </h3>
                            <h4>Bronze</h4>
                            <p>
                              For most businesses that want to otpimize web
                              queries
                            </p>
                            <ul>
                              <li>
                                <img src={Shape} /> Project Name
                              </li>
                              <li>
                                <img src={Shape} /> Website
                              </li>
                              <li>
                                <img src={Shape} /> Description
                              </li>
                              <li>
                                <img src={Shape} /> Projects Keywords
                              </li>
                            </ul>

                            <a href="#" className="btn btn-pricing">
                              Choose plan
                            </a>
                          </div>
                        </div> */}

                        {/* <div className="col-md-3 col-sm-3 col-12 padleftright0">
                          <div className="pricingMainD active">
                            <span>MOST POPULAR</span>
                            <h3>
                              $100<small>/month</small>
                            </h3>
                            <h4>Silver</h4>
                            <p>
                              For most businesses that want to otpimize web
                              queries
                            </p>
                            <ul>
                              <li>
                                <img src={Checkcircle} /> Project Name
                              </li>
                              <li>
                                <img src={Checkcircle} /> Website
                              </li>
                              <li>
                                <img src={Checkcircle} /> Description
                              </li>
                              <li>
                                <img src={Checkcircle} /> Projects Keywords
                              </li>
                              <li>
                                <img src={Checkcircle} /> Email ID
                              </li>
                            </ul>

                            <a href="#" className="btn btn-pricing">
                              Choose plan
                            </a>
                          </div>
                        </div> */}

                        <div className="col-md-3 col-sm-3 col-12 padleftright0">
                          <div className="pricingMainD">
                            <h3>
                              $200<small>/month</small>
                            </h3>
                            <h4>Gold</h4>
                            <p>
                              For most businesses that want to otpimize web
                              queries
                            </p>
                            <ul>
                              <li>
                                <img src={Shape} /> Project Name
                              </li>
                              <li>
                                <img src={Shape} /> Website
                              </li>
                              <li>
                                <img src={Shape} /> Description
                              </li>
                              <li>
                                <img src={Shape} /> Projects Keywords
                              </li>
                              <li>
                                <img src={Shape} /> Email ID
                              </li>
                              <li>
                                <img src={Shape} /> Contact Person 1 & 2
                              </li>
                            </ul>

                            <a href="#" className="btn btn-pricing">
                              Choose plan
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      className={`tab-pane container ${!isMonthly ? "active" : "fade"
                        }`}
                      id="menu1"
                    >
                      <div className="row pricingMainBGD">
                        <div className="col-md-3 col-sm-3 col-12 padleftright0">
                          <div className="pricingMainD">
                            <h3>
                              $0<small>/month</small>
                            </h3>
                            <h4>Free</h4>
                            <p>
                              For most businesses that want to otpimize web
                              queries
                            </p>
                            <ul>
                              <li>
                                <img src={Shape} /> Project Name
                              </li>
                              <li>
                                <img src={Shape} /> Website
                              </li>
                              <li>
                                <img src={Shape} /> Description
                              </li>
                            </ul>

                            <a href="#" className="btn btn-pricing">
                              Choose plan
                            </a>
                          </div>
                        </div>
                        <div className="col-md-3 col-sm-3 col-12 padleftright0">
                          <div className="pricingMainD">
                            <h3>
                              $500<small>/year</small>
                            </h3>
                            <h4>Bronze</h4>
                            <p>
                              For most businesses that want to otpimize web
                              queries
                            </p>
                            <ul>
                              <li>
                                <img src={Shape} /> Project Name
                              </li>
                              <li>
                                <img src={Shape} /> Website
                              </li>
                              <li>
                                <img src={Shape} /> Description
                              </li>
                              <li>
                                <img src={Shape} /> Projects Keywords
                              </li>
                            </ul>

                            <a href="#" className="btn btn-pricing">
                              Choose plan
                            </a>
                          </div>
                        </div>
                        <div className="col-md-3 col-sm-3 col-12 padleftright0">
                          <div className="pricingMainD active">
                            <span>MOST POPULAR</span>
                            <h3>
                              $1000<small>/year</small>
                            </h3>
                            <h4>Silver</h4>
                            <p>
                              For most businesses that want to otpimize web
                              queries
                            </p>
                            <ul>
                              <li>
                                <img src={Checkcircle} /> Project Name
                              </li>
                              <li>
                                <img src={Checkcircle} /> Website
                              </li>
                              <li>
                                <img src={Checkcircle} /> Description
                              </li>
                              <li>
                                <img src={Checkcircle} /> Projects Keywords
                              </li>
                              <li>
                                <img src={Checkcircle} /> Email ID
                              </li>
                            </ul>

                            <a href="#" className="btn btn-pricing">
                              Choose plan
                            </a>
                          </div>
                        </div>
                        <div className="col-md-3 col-sm-3 col-12 padleftright0">
                          <div className="pricingMainD">
                            <h3>
                              $2000<small>/year</small>
                            </h3>
                            <h4>Gold</h4>
                            <p>
                              For most businesses that want to otpimize web
                              queries
                            </p>
                            <ul>
                              <li>
                                <img src={Shape} /> Project Name
                              </li>
                              <li>
                                <img src={Shape} /> Website
                              </li>
                              <li>
                                <img src={Shape} /> Description
                              </li>
                              <li>
                                <img src={Shape} /> Projects Keywords
                              </li>
                              <li>
                                <img src={Shape} /> Email ID
                              </li>
                              <li>
                                <img src={Shape} /> Contact Person 1 & 2
                              </li>
                            </ul>

                            <a href="#" className="btn btn-pricing">
                              Choose plan
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
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

export default Pricing;
