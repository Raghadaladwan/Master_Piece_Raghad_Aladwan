import React, { Component } from "react";
import { Link } from "react-router-dom";
import cookie from "react-cookies";
import axios from "axios";
class headerComponent extends Component {
  state = {
    userInfo: null
  };

  signOut = () => {
    if (cookie.load("isLoggedIn") !== undefined) {
      cookie.remove("isLoggedIn");
      window.location.reload();
    }
  };

  componentDidMount() {
    if (cookie.load("isLoggedIn") === undefined) {
      return false;
    } else if (cookie.load("isLoggedIn" != null)) {
      axios
        .get(`http://localhost:9000/loginUser/${cookie.load("isLoggedIn")}`)
        .then(response => {
          this.setState({ userInfo: response.data }, () => {});
        });
    } else {
      return false;
    }
  }

  render() {
    if (cookie.load("isLoggedIn") === undefined) {
      return (
        <div className="header">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to={"/"}>
              {/* Add image */}
              LOGO
            </Link>

            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                <a className="nav-item nav-link" href="/">
                  Home
                </a>

                <a className="nav-item nav-link" href="/registerpage">
                  Register
                </a>

                <Link
                  className="nav-item nav-link"
                  to={
                    cookie.load("isLoggedIn") === undefined ? "/loginpage" : "/"
                  }
                >
                  {cookie.load("isLoggedIn") === undefined
                    ? "Log in"
                    : "Log out"}
                </Link>
              </div>
            </div>
          </nav>
        </div>
      );
    } else
      return (
        <div className="header">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to={"/"}>
              {/* Add image */}
              LOGO
            </Link>

            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                <a className="nav-item nav-link" href="/">
                  Home
                </a>

                <a className="nav-item nav-link" href="/postspage">
                  Posts Page
                </a>

                {this.state.userInfo !== null
                  ? `Welcome back ${this.state.userInfo.email.toUpperCase()} !`
                  : ""}

                <Link className="nav-item nav-link" to={"/admindashboardpage"}>
                  {cookie.load("isLoggedIn") === undefined ? "" : "Dashboard"}
                </Link>

                <Link className="nav-item nav-link" to={"/userprofile"}>
                  {cookie.load("isLoggedIn") === undefined ? "" : "Profile"}
                </Link>

                <span onClick={this.signOut}>
                  <Link className="nav-item nav-link" to={"/"}>
                    {"Log out"}
                  </Link>
                </span>
              </div>
            </div>
          </nav>
        </div>
      );
  }
}

export default headerComponent;
