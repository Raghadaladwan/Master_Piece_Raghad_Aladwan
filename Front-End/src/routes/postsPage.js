import React, { Component } from "react";
import cookie from "react-cookies";
import axios from "axios";
import PostComponent from "../component/postComponent";

class postsPage extends Component {
  state = {
    comp_info: null,
    userid: cookie.load("isLoggedIn"),
    message: "",
    post: []
  };

  // if compant i need all info and i need form to add new post and i will get back company post just
  // if trainee also i need  all companies posts
  componentDidMount() {
    // console.log("this.props.userID", this.state.userid);
    axios
      .get(`http://localhost:9000/getUser/${cookie.load("isLoggedIn")}`)
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

    // another axios to git posts
  }
  //____________________________________________WOrking here

  getAllPosts = () => {
    console.log("Trainee field", this.state.Trainee_Info.field);
    // **************************i want to send the field with http
    // i Want to send the field too
    axios
      .get(`http://localhost:9000/all_posts/${cookie.load("isLoggedIn")}`)
      .then(response => {
        console.log("resp", response.data);
        this.setState({ post: response.data });
      });
  };

  getPost = () => {
    axios
      .get(`http://localhost:9000/copmany_posts/${cookie.load("isLoggedIn")}`)
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

    if (newPost.field === "") {
      this.setState({ message: "You should add Field" });
    } else if (newPost.job_description === "") {
      this.setState({ text: "you shoud add Description" });
    } else if (newPost.from_Date === "" || newPost.to_Date === "") {
      this.setState({ text: "you shoud add Date" });
    } else {
      axios
        .put(
          `http://localhost:9000/add_post/${cookie.load("isLoggedIn")}`,
          newPost
        )
        .then(({ data }) => {
          console.log(data);
          this.setState({ post: data });
        });
    }
    this.getPost();
  };

  // ********************************* After adding the post it doesn't Appear directly *****

  render() {
    const { addPost, deletePost } = this;
    const { comp_info } = this.state;
    if (cookie.load("isLoggedIn") === undefined) {
      return <div> Can't View this</div>;
    }
    if (comp_info !== null) {
      return (
        <div>
          <h1> comp not null {comp_info.name}</h1>
          <div className="container">
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
                    </select>
                  </div>
                </div>
                <div className="md-form amber-textarea active-amber-textarea">
                  <label htmlFor="job_description">Job Description :</label>
                  <textarea
                    name="job_description"
                    className="md-textarea form-control"
                    placeholder="Job Description"
                  ></textarea>
                </div>
                <br />
                <label htmlFor="from_Date">from Date</label>
                <input
                  type="date"
                  id="start_Date"
                  name="from_Date"
                  min="2019-01-01"
                  max="2020-12-31"
                ></input>
                <label htmlFor="to_Date">to Date</label>
                <input
                  type="date"
                  id="to_Date"
                  name="to_Date"
                  min="2019-01-01"
                  max="2020-12-31"
                ></input>
                <br />
                <button type="submit" className="btn btn-primary">
                  Add Post
                </button>
                {/* <div>{this.state.text}</div> */}
              </form>
            </div>
          </div>
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
      );
    } else {
      return (
        <div>
          <h3 style={{ color: "red" }}>fetch all post for Trainee</h3>
          {this.state.post.map(companyId => {
            return (
              <div key={companyId._id}>
                {companyId.post.map(innerPost => {
                  return <PostComponent key={innerPost._id} 
                  post={innerPost}
                  companyId={companyId}
                   />;
                })}
              </div>
            );
          })}
        </div>
      );
    }
  }
}
export default postsPage;
