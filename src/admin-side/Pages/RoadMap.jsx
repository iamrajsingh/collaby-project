import React from "react";
import Header from "../Components/Collably/Header";
import Footer from "../Components/Collably/Footer";

class RoadMap extends React.Component {
  render() {
    return (
      <div>
        <Header />

        <div className="roadmap-Sec">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12 col-sm-12 col-xs-12">
                <div className="secHeading">
                  <h3>Our Roadmap</h3>
                </div>
              </div>

              <div className="col-md-12 col-sm-12 col-xs-12">
                <div className="roadmapD">
                  <div className="row">
                    <div className="col-md-3 col-sm-3 col-xs-12">
                      <div className="subroadampD">
                        <span className="subCrourm">Q2,2023</span>
                      </div>
                    </div>
                    <div className="col-md-3 col-sm-3 col-xs-12 padleft0">
                      <div className="subroadampD">
                        <h4>Goal</h4>
                        <p>
                          To build a decentralized networking platform for the
                          projects
                        </p>
                        <span className="subCrourm">Q3,2023</span>
                      </div>
                    </div>
                    <div className="col-md-3 col-sm-3 col-xs-12">
                      <div className="subroadampD">
                        <h4>Development</h4>
                        <p>
                          Smart Contract Development Tokenization Website Live
                        </p>
                        <span className="subCrourm">Q4,2023</span>
                      </div>
                    </div>
                    <div className="col-md-3 col-sm-3 col-xs-12">
                      <div className="subroadampD">
                        <h4>Listing of Tokens</h4>
                        <p>Listing of token on top tier CEX & DEX</p>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-1 col-sm-1"></div>
                    <div className="col-md-3 col-sm-3 col-xs-12">
                      <div className="subroadampD subRMpl heightAuto">
                        <span className="subCrourm2">Q2,2023</span>
                        <h4>Vision & Mission</h4>
                        <p>
                          Match projects with their potential customers/ clients
                          & build network for the projects with verified
                          potential partners/ client to avoid fraud and help
                          them in co-marketing
                        </p>
                      </div>
                    </div>
                    <div className="col-md-3 col-sm-3 col-xs-12 padright0">
                      <div className="subroadampD subRMpl heightAuto">
                        <span className="subCrourm2">Q4,2023</span>
                        <h4>Documentation & Presale</h4>
                        <p>
                          Pitch Deck and Whitepaper Pre-sale website and
                          pre-sale live
                        </p>
                      </div>
                    </div>
                    <div className="col-md-5 col-sm-5 col-xs-12">
                      <div className="subroadampD subRMpl heightAuto">
                        <span className="subCrourm2 lastLeft">Q1,2024</span>
                        <h4>Marketing</h4>
                        <p>
                          Onboarding 200+ projects & cross promotion and
                          co-marketing with projects
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

export default RoadMap;
