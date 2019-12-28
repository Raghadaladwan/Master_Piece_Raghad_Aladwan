import React, { Component } from "react";

class aboutUsPage extends Component {
  state = {};
  render() {
    return (
      <div className="container">

        <div>
          <h1>meet the team</h1>
          <span>put my image</span>
        </div>
        <div>
          <h1>who we are ?</h1>
          <p>text</p>
        </div>

        <div>
          <h2>Our Vision</h2>
          <p>
            Taking vision seriously, we believe everyone deserves to enjoy great
            journey. If that’s a belief you share, you’ll find we’re also
            serious about your training supporting your ambitions, encouraging
            your development and both recognising and rewarding the part you
            play in your training.
          </p>
        </div>
        <div>
          <h1>Contact Us</h1>
          <span>location </span>
          <span>Email :  </span>
        </div>
      </div>
    );
  }
}

export default aboutUsPage;
