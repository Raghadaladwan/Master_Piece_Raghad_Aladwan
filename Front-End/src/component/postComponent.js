import React, { Component } from "react";
import axios from "axios";
import cookie from "react-cookies";
import { withRouter } from "react-router-dom";
class postComponent extends Component {
  state = {
    btn: ""
  };

  componentDidMount = () => {
    if(this.props.Trainee_Info != null)
    this.getRequest();
  };

  deletePost = id_post => {
    axios
      .delete(
        `http://localhost:9000/delete_Post/${this.props.userid._id}/${this.props.post._id}`
      )
      .then(response => {
        this.props.getPost();
      })
      .catch(error => {
        console.log(error);
      });
  };

  getRequest = () => {
    axios
      .post(
        `http://localhost:9000/checkTraineeRequest/${
          cookie.load("isLoggedIn")._id
        }/${this.props.post._id}/${this.props.companyPost}`
      )
      .then(response => {
        if (  response.data != null)
          this.setState({ btn: response.data.traineeRequests[0].btn });
        console.log("bittar", response.data);
      });
  };

  aboutCompany = () => {

    this.props.history.push({
      pathname: "/CompanyInfo",
      state: {
        _id: this.props.companyPost,
        postId: this.props.post._id
      }
    });
  };

  sendRequest = () => {
 
    console.log(
      "this.props.Trainee_Info.fullName",
      this.props.Trainee_Info.fullName
    );

    let newRequest = {
      userID: cookie.load("isLoggedIn")._id,
      postID: this.props.post._id,
      Accepted: false,
      img_path: this.props.Trainee_Info.img_path,
      fullName: this.props.Trainee_Info.fullName,
      field: this.props.Trainee_Info.field,
      university: this.props.Trainee_Info.university,
      btn: "disabled"
    };
    console.log(newRequest);
    axios
      .post(
        `http://localhost:9000/traineeRequest/${this.props.companyPost}`,
        newRequest
      )
      .then(({ data }) => {
        console.log("data from component post", data);
      });

    window.location.reload();
  };

  renderCopmanyPosts = () => {
    return (
      <div className="container">
        <h4>post COMPONENT_______________</h4>

        <div>
          <h4>
            post image
            <img
              src={this.props.image}
              style={{ width: 150, height: 150 }}
              alt=""
            ></img>
          </h4>
          <h4>post field {this.props.post.field}</h4>

          <h4>post Job Descripthion {this.props.post.job_description}</h4>
          <h4>
            from Date {this.props.post.from_Date} to Date
            {this.props.post.to_Date}
          </h4>
          <div>
            <button onClick={this.deletePost.bind(this)}>delete</button>
          </div>
        </div>
      </div>
    );
  };

  renderTraineePosts = () => {
    let req = this.props.request.filter(id => {
      return id !== this.props.post._id;
    });

    return (
      <div className="container">

        <div>
          <h4>
            post image
            <img
              src={this.props.post.img_path}
              style={{ width: 150, height: 150 }}
              alt=""
            ></img>
          </h4>
          <h4>Field :{this.props.post.field}</h4>

          <h4>Job Descripthion : {this.props.post.job_description}</h4>
          <h4>
            From Date :{this.props.post.from_Date}
            <br />
            To Date:{this.props.post.to_Date}
          </h4>
          <div>
            <button className="btn btn-info" onClick={this.aboutCompany}>
              More About Company
            </button>
            <button
              className="btn btn-warning"
              onClick={this.sendRequest}
              disabled={this.state.btn}
            >
              Send Request
            </button>
          </div>
        </div>
      </div>
    );
  };

  render() {
    return this.props.role
      ? this.renderCopmanyPosts()
      : this.renderTraineePosts();
  }
}

export default withRouter(postComponent);
