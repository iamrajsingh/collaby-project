import React, { Component } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
import "bootstrap/dist/js/bootstrap.min.js";
import $ from "jquery";
// import "summernote/dist/summernote.css";
// import "./node_modules/summernote/dist/summernote.js";
import "jquery-validation";
import "@fortawesome/fontawesome-free/css/all.css";
import "./../../Style/style1.css";

class AdminAdd extends Component {
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
                      alt=""
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
                    alt=""
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
                <form role="form" method="post" id="addfrm">
                  <div className="headingD">
                    <i className="fa fa-plus-square-o" aria-hidden="true"></i>{" "}
                    Add Blog
                    <a
                      href="show_blog.php"
                      className="btn btn-default pull-right"
                    >
                      <i className="fa fa-arrow-left" aria-hidden="true"></i>{" "}
                      Back
                    </a>
                    &emsp;
                  </div>
                  <div
                    className="alert alert-success Add"
                    style={{ display: "none" }}
                  >
                    <strong>Successfully Added Your Data!</strong>
                  </div>
                  <div className="addPageSec catbyMdl">
                    <div className="container-fluid">
                      <div className="row">
                        <div className="form-group">
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <label>Title</label>
                            <input
                              type="text"
                              name="blog_title"
                              id="blog_title"
                              className="form-control"
                              required=""
                              placeholder="Enter Blog Title"
                            />
                            <br />
                          </div>
                        </div>
                        <link
                          href="https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.9/summernote.css"
                          rel="stylesheet"
                        />
                        <script src="https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.9/summernote.js"></script>
                        <div className="form-group">
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <label>Full Description</label>
                            <textarea
                              id="summernote"
                              name="blog_description"
                              required
                            ></textarea>
                            <p
                              id="p_description_error"
                              style={{ display: "none", color: "red" }}
                            >
                              Description field is required.
                            </p>
                            <br />
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <label>Image</label>
                            <input
                              type="file"
                              name="blog_image"
                              id="blog_image"
                              className="form-control"
                              required=""
                            />
                            <input type="hidden" name="add" value="blog_add" />
                            <br />
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <label>Meta Title</label>
                            <input
                              type="text"
                              name="meta_title"
                              id="meta_title"
                              className="form-control"
                              required=""
                              placeholder="Meta Title"
                            />
                            <br />
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <label>Meta Keyword</label>
                            <input
                              type="text"
                              name="meta_keyword"
                              id="meta_keyword"
                              className="form-control"
                              required=""
                              placeholder="Enter Meta Keyword"
                            />
                            <br />
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <label>Meta Description</label>
                            <input
                              type="text"
                              name="meta_desc"
                              id="meta_desc"
                              className="form-control"
                              required=""
                              placeholder="Enter Meta Description"
                            />
                            <br />
                          </div>
                        </div>
                        <div className="form-group">
                          <div
                            className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
                            align="right"
                          >
                            <button type="reset" className="btn btn-default">
                              <i
                                className="fa fa-repeat"
                                aria-hidden="true"
                              ></i>{" "}
                              Reset
                            </button>
                            <button
                              type="submit"
                              className="btn btn-primary addbtn"
                            >
                              <i
                                className="fa fa-floppy-o"
                                aria-hidden="true"
                              ></i>{" "}
                              Save
                            </button>
                            <button
                              className="btn btn-primary addload buttonload"
                              style={{ display: "none" }}
                            >
                              <i
                                className="fa fa-spinner fa-spin"
                                style={{
                                  marginLeft: "-12px",
                                  marginRight: "8px",
                                }}
                              ></i>
                              Please Wait
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminAdd;
