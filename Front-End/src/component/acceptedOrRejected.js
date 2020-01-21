import React, { Component } from "react";
export default class acceptedOrRejected extends Component {
  render() {
    return (
      <div>
        <h2>{this.props.companyName}</h2>
        <h2>{this.props.description}</h2>
        <img
          src={this.props.img}
          style={{ width: 150, height: 150 }}
          alt=""
        ></img>
        {this.props.acceptedOrNot.Accepted ? (
          <span className="bg-success">we Accepted your Request</span>
        ) : (
          <span className="bg-danger">Soory, we rejected your Request</span>
        )}
        <h3>{this.props.acceptedOrNot.field}</h3>
      </div>
    );
  }
}
