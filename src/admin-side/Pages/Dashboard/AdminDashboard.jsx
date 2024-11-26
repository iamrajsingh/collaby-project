import React, { Component } from "react";
import Calendar from "react-calendar";
import AdminHeader from "./../../Components/AdminHeader";
import AdminSidebar from "./../../Components/AdminSidebar";

class AdminDashboard extends Component {
  state = {
    date: new Date(),
    curmonth: new Date().getMonth() + 1,
    curyear: new Date().getFullYear(),
  };

  render() {
    return (
      <div>
        <AdminHeader />
        <div className="dashBoardSec">
          <AdminSidebar />

          <div className="middleSec catbyMdl">
            <div className="headingD">
              <i className="fa fa-tachometer" aria-hidden="true"></i> Dashboard
            </div>

            <div className="col-md-12 col-sm-12 col-xs-12">
              {/* Render the Calendar component */}
              <Calendar
                onChange={(date) => this.setState({ date })}
                defaultValue={this.state.date}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminDashboard;
