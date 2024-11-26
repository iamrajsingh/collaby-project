import React, { Component } from "react";
import Calendar from "react-calendar";
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
import "bootstrap/dist/js/bootstrap.min.js";
import $ from "jquery";
import "jquery-validation";

import "@fortawesome/fontawesome-free/css/all.css";
import "./../../Style/style1.css";

class AdminDashboard extends Component {
  state = {
    date: new Date(),
    curmonth: new Date().getMonth() + 1,
    curyear: new Date().getFullYear(),
  };
  componentDidMount() {
    // Your script goes here
    $(document).ready(function () {
      $("#leftMenuColapseLeft").click(function () {
        $(".leftMenu").css({ width: "5%" });
        $(".middleSec").css({ width: "95%" });
        $("#leftMenuColapseLeft").hide();
        $(".menuHideCl").hide();
        $("#leftMenuColapseRight").show();
      });
    });
    // $("#summernote").summernote({
    //   height: 100,
    //   minHeight: null,
    //   maxHeight: null,
    //   placeholder: "Description",
    //   required: true,
    // });
    // ProfileUpd validation
    $("#ProfileUpd").validate({
      rules: {
        admin_name: {
          required: true,
        },
      },
    });
    // ProfilePassUpd validation
    $("#ProfilePassUpd").validate({
      rules: {
        old_password: {
          required: true,
        },
        new_pass: {
          minlength: 5,
        },
        con_new_pass: {
          minlength: 5,
          equalTo: "#new_pass",
        },
      },
    });
    // ProfileUpd form submission with AJAX
    $("#ProfileUpd").on("submit", function (e) {
      e.preventDefault();
      var formStatus = $("#ProfileUpd").validate().form();
      if (true === formStatus) {
        $.ajax({
          type: "POST",
          url: "ajax_update.php",
          data: new FormData(this),
          contentType: false,
          cache: false,
          processData: false,
          beforeSend: function () {
            $(".loginbtn").hide();
            $(".loginbtnload").show();
          },
          success: function (msg) {
            if (msg == "success") {
              $(".ProfUpd").show();
              $(".ProfUpd").delay(3000).hide(200);
              setTimeout(function () {
                window.location.reload();
              }, 3000);
            }
          },
        });
      }
    });

    // ProfilePassUpd form submission with AJAX
    $("#ProfilePassUpd").on("submit", function (e) {
      e.preventDefault();
      var formStatus = $("#ProfilePassUpd").validate().form();
      if (true === formStatus) {
        $.ajax({
          type: "POST",
          url: "ajax_update.php",
          data: new FormData(this),
          contentType: false,
          cache: false,
          processData: false,
          success: function (msg) {
            if (msg == "success") {
              $(".PswdUpdMsg").show();
              $(".PswdUpdMsg").delay(3000).hide(200);
              setTimeout(function () {
                window.location.reload();
              }, 3000);
            } else {
              $(".PswdUpdFailedMsg").show();
              $(".PswdUpdFailedMsg").delay(3000).hide(200);
            }
          },
        });
      }
    });

    $(document).ready(function () {
      $("#leftMenuColapseRight").click(function () {
        $(".leftMenu").css({ width: "16%" });
        $(".middleSec").css({ width: "84%" });
        $("#leftMenuColapseLeft").show();
        $("#leftMenuColapseRight").hide();
        $(".menuHideCl").show();
      });
    });
  }

  render() {
    const todaydate = new Date();
    const curmonth = todaydate.getMonth() + 1;
    const curyear = todaydate.getFullYear();

    const calendarScript = `
      var curmonth = ${curmonth};
      var curyear = ${curyear};
      document.write(buildCal(curmonth, curyear, "main", "month", "daysofweek", "days", 1));
    `;
    return (
      <div>
        <div className="topHeader">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-2 col-sm-2 col-xs-12">
                <div className="comLogo">
                  <a href="/admin/admin-dashboard">
                    <img
                      src={require("./../../Images/logo.png")}
                      className="img-responsive"
                    />
                  </a>
                </div>
              </div>
              <div className="col-md-5 col-sm-5"></div>
              <div className="col-md-3 col-sm-3 col-xs-12 padright0"></div>
              <div className="col-md-2 col-sm-2 col-xs-12">
                <div className="notiSec">
                  <ul>
                    <li className="dropdown" title="Notifications">
                      <a
                        href="#"
                        className="dropdown-toggle"
                        data-toggle="dropdown"
                      >
                        <i className="fa fa-cog" aria-hidden="true"></i>
                      </a>
                      <ul className="dropdown-menu drpul">
                        <li>
                          <a
                            href="#"
                            data-toggle="modal"
                            data-target="#ProfileMoadal"
                          >
                            Profile
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            data-toggle="modal"
                            data-target="#PassUpdMod"
                          >
                            Change Password
                          </a>
                        </li>
                        <li>
                          <a href="layout/logout.php">Logout</a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                  <div className="clearfix"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="dashBoardSec">
          <div className="container-fluid">
            <div className="row">
              <div className="leftMenu catby">
                <div className="leftMenuColapse" id="leftMenuColapseLeft">
                  <i className="fa fa-chevron-left" aria-hidden="true"></i>
                </div>
                <div className="leftMenuColapseRight" id="leftMenuColapseRight">
                  <i className="fa fa-chevron-right" aria-hidden="true"></i>
                </div>

                <div className="leftProfileSec" align="center">
                  <img
                    src={require("./../../Images/profile.png")}
                    className="img-responsive"
                  />
                  <p className="menuHideCl">Welcome CoinCurt</p>
                </div>

                <div className="leftMenuSec">
                  <ul>
                    <li>
                      <a href="/admin/admin-dashboard">
                        <i className="fa fa-tachometer" aria-hidden="true"></i>{" "}
                        &nbsp;<span className="menuHideCl"> Dashboard</span>{" "}
                        <i className="menuarrowActive fa fa-caret-left pull-right"></i>
                      </a>
                    </li>

                    <li>
                      <a href="/admin/project-add">
                        <i className="fa fa-users" aria-hidden="true"></i>{" "}
                        &nbsp;<span className="menuHideCl">Project</span>
                      </a>
                    </li>

                    <li>
                      <a href="pricing.js">
                        <i className="fa fa-users" aria-hidden="true"></i>{" "}
                        &nbsp;<span className="menuHideCl">Pricing</span>
                      </a>
                    </li>

                    <li>
                      <a href="team.js">
                        <i className="fa fa-users" aria-hidden="true"></i>{" "}
                        &nbsp;<span className="menuHideCl">Team</span>
                      </a>
                    </li>

                    <li>
                      <a href="partner.js">
                        <i className="fa fa-users" aria-hidden="true"></i>{" "}
                        &nbsp;<span className="menuHideCl">Partner</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div
                className="modal fade"
                id="ProfileMoadal"
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <form id="ProfileUpd" method="post">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                          Profile Update
                        </h5>
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                        <div
                          className="alert alert-success ProfUpd"
                          style={{ display: "none" }}
                        >
                          <strong>Successfully Updated Your Profile!</strong>
                        </div>
                      </div>
                      <div className="modal-body">
                        <div className="form-group">
                          <label
                            for="recipient-name"
                            className="col-form-label"
                          >
                            Name:
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="admin_name"
                            value="CoinCurt"
                            required
                          />
                          <br />
                        </div>
                        <div className="form-group">
                          <label for="message-text" className="col-form-label">
                            Phone Number:
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="phone"
                            name="admin_phone"
                            value="09716383075"
                            required
                          />
                          <br />
                        </div>
                        <div className="form-group">
                          <label for="message-text" className="col-form-label">
                            Email ID:
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="email"
                            name="admin_email"
                            value="info@coincurt.com"
                            readonly
                          />
                          <input type="hidden" name="update" value="profile" />
                          <br />
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-dismiss="modal"
                        >
                          Close
                        </button>
                        <button type="submit" className="btn btn-primary">
                          Save
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              <div
                className="modal fade"
                id="PassUpdMod"
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <form id="ProfilePassUpd" method="post">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                          Profile Password Update
                        </h5>
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                        <div
                          className="alert alert-success PswdUpdMsg"
                          style={{ display: "none" }}
                        >
                          <strong>Successfully Updated Your Password!</strong>
                        </div>
                        <div
                          className="alert alert-danger PswdUpdFailedMsg"
                          style={{ display: "none" }}
                        >
                          <strong> Please Enter Correct Old Password!</strong>
                        </div>
                      </div>
                      <div className="modal-body">
                        <div className="form-group">
                          <label
                            for="recipient-name"
                            className="col-form-label"
                          >
                            Old Password:
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            id="old_password"
                            name="old_password"
                            required
                          />
                          <br />
                        </div>
                        <div className="form-group">
                          <label for="message-text" className="col-form-label">
                            New Password:
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            id="new_pass"
                            name="new_pass"
                            required
                          />
                          <br />
                        </div>
                        <div className="form-group">
                          <label for="message-text" className="col-form-label">
                            Confirm New Password:
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            id="con_new_pass"
                            name="con_new_pass"
                            required
                          />
                          <input
                            type="hidden"
                            name="update"
                            value="profile_password"
                          />
                          <br />
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-dismiss="modal"
                        >
                          Close
                        </button>
                        <button type="submit" className="btn btn-primary">
                          Update
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              <link rel="stylesheet" href="css/site-demos.css" />
              <script src="js/jquery.validate.min.js"></script>
              <script src="js/additional-methods.min.js"></script>

              <div className="middleSec catbyMdl">
                <div className="headingD">
                  <i className="fa fa-tachometer" aria-hidden="true"></i>{" "}
                  Dashboard
                </div>

                <div className="col-md-12 col-sm-12 col-xs-12">
                  {/* Render the Calendar component */}
                  <Calendar
                    onChange={(date) => this.setState({ date })}
                    value={this.state.date}
                  />

                  {/* Inject the calendar script */}
                  <script
                    dangerouslySetInnerHTML={{ __html: calendarScript }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminDashboard;
