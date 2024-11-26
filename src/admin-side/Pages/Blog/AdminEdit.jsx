import React, { Component } from "react";
import { Link } from "react-router-dom";

import AdminHeader from "../../Components/AdminHeader";
import AdminSidebar from "../../Components/AdminSidebar";
class AdminEdit extends Component {
  state = {
    title: "Edit team name",
    fulldescription: "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
    image: "",
    metatitle: "ghhhh",
    metakeyword: "bnbn",
    metadescription: "bhhjhhj",
  };

  onTitleChange = (e) => {
    this.setState({
      title: e.target.value,
    });
  };

  onFullDescriptionChange = (e) => {
    this.setState({
      fulldescription: e.target.value,
    });
  };

  onImageChange = (e) => {
    this.setState({
      image: e.target.value,
    });
  };

  onMetaTitleChange = (e) => {
    this.setState({
      metatitle: e.target.value,
    });
  };
  onMetaKeywordChange = (e) => {
    this.setState({
      metakeyword: e.target.value,
    });
  };
  onMetaDescriptionChange = (e) => {
    this.setState({
      metadescription: e.target.value,
    });
  };

  // onChange = (e) => {
  //   this.setState({
  //     title: e.target.value,
  //   });
  // };

  // onUpdateTeam = (e) => {
  //   e.preventDefault();
  //   //API Call
  // };

  // handleChange = (value) => {
  //   this.setState({
  //     content: value,
  //   });
  // };
  render() {
    return (
      <div>
        <AdminHeader />
        <div className="dashBoardSec">
          <AdminSidebar />
        </div>
        <div className="middleSec catbyMdl">
          <form method="post" id="editfrm">
            <div className="headingD">
              <i className="fa fa-pencil" aria-hidden="true"></i> Edit Blog{" "}
              <Link to="/admin/blogs" className="btn btn-default pull-right">
                <i className="fa fa-arrow-left" aria-hidden="true"></i> Back
              </Link>
              &emsp;
            </div>
            <div
              className="alert alert-success Add"
              style={{ display: "none" }}
            >
              <strong>Successfully Edited Your Data!</strong>
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
                        value={this.state.title}
                        onChange={this.onTitleChange}
                        // defaultValue="What is the best way to buy Cryptocurrency for beginners?"
                      />
                      <br />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <label>Full Description</label>
                      {/* <ReactQuill
                        value={this.state.content}
                        onChange={this.handleChange}
                      /> */}
                      <input
                        type="text"
                        name="description"
                        id="description"
                        className="form-control"
                        required=""
                        placeholder="Enter Blog Title"
                        value={this.state.fulldescription}
                        onChange={this.onFullDescriptionChange}
                        // defaultValue="What is the best way to buy Cryptocurrency for beginners?"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <label>Image</label>
                      <input
                        type="file"
                        name="image"
                        id="image"
                        className="form-control"
                        value={this.state.image}
                        onChange={this.onImageChange}
                      />
                      <input
                        type="hidden"
                        name="old_image"
                        defaultValue="blog_1644047811.jpeg"
                      />
                      <input type="hidden" name="blog_id" defaultValue="MTc=" />
                      <input
                        type="hidden"
                        name="update"
                        defaultValue="blog_update"
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
                        value={this.state.metatitle}
                        onChange={this.onMetaTitleChange}
                        // defaultValue="Process to best buy of cryptocurrency for beginners"
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
                        value={this.state.metakeyword}
                        onChange={this.onMetaKeywordChange}
                        // defaultValue="Cryptocurrency, Digital currency, virtual currency, blockchain technology, distributed ledger, decentralised network, exchange, decentralised exchange, centralized exchange"
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
                        value={this.state.metadescription}
                        onChange={this.onMetaDescriptionChange}
                        // defaultValue="How to buy best cryptocurrency from the the market"
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
                      <button type="submit" className="btn btn-primary addbtn">
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
    );
  }
}

export default AdminEdit;
