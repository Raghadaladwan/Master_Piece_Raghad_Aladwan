import React, { Component } from "react";
// import axios from "axios";
// import PostsPage from "./postsPage";

class adminDashBoardPage extends Component {
  state = {
    company: [],
    traninee: []
  };

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
