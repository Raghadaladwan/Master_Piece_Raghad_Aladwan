import React, { Component } from "react";
import axios from "axios";

class postComponent extends Component {
  state = {};

  deletePost = id_post => {
    console.log("user id", this.props.userid);
    console.log("id_post", this.props.post._id);
    axios
      .delete(
        `http://localhost:9000/delete_Post/${this.props.userid}/${this.props.post._id}`
      )
      .then(response => {
        console.log(response);
        this.props.getPost();
      })
      .catch(error => {
        console.log(error);
      });
  };
  aboutCompany = id =>{
    console.log("About Company Shold go to POST PAGE ")
  }

  renderCopmanyPosts = () => {
    return (
      <div className="container">
        <h4>post COMPONENT</h4>

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

          <h3></h3>
          <h4>post Job Descripthion {this.props.post.job_description}</h4>
          <h4>
            from Date {this.props.post.from_Date} to Date
            {this.props.post.to_Date}
          </h4>
          <div>
            <button onClick={this.deletePost}>delete</button>
          </div>
        </div>
      </div>
    );
  };

  renderTraineePosts = () => {
    return(
    <div className="container">
      <h5>post COMPONENT Trainee</h5>

      <div>
        <h4>
          post image
          <img
            src={this.props.image}
            style={{ width: 150, height: 150 }}
            alt=""
          ></img>
        </h4>
        <h4>Field :{this.props.post.field}</h4>

        <h3></h3>
        <h4>Job Descripthion : {this.props.post.job_description}</h4>
        <h4>
          From Date :{this.props.post.from_Date}<br/>
          To Date:{this.props.post.to_Date}
        </h4>
        <div>
          <button  className="btn btn-info" onClick={this.aboutCompany}>More About Company</button>
        </div>
      </div>
    </div>);
  };

  render() {
    return this.props.role 
    ? this.renderCopmanyPosts() 
    : this.renderTraineePosts()
  }
}

export default postComponent;
