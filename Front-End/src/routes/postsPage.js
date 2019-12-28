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

          // AXIOS to get back company post
          //
        }
        if (response.data.role === "trainee") {
          this.setState({
            Trainee_Info: response.data
          });
        }
      })
      .catch(() => {
        console.log("ERROR");
      });

    this.getPost();

    // another axios to git posts
  }

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
      to_Date: event.target["to_Date"].value
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
          this.setState({post: data})
        })
    }
    this.getPost();
    
  };

  // *** After adding the post it doesn't Appear directly *****

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
                  <label htmlFor="field">Field</label>
                  <input
                    type="text"
                    className="form-control"
                    name="field"
                    placeholder="field"
                  />
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
              />
            );
          })}
        </div>
      );
    } else {
      return (
        <div>
          <h1>fetch all post for Trainee</h1>
        </div>
      );
    }
  }
}
export default postsPage;
