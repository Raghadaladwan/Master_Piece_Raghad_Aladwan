// save id in cokies
// call back id
//  in dashbord componentdid mount to call all object

import React, { Component } from "react";
import axios from "axios";
import cookie from "react-cookies";

export default class loginPage extends Component {
  state = {
    email: "",
    password: "",
    role: "",
    massage: "",
    userID: null
  };

  changeInput = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  checkUserinfo = async event => {
    event.preventDefault();
    await axios
      .post("http://localhost:9000/loginUser", {
        email: this.state.email,
        password: this.state.password
      })
      .then(({ data }) => {
        if (data !== "Not a User") {
          cookie.save("isLoggedIn", data);
          this.props.history.push("/postspage");
          window.location.reload();
        } else {
          this.setState({ massage: data });
        }
      })
      .catch(error => {
        console.log("error");
      });
  };

  render() {
    const { email, password } = this.state;
    const { changeInput, checkUserinfo } = this;

    if (cookie.load("isLoggedIn") !== undefined) {
      return <div></div>;
    } else {
      return (
        <div
          className="form-group"
          style={{ position: "relative", minHeight: "80vh" }}
        >
          <div
            style={{
              boxShadow: "0 4px 8px 0 rgba(0,0,0,0.8)",
              width: "40%",
              borderRadius: "8px",
              padding: "50px",
              marginLeft: "30%",
              marginTop: "50px"
            }}
          >
            <div className="bg-light ">
              <label htmlFor="name">
                <h2> Email</h2>
              </label>
              <input
                className="form-control"
                type="text"
                placeholder="Enter E-Mail"
                name="email"
                onChange={changeInput}
                value={email}
                required
              />

              <label htmlFor="password">
                <h2> Password</h2>
              </label>
              <input
                className="form-control"
                type="password"
                onChange={changeInput}
                value={password}
                placeholder="Enter Password"
                name="password"
                required
              />
              <br />

              <button
                onClick={checkUserinfo}
                className="btn btn-lg btn-primary btn-block text-center"
              >
                Login
              </button>
            </div>

            {this.state.massage}
          </div>
        </div>
      );
    }
  }
}
