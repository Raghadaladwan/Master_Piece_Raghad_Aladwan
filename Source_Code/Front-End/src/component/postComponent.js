import React, { Component } from "react";
import axios from "axios";
import cookie from "react-cookies";
import { withRouter } from "react-router-dom";
class postComponent extends Component {
  state = {
    btn: ""
  };

  componentDidMount = () => {
    if (this.props.Trainee_Info != null) this.getRequest();
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
        if (response.data != null)
          this.setState({ btn: response.data.traineeRequests[0].btn });
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
    let newRequest = {
      userID: cookie.load("isLoggedIn")._id,
      postID: this.props.post._id,
      Accepted: null,
      img_path: this.props.Trainee_Info.img_path,
      fullName: this.props.Trainee_Info.fullName,
      field: this.props.Trainee_Info.field,
      university: this.props.Trainee_Info.university,
      btn: "disabled"
    };
    axios
      .post(
        `http://localhost:9000/traineeRequest/${this.props.companyPost}`,
        newRequest
      )
      .then(res => {
        this.setState({
          btn: "disabled"
        });
      });
  };

  renderCopmanyPosts = () => {
    return (
      <div className=" container col-6  " style={{ maxWidth: "18rem" }}>
        <br></br>

        <div className="bg-light">
          <h4 className="card-header">{this.props.post.field}</h4>

          <div className='class="card-text'>
            <h4 className="card-body">
              Description :<br></br> {this.props.post.job_description}
            </h4>
            <hr></hr>
            <span>
              From : &nbsp;{this.props.post.from_Date}
              <br /> To&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;
              {this.props.post.to_Date}
            </span>
          </div>
          <br></br>
          <div className="row justify-content-center">
            <button
              className="btn btn-danger "
              onClick={this.deletePost.bind(this)}
            >
              delete
            </button>
          </div>
          <hr></hr>
        </div>
      </div>
    );
  };

  renderTraineePosts = () => {
    return (
      <div className="container bg-light">
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div className="row  ">
          <div className="col-4  ">
            <img
              src={this.props.post.img_path}
              style={{ width: "100%", height: "100%" }}
              alt=""
            ></img>
          </div>

          <div className="col-8 ">
            <h4 className="card-header h2">{this.props.post.field}</h4>

            <h4>
              Job Description :
              <br></br>
              <br></br>
              <pre>
                <h5>
{this.props.post.job_description}
                </h5>
              
              </pre>
             
            </h4>

            <small className=" col-md-10 offset-md-1 text-muted">
              <div>
                <b>From :{this.props.post.from_Date}</b>
                <br></br>
                <b>To &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:{this.props.post.to_Date}</b>
              </div>
            </small>
            <div>
              <button
                className="btn btn-dark text-white col-6"
                onClick={this.aboutCompany}
              >
                More About Company
              </button>

              <button
                className="btn btn-primary col-6"
                onClick={this.sendRequest}
                disabled={this.state.btn}
              >
                Send Request
              </button>
            </div>
          </div>
        </div>
        <br />
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
