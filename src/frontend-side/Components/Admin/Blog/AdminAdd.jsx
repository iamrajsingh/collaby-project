import React, { Component } from "react";
import { Link } from "react-router-dom";

import AdminHeader from "../AdminHeader";
import AdminSidebar from "../AdminSidebar";
class AdminAdd extends Component {
  state = {
    content: "",
  };
  handleChange = (value) => {
    this.setState({
      content: value,
    });
  };
  render() {
    return (
      <div>
        <AdminHeader />
        <div className="dashBoardSec">
          <AdminSidebar />

          <div className="middleSec catbyMdl">
            <form method="post" id="addfrm">
              <div className="headingD">
                <i className="fa fa-plus-square-o" aria-hidden="true"></i> Add
                Blog
                <Link to="/admin/blogs" className="btn btn-default pull-right">
                  <i className="fa fa-arrow-left" aria-hidden="true"></i> Back
                </Link>
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
                    <div className="form-group">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <label>Full Description</label>
                        <input
                          type="text"
                          name="description"
                          id="description"
                          className="form-control"
                          required=""
                          placeholder="Enter Description"
                          value={this.state.content}
                          onChange={this.handleChange}
                        />
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
                        <input
                          type="hidden"
                          name="add"
                          defaultValue="blog_add"
                        />
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
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <button type="reset" className="btn btn-default">
                          <i className="fa fa-repeat" aria-hidden="true"></i>{" "}
                          Reset
                        </button>
                        <button
                          type="submit"
                          className="btn btn-primary addbtn"
                        >
                          <i className="fa fa-floppy-o" aria-hidden="true"></i>{" "}
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
    );
  }
}

export default AdminAdd;
