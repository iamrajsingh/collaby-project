import React, { Component } from "react";
import "jquery/dist/jquery.min.js";
import $ from "jquery";
import "jquery-validation";
import "@fortawesome/fontawesome-free/css/all.css";
import "./../../Style/style1.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

class AdminListing extends Component {
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
    // Deletion confirmation script
    $(".delete-button").click(function () {
      const id = $(this).data("id");

      $.confirm({
        title: "Delete!",
        content: "Are you sure you want to delete this data?",
        type: "red",
        typeAnimated: true,
        buttons: {
          tryAgain: {
            text: "Yes",
            btnClass: "btn-red",
            action: function () {
              // Perform the delete action using the id
              // ...

              // Example: Delete action

              // You can replace the following line with your actual delete logic
              // window.location.reload();
            },
          },
          close: function () {},
        },
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
                <div className="headingD">
                  <i className="fa fa-eye" aria-hidden="true"></i> Blogs
                  <a href="add_blog.php" className="btn btn-default pull-right">
                    <i className="fa fa-plus-square-o" aria-hidden="true"></i>{" "}
                    Add New
                  </a>
                </div>

                <div className="showPageSec">
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 padleftright0">
                        <div className="table-responsive dataTable catbyMdl">
                          <table
                            id="myTable"
                            className="display table"
                            style={{ width: "100%" }}
                          >
                            <thead>
                              <tr>
                                <th>Action</th>
                                <th>Blog Title</th>
                                <th>Date</th>
                                <th>Image</th>
                              </tr>
                            </thead>

                            <tbody>
                              <tr className="trBack">
                                <td>
                                  <a href="#" id="DelData17">
                                    <i
                                      className="fa fa-window-close"
                                      style={{ color: "red", title: "Delete" }}
                                    ></i>
                                  </a>
                                  &emsp;&nbsp;
                                  <a href="edit_blog.php?edit=MTc=">
                                    <i
                                      className="fa fa-pencil"
                                      aria-hidden="true"
                                      title="Edit"
                                    ></i>
                                  </a>
                                </td>
                                <td>
                                  What is the best way to buy Cryptocurrency for
                                  beginners?
                                </td>
                                <td>2022-02-05 07:51:25</td>
                                <td>
                                  <img
                                    src={require("./../../Images/logo.png")}
                                    className="img-responsive"
                                    height="80"
                                    alt=""
                                  />
                                </td>
                              </tr>

                              <tr className="trBack">
                                <td>
                                  <a href="#" id="DelData16">
                                    <i
                                      className="fa fa-window-close"
                                      //   style="color:red;"
                                      //   aria-hidden="true"
                                      //   title="Delete"
                                      style={{ color: "red", title: "Delete" }}
                                    ></i>
                                  </a>
                                  &emsp;&nbsp;
                                  <a href="edit_blog.php?edit=MTY=">
                                    <i
                                      className="fa fa-pencil"
                                      aria-hidden="true"
                                      title="Edit"
                                    ></i>
                                  </a>
                                </td>
                                <td>What is Cryptocurrency?</td>
                                <td>2022-02-05 07:13:31</td>
                                <td>
                                  <img
                                    src={require("./../../Images/logo.png")}
                                    className="img-responsive"
                                    height="80"
                                    alt=""
                                  />
                                </td>
                              </tr>

                              <tr className="trBack">
                                <td>
                                  <a href="#" id="DelData15">
                                    <i
                                      className="fa fa-window-close"
                                      //   style="color:red;"
                                      //   aria-hidden="true"
                                      //   title="Delete"
                                      style={{ color: "red", title: "Delete" }}
                                    ></i>
                                  </a>
                                  &emsp;&nbsp;
                                  <a href="edit_blog.php?edit=MTU=">
                                    <i
                                      className="fa fa-pencil"
                                      aria-hidden="true"
                                      title="Edit"
                                    ></i>
                                  </a>
                                </td>
                                <td>What is a Smart Contract?</td>
                                <td>2022-02-03 12:17:51</td>
                                <td>
                                  <img
                                    src={require("./../../Images/logo.png")}
                                    className="img-responsive"
                                    height="80"
                                    alt=""
                                  />
                                </td>
                              </tr>

                              <tr className="trBack">
                                <td>
                                  <a href="#" id="DelData14">
                                    <i
                                      className="fa fa-window-close"
                                      //   style="color:red;"
                                      //   aria-hidden="true"
                                      //   title="Delete"
                                      style={{ color: "red", title: "Delete" }}
                                    ></i>
                                  </a>
                                  &emsp;&nbsp;
                                  <a href="edit_blog.php?edit=MTQ=">
                                    <i
                                      className="fa fa-pencil"
                                      aria-hidden="true"
                                      title="Edit"
                                    ></i>
                                  </a>
                                </td>
                                <td>What is Blockchain Technology?</td>
                                <td>2022-02-03 11:16:02</td>
                                <td>
                                  <img
                                    src={require("./../../Images/logo.png")}
                                    className="img-responsive"
                                    height="80"
                                    alt=""
                                  />
                                </td>
                              </tr>

                              <tr className="trBack">
                                <td>
                                  <a href="#" id="DelData10">
                                    <i
                                      className="fa fa-window-close"
                                      //   style="color:red;"
                                      //   aria-hidden="true"
                                      //   title="Delete"
                                      style={{ color: "red", title: "Delete" }}
                                    ></i>
                                  </a>
                                  &emsp;&nbsp;
                                  <a href="edit_blog.php?edit=MTA=">
                                    <i
                                      className="fa fa-pencil"
                                      aria-hidden="true"
                                      title="Edit"
                                    ></i>
                                  </a>
                                </td>
                                <td>
                                  Is cryptocurrency needed to use MetaMask?
                                </td>
                                <td>2022-01-28 10:49:34</td>
                                <td>
                                  <img
                                    src={require("./../../Images/logo.png")}
                                    className="img-responsive"
                                    height="80"
                                    alt=""
                                  />
                                </td>
                              </tr>

                              <tr className="trBack">
                                <td>
                                  <a href="#" id="DelData9">
                                    <i
                                      className="fa fa-window-close"
                                      //   style="color:red;"
                                      //   aria-hidden="true"
                                      //   title="Delete"
                                      style={{ color: "red", title: "Delete" }}
                                    ></i>
                                  </a>
                                  &emsp;&nbsp;
                                  <a href="edit_blog.php?edit=OQ==">
                                    <i
                                      className="fa fa-pencil"
                                      aria-hidden="true"
                                      title="Edit"
                                    ></i>
                                  </a>
                                </td>
                                <td>
                                  How to connect a MetaMask wallet to the
                                  Binance Smart Chain (BSC) Network?{" "}
                                </td>
                                <td>2022-01-27 11:10:34</td>
                                <td>
                                  <img
                                    src={require("./../../Images/logo.png")}
                                    className="img-responsive"
                                    height="80"
                                    alt=""
                                  />
                                </td>
                              </tr>

                              <tr className="trBack">
                                <td>
                                  <a href="#" id="DelData8">
                                    <i
                                      className="fa fa-window-close"
                                      //   style="color:red;"
                                      //   aria-hidden="true"
                                      //   title="Delete"
                                      style={{ color: "red", title: "Delete" }}
                                    ></i>
                                  </a>
                                  &emsp;&nbsp;
                                  <a href="edit_blog.php?edit=OA==">
                                    <i
                                      className="fa fa-pencil"
                                      aria-hidden="true"
                                      title="Edit"
                                    ></i>
                                  </a>
                                </td>
                                <td>What is metamask? </td>
                                <td>2022-01-27 10:42:32</td>
                                <td>
                                  <img
                                    src={require("./../../Images/logo.png")}
                                    className="img-responsive"
                                    height="80"
                                    alt=""
                                  />
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminListing;
