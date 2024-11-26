import React, { Component } from "react";

import Header from "../Components/Collably/Header";
import Footer from "../Components/Collably/Footer";

class Project extends Component {
  render() {
    return (
      <div>
        <Header />

        <div className="slider-Sec">
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-sm-12 col-xs-12">
                <div className="slideHead">
                  <h2>Match Your Project With Potential Partners</h2>
                  {/* <p>
                    Top Featured Projects{" "}
                    <i className="fa fa-caret-down" aria-hidden="true"></i>
                  </p> */}
                </div>
              </div>

              <div className="col-md-4 col-sm-4 col-xs-12">
                <div className="adSlider">
                  <div
                    id="myCarousel"
                    className="carousel slide"
                    data-ride="carousel"
                  >
                    {/* <!-- Indicators --> */}
                    <ol className="carousel-indicators">
                      <li
                        data-target="#myCarousel"
                        data-slide-to="0"
                        className="active"
                      ></li>
                      <li data-target="#myCarousel" data-slide-to="1"></li>
                    </ol>

                    {/* <!-- Wrapper for slides --> */}
                    <div className="carousel-inner">
                      <div className="item active">
                        <img
                          src={require("./../Images/c1.png")}
                          className="img-responsive"
                          alt="Los Angeles"
                        ></img>
                      </div>

                      <div className="item">
                        <img
                          src={require("./../Images/c4.jpg")}
                          className="img-responsive"
                          alt="Chicago"
                        ></img>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-sm-4 col-xs-12">
                <div className="adSlider">
                  <div
                    id="myCarousel2"
                    className="carousel slide"
                    data-ride="carousel"
                  >
                    {/* <!-- Wrapper for slides --> */}
                    <div className="carousel-inner">
                      <div className="item active">
                        <img
                          src={require("./../Images/c3.jpg")}
                          className="img-responsive"
                          alt="Los Angeles"
                        ></img>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-sm-4 col-xs-12">
                <div className="adSlider">
                  <div
                    id="myCarousel3"
                    className="carousel slide"
                    data-ride="carousel"
                  >
                    {/* <!-- Indicators --> */}
                    <ol className="carousel-indicators">
                      <li
                        data-target="#myCarousel3"
                        data-slide-to="0"
                        className="active"
                      ></li>
                      <li data-target="#myCarousel3" data-slide-to="1"></li>
                    </ol>

                    {/* <!-- Wrapper for slides --> */}
                    <div className="carousel-inner">
                      <div className="item active">
                        <img
                          alt="Los Angeles"
                          src={require("./../Images/c5.jpg")}
                          className="img-responsive"
                        ></img>
                      </div>

                      <div className="item">
                        <img
                          src={require("./../Images/c2.jpg")}
                          className="img-responsive"
                          alt="Chicago"
                        ></img>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="projrctMain-Sec">
          <div className="container">
            <div className="row">
              <div className="col-md-5 col-sm-5 col-xs-12">
                <div className="searchProject">
                  <form>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search"
                      />
                      <div className="input-group-btn">
                        <button className="btn btn-default" type="submit">
                          <i className="fa fa-search" aria-hidden="true"></i>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-md-7 col-sm-7 col-xs-12">
                <div
                  className="projectFilter-btnD"
                  style={{ textAlign: "right" }}
                >
                  <span className="btnbrdrGrad">
                    <button type="button" className="btn btn_gradiant_brdr">
                      <i className="fa fa-star-o" aria-hidden="true"></i>{" "}
                      Highlight
                    </button>
                  </span>
                  <span className="btnbrdrGrad">
                    <button
                      type="button"
                      className="btn btn_gradiant_brdr"
                      id="filterBtnid"
                    >
                      <i className="fa fa-filter" aria-hidden="true"></i> Filter
                    </button>
                  </span>
                </div>
              </div>

              <div className="col-md-12 col-sm-12 col-xs-12">
                <div className="filtermegamenuD" id="filtermegamenuD">
                  <div className="filterSubD">
                    <h4>Target Keyword</h4>
                    <hr />
                    <form>
                      <label className="checkstyle">
                        Platform
                        <input type="checkbox" />
                        <span className="checkmark"></span>
                      </label>
                      <label className="checkstyle">
                        Store Of Value
                        <input type="checkbox" />
                        <span className="checkmark"></span>
                      </label>
                      <label className="checkstyle">
                        Atomic Swaps
                        <input type="checkbox" />
                        <span className="checkmark"></span>
                      </label>
                      <label className="checkstyle">
                        Centralized Exchange
                        <input type="checkbox" />
                        <span className="checkmark"></span>
                      </label>
                      <div className="clearfix"></div>
                      <button
                        type="submit"
                        className="btn btn_gradiant pull-right"
                      >
                        Submit
                      </button>
                      <div className="clearfix"></div>
                    </form>
                  </div>
                </div>
              </div>

              <div className="col-md-12 col-sm-12 col-xs-12">
                <div className="projectTableD">
                  <table className="table">
                    <thead>
                      <tr>
                        <th></th>
                        <th>#</th>
                        <th>
                          <i className="fa fa-suitcase" aria-hidden="true"></i>{" "}
                          Project
                        </th>
                        <th>
                          <i className="fa fa-list-ul" aria-hidden="true"></i>{" "}
                          Keywords
                        </th>
                        <th style={{ width: "20%" }}>
                          <i
                            className="fa fa-align-left"
                            aria-hidden="true"
                          ></i>{" "}
                          Description
                        </th>
                        <th>
                          <i className="fa fa-link" aria-hidden="true"></i>{" "}
                          Website
                        </th>
                        <th>
                          <i
                            className="fa fa-envelope-o"
                            aria-hidden="true"
                          ></i>{" "}
                          Email ID
                        </th>
                        <th>
                          <i className="fa fa-user-o" aria-hidden="true"></i>{" "}
                          Contact Person 1
                        </th>
                        <th>
                          <i
                            className="fa fa-share-square-o"
                            aria-hidden="true"
                          ></i>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <i className="fa fa-star-o" aria-hidden="true"></i>
                        </td>
                        <td>1.</td>
                        <td>
                          <a href="#" className="proTitle">
                            Bitcoin
                          </a>
                        </td>
                        <td>
                          <span className="btnbrdrGrad">
                            <a href="#" className="btn btn_keyword">
                              BTC
                            </a>
                          </span>
                          <span className="btnbrdrGrad">
                            <a href="#" className="btn btn_keyword">
                              TCB
                            </a>
                          </span>
                        </td>
                        <td>
                          It is a long established fact that a reader will be
                          distracted
                        </td>
                        <td>www.collablynet.com</td>
                        <td>habib@zeewevally.com</td>
                        <td>Person Name 1</td>
                        <td>
                          <a href="#" className="sid">
                            <i
                              className="fa fa-twitter-square"
                              aria-hidden="true"
                            ></i>
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <i
                            className="fa fa-star highlightStar"
                            aria-hidden="true"
                          ></i>
                        </td>
                        <td>2.</td>
                        <td>
                          <a href="#" className="proTitle">
                            Ethereum
                          </a>
                        </td>
                        <td>
                          <span className="btnbrdrGrad">
                            <a href="#" className="btn btn_keyword">
                              ETH
                            </a>
                          </span>
                        </td>
                        <td>it look like readable English. Many desktop</td>
                        <td>www.collablynet.com</td>
                        <td>robiatur@gmail.com</td>
                        <td>Person Name</td>
                        <td>
                          <a href="#" className="sid">
                            <i
                              className="fa fa-whatsapp"
                              aria-hidden="true"
                            ></i>
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <i className="fa fa-star-o" aria-hidden="true"></i>
                        </td>
                        <td>3.</td>
                        <td>
                          <a href="#" className="proTitle">
                            Tether USDt
                          </a>
                        </td>
                        <td>
                          <span className="btnbrdrGrad">
                            <a href="#" className="btn btn_keyword">
                              USDT
                            </a>
                          </span>
                        </td>
                        <td>
                          It is a long established fact that a reader will be
                          distracted
                        </td>
                        <td>www.collablynet.com</td>
                        <td>habib@zeewevally.com</td>
                        <td>Person Name</td>
                        <td>
                          <a href="#" className="sid">
                            <i
                              className="fa fa-telegram"
                              aria-hidden="true"
                            ></i>
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
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

export default Project;
