import React, { Component } from "react";

export default class requestsComponent extends Component {


  accepted=()=>{

    console.log("Accepted")

  }


  rejected =()=>{

    console.log("Rejected")
  }

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
            <button className="btn btn-success" onClick={this.accepted}>
              Accept
            </button>
            <button
              ref="btn"
              className="btn btn-danger"
              onClick={this.rejected}
            >
              reject
            </button>
          </div>
        </div>
      </div>
    );
  }
}
