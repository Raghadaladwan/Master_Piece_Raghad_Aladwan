import React, { Component } from "react";

class landingPage extends Component {
  state = {};
  render() {
    return (
      <div className="container">
        <div  id="carouselExampleControls" className="carousel slide" data-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img className="d-block w-100" alt="" src="slider2.jpeg"></img>
            </div>
            <div className="carousel-item ">
              <img className="d-block w-100" alt="" src="slider1.jpeg"></img>
            </div>
            <div className="carousel-item">
              <img className="d-block w-100" alt="" src="slider3.jpeg"></img>
            </div>

          </div>

          <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
        </div>
        <h1>landingPage</h1>
        <div>
          <h1>Slider</h1>
        </div>

        <div className="row">
          <div className="col">
            <h4>What We Do ?</h4>
            <p></p>
          </div>
          <div className="col">
            <h1>Image</h1>
          </div>
        </div>
        <div>
          <h3>We support them all</h3>
          <span>slider of companeis image</span>
        </div>
        <div className="row">
          <div className="col">
            <h1>Image</h1>
            <p></p>
          </div>
          <div className="col">
            <h2>we are smarter together</h2>
            <p>
              Belong We're developers just like you Be inspired Compare
              solutions and learn tips from the best programmers.
            </p>
          </div>
        </div>

        <div></div>
        <div>
          <p>3 image</p>
        </div>
      </div>
    );
  }
}

export default landingPage;
