import React, { Component } from "react";
export default class acceptedOrRejected extends Component {
  render() {
    console.log("rtyhuji", this.props.acceptedOrNot.Accepted);
    return (
      <div className="container" style={{ maxWidth: "20rem" }}>
        <br></br>
        <br></br>

        {this.props.acceptedOrNot.Accepted === true ? (
          <div className=" card  ">
            <img
              className="card-img-top"
              src={this.props.img}
              style={{ width: "100%", height: "100%" }}
              alt=""
            ></img>
            <div className="card-body">
              <h3 className=" card-title text-center">
                {this.props.companyName}
              </h3>
              <br></br>

              <div className="">
                <h4>{this.props.description}</h4>
              </div>
              <div className="">
                <br></br>
                <span className="bg-success form-control text-black ">
                  <b>Accepted your Request</b>
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div>
            {this.props.acceptedOrNot.Accepted == null ? (
            

              <div className="card ">
              <img
                className="card-img-top"
                src={this.props.img}
                style={{ width: "100%", height: "100%" }}
                alt=""
              ></img>

              <div className="card-body">
                <h3 className=" card-title text-center">
                  {this.props.companyName}
                </h3>
                <br></br>

                <div className="">
                  <h4>{this.props.description}</h4>
                </div>
                <div className=" form-control bg-warning ">
                Pending Request                  
                </div>
              </div>
            </div>
            ) : (
              <div className="card bg-dark  text-white">
                <img
                  className="card-img-top"
                  src={this.props.img}
                  style={{ width: "100%", height: "100%" }}
                  alt=""
                ></img>

                <div className="card-body">
                  <h3 className=" card-title text-center">
                    {this.props.companyName}
                  </h3>
                  <br></br>

                  <div className="">
                    <h4>{this.props.description}</h4>
                  </div>
                  <div className="">
                    <br></br>
                    {this.props.acceptedOrNot.Accepted ? (
                      <span className="card-body  ">
                        we Accepted your Request
                      </span>
                    ) : (
                      <span className="bg-danger form-control text-white">
                        <b>Your Request is rejected</b>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* <h3>{this.props.acceptedOrNot.field}</h3> */}
      </div>
    );
  }
}
