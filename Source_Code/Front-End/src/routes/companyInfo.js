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
        className="container bg-dark"
        style={{ position: "relative", minHeight: "100vh" }}
      >
        <br></br>
        <br></br>
        <br></br>
        <div className="row">
          <div className="col-4">
            <span>
              <img
                style={{ width: "100%", height: "100%" }}
                src={this.state.allCompanyInfo.img_path}
                alt=""
              ></img>
            </span>
          </div>

          <div className="col-6 align-self-center  ">
            <h1 className="text-white">
              <b>{this.state.allCompanyInfo.name} </b>
            </h1>
          </div>
        </div>

        <div className="row">
          <div className="col-4 ">
            <div className="container text-white">
              <br></br>
              <h3>About Company :</h3>

              <p>{this.state.allCompanyInfo.comp_description}</p>
            </div>
          </div>
          <div className="col-8">
            {" "}
            <div className="col-4"></div>
            <div>
              <h3 className="list-group-item">
                Visit Us &nbsp;&nbsp; :&nbsp;&nbsp;
                <a
                  href={this.state.allCompanyInfo.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {this.state.allCompanyInfo.website}
                </a>
              </h3>

              <h3 className="list-group-item">
                {" "}
                City &nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;
                {this.state.allCompanyInfo.city}
              </h3>
              <h3 className="list-group-item">
                {" "}
                We are in : &nbsp;{this.state.allCompanyInfo.location}
              </h3>
              <h3 className="list-group-item">
                {" "}
                Contact Us : {this.state.allCompanyInfo.email}
              </h3>
            </div>
          </div>
        </div>

        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div className="row justify-content-center">
          <button className="btn  btn-secondary col-4" onClick={this.goBack}>
            Go Back
          </button>
          {/* <button onClick={this.sendRequest}>send Request </button> */}
        </div>
      </div>
    ) : (
      <div> null </div>
    );
  }
}

export default CompanyInfo;
