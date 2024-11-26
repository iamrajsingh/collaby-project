import React, { Component } from "react";

class AdminSidebar extends Component {
  render() {
    return (
      <div>
        <div className="leftMenu catby">
          <div className="leftMenuColapse" id="leftMenuColapseLeft">
            <i className="fa fa-chevron-left" aria-hidden="true"></i>
          </div>
          <div className="leftMenuColapseRight" id="leftMenuColapseRight">
            <i className="fa fa-chevron-right" aria-hidden="true"></i>
          </div>

          <div className="leftProfileSec">
            <img
              src={require("./../../Images/profile.png")}
              className="img-responsive"
              alt=""
            />
            <p className="menuHideCl">Welcome Collably</p>
          </div>

          <div className="leftMenuSec">
            <ul>
              {/* <li>
                <a href="/admin/dashboard">
                  <i className="fa fa-tachometer" aria-hidden="true"></i> &nbsp;
                  <span className="menuHideCl"> Dashboard</span>{" "}
                  <i className="menuarrowActive fa fa-caret-left pull-right"></i>
                </a>
              </li> */}
              {/* <li>
                <a href="/admin/blogs">
                  <i className="fa fa-tachometer" aria-hidden="true"></i> &nbsp;
                  <span className="menuHideCl"> Blog</span>{" "}
                  <i className="menuarrowActive fa fa-caret-left pull-right"></i>
                </a>
              </li> */}

              <li>
                <Link to="/admin/project/listing">
                  <i className="fa fa-users" aria-hidden="true"></i> &nbsp;
                  <span className="menuHideCl">Project</span>
                </Link>
              </li>

              <li>
                <Link to="/admin/pricing/listing">
                  <i className="fa fa-users" aria-hidden="true"></i> &nbsp;
                  <span className="menuHideCl">Pricing</span>
                </Link>
              </li>

              <li>
                <Link to="/admin/team/listing">
                  <i className="fa fa-users" aria-hidden="true"></i> &nbsp;
                  <span className="menuHideCl">Team</span>
                </Link>
              </li>

              <li>
                <Link to="/admin/partner/listing">
                  <i className="fa fa-users" aria-hidden="true"></i> &nbsp;
                  <span className="menuHideCl">Partner</span>
                </Link>
              </li>
              <li>
                <Link to="/admin/contact/listing">
                  <i className="fa fa-users" aria-hidden="true"></i> &nbsp;
                  <span className="menuHideCl">Contact</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* <div className="middleSec catbyMdl"></div> */}
      </div>
    );
  }
}

export default AdminSidebar;
