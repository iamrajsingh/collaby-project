import React, { Component } from "react";
import Carousel from "react-simply-carousel";
import apiService from "./../../service/apiService";

class PartnerCarousel extends Component {
  state = {
    activeSlideIndex: 0,
    partners: [],
  };

  componentDidMount() {
    this.fetchTeamLists();
  }

  fetchTeamLists = async () => {
    try {
      const response = await apiService.get("front/partner");

      if (response.data && Array.isArray(response.data)) {
        this.setState({ partners: response.data });
      } else {
      }
    } catch (error) {
    }
  };

  setActiveSlideIndex = (e) => {
    this.setState({
      activeSlideIndex: e,
    });
  };

  render() {
    return (
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
                <div className=" owl-theme">
                  <Carousel
                    speed={2000}
                    delay={1000}
                    autoplay
                    activeSlideIndex={this.state.activeSlideIndex}
                    onRequestChange={this.setActiveSlideIndex}
                    forwardBtnProps={{
                      style: {
                        display: "none",
                      },
                    }}
                    backwardBtnProps={{
                      style: {
                        display: "none",
                      },
                    }}
                  >
                    {this.state.partners.map((partner) => (
                      <div className="item" key={partner.p_id}>
                        <img
                          src={partner.p_logo}
                          alt={partner.p_name}
                          className="img-responsive"
                        />
                      </div>
                    ))}

                    {/* <div className="item">
                      <img
                        src={require("./../Images/Group2.png")}
                        alt="img"
                        className="img-responsive"
                      />
                    </div>
                    <div className="item">
                      <img
                        src={require("./../Images/Group3.png")}
                        alt="img"
                        className="img-responsive"
                      />
                    </div>
                    <div className="item">
                      <img
                        src={require("./../Images/Group4.png")}
                        alt="img"
                        className="img-responsive"
                      />
                    </div>
                    <div className="item">
                      <img
                        src={require("./../Images/Group5.png")}
                        alt="img"
                        className="img-responsive"
                      />
                    </div> */}
                  </Carousel>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PartnerCarousel;
