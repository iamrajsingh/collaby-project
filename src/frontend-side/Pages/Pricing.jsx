import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Shape from "../Images/Shape.png";
import Checkcircle from "../Images/checkcircle.png";
import apiService from "./../../service/apiService";
import { Link } from "react-router-dom";

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
      } else {
      }
    } catch (error) {
    }
  };

  const fetchYearlyPrice = async () => {
    try {
      const response = await apiService.get("front/pricing/yearly");

      if (response.data && Array.isArray(response.data)) {
        setYearlyData(response.data);
      } else {
      }
    } catch (error) {
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
                    className={`tab-pane container ${isMonthly ? "active" : "fade"
                      }`}
                  >
                    <div className="row pricingMainBGD">
                      {monthlyData.map((monData, i) => (
                        <div key={monData.id} className="col-md-3 col-sm-6 col-12 padleftright0">
                          <div className={`pricingMainD ${i === 2 ? "active" : null}`}>
                            {i === 2 && <span>MOST POPULAR</span>}
                            <div className="clearfix"></div>
                            <h3>${monData.price} <small>/month</small></h3>
                            <h4>{monData.package}</h4>
                            <p>{monData.short_description}</p>
                            <ul>
                              {monData.pakage_details.map((detail, index) => (
                                <li key={index}><img src={Shape} />{detail}</li>
                              ))}
                            </ul>
                            <Link to="/contacts" className="btn btn-pricing">Choose plan</Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div
                    className={`tab-pane container ${!isMonthly ? "active" : "fade"
                      }`}
                  >
                    <div className="row pricingMainBGD">
                      {yearlyData.map((yearData, i) => (
                        <div key={yearData.id} className="col-md-3 col-sm-6 col-12 padleftright0">
                          <div className={`pricingMainD ${i === 2 ? "active" : null}`}>
                            {i === 2 && <span>MOST POPULAR</span>}
                            <div className="clearfix"></div>
                            <h3>${yearData.price}<small>/Year</small></h3>
                            <h4>{yearData.package}</h4>
                            <p>{yearData.short_description}</p>
                            <ul>
                              {yearData.pakage_details.map((detail, index) => (
                                <li key={index}><img src={Shape} />{detail}</li>
                              ))}
                            </ul>
                            <Link to="/contacts" className="btn btn-pricing">Choose plan</Link>
                          </div>
                        </div>
                      ))}
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
