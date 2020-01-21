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
        //try to get all post again!!!!!!
        this.setState({
          btn: "disabled"
        });
      });
  };

  renderCopmanyPosts = () => {
    return (
      <div className="container">
        <div className="col-6" style={{ maxWidth: "18rem" }}>
          <div>
            <h4 className="">{this.props.post.field}</h4>

            <div className='class="card-text'>
              <h2 className="card-body">
               
                Job Descripthion : {this.props.post.job_description}
              </h2>
              
              <span>
                From : {this.props.post.from_Date}
                <br /> To:
                {this.props.post.to_Date}
              </span>
            </div>
            <div>
              <button
                className="btn btn-danger"
                onClick={this.deletePost.bind(this)}
              >
                delete
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  renderTraineePosts = () => {
    return (
      <div className="container ">
        <div className="row mr-10 ">
          <div className="col-6  ">
            <img
              src={this.props.post.img_path}
              style={{ width: "210px", height: "230px" }}
              alt=""
            ></img>
          </div>

          <div className="col-6 ">
            <h4 className="card-header h2">{this.props.post.field}</h4>

            <h4>Job Descripthion : {this.props.post.job_description}</h4>
            <h4>
              From Date :{this.props.post.from_Date}
              <br />
              To Date:{this.props.post.to_Date}
            </h4>
            <div className="row">
              <button
                className="btn btn-info col-6"
                onClick={this.aboutCompany}
              >
                More About Company
              </button>

              <button
                className="btn btn-warning col-6"
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
