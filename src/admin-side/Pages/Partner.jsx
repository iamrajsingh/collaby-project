import React, { Component } from "react";
import Header from "../Components/Collably/Header";
import Footer from "../Components/Collably/Footer";

class Partner extends Component {
  render() {
    return (
      <div>
        <Header />

        <div className="homeabout-Sec">
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-sm-12 col-xs-12">
                <div className="secHeading">
                  <h3>Meet Our Partners</h3>
                </div>
              </div>

              <div className="col-md-12 col-sm-12 col-xs-12" align="center">
                <div className="clientSecD">
                  <div className="owl-carousel owl-theme">
                    <div className="item">
                      <img
                        src={require("./../Images/Group1.png")}
                        className="img-responsive"
                        alt="image"
                      />
                    </div>
                    <div className="item">
                      <img
                        src={require("./../Images/Group2.png")}
                        className="img-responsive"
                        alt="image"
                      />
                    </div>
                    <div className="item">
                      <img
                        src={require("./../Images/Group3.png")}
                        className="img-responsive"
                        alt="image"
                      />
                    </div>
                    <div className="item">
                      <img
                        src={require("./../Images/Group4.png")}
                        className="img-responsive"
                        alt="image"
                      />
                    </div>
                    <div className="item">
                      <img
                        src={require("./../Images/Group5.png")}
                        className="img-responsive"
                        alt="image"
                      />
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

export default Partner;
