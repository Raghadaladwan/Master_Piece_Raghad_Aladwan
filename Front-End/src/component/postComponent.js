import React, { Component } from "react";
import axios from "axios";
import cookie from "react-cookies";

import { withRouter } from "react-router-dom";
class postComponent extends Component {
  state = {

  };

  deletePost = id_post => {
    // console.log("user id", this.props.userid);
    // console.log("id_post", this.props.post._id);
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



  aboutCompany =() => {
    console.log("POST COMPONENT")
    console.log("Company ID",this.props.companyId);
    console.log('USER ID', cookie.load("isLoggedIn")._id)
    
    console.log("Post POSTID",this.props.post._id);

    //*********************************Should talk with it post */
    // post 5e0ce9c2fcc9ed42b6b96180
    // console.log("About Company Shold go to POST PAGE ")

this.props.history.push({
  pathname : "/CompanyInfo",
  state:{
    _id:this.props.companyId,
    postId:this.props.post._id
  }
})
  };



sendRequest = ()=>{
  // console.log("this.props.post._id",this.props.post._id)
  // console.log("UserID",cookie.load("isLoggedIn")._id)
  // console.log("COMPANY", this.props.companyId)


  let newRequest = {
    userID :cookie.load("isLoggedIn")._id,
    postID : this.props.post._id,
    Accepted :false
  }
    axios
    .post(
    `http://localhost:9000/traineeRequest/${this.props.companyId}`, newRequest
  )
  .then(({ data })=>{
    console.log("data from component post", data)
  })

  this.refs.btn.setAttribute("disabled", "disabled");

  // this.refs.btn.removeAttribute("disabled");


  // disabled="disabled"

}

  

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
    
    return (
      <div className="container">
        {/* <h5>post COMPONENT Trainee</h5> */}

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
            <button ref="btn" className="btn btn-warning" onClick={this.sendRequest} >
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
// export default  postComponent;
