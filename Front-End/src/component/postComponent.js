import React, { Component } from "react";
import axios from "axios";

class postComponent extends Component {
  state = {};

  deletePost = id_post => {
    console.log("user id", this.props.userid);
    console.log("id_post", this.props.post._id);

    axios
      .delete(`http://localhost:9000/delete_Post/${this.props.userid}/${this.props.post._id}`)
      .then(response => {
        console.log(response);

        this.setState({ post: response });

      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const { field, job_descripthion, from_Date, to_Date } = this.props.post;
    const { image } = this.props;
    return (
      <div>
        postComponent
        <div>
          <h1>post COMPONENT</h1>
          <h4>post field {field}</h4>
          <h4>
            post image{" "}
            <img src={image} style={{ width: 150, height: 150 }} alt=""></img>
          </h4>
          <h3>
          
          </h3>
          <h4>post Job Descripthion {job_descripthion}</h4>
          <h4>
            from Date {from_Date} to Date
            {to_Date}
          </h4>
          <div>
            <button onClick={this.deletePost}>delete</button>
            <div>_________________________________</div>
          </div>
        </div>
      </div>
    );
  }
}

export default postComponent;
