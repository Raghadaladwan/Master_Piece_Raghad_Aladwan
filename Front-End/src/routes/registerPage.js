import React, { Component } from "react";
import axios from "axios";
import { storage } from "../Firebase";

import { BrowserRouter } from "react-router-dom";

class registerPage extends Component {
  state = {
    fullName: "",
    email: "",
    password: "",
    gender: "",
    university: "",
    img_path: "",
    field: "",
    role: "",
    errors: {},

    companyName: "",
    website: "https://www.",
    city: "",
    location: "",
    comp_description: "",

    image: "",
    progress: 0,
    displaycompanyForm: false,
    displaytraineeForm: false
  };

  displayCompanyForm = () => {
    this.setState({
      displaycompanyForm: !this.displaycompanyForm,
      displayTraineeForm: false
    });
  };

  displayTraineeForm = () => {
    this.setState({
      displaytraineeForm: !this.displaytraineeForm,
      displaycompanyForm: false
    });
  };

  getImagePath = event => {
    const image = event.target.files[0];
    this.setState({ image });
  };
  fileUpload = () => {
    const { image } = this.state;
    const uploadImg = storage.ref(`images/${image.name}`).put(image);
    uploadImg.on(
      "state_changed",
      snapshot => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        this.setState({ progress });
      },
      error => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then(img_path => {
            this.setState({ img_path });
          });
      }
    );
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onTraineeSubmit = async event => {
    event.preventDefault();

    const newUser = {
      fullName: this.state.fullName,
      email: this.state.email,
      password: this.state.password,
      gender: this.state.gender,
      university: this.state.university,
      img_path: this.state.img_path,
      field: this.state.field,
      role: "trainee"
    };

    await axios
      .post("http://localhost:9000/traineeregister", { newUser })

      .then(response => {
        console.log("Registered");
        this.props.history.push("/loginpage");
      });
  };

  onCompanySubmit = async event => {
    event.preventDefault();

    const newCompany = {
      companyName: this.state.companyName,
      email: this.state.email,
      password: this.state.password,
      website: this.state.website,
      city: this.state.city,
      location: this.state.location,
      comp_description: this.state.comp_description,
      img_path: this.state.img_path,
      field: this.state.field,
      role: "company"
    };

    await axios
      .post("http://localhost:9000/companyregister", { newCompany })
      .then(response => {
        console.log("Registered");
        this.props.history.push("/loginpage");
      })
      .catch(function(error) {
        console.log(error.response);
      });
  };

  render() {
    const {
      displayCompanyForm,
      displayTraineeForm,
      onTraineeSubmit,
      onCompanySubmit,
      fileUpload,
      onChange
    } = this;

    return (
      <BrowserRouter>
        <div className="container">
          <button onClick={displayCompanyForm}>Company</button>
          <button onClick={displayTraineeForm}>Trainee</button>

          {this.state.displaycompanyForm === true ? (
            <div className="row">
              <div className="col-md-6 mt-5 mx-auto">
                <form noValidate onSubmit={onCompanySubmit}>
                  <h1 className="h3 mb-3 font-weight-normal">
                    Register as Company
                  </h1>
                  <div className="form-group">
                    <label htmlFor="name">Company Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="companyName"
                      placeholder="Enter your company name"
                      value={this.state.companyName}
                      onChange={onChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      placeholder="Enter email"
                      value={this.state.email}
                      onChange={onChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      placeholder="Password"
                      value={this.state.password}
                      onChange={onChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="website">website</label>
                    <input
                      type="link"
                      className="form-control"
                      name="website"
                      placeholder="website"
                      value={this.state.website}
                      onChange={onChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="city">city</label>
                    <input
                      type="text"
                      className="form-control"
                      name="city"
                      placeholder="city"
                      value={this.state.city}
                      onChange={onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="location">location</label>
                    <input
                      type="text"
                      className="form-control"
                      name="location"
                      placeholder="location"
                      value={this.state.location}
                      onChange={onChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="description">description</label>
                    <textarea
                      type="text"
                      className="form-control"
                      name="comp_description"
                      placeholder="Description"
                      value={this.state.comp_description}
                      onChange={onChange}
                    />
                  </div>

                  <div>______________________________________</div>
                  <div className="form-group">
                    <label htmlFor="img_path">Image</label>
                    <input
                      type="file"
                      className="form-control"
                      name="img_path"
                      onChange={this.getImagePath}
                    />

                    <input type="button" onClick={fileUpload} />

                    <progress
                      value={this.state.progress}
                      max="100"
                      style={{ marginLeft: "15px", marginBottom: "8px" }}
                    />
                  </div>

                  <div>______________________________________</div>
                  <button
                    type="submit"
                    className="btn btn-lg btn-primary btn-block"
                  >
                    Register as Company!
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <div className="row">
              <div className="col-md-6 mt-5 mx-auto">
                <form noValidate onSubmit={onTraineeSubmit}>
                  <h1 className="h3 mb-3 font-weight-normal">
                    Register as Trainee{" "}
                  </h1>
                  <div className="form-group">
                    <label htmlFor="name">Full name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="fullName"
                      placeholder="Enter your first name"
                      value={this.state.fullName}
                      onChange={onChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      placeholder="Enter email"
                      value={this.state.email}
                      onChange={onChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      placeholder="Password"
                      value={this.state.password}
                      onChange={onChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="university">University</label>
                    <select
                      className=" form-control sm-control"
                      name="university"
                      onChange={onChange}
                      style={{ marginTop: "5px" }}
                      defaultValue={"DEFAULT"}
                    >
                      <option value="DEFAULT" disabled>
                        Choose your University
                      </option>
                      <option
                        className="dropdown-item"
                        value="University of Jordan"
                      >
                        University of Jordan
                      </option>
                      <option value="Balqa Applied University">
                        Balqa Applied University
                      </option>
                      <option value="Yarmouk University">
                        Yarmouk University
                      </option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="field">Field</label>
                    <select
                      className=" form-control sm-control"
                      name="field"
                      onChange={onChange}
                      style={{ marginTop: "5px" }}
                    >
                      <option value="DEFAULT" disabled hidden>
                        Field
                      </option>
                      <option className="dropdown-item" name="IT" value="IT">
                        IT
                      </option>
                      <option value="Engineering" name="Engineering">
                        Engineering
                      </option>
                      <option value="Economy" name="Economy">
                        Economy
                      </option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="gender">Gender :</label>
                    <br />
                    <input
                      type="radio"
                      name="gender"
                      value="Male"
                      onChange={onChange}
                    />
                    Male
                    <input
                      type="radio"
                      name="gender"
                      value="Fmail"
                      onChange={onChange}
                    />
                    Fmail
                  </div>

                  <div>______________________________________</div>
                  <div className="form-group">
                    <label htmlFor="img_path">Image</label>
                    <input
                      type="file"
                      className="form-control"
                      name="img_path"
                      onChange={this.getImagePath}
                    />

                    <input type="button" onClick={fileUpload} />

                    <progress
                      value={this.state.progress}
                      max="100"
                      style={{ marginLeft: "15px", marginBottom: "8px" }}
                    />
                  </div>

                  <div>______________________________________</div>

                  <button
                    type="submit"
                    className="btn btn-lg btn-primary btn-block"
                  >
                    Register As Trainee !
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </BrowserRouter>
    );
  }
}
export default registerPage;
