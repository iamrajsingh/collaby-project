import React, { Component } from "react";

import "./../../Style/Style.css";
import "./../../Style/Animate.css";
import { Link } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <div>
        <div className="header-nav">
          <div className="container">
            <div className="row borderClass">
              <div className="col-md-3 col-sm-3 col-xs-8 padleft0">
                <div className="header_logo">
                  <Link to="/pages/project">
                    <img
                      src={require("../../Images/logo.png")}
                      className="img-responsive"
                      alt="image"
                    />
                  </Link>
             </div>
              </div>

              <div className="hidden-lg hidden-md hidden-sm col-xs-4">
                <div className="navbar-header">
                  <button
                    type="button"
                    className="navbar-toggle headerHamMenu"
                    data-toggle="collapse"
                    data-target="#quickLH"
                  >
                    <i className="fa fa-bars" aria-hidden="true"></i>
                  </button>
                </div>
              </div>

              <div className="col-md-6 col-sm-6 col-xs-12">
                <div
                  className="sitemapH collapse navbar-collapse padleftright0"
                  id="quickLH"
                >
                  <div className="siteMiddle">
                    <ul className="sitemaphUl">
                      <li>
                        <Link to="/pages/project">Project</Link>
                      </li>
                      <li>
                        <Link to="/pages/roadmap">Roadmap</Link>
                      </li>
                      <li>
                        <Link to="/pages/team">Team</Link>
                      </li>
                      <li>
                        <Link to="/pages/partner">Partner</Link>
                      </li>
                      <li>
                        <Link to="/pages/about">Contact Us</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div
                className="col-md-3 col-sm-3 hidden-xs padright0"
                style={{ textAlign: "right" }}
              >
                <div className="logsingBTN">
                  <a href="javascript:void(0)" className="btn btn_gradiant">
                    Login{" "}
                  </a>
                  <a href="javascript:void(0)" className="btn btn_gradiant">
                    Sign up{" "}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
