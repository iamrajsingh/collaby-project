import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Shape from "../Images/Shape.png";
import Checkcircle from "../Images/checkcircle.png";
import apiService from "./../../service/apiService";

const Pricing = () => {
  const [isMonthly, setIsMonthly] = useState(true);
  const [monthlyData, setMonthlyData] = useState([]);
  const [yearlyData, setYearlyData] = useState([]);

  useEffect(() => {
    fetchMonthlyPrice();
    fetchYearlyPrice();
  }, []);

  const fetchMonthlyPrice = async () => {
    try {
      const response = await apiService.get("front/pricing/monthly");

      if (response.data && Array.isArray(response.data)) {
        setMonthlyData(response.data);
        console.log("data monthly", response);
      } else {
        console.error("Invalid or empty response:", response);s
      }
    } catch (error) {
      console.error("error", error.message);
    }
  };

  const fetchYearlyPrice = async () => {
    try {
      const response = await apiService.get("front/pricing/yearly");

      if (response.data && Array.isArray(response.data)) {
        setYearlyData(response.data);
        console.log("data yearly", response);
      } else {
        console.error("Invalid or empty response:", response);
      }
    } catch (error) {
      console.error("error", error.message);
    }
  };

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
                        onClick={() => setIsMonthly(true)}
                      >
                        MONTHLY
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className={`nav-link ${!isMonthly ? "active" : ""}`}
                        data-bs-toggle="pill"
                        onClick={() => setIsMonthly(false)}
                      >
                        YEARLY
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="tab-content">
                  <div
                    className={`tab-pane container ${
                      isMonthly ? "active" : "fade"
                    }`}
                    id="home"
                  >
                    <div className="row pricingMainBGD">
                      {/* Monthly Pricing */}
                      <div className="col-md-3 col-sm-3 col-12 padleftright0">
                        <div className="pricingMainD">
                          <h3>
                            $200<small>/month</small>
                          </h3>
                          <h4>c</h4>
                          <p>
                            For most businesses that want to optimize web
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
                    className={`tab-pane container ${
                      !isMonthly ? "active" : "fade"
                    }`}
                    id="menu1"
                  >
                    <div className="row pricingMainBGD">
                      {/* Yearly Pricing */}
                      <div className="col-md-3 col-sm-3 col-12 padleftright0">
                        <div className="pricingMainD">
                          <h3>
                            $1000<small>/year</small>
                          </h3>
                          <h4>Silver</h4>
                          <p>
                            For most businesses that want to optimize web
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
};

export default Pricing;
