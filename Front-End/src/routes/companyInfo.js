import React, { Component } from "react";
import axios from "axios";

class CompanyInfo extends Component {
  state = {};

  componentDidMount = () => {
    axios
      .post(
        `http://localhost:9000/getCompanyInfo/${this.props.location.state._id}`
      )
      .then(response =>
        this.setState({
          allCompanyInfo: response.data
        })
      );
  };

  goBack = () => {
    this.props.history.push("/postspage");
  };

  render() {
    return this.state.allCompanyInfo ? (
      <div
        className="container"
        style={{ position: "relative", minHeight: "100vh" }}
      >
        <span>
          <img
            style={{ width: 150, height: 150 }}
            src={this.state.allCompanyInfo.img_path}
            alt=""
          ></img>
        </span>
        <h2>Company :{this.state.allCompanyInfo.name} </h2>
        <h3> City : {this.state.allCompanyInfo.city}</h3>
        <h3> Location : {this.state.allCompanyInfo.location}</h3>
        <h3> Email : {this.state.allCompanyInfo.email}</h3>
        <h3>
          Website :
          <a
            href={this.state.allCompanyInfo.website}
            target="_blank"
            rel="noopener noreferrer"
          >
            {this.state.allCompanyInfo.website}
          </a>
        </h3>

        <h2>About Company :{this.state.allCompanyInfo.comp_description} </h2>
        <h2>Field :{this.state.allCompanyInfo.field} </h2>

        <button onClick={this.goBack}>Go Back</button>
        {/* <button onClick={this.sendRequest}>send Request </button> */}
      </div>
    ) : (
      <div> null </div>
    );
  }
}

export default CompanyInfo;
