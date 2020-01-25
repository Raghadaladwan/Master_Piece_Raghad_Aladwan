import React, { Component } from "react";

class landingPage extends Component {
  state = {};
  render() {
    return (
      <>
        <div className="owl-carousel slide-one-item">
          <div
            className="site-section-cover overlay img-bg-section"
            style={{ backgroundImage: `url(theme/images/hero_1.jpg)` }}
          >
            <div className="container">
              <div className="row align-items-center justify-content-center">
                <div className="col-md-12 col-lg-7 text-center">
                  <h1>Investing for Success</h1>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Vel minima quasi quisquam, alias doloremque magni.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            className="site-section-cover overlay img-bg-section"
            style={{ backgroundImage: `url(theme/images/hero_2.jpg)` }}
          >
            <div className="container">
              <div className="row align-items-center justify-content-center">
                <div className="col-md-12 col-lg-7 text-center">
                  <h1>Engage With Us</h1>
                  <p>
                  For the things we have to learn before we can do them, we learn by doing them.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pb-5" style={{ position: "relative", zIndex: "8" }}>
          <div className="container">
            <div className="row" style={{ marginTop: "-50px" }}>
              <div className="col-md-6 col-lg-4 mb-4 mb-lg-0">
                <img
                  src="theme/images/img_1.jpg"
                  alt="Image"
                  className="img-fluid mb-3"
                />
                <h3 className="text-primary h4 mb-2">Business Analytics</h3>
                <p>
                  Accusantium dignissimos voluptas rem consequatur ratione illo
                  sit quasi.
                </p>
              </div>

              <div className="col-md-6 col-lg-4 mb-4 mb-lg-0">
                <img
                  src="theme/images/img_2.jpg"
                  alt="Image"
                  className="img-fluid mb-3"
                />
                <h3 className="text-primary h4 mb-2">Individual Approach</h3>
                <p>
                  Accusantium dignissimos voluptas rem consequatur ratione illo
                  sit quasi.
                </p>
              </div>
              <div className="col-md-6 col-lg-4 mb-4 mb-lg-0">
                <img
                  src="theme/images/img_3.jpg"
                  alt="Image"
                  className="img-fluid mb-3"
                />
                <h3 className="text-primary h4 mb-2">Individual Approach</h3>
                <p>
                  Accusantium dignissimos voluptas rem consequatur ratione illo
                  sit quasi.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-5" id="investors-section">
          <div className="container">
            <div className="row">
              <div className="col-12 text-center">
                <div className="block-heading-1">
                  <h2>Our Partners</h2>
                </div>
              </div>
            </div>
            <div className="row align-items-center">
              <div className="col-md-3">
                <img
                  src="theme/images/ac-nc-67336.svg"
                  alt="Image"
                  className="img-fluid"
                />
              </div>
              <div className="col-md-3">
                <img
                  src="theme/images/creyf-s.svg"
                  alt="Image"
                  className="img-fluid"
                />
              </div>
              <div className="col-md-3">
                <img
                  src="theme/images/showa-3.svg"
                  alt="Image"
                  className="img-fluid"
                />
              </div>
              <div className="col-md-3">
                <img
                  src="theme/images/trimble-2.svg"
                  alt="Image"
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="site-section" id="about-section">
          <div className="container">
            <div className="row mb-5">
              <div className="col-lg-6 mb-4">
                <img
                  src="theme/images/hero_1.jpg"
                  alt="Image"
                  className="img-fluid"
                />
              </div>
              <div className="col-lg-5 ml-auto block-heading-1">
                <h2>Who We Are</h2>

                <p>
                We are people who want to make training procedure easier for each, companies and trainees.
                </p>
                <h2>Our Vision</h2>

                <p>
                  <br></br>
                  
                Taking vision seriously, we believe everyone deserves to enjoy great journey.
                <br></br>
                <br></br>
               If that’s a belief you share, you’ll find we’re also serious about your training supporting your ambitions, encouraging your development and both recognising and rewarding the part you play in your training.
               
          </p>
                {/* <h2>we are smarter together</h2>
                <p>
               
                  <h3> Belong We're developers just like you</h3>

                 



                
                </p>
                <p>
                  <b>
                Be inspired Compare solutions and learn tips from the best programmers.</b>
                </p> */}

            
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-4 col-lg-0 col-lg-3">
                <div className="block-counter-1">
                  <span className="number">
                    <span data-number="3">0</span>
                  </span>
                  <span className="caption">Year of Experience</span>
                </div>
              </div>
              <div className="col-md-6 mb-4 col-lg-0 col-lg-3">
                <div className="block-counter-1">
                  <span className="number">
                    <span data-number="20">0</span>
                  </span>
                  <span className="caption">Number of Univirsities</span>
                </div>
              </div>
              <div className="col-md-6 mb-4 col-lg-0 col-lg-3">
                <div className="block-counter-1">
                  <span className="number">
                    <span data-number="3293">0</span>
                  </span>
                  <span className="caption">Number of Students</span>
                </div>
              </div>
              <div className="col-md-6 mb-4 col-lg-0 col-lg-3">
                <div className="block-counter-1">
                  <span className="number">
                    <span data-number="1212">0</span>
                  </span>
                  <span className="caption">Number of Companies</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="site-section bg-light" id="services-section">
          <div className="container">
            <div className="row mb-5">
              <div className="col-12">
                <div className="block-heading-1">
                  <h2>Our Services</h2>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 col-lg-4 mb-4">
                <span className="icon-signal d-block mb-3 display-3 text-secondary"></span>
                <h3 className="text-primary h4 mb-2">Business Analytics</h3>
                <p>
                  Accusantium dignissimos voluptas rem consequatur ratione illo
                  sit quasi.
                </p>
              </div>
             
              <div className="col-md-6 col-lg-4 mb-4">
                <span className="icon-magnet d-block mb-3 display-3 text-secondary"></span>
                <h3 className="text-primary h4 mb-2">Individual Approach</h3>
                <p>
                  Accusantium dignissimos voluptas rem consequatur ratione illo
                  sit quasi.
                </p>
              </div>

             
              <div className="col-md-6 col-lg-4 mb-4">
                <span className="icon-umbrella d-block mb-3 display-3 text-secondary"></span>
                <h3 className="text-primary h4 mb-2">Individual Approach</h3>
                <p>
                  Accusantium dignissimos voluptas rem consequatur ratione illo
                  sit quasi.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="site-section" id="team-section">
          <div className="container">
            <div className="row mb-5">
              <div className="col-12">
                <div className="block-heading-1">
                  <h2>Our Leadership</h2>
                </div>
              </div>
            </div>
            <div className="row">
              <div
                className="col-lg-4 col-md-6 mb-4 mb-lg-0"
                data-aos="fade-up"
              >
                <div className="block-team-member-1 text-center rounded">
                  <figure>
                    <img
                      src="theme/images/person_1.jpg"
                      alt="Image"
                      className="img-fluid rounded-circle"
                    />
                  </figure>
                  <h3 className="font-size-20 text-white">Jean Smith</h3>
                  <span className="d-block font-gray-5 letter-spacing-1 text-uppercase font-size-12 mb-3">
                    Mining Expert
                  </span>
                  <p className="px-3 mb-3">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Atque, repellat. At, soluta. Repellendus vero, consequuntur!
                  </p>
                  <div className="block-social-1">
                    <a
                      href="#"
                      className="btn border-w-2 rounded primary-primary-outline--hover"
                    >
                      <span className="icon-facebook"></span>
                    </a>
                    <a
                      href="#"
                      className="btn border-w-2 rounded primary-primary-outline--hover"
                    >
                      <span className="icon-twitter"></span>
                    </a>
                    <a
                      href="#"
                      className="btn border-w-2 rounded primary-primary-outline--hover"
                    >
                      <span className="icon-instagram"></span>
                    </a>
                  </div>
                </div>
              </div>

              <div
                className="col-lg-4 col-md-6 mb-4 mb-lg-0"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <div className="block-team-member-1 text-center rounded">
                  <figure>
                    <img
                      src="theme/images/person_2.jpg"
                      alt="Image"
                      className="img-fluid rounded-circle"
                    />
                  </figure>
                  <h3 className="font-size-20 text-white">Bob Carry</h3>
                  <span className="d-block font-gray-5 letter-spacing-1 text-uppercase font-size-12 mb-3">
                    Project Manager
                  </span>
                  <p className="px-3 mb-3">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Nihil quia veritatis, nam quam obcaecati fuga.
                  </p>
                  <div className="block-social-1">
                    <a
                      href="#"
                      className="btn border-w-2 rounded primary-primary-outline--hover"
                    >
                      <span className="icon-facebook"></span>
                    </a>
                    <a
                      href="#"
                      className="btn border-w-2 rounded primary-primary-outline--hover"
                    >
                      <span className="icon-twitter"></span>
                    </a>
                    <a
                      href="#"
                      className="btn border-w-2 rounded primary-primary-outline--hover"
                    >
                      <span className="icon-instagram"></span>
                    </a>
                  </div>
                </div>
              </div>

              <div
                className="col-lg-4 col-md-6 mb-4 mb-lg-0"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <div className="block-team-member-1 text-center rounded">
                  <figure>
                    <img
                      src="theme/images/person_3.jpg"
                      alt="Image"
                      className="img-fluid rounded-circle"
                    />
                  </figure>
                  <h3 className="font-size-20 text-white">Ricky Fisher</h3>
                  <span className="d-block font-gray-5 letter-spacing-1 text-uppercase font-size-12 mb-3">
                    Engineer
                  </span>
                  <p className="px-3 mb-3">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Quas quidem, laudantium, illum minus numquam voluptas?
                  </p>
                  <div className="block-social-1">
                    <a
                      href="#"
                      className="btn border-w-2 rounded primary-primary-outline--hover"
                    >
                      <span className="icon-facebook"></span>
                    </a>
                    <a
                      href="#"
                      className="btn border-w-2 rounded primary-primary-outline--hover"
                    >
                      <span className="icon-twitter"></span>
                    </a>
                    <a
                      href="#"
                      className="btn border-w-2 rounded primary-primary-outline--hover"
                    >
                      <span className="icon-instagram"></span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        

        <div
          class="site-section block-13 overlay bg-image"
          id="testimonials-section"
          data-aos="fade"
          style={{ backgroundImage: `url(theme/images/hero_1.jpg)` }}
        >
          <div class="container">
            <div class="text-center mb-5">
              <div class="block-heading-1">
                <h2 class="text-white">Share in our stories</h2>
              </div>
            </div>

            <div class="owl-carousel nonloop-block-13">
              <div>
                <div class="block-testimony-1 text-center">
                  <blockquote class="mb-4">
                    <p>
                      &ldquo;Lorem ipsum dolor sit amet, consectetur adipisicing
                      elit. Dolorem, fugit excepturi sapiente voluptatum nulla
                      odio quaerat quibusdam tempore similique doloremque
                      veritatis et cupiditate, maiores cumque repudiandae
                      explicabo tempora deserunt consequuntur?&rdquo;
                    </p>
                  </blockquote>

                  <figure>
                    <img
                      src="theme/images/person_4.jpg"
                      alt="Image"
                      class="img-fluid rounded-circle mx-auto"
                    />
                  </figure>
                  <h3 class="font-size-20 text-white">Ricky Fisher</h3>
                </div>
              </div>

              <div>
                <div class="block-testimony-1 text-center">
                  <blockquote class="mb-4">
                    <p>
                      &ldquo;Lorem ipsum dolor sit amet, consectetur adipisicing
                      elit. Dolorem, fugit excepturi sapiente voluptatum nulla
                      odio quaerat quibusdam tempore similique doloremque
                      veritatis et cupiditate, maiores cumque repudiandae
                      explicabo tempora deserunt consequuntur?&rdquo;
                    </p>
                  </blockquote>

                  <figure>
                    <img
                      src="theme/images/person_2.jpg"
                      alt="Image"
                      class="img-fluid rounded-circle mx-auto"
                    />
                  </figure>
                  <h3 class="font-size-20 text-white">Ken Davis</h3>
                </div>
              </div>

              <div>
                <div class="block-testimony-1 text-center">
                  <blockquote class="mb-4">
                    <p>
                      &ldquo;Lorem ipsum dolor sit amet, consectetur adipisicing
                      elit. Dolorem, fugit excepturi sapiente voluptatum nulla
                      odio quaerat quibusdam tempore similique doloremque
                      veritatis et cupiditate, maiores cumque repudiandae
                      explicabo tempora deserunt consequuntur?&rdquo;
                    </p>
                  </blockquote>

                  <figure>
                    <img
                      src="theme/images/person_1.jpg"
                      alt="Image"
                      class="img-fluid rounded-circle mx-auto"
                    />
                  </figure>
                  <h3 class="font-size-20 text-white">Mellisa Griffin</h3>
                </div>
              </div>

              <div>
                <div class="block-testimony-1 text-center">
                  <blockquote class="mb-4">
                    <p>
                      &ldquo;Lorem ipsum dolor sit amet, consectetur adipisicing
                      elit. Dolorem, fugit excepturi sapiente voluptatum nulla
                      odio quaerat quibusdam tempore similique doloremque
                      veritatis et cupiditate, maiores cumque repudiandae
                      explicabo tempora deserunt consequuntur?&rdquo;
                    </p>
                  </blockquote>

                  <figure>
                    <img
                      src="theme/images/person_3.jpg"
                      alt="Image"
                      class="img-fluid rounded-circle mx-auto"
                    />
                  </figure>
                  <h3 class="font-size-20 text-white">Robert Steward</h3>
                </div>
              </div>
            </div>
          </div>
        </div>

    
      </>
    );
  }
}

export default landingPage;
//     <div className="container">
//       <div  id="carouselExampleControls" className="carousel slide" data-ride="carousel">
//         <div className="carousel-inner">
//           <div className="carousel-item active">
//             <img className="d-block w-100" alt="" src="slider2.jpeg"></img>
//           </div>
//           <div className="carousel-item ">
//             <img className="d-block w-100" alt="" src="slider1.jpeg"></img>
//           </div>
//           <div className="carousel-item">
//             <img className="d-block w-100" alt="" src="slider3.jpeg"></img>
//           </div>

//         </div>

//         <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
//   <span className="carousel-control-prev-icon" aria-hidden="true"></span>
//   <span className="sr-only">Previous</span>
// </a>
// <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
//   <span className="carousel-control-next-icon" aria-hidden="true"></span>
//   <span className="sr-only">Next</span>
// </a>
//       </div>
//       <h1>landingPage</h1>
//       <div>
//         <h1>Slider</h1>
//       </div>

//       <div className="row">
//         <div className="col">
//           <h4>What We Do ?</h4>
//           <p></p>
//         </div>
//         <div className="col">
//           <h1>Image</h1>
//         </div>
//       </div>
//       <div>
//         <h3>We support them all</h3>
//         <span>slider of companeis image</span>
//       </div>
//       <div className="row">
//         <div className="col">
//           <h1>Image</h1>
//           <p></p>
//         </div>
//         <div className="col">
//           <h2>we are smarter together</h2>
//           <p>
//             Belong We're developers just like you Be inspired Compare
//             solutions and learn tips from the best programmers.
//           </p>
//         </div>
//       </div>

//       <div></div>
//       <div>
//         <p>3 image</p>
//       </div>
//     </div>
