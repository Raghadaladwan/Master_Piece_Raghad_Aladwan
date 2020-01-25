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
    website: "https://",
    city: "",
    location: "",
    comp_description: "",

    image: "",
    progress: 0,
    displaycompanyForm: false,
    displaytraineeForm: false,

    message_Fullname: "",
    message_Email: "",
    message_Password: "",
    message_University: "",
    message_Field: "",
    message_Gender: "",

    message_companyName: "",
    message_Website: "",
    message_city: "",
    message_Location: ""
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

    if (newUser.fullName === "") {
      console.log("FULL NAMR");
      console.log("new.full", newUser.fullName);
      this.setState({ message_Fullname: "You shoud add your name" });
    }
    if (newUser.email === "") {
      this.setState({
        message_Email: "You shoud inter your email"
      });
    }
    if (newUser.password === "") {
      this.setState({
        message_Password: "Password is Required"
      });
    }
    if (newUser.university === "") {
      this.setState({
        message_University: "You should choose your univirsity"
      });
    }
    if (newUser.field === "") {
      this.setState({
        message_Field: "You shoud add your field"
      });
    }
    if (newUser.gender === "") {
      this.setState({
        message_Gender: "This field is empty"
      });
    }
    if (
      newUser.fullName !== "" &&
      newUser.email !== "" &&
      newUser.password !== "" &&
      newUser.university !== "" &&
      newUser.field !== "" &&
      newUser.gender !== ""
    ) {
      await axios
        .post("http://localhost:9000/traineeregister", { newUser })

        .then(response => {
          console.log("Registered");
          this.props.history.push("/loginpage");
        });
    }
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

    if (newCompany.companyName === "") {
      this.setState({
        message_companyName: "Company name is Required"
      });
    }
    if (newCompany.email === "") {
      this.setState({
        message_Email: "Company Email is Required"
      });
    }
    if (newCompany.password === "") {
      this.setState({
        message_Password: " Password is Required"
      });
    }
    if (newCompany.website === "") {
      this.setState({
        message_Website: "Let Us Visit Your Website"
      });
    }
    if (newCompany.city === "") {
      this.setState({
        message_city: "City is Required"
      });
    }
    if (newCompany.location === "") {
      this.setState({
        message_Location: "You shoud add your Location"
      });
    }
    if (newCompany.comp_description === "") {
      this.setState({
        message_Description: "Tell us more about your company"
      });
    }
    if (
      newCompany.companyName !== "" &&
      newCompany.email !== "" &&
      newCompany.password !== "" &&
      newCompany.website !== "" &&
      newCompany.city !== "" &&
      newCompany.location !== "" &&
      newCompany.comp_description !== ""
    ) {
      await axios
        .post("http://localhost:9000/companyregister", { newCompany })
        .then(response => {
          this.props.history.push("/loginpage");
        })
        .catch(function(error) {
          console.log(error.response);
        });
    }
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
          <br></br>
          <div className="  row">
            <div className="col-3"></div>
            <button
              type="submit"
              className="btn btn-primary col-3 "
              onClick={displayCompanyForm}
            >
              Company
            </button>
            <button
              type="submit"
              class="btn btn-primary col-3 "
              onClick={displayTraineeForm}
            >
              Trainee
            </button>
          </div>
          {this.state.displaycompanyForm === true ? (
            <div className="row">
              <div className="col-md-6 mt-5 mx-auto site-section bg-light">
                <div className="row">
                  <div className="col-12 text-center mb-5">
                    <div className="block-heading-1">
                      <span className="icon-graduation-hat"></span>

                      <h2>Regist As Company</h2>
                    </div>
                  </div>
                </div>

                <form noValidate onSubmit={onCompanySubmit}>
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
                  <div
                    className={
                      this.state.message_companyName ? "alert alert-dark" : null
                    }
                  >
                    {this.state.message_companyName}
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

                  <div
                    className={
                      this.state.message_Email ? "alert alert-dark" : null
                    }
                  >
                    {this.state.message_Email}
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
                  <div
                    className={
                      this.state.message_Password ? "alert alert-dark" : null
                    }
                  >
                    {this.state.message_Password}
                  </div>

                  <div className="form-group">
                    <label htmlFor="website">website</label>
                    <input
                      type="link"
                      className="form-control"
                      name="website"
                      placeholder="website"
                      value={this.state.website}
                      placeholder="https://turo.com"
                      onChange={onChange}
                      required
                    />
                  </div>
                  <div
                    className={
                      this.state.message_Website ? "alert alert-dark" : null
                    }
                  >
                    {this.state.message_Website}
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
                  <div
                    className={
                      this.state.message_city ? "alert alert-dark" : null
                    }
                  >
                    {this.state.message_city}
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

                  <div
                    className={
                      this.state.message_Location ? "alert alert-dark" : null
                    }
                  >
                    {this.state.message_Location}
                  </div>

                  <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                      type="text"
                      className="form-control"
                      name="comp_description"
                      placeholder="Description"
                      value={this.state.comp_description}
                      onChange={onChange}
                    />
                  </div>
                  <div
                    className={
                      this.state.message_Description
                        ? "alert alert-dark"
                        : null
                    }
                  >
                    {this.state.message_Description}
                  </div>

                  <div className="form-group">
                    <label htmlFor="img_path">Image</label>
                    <input
                      type="file"
                      className="form-control"
                      name="img_path"
                      onChange={this.getImagePath}
                    />

                    <input
                      type="button"
                      onClick={fileUpload}
                      value="Upload image"
                    />

                    <progress
                      value={this.state.progress}
                      max="100"
                      style={{ marginLeft: "15px", marginBottom: "8px" }}
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-lg btn-primary btn-block text-center"
                  >
                    Register as Company!
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <div className="row ">
              <div className="col-md-6 mt-5 mx-auto site-section bg-light">
                <div className="row">
                  <div className="col-12 text-center mb-5">
                    <div className="block-heading-1">
                      <span className="icon-graduation-hat"></span>

                      <h2>Regist As Trainee</h2>
                    </div>
                  </div>
                </div>
                <form noValidate onSubmit={onTraineeSubmit}>
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

                  <div
                    className={
                      this.state.message_Fullname ? "alert alert-dark" : null
                    }
                  >
                    {this.state.message_Fullname}
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

                  <div
                    className={
                      this.state.message_Email ? "alert alert-dark" : null
                    }
                  >
                    {this.state.message_Email}
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
                  <div
                    className={
                      this.state.message_Password ? "alert alert-dark" : null
                    }
                  >
                    {this.state.message_Password}
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
                      <option value="Jordan University of Science and Technology">
                        Jordan University of Science and Technology
                      </option>
                      <option value="Mutah University">
                        Mutah University{" "}
                      </option>
                      <option value="Al-Hussein Bin Talal University">
                        Al-Hussein Bin Talal University
                      </option>
                      <option value="Al al-Bayt University">
                        Al al-Bayt University
                      </option>
                      <option value="Princess Sumaya University for Technology">
                        Princess Sumaya University for Technology
                      </option>
                      <option value="Philadelphia University">
                        Philadelphia University
                      </option>
                      <option value="Al-Zaytoonah University of Jordan">
                        Al-Zaytoonah University of Jordan
                      </option>
                    </select>
                  </div>
                  <div
                    className={
                      this.state.message_University ? "alert alert-dark" : null
                    }
                  >
                    {this.state.message_University}
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
                      <option value="Human Resources" name="Human Resources">
                        Human Resources
                      </option>
                      <option value="management" name="management">
                        Management
                      </option>
                      <option value="social media" name="social media">
                        Social media
                      </option>
                    </select>
                  </div>

                  <div
                    className={
                      this.state.message_Field ? "alert alert-dark" : null
                    }
                  >
                    {this.state.message_Field}
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

                  <div
                    className={
                      this.state.message_Gender ? "alert alert-dark" : null
                    }
                  >
                    {this.state.message_Gender}
                  </div>

                  <div className="form-group">
                    <label htmlFor="img_path">Image</label>

                    <input
                      type="file"
                      className="form-control"
                      name="img_path"
                      onChange={this.getImagePath}
                    />

                    <input
                      className="btn  btn-primary text-center"
                      type="button"
                      onClick={fileUpload}
                      value="Upload image"
                    />

                    <progress
                      value={this.state.progress}
                      max="100"
                      style={{ marginLeft: "15px", marginBottom: "8px" }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-lg btn-primary btn-block text-center"
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
