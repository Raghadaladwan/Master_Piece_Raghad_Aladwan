import React, { Component } from "react";
import cookie from "react-cookies";
import axios from "axios";

import PostComponent from "../component/postComponent";

class postsPage extends Component {
  state = {
    comp_info: null,
    Trainee_Info: null,
    userid: cookie.load("isLoggedIn"),
    message: "",
    post: []
  };

  componentDidMount() {
    axios
      .get(`http://localhost:9000/getUser/${cookie.load("isLoggedIn")._id}`)

      .then(response => {
        if (response.data.role === "company") {
          this.setState({ comp_info: response.data }, () => {});

          this.getPost();
        }
        if (response.data.role === "trainee") {
          this.setState({
            Trainee_Info: response.data
          });

          this.getAllPosts();
        }
      })
      .catch(() => {
        console.log("ERROR");
      });
  }

  getAllPosts = () => {
    const field = this.state.Trainee_Info.field;

    axios
      .put(`http://localhost:9000/all_posts/${cookie.load("isLoggedIn")._id}`, {
        field
      })
      .then(response => {
        this.setState({ post: response.data });
      });
  };

  getPost = () => {
    axios
      .get(
        `http://localhost:9000/copmany_posts/${cookie.load("isLoggedIn")._id}`
      )
      .then(response => {
        this.setState({ post: response.data });
      });
  };

  addPost = event => {
    event.preventDefault();
    let newPost = {
      field: event.target["field"].value,
      job_description: event.target["job_description"].value,
      from_Date: event.target["from_Date"].value,
      to_Date: event.target["to_Date"].value,
      img_path: this.state.comp_info.img_path
    };

    if (newPost.job_description === "") {
      this.setState({ message: "you shoud add Description" });
    } else if (newPost.from_Date === "" || newPost.to_Date === "") {
      this.setState({ message: "you shoud add Date" });
    } else {
      axios
        .put(
          `http://localhost:9000/add_post/${cookie.load("isLoggedIn")._id}`,
          newPost
        )
        .then(({ data }) => {
          this.getPost();
        });
      window.location.reload();
    }
  };

  render() {
    const { addPost, deletePost } = this;
    const { comp_info } = this.state;
    if (cookie.load("isLoggedIn") === undefined) {
      return <div> Can't View this</div>;
    }
    if (comp_info !== null) {
      return (
        <div style={{ position: "relative", minHeight: "100vh" }}>
          <div className="container col-6 mb-2 ">
            <div>
              <form onSubmit={addPost}>
                <div className="form-group">
                  <div className="form-group">
                    <label htmlFor="field">Field</label>
                    <select
                      className=" form-control sm-control"
                      name="field"
                      style={{ marginTop: "5px" }}
                    >
                      <option value="DEFAULT" disabled hidden>
                        Field
                      </option>
                      <option className="dropdown-item" name="IT" value="IT">
                        IT
                      </option>
                      <option value="Engineering" name="Engineering">
                        Engineering
                      </option>
                      <option value="Economy" name="Economy">
                        Economy
                      </option>
                      <option value="Human Resources" name="Human Resources">
                        Human Resources
                      </option>
                      <option value="management" name="management">
                        Management
                      </option>
                      <option value="social media" name="social media">
                        Social media
                      </option>
                    </select>
                  </div>
                </div>
                <div className="md-form amber-textarea active-amber-textarea">
                  <label htmlFor="job_description">Job Description :</label>
                  <textarea
                    rows="4"
                    name="job_description"
                    className="textarea form-control"
                    placeholder="Job Description"
                  ></textarea>
                </div>
                <br />
                <div className="row justify-content-around">
                  <label htmlFor="from_Date">From Date</label>
                  <input
                    type="date"
                    id="start_Date"
                    name="from_Date"
                    className="form-control col-4"
                  ></input>
                  <label htmlFor="to_Date">TO Date</label>
                  <input
                    type="date"
                    id="to_Date"
                    name="to_Date"
                    className="form-control col-4"
                  ></input>
                </div>
                <br></br>
                <div className="row justify-content-center">
                  <button
                    type="submit"
                    className=" col-6 btn btn-primary btn-block"
                  >
                    Add Post
                  </button>
                </div>
                <br />
                <div
                  className={this.state.message ? "alert alert-danger" : null}
                >
                  {this.state.message}
                </div>
              </form>
            </div>
          </div>

          <div className="container">
            <div className="row">
              {this.state.post.map(post => {
                return (
                  <PostComponent
                    key={post._id}
                    post={post}
                    image={this.state.comp_info.img_path}
                    deletePost={deletePost}
                    userid={this.state.userid}
                    getPost={this.getPost}
                    role={this.state.comp_info.role}
                  />
                );
              })}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div style={{ position: "relative", minHeight: "100vh" }}>
          {this.state.post.map(companyPost => {
            return (
              <span key={companyPost._id}>
                {companyPost.post.map(innerPost => {
                  return (
                    <PostComponent
                      key={innerPost._id}
                      post={innerPost}
                      request={companyPost.traineeRequests}
                      companyPost={companyPost._id}
                      Trainee_Info={this.state.Trainee_Info}
                      getAllPosts={this.getAllPosts}
                    />
                  );
                })}
              </span>
            );
          })}
        </div>
      );
    }
  }
}
export default postsPage;
