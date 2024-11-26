import React, { Component } from "react";

import Footer from "../Components/Collably/Footer";
import Header from "../Components/Collably/Header";

class Team extends Component {
  render() {
    return (
      <div>
        <Header />

        <div className="homeabout-Sec">
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-sm-12 col-xs-12">
                <div className="secHeading">
                  <h3>Meet Our Team</h3>
                </div>
              </div>

              <div className="col-md-3 col-sm-3 col-xs-12" align="center">
                <div className="teamSecD">
                  <img
                    src={require("./../Images/image-8.png")}
                    className="img-responsive"
                    alt="image"
                  />
                  <h4>Mr. Sumit Kumar</h4>
                  <p>Founder & CEO</p>
                  <span>
                    <a href="#">
                      <i
                        className="fa fa-twitter-square"
                        aria-hidden="true"
                      ></i>
                    </a>
                    <a href="#">
                      <i className="fa fa-xing-square" aria-hidden="true"></i>
                    </a>
                  </span>
                </div>
              </div>
              <div className="col-md-3 col-sm-3 col-xs-12" align="center">
                <div className="teamSecD">
                  <img
                    src={require("./../Images/image-8.png")}
                    className="img-responsive"
                    alt="image"
                  />
                  <h4>Kundan Kumar</h4>
                  <p>COO, Collably</p>
                  <span>
                    <a href="#">
                      <i
                        className="fa fa-twitter-square"
                        aria-hidden="true"
                      ></i>
                    </a>
                    <a href="#">
                      <i className="fa fa-xing-square" aria-hidden="true"></i>
                    </a>
                  </span>
                </div>
              </div>
              <div className="col-md-3 col-sm-3 col-xs-12" align="center">
                <div className="teamSecD">
                  <img
                    src={require("./../Images/image-8.png")}
                    className="img-responsive"
                    alt="image"
                  />
                  <h4>M Ammar Aslam</h4>
                  <p>CTO, Collably</p>
                  <span>
                    <a href="#">
                      <i
                        className="fa fa-twitter-square"
                        aria-hidden="true"
                      ></i>
                    </a>
                    <a href="#">
                      <i className="fa fa-xing-square" aria-hidden="true"></i>
                    </a>
                  </span>
                </div>
              </div>
              <div className="col-md-3 col-sm-3 col-xs-12" align="center">
                <div className="teamSecD">
                  <img
                    src={require("./../Images/image-8.png")}
                    className="img-responsive"
                    alt="image"
                  />
                  <h4>Shubham Raj</h4>
                  <p>CTO of Product</p>
                  <span>
                    <a href="#">
                      <i
                        className="fa fa-twitter-square"
                        aria-hidden="true"
                      ></i>
                    </a>
                    <a href="#">
                      <i className="fa fa-xing-square" aria-hidden="true"></i>
                    </a>
                  </span>
                </div>
              </div>
              <div className="col-md-3 col-sm-3 col-xs-12" align="center">
                <div className="teamSecD">
                  <img
                    src={require("./../Images/image-8.png")}
                    className="img-responsive"
                    alt="image"
                  />
                  <h4>Ritu Raj</h4>
                  <p>Marketing Lead</p>
                  <span>
                    <a href="#">
                      <i
                        className="fa fa-twitter-square"
                        aria-hidden="true"
                      ></i>
                    </a>
                    <a href="#">
                      <i className="fa fa-xing-square" aria-hidden="true"></i>
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <script>
          $(document).ready(function()
          {$("#filterBtnid").click(function () {
            $("#filtermegamenuD").slideToggle("slow");
          })}
          );
        </script> */}

        {/* Your script code (consider using useEffect for inline scripts) */}

        <Footer />

        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
        />
      </div>
    );
  }
}

export default Team;
