import React, { Component } from "react";
// import axios from "axios";
import axios from "axios";
import cookie from "react-cookies";
import AllRequestsComponent from "../component/allRequestsComponent";
import AcceptedOrRejected from "../component/acceptedOrRejected";

class adminDashBoardPage extends Component {
  state = {
    tranineeRequest: [],
    companyRequests: null
  };

  componentDidMount = () => {
    axios
      .get(`http://localhost:9000/getUser/${cookie.load("isLoggedIn")._id}`)

      .then(response => {
        if (response.data.role === "company") {
          this.getAllTraineeRequests();
        } else {
          this.getAccebtedOrRejected();
        }
      })
      .catch(() => {
        console.log("ERROR");
      });
  };

  getAllTraineeRequests = () => {
    axios
      .get(
        `http://localhost:9000/getAllTraineeRequests/${
          cookie.load("isLoggedIn")._id
        }`
      )
      .then(response => {
        this.setState({
          companyRequests: response.data
        });
      });
  };

  CompanyRequests = () => {
    let companyRequestsFilter = this.state.companyRequests.filter(item => {
      return item.Accepted === null;
    });
    let companyRequests = companyRequestsFilter.map(requests => {
      return (
        <AllRequestsComponent key={requests._id} companyRequests={requests} />
      );
    });

    return <div>{companyRequests}</div>;
  };

  getAccebtedOrRejected = () => {
    axios
      .get(
        `http://localhost:9000/getAccebtedOrRejected/${
          cookie.load("isLoggedIn")._id
        }`
      )
      .then(response => {
        this.setState({
          tranineeRequest: response.data
        });
      });
  };

  TranineeRequest = () => {
    return (
      <div>
        {this.state.tranineeRequest.map((company, index) => {
          return (
            <div key={index}>
              {company.traineeRequests.map((acceptedOrNot, index) => {
                return (
                  <div key={index}>
                    {acceptedOrNot.Accepted}
                    <AcceptedOrRejected
                      companyName={company.name}
                      img={company.img_path}
                      description={company.comp_description}
                      acceptedOrNot={acceptedOrNot}
                    />
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  };
  render() {
    return this.state.companyRequests
      ? this.CompanyRequests()
      : this.TranineeRequest();
  }
}

export default adminDashBoardPage;
