import React, { Component } from "react";
import AdminHeader from "../../Components/AdminHeader";
import AdminSidebar from "../../Components/AdminSidebar";
import apiService from "../../../service/apiService";
import { withRouter } from "../../../utils/withRouter";
import { Link } from "react-router-dom";

class Slider3Edit extends Component {
  state = {
    title: "",
    image: "",
    link: "",
    ts_id: "",
    showImage:false,

    isDataUpdated: false,
    timeoutId: null,
  };

  componentDidMount() {
    const sliderInfo = this.props?.router?.location?.state?.sliderInfo;
    if (sliderInfo) {
      this.setState({
        title: sliderInfo.title,
        image: sliderInfo.image,
        link: sliderInfo.link,
        ts_id: sliderInfo.ts_id,
        showImage:true,
      });
    }
  }

  componentWillUnmount() {
    // Clear the timeout when the component unmounts
    const { timeoutId } = this.state;
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  }

  onImageTitleChange = (e) => {
    this.setState({
      title: e.target.value,
    });
  };

  onImageChange = (e) => {
    // this.setState({
    //   image: e.target.value,
    // });
    this.setState({
      image: e.target.files[0],
      showImage:false,
    });
  };

  onLinkChange = (e) => {
    this.setState({
      link: e.target.value,
    });
  };

  onUpdateTeam = async (e) => {
    e.preventDefault();
    //API Call
    try {
      //   const formData = {
      //     title: this.state.title,
      //     image: this.state.image,
      //     link: this.state.link,
      //     ts_id: this.state.ts_id,
      //   };

      const formData = new FormData();

      formData.append("title", this.state.title);
      formData.append("image", this.state.image);
      formData.append("link", this.state.link);
      formData.append("ts_id", this.state.ts_id);

      const response = await apiService.post(
        "admin/third_slider/update",

        formData
      );

      if (response.status === "200") {

        this.setState({
          isDataUpdated: true,
        });

        // Clear the previous timeout if exists
        const { timeoutId } = this.state;
        if (timeoutId) {
          clearTimeout(timeoutId);
        }

        // Set a new timeout to clear the success message after 3000 milliseconds
        const newTimeoutId = setTimeout(() => {
          this.setState({
            isDataUpdated: false,
          });
        }, 3000);

        // Update the timeout ID in the state
        this.setState({
          timeoutId: newTimeoutId,
        });
      } else {
        // Handle error, e.g., show an error message
      }
    } catch (error) {
    }
  };

  render() {
    return (
      <div>
        <AdminHeader />
        <div className="dashBoardSec">
          <AdminSidebar />
        </div>

        <div className="middleSec catbyMdl">
          <form method="post" id="editfrm" onSubmit={this.onUpdateTeam}>
            <div className="headingD">
              <i className="fa fa-pencil" aria-hidden="true"></i> Edit Slider 3{" "}
              <Link
                to="/admin/slider3/listing"
                className="btn btn-default pull-right"
              >
                <i className="fa fa-arrow-left" aria-hidden="true"></i> Back
              </Link>
              &emsp;
            </div>
            {this.state.isDataUpdated && (
              <div className="alert alert-success Add">
                <strong>Successfully Edited Your Data!</strong>
              </div>
            )}
            <div className="addPageSec catbyMdl">
              <div className="container-fluid">
                <div className="row">
                  <div className="form-group">
                    <div className="form-group">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <label>Title</label>
                        <input
                          type="text"
                          name="title"
                          id="meta_keyword"
                          className="form-control"
                          required
                          placeholder="Enter Project Name"
                          value={this.state.title}
                          onChange={this.onImageTitleChange}
                        />

                        <br />
                      </div>
                    </div>

                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <label>Link</label>
                      <input
                        type="text"
                        name="link"
                        id="blog_title"
                        className="form-control"
                        required
                        placeholder="Enter link"
                        value={this.state.link}
                        onChange={this.onLinkChange}
                      // defaultValue="What is the best way to buy Cryptocurrency for beginners?"
                      />
                      <br />
                    </div>

                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <label>Image</label>
                      <input
                        type="file"
                        name="price"
                        id="blog_title"
                        className="form-control"
                        required
                        placeholder="Enter Price"
                        // value={this.state.image}
                        onChange={this.onImageChange}
                      // defaultValue="What is the best way to buy Cryptocurrency for beginners?"
                      />
                      {this.state.showImage && <img
                        src={this.state.image}
                        width={100}
                        height={100}
                        alt={this.state.title}
                      />}
                      <br />
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <button type="submit" className="btn btn-primary addbtn">
                        <i className="fa fa-floppy-o" aria-hidden="true"></i>{" "}
                        Save
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

export default withRouter(Slider3Edit);
