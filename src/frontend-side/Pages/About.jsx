import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const About = () => {
  return (
    <div>
      <Header />
      <div className="homeabout-Sec">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-sm-12 col-xs-12">
              <div className="secHeading">
                <h3>Know More About Us</h3>
              </div>
            </div>
            <div className="col-md-6 col-sm-6 col-xs-12">
              <div className="abtd">
                <p className="text-big">
                  <strong>Collably Network</strong> is a dynamic Collaboration
                  Platform dedicated to revolutionizing project partnerships.
                  Our platform redefines how projects connect, ensuring the
                  perfect partnerships for ultimate success. With precision
                  matchmaking, we pair projects with relevant partners,
                  regardless of industry, fueling innovation across sectors.
                </p>
                <p>
                  Our commitment to authenticity sets us apart. We curate
                  verified and trusted partnerships, elevating credibility for
                  each collaboration. This seal of trust ensures that every
                  connection is as genuine as it is impactful.
                </p>
                <p>
                  But we're not just digital; we're global. Collably Network
                  extends its impact through global events that unite projects
                  worldwide. From conferences to workshops, we foster
                  real-world interactions that amplify the growth beyond
                  boundaries.
                </p>
              </div>
            </div>
            <div className="col-md-6 col-sm-6 col-xs-12">
              <div className="abtd">
                <img
                  src={require("./../Images/Saly-31.png").default}
                  className="img-fluid"
                  alt="image"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
