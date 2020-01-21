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
      <div>
        <div>
          <h4>post image</h4>
          <img
            src={this.props.companyRequests.img_path}
            style={{ width: 150, height: 150 }}
            alt=""
          ></img>
          <h4>Full Name :{this.props.companyRequests.fullName}</h4>
          <h4>Field :{this.props.companyRequests.field}</h4>
          <h4>University :{this.props.companyRequests.university}</h4>

          <div>
            <button
              className="btn btn-success"
              onClick={this.rejectOrAccepted.bind(this, true)}
            >
              Accept
            </button>
            <button
              ref="btn"
              className="btn btn-danger"
              onClick={this.rejectOrAccepted.bind(this, false)}
            >
              reject
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(requestsComponent);
