import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <div>
        <div className="footer-Sec">
          <div className="container">
            <div className="row">
              <div className="col-md-5 col-sm-5 col-xs-12">
                <div className="footSubD">
                  <a href="/pages/project">
                    <img
                      src={require("./../../Images/logo.png")}
                      className="img-responsive"
                      alt="image"
                    />
                  </a>
                  <p>Get started now try our product</p>
                  <div className="em_quote_form">
                    <form
                      method="get"
                      role="form"
                      id="SearchForm"
                      autoComplete="off"
                      action="#"
                    >
                      <div className="quite_form_field">
                        <input
                          type="search"
                          id="search"
                          name="search"
                          placeholder="Enter your email here"
                          required=""
                        />
                        <button
                          type="submit"
                          className="quote_button"
                          name="submit"
                        >
                          <i
                            className="fa fa-arrow-right"
                            aria-hidden="true"
                          ></i>
                        </button>
                      </div>
                    </form>
                    <div id="display"></div>
                  </div>
                </div>
              </div>
              <div className="col-md-1 col-sm-1"></div>
              <div className="col-md-3 col-sm-3 col-xs-12">
                <div className="footSubD">
                  <h4>Support</h4>
                  <ul>
                    <li>
                      <a href="/pages/about">Help centre</a>
                    </li>
                    <li>
                      <a href="/pages/about">About</a>
                    </li>
                    <li>
                      <a href="/pages/about">Contact us</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-3 col-sm-3 col-xs-12">
                <div className="footSubD">
                  <h4>Help and Solution</h4>
                  <ul>
                    <li>
                      <a href="/pages/about">Talk to support</a>
                    </li>
                    <li>
                      <a href="/pages/about">Support docs</a>
                    </li>
                    <li>
                      <a href="/pages/about">System status</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lastfooter-Sec">
          <div className="container">
            <div className="row">
              <div className="col-md-6 col-sm-6 col-xs-12">
                <div className="lastfootSubD">
                  <p>© 2024 Collably Inc. Copyright and rights reserved</p>
                </div>
              </div>
              <div
                className="col-md-6 col-sm-6 col-xs-12"
                style={{ textAlign: "right" }}
              >
                <div className="lastfootSubD">
                  <p>
                    <a href="">Terms and Condtions</a>&emsp;.&emsp;
                    <a href="">Terms and Condtions</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
