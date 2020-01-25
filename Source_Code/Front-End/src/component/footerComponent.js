import React, { Component } from "react";

class footerComponents extends Component {
  state = {};
  render() {
    return (
      <div className="site-footer ">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="row">
                <div className="col-md-8">
                  <h2 className="footer-heading mb-4">
                    <i>Benjamin Franklin</i>
</h2>
                  <p>
                  “Tell me and I forget, teach me and I may remember, involve me and I learn.”
                 
                  </p>
                </div>
                <div className="col-md-4 ml-auto">
                  <h2 className="footer-heading mb-4">Features</h2>
                  <ul className="list-unstyled">
                    <li>
                      <a href="#">About Us</a>
                    </li>
                    <li>
                      <a href="#">Share stories</a>
                    </li>
                    <li>
                      <a href="#">Privacy</a>
                    </li>
                    <li>
                      <a href="#">Contact Us</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-4 ml-auto">
              <div className="mb-5">
                <div className="mb-5">
                  <h2 className="footer-heading mb-4">We’ve been looking for you!</h2>
                  <p>
                  Everyone has unique, God-given abilities. Use yours to make the world a brighter place.
                  </p>
                </div>

                <form action="#" method="post">
                  <div className="input-group mb-3">
                    <div className="input-group-append"></div>
                  </div>

                  <h2 className="footer-heading mb-4">Follow Us</h2>
                  <a
                    href="https://www.facebook.com/"
                    className="smoothscroll pl-0 pr-3"
                  >
                    <span className="icon-facebook"></span>
                  </a>
                  <a href="https://twitter.com/" className="pl-3 pr-3">
                    <span className="icon-twitter"></span>
                  </a>
                  <a
                    href="https://www.instagram.com/?hl=en"
                    className="pl-3 pr-3"
                  >
                    <span className="icon-instagram"></span>
                  </a>
                  <a
                    href="https://www.linkedin.com/?hl=en"
                    className="pl-3 pr-3"
                  >
                    <span className="icon-linkedin"></span>
                  </a>
                </form>
              </div>
            </div>
            <div className="row pt-5 mt-5 text-center">
              <div className="col-md-12">
                <div className="border-top pt-5"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default footerComponents;
