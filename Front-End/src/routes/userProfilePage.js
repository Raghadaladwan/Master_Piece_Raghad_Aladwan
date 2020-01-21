import React, { Component } from "react";
import cookie from "react-cookies";
import axios from "axios";

class userProfilePage extends Component {
  state = {
    userid: cookie.load("isLoggedIn"),
    traineeInfo: null,
    companyInfo: null,
    isInEdit: false,
    progress: 0
  };

  componentDidMount() {
    axios
      .get(`http://localhost:9000/profile/${this.state.userid._id}`)
      .then(response => {
        if (response.data.role === "trainee") {
          this.setState({ traineeInfo: response.data });
        }
        if (response.data.role === "company") {
          this.setState({
            companyInfo: response.data
          });
        }
      });
  }

  edit_info = () => {
    this.setState({
      isInEdit: !this.state.isInEdit
    });
  };

  updateTraineeInfo = async event => {
    event.preventDefault();

    const newTraineeInfo = {
      fullName: this.refs.fullName.value,
      email: this.refs.email.value,
      field: this.fieldType.value,
      password: this.refs.password.value,
      university: this.uniType.value,
      gender: this.state.traineeInfo.gender,
      img_path: this.state.traineeInfo.img_path
    };
    this.setState({
      isInEdit: false
    });
    await axios
      .put(
        `http://localhost:9000/EditTraineeProfile/${this.state.userid._id}`,
        newTraineeInfo
      )

      .then(response => {
        this.setState({
          traineeInfo: response.data
        });
      });
  };

  updateCompanyInfo = async event => {
    event.preventDefault();

    const newCompanyInfo = {
      name: this.refs.name.value,
      email: this.refs.email.value,
      password: this.refs.password.value,
      website: this.refs.website.value,
      city: this.refs.city.value,
      location: this.refs.location.value,
      comp_description: this.refs.comp_description.value,
      img_path: this.state.companyInfo.img_path
    };
    this.setState({
      isInEdit: false
    });

    await axios
      .put(
        `http://localhost:9000/EditCompanyProfile/${this.state.userid._id}`,
        newCompanyInfo
      )

      .then(response => {
        this.setState({
          companyInfo: response.data
        });
      });
  };

  renderEditTraineeView = () => {
    return (
      <div className="container">
        <div>
          <form
            onSubmit={this.updateTraineeInfo}
            ref={form => (this.form = form)}
          >
            <h1 className="h3 mb-3 font-weight-normal">
              {" "}
              Edit your Information{" "}
            </h1>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                defaultValue={this.state.traineeInfo.fullName}
                ref="fullName"
              />
            </div>
            <div className="form-group">
              <label>Email : </label>
              <input
                type="text"
                name="email"
                defaultValue={this.state.traineeInfo.email}
                ref="email"
              />
            </div>
            <div className="form-group">
              <label>Password : </label>
              <input
                type="password"
                name="password"
                defaultValue={this.state.traineeInfo.password}
                ref="password"
              />
            </div>

            <div className="form-group">
              <label> University</label>
              <select ref={select => (this.uniType = select)}>
                <option>{this.state.traineeInfo.university}</option>
                <option className="dropdown-item" value="University of Jordan">
                  University of Jordan
                </option>
                <option value="Balqa Applied University">
                  Balqa Applied University
                </option>
                <option value="Yarmouk University">Yarmouk University</option>

                <option value="Al al-Bayt University">
                  Al al-Bayt University
                </option>
                <option value="JUST University">JUST University</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="field">Field</label>
              <select ref={select => (this.fieldType = select)}>
                <option>{this.state.traineeInfo.field}</option>
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
            <button onClick={this.edit_info}>Cancel</button>

            <button onClick={this.updateTraineeInfo}>Save</button>
          </form>
        </div>
      </div>
    );
  };

  renderDefaultTraineeInfo = () => {
    return (
      <div>
        <div onDoubleClick={this.edit_info}>
          <span>FullName : </span>
          {this.state.traineeInfo.fullName}
        </div>
        <div onDoubleClick={this.edit_info}>
          <span>Email : </span>
          {this.state.traineeInfo.email}
        </div>
        <div onDoubleClick={this.edit_info}>
          <span>Field : </span>

          {this.state.traineeInfo.field}
        </div>
        <div onDoubleClick={this.edit_info}>
          <span>University : </span>

          {this.state.traineeInfo.university}
        </div>

        <div onDoubleClick={this.edit_info}>
          <span>Password : </span>
          {this.state.traineeInfo.password}
        </div>

        <div onDoubleClick={this.edit_info}>
          <span>Gender : </span>
          {this.state.traineeInfo.gender}
        </div>

        <div onDoubleClick={this.edit_info}>
          <span>Your image : </span>
          <img
            alt=""
            style={{ width: 150, height: 150 }}
            src={this.state.traineeInfo.img_path}
          ></img>
        </div>
      </div>
    );
  };

  renderEditCompanyInfo = () => {
    return (
      <div className="container">
        <div className="col-md-6  mx-auto bg-lightv">
          <form
            class="form-group"
            onSubmit={this.updateCompanyInfo}
            ref={form => (this.form = form)}
          >
            <div class="col-12 text-center ">
              <div class="block-heading-1">
                <h2>Edit your Information</h2>
              </div>
            </div>

            <div className="form-group">
              <label>Company Name : </label>
              <input
                className="form-control"
                type="text"
                name="name"
                defaultValue={this.state.companyInfo.name}
                ref="name"
              />
            </div>
            <div class="form-group">
              <label>Email : </label>
              <input
                className="form-control"
                type="text"
                name="email"
                defaultValue={this.state.companyInfo.email}
                ref="email"
              />
            </div>
            <div className="form-group">
              <label>City : </label>
              <input
                className="form-control"
                type="text"
                name="city"
                defaultValue={this.state.companyInfo.city}
                ref="city"
              />
            </div>
            <div className="form-group">
              <label>Location : </label>
              <input
                className="form-control"
                type="text"
                name="location"
                defaultValue={this.state.companyInfo.location}
                ref="location"
              />
            </div>
            <div className="form-group">
              <label>Website : </label>
              <input
                className="form-control"
                type="text"
                name="website"
                defaultValue={this.state.companyInfo.website}
                ref="website"
              />
            </div>
            <div className="form-group">
              <label>Password : </label>
              <input
                className="form-control"
                type="password"
                name="password"
                defaultValue={this.state.companyInfo.password}
                ref="password"
              />
            </div>
            <div className="form-group">
              <label>About Company : </label>
              <textarea
                className="form-control"
                type="password"
                name="comp_description"
                defaultValue={this.state.companyInfo.comp_description}
                ref="comp_description"
              />
            </div>
            <button
              className="btn btn-lg btn-primary btn-block text-center"
              onClick={this.updateCompanyInfo}
            >
              Save
            </button>
            <button
              className="btn btn-secondary btn-lg btn-block active"
              onClick={this.edit_info}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    );
  };
  renderDefaultCompanyView = () => {
    // const url='../../public/back2.jpg'
    return (
      <div
        className="container"
        style={{ position: "relative", minHeight: "100vh"   }}
      >
        <br />
        <br />

        <div className="row pt-10">
          <div className="col-5">
            <div onDoubleClick={this.edit_info}>
              <img
                alt=""
                style={{ width: "100%", height: "100%" }}
                src={this.state.companyInfo.img_path}
              ></img>
              <br></br>
              <br></br>
              <span className="list-group-item" style={{ color: "#EC7063" }}>
                <b>About Us</b> :
              </span>
              <span className="list-group-item">
                {" "}
                {this.state.companyInfo.comp_description}
              </span>
            </div>
          </div>

          <div className="col-3  form-group">
            <div
              class="form-control "
              style={{ marginTop: "40%" }}
              onDoubleClick={this.edit_info}
            >
              {" "}
              comp name
              {this.state.companyInfo.name}
            </div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <div className="  row " style={{ width: "50rem" }}>
              <div
                className=" col-md-10  list-group-item"
                onDoubleClick={this.edit_info}
              >
                <span style={{ color: "#EC7063" }}>
                  <b>Website :&nbsp;&nbsp; &nbsp;</b>{" "}
                </span>
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href={this.state.companyInfo.website}
                >
                  {this.state.companyInfo.website}
                </a>
              </div>

              <div
                className="col-md-10  list-group-item"
                onDoubleClick={this.edit_info}
              >
                <span style={{ color: "#EC7063" }}>
                  {" "}
                  <b>We Are In: &nbsp; </b>
                </span>
                {this.state.companyInfo.city}
              </div>

              <div
                className="col-md-10 list-group-item"
                onDoubleClick={this.edit_info}
              >
                <span style={{ color: "#EC7063" }}>
                  <b>Location</b> :&nbsp; &nbsp;{" "}
                </span>
                {this.state.companyInfo.location}
              </div>

              <div
                className="col-md-10 list-group-item"
                onDoubleClick={this.edit_info}
              ></div>
            </div>
          </div>
        </div>

        <br></br>

        <div class="card-body">
          <small class=" col-md-10 offset-md-1 text-muted">
            Last updated 3 mins ago
          </small>
        </div>
      </div>
    );
  };

  render() {
    const { traineeInfo, companyInfo } = this.state;
    if (this.state.userid === undefined) {
      return <div> You Can't View this</div>;
    }

    if (traineeInfo !== null) {
      return this.state.isInEdit
        ? this.renderEditTraineeView()
        : this.renderDefaultTraineeInfo();
    }
    if (companyInfo !== null) {
      return this.state.isInEdit
        ? this.renderEditCompanyInfo()
        : this.renderDefaultCompanyView();
    }

    return <div></div>;
  }
}

export default userProfilePage;
