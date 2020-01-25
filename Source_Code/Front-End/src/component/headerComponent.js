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
          <div
            className="site-navbar js-sticky-header site-navbar-target"
            role="banner"
          >
            <div className="container">
              <header className="row align-items-center position-relative">
                <div className="site-logo">
                  <a href="/" className="text-black">
                    <span className="text-primary"> </span>TURO
                  </a>
                </div>
                <nav
                  className="site-navigation text-center ml-auto"
                  role="navigation"
                >
                  <ul className="site-menu main-menu js-clone-nav ml-auto d-none d-lg-block site-nav-wrap">
                    <li>
                      <a href="/" className="nav-link">
                        Home
                      </a>
                    </li>
                    <li>
                      <a href="#investors-section" className="nav-link">
                        Our partners
                      </a>
                    </li>
                    <li>
                      <a href="#about-section" className="nav-link">
                        About
                      </a>
                    </li>
                    <li>
                      <a href="#services-section" className="nav-link">
                        Services
                      </a>
                    </li>

                    <li>
                      <a href="#contact-section" className="nav-link">
                        Contact
                      </a>
                    </li>
                    <li>
                      <a href="/registerpage" className="nav-link">
                        Register
                      </a>
                    </li>
                    <li>
                      <Link
                        className="nav-link"
                        to={
                          cookie.load("isLoggedIn") === undefined
                            ? "/loginpage"
                            : "/"
                        }
                      >
                        {cookie.load("isLoggedIn") === undefined
                          ? "Log in"
                          : "Log out"}
                      </Link>
                    </li>
                  </ul>
                </nav>

                <div className="toggle-button d-inline-block d-lg-none">
                  <a
                    href="#"
                    className="site-menu-toggle py-5 js-menu-toggle text-black"
                  >
                    <span className="icon-menu h3"></span>
                  </a>
                </div>
              </header>
            </div>
          </div>
        </div>
      );
    } else
      return (
        <div className="header">
          <div
            className="site-navbar js-sticky-header site-navbar-target"
            role="banner"
          >
            <div className="container">
              <header className="row align-items-center position-relative">
                <div className="site-logo">
                  <a href="/" className="text-black">
                    <span className="text-primary"> </span>TURO
                  </a>
                </div>

                <nav
                  className="site-navigation text-center ml-auto"
                  role="navigation"
                >
                  <ul className="site-menu main-menu js-clone-nav ml-auto d-none d-lg-block site-nav-wrap">
                    <li>
                      <a className="nav-link" href="/postspage">
                        Posts Page
                      </a>
                    </li>
                    <li>
                      <Link className=" nav-link" to={"/admindashboardpage"}>
                        {cookie.load("isLoggedIn") === undefined
                          ? ""
                          : "Dashboard"}
                      </Link>
                    </li>

                  

                    <li>
                    <Link className="nav-link" to={"/userprofile"}>
                    {cookie.load("isLoggedIn") === undefined ? "" : "Profile"}
                  </Link>
                    </li>

                    
                      <span onClick={this.signOut}>
                        <Link className="nav-item nav-link" 
                        style={{color:'red'}} to={"/"}>
                          {"Log out"}
                        </Link>
                      </span>
                   
                  </ul>
                </nav>
              </header>
            </div>
         
          </div>
        </div>
      );
  }
}

export default headerComponent;

// <nav
// class="site-navbar js-sticky-header site-navbar-target"
// role="banner"
// >
// <Link className="navbar-brand" to={"/"}>
//   {/* Add image */}
//   TURO
// </Link>

// <button
//   className="navbar-toggler"
//   type="button"
//   data-toggle="collapse"
//   data-target="#navbarNavAltMarkup"
//   aria-controls="navbarNavAltMarkup"
//   aria-expanded="false"
//   aria-label="Toggle navigation"
// >
//   <span className="navbar-toggler-icon"></span>
// </button>

// <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
//   <div className="navbar-nav">
//     <a className="nav-item nav-link" href="/">
//       Home
//     </a>

//     <a className="nav-item nav-link" href="/registerpage">
//       Register
//     </a>

//     <Link
//       className="nav-item nav-link"
//       to={
//         cookie.load("isLoggedIn") === undefined ? "/loginpage" : "/"
//       }
//     >
//       {cookie.load("isLoggedIn") === undefined
//         ? "Log in"
//         : "Log out"}
//     </Link>
//   </div>
// </div>
// </nav>
