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
        password: this.state.password,
        role: this.state.role
      })
      .then(response => {
        if (response.data != null) {
          cookie.save("isLoggedIn", response.data);
          this.props.history.push("/admindashboardpage");
          window.location.reload();
        } else {
          this.setState({ massage: "wrong E-mail or password" });
        }
      });
  };

  render() {
    const { email, password } = this.state;
    const { changeInput, checkUserinfo } = this;

    if (cookie.load("isLoggedIn") !== undefined) {
      return <div></div>;
    } else {
      return (
        <div>
          <h1 style={{ textAlign: "center", marginTop: "100px" }}>
            <span></span>
            Login Form
          </h1>

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
            <div>
              <label htmlFor="name">
                <h3> Email</h3>
              </label>
              <input
                type="text"
                placeholder="Enter E-Mail"
                name="email"
                onChange={changeInput}
                value={email}
                required
              />

              <label htmlFor="password">
                <h3> Password</h3>
              </label>
              <input
                type="password"
                onChange={changeInput}
                value={password}
                placeholder="Enter Password"
                name="password"
                required
              />

              <div className="form-group">
                <label htmlFor="role"> You are</label>
                <br />
                <input
                  type="radio"
                  name="role"
                  value="trainee"
                  onChange={changeInput}
                />
                trainee
                <input
                  type="radio"
                  name="role"
                  value="company"
                  onChange={changeInput}
                />
                company
              </div>

              <button
                onClick={checkUserinfo}
                style={{
                  backgroundColor: "#622556",
                  color: "white",
                  fontWeight: "bolder",
                  marginTop: "50px",

                  marginLeft: "40.5%",
                  height: "50px",
                  width: "20%"
                }}
                className="btn"
              >
                Login
              </button>
            </div>

            {this.state.massage}
          </div>
          {/* <button onClick={()=>{console.log()}}>Check</button> */}
        </div>
      );
    }
  }
}
