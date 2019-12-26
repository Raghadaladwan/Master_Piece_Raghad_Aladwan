import React, { Component } from "react";
import cookie from "react-cookies";
import axios from "axios";

class userProfilePage extends Component {
  state = {
    userid: cookie.load("isLoggedIn"),
    traineeInfo: null,
    companyInfo: null
  };

  componentDidMount() {
    console.log("this profile page userID", this.state.userid);
    axios
      .get(`http://localhost:9000/profile/${this.state.userid}`)
      .then(response => {
        if (response.data.role === "trainee") {
          this.setState({ traineeInfo: response.data }, () => {
            console.log("userProfile componentdid Page", response.data);
          });
        } else {
          console.log("res.datad from user profile ", response.data);
          this.setState({ companyInfo: response.data });
        }
      })
      .catch(() => {
        console.log("ERROR");
      });
  }
  edit_info = info => {
    console.log("Inner Edit");
  };

  render() {
    const { edit_info } = this;
    const { traineeInfo, companyInfo } = this.state;
    if (cookie.load("isLoggedIn") === undefined) {
      return <div> You Can't View this</div>;
    }

    if (traineeInfo !== null) {
      return (
        <div className="container">
          <div>
            <img
              style={{ width: 150, height: 150 }}
              src={traineeInfo.img_path}
              alt=""
            ></img>
          </div>
          <div>{traineeInfo.fullName}</div>
          <div>{traineeInfo.email}</div>

          <div>{traineeInfo.university}</div>
          <div>{traineeInfo.field}</div>

          <button>Edit Info</button>
        </div>
      );
    }
    if (companyInfo != null) {
      return (
        <div>
          <div>{companyInfo.email}</div>
          <div>{companyInfo.city}</div>
          <div>
            <img
              alt=""
              style={{ width: 150, height: 150 }}
              src={companyInfo.img_path}
            ></img>
          </div>
          <div>{companyInfo.location}</div>
          <div>{companyInfo.name}</div>
          <div>{companyInfo.website}</div>
          <div>
            <button onClick={edit_info}>Edit</button>
          </div>
        </div>
      );
    }

    return <div>Out if</div>;
    // return<div>{userProfile.email}</div>
  }
}

export default userProfilePage;
