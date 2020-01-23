import React, { Component } from "react";
import cookie from "react-cookies";
import axios from "axios";
import { withRouter } from "react-router-dom";
class requestsComponent extends Component {
  state = {
    Trainee_Info: null
  };

  rejectOrAccepted = state => {
    axios.post(
      `http://localhost:9000/rejectOrAccept/${cookie.load("isLoggedIn")._id}/${
        this.props.companyRequests.postID
      }`,
      { state }
    );
    window.location.reload();
  };

  render() {
    return (
      <div style={{ position: "relative", minHeight: "100vh" }}>
        <br></br>
        <br></br>
        <br></br>
        <div className=" container offset-md-1 row border rounded-lg">
          <div className="col-4 ">
            <div className="container">
              <img
                src={this.props.companyRequests.img_path}
                style={{ width: "100%", height: "100%" }}
                alt=""
              ></img>
            </div>
          </div>
          <div className="col-8">
            <h4>Full Name :{this.props.companyRequests.fullName}</h4>
            <br></br>
            <h4>Field :{this.props.companyRequests.field}</h4>
            <br></br>

            <h4>University :{this.props.companyRequests.university}</h4>
            <br></br>

            <div className="row justify-content-around ">
              <button
                className="btn btn-success col-4"
                onClick={this.rejectOrAccepted.bind(this, true)}
              >
                Accept
              </button>
              <button
                ref="btn"
                className="btn btn-danger col-4"
                onClick={this.rejectOrAccepted.bind(this, false)}
              >
                reject
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(requestsComponent);
