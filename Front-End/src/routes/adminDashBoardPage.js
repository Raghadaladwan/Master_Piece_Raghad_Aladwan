import React, { Component } from "react";
import axios from "axios";
import cookie from "react-cookies";

// import PostsPage from "./postsPage";

class adminDashBoardPage extends Component {
  state = {
    companyRequests: [],
    tranineeRequest: []
  };

  componentDidMount=()=>{

    cookie.load("isLoggedIn").field === "Admin"?
    (
    axios
    .get(`http://localhost:9000/getAllCompanies/${cookie.load("isLoggedIn")._id}`)
    .then( response =>{
      this.setState({
        companies : response
      })

    }) .catch(
      console.log("IN ADMIN")
    )


    ):(axios
    .get(`http:://localhost:9000/getTraineeRequest/${cookie.load("isLoggedIn")._id}`)
    .then(response =>{
      cookie.load("isLoggedIn").field ==="company"? 
      this.setState({
        company : response
      })
      : this.setState({ tranineeRequest: response})
    })
    )


  }

  render() {
    return (
      <div>
      
        <p>{JSON.stringify(this.props.user)}</p>
        adminDashBoardPage
      </div>
    );
  }
}

export default adminDashBoardPage;
