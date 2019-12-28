import React, { Component } from "react";
import cookie from "react-cookies";
import axios from "axios";
import { async } from "@firebase/util";

class userProfilePage extends Component {
  state = {
    userid: cookie.load("isLoggedIn"),
    traineeInfo: null,
    companyInfo: null,
    isInEdit: false,
    progress: 0
  };

  componentDidMount() {
    console.log("this profile page userID", this.state.userid);
    axios
      .get(`http://localhost:9000/profile/${this.state.userid}`)
      .then(response => {
        if(response.data.role === "trainee")
        {
          this.setState({ traineeInfo : response.data})
        }
        if(response.data.role === "company"){
          this.setState({
            companyInfo: response.data
          })
        }
   
      })
  }


  // console.log(response.data)
  // if (response.data.role === "trainee") 
  // {
  //   this.setState({ traineeInfo: response.data }
  //   }
  //  if(response.data.role === "company") {
  //   this.setState({ companyInfo: response.data });
  //   console.log("object")
    
  // } 

  edit_info = () => {
    this.setState({
      isInEdit: !this.state.isInEdit
    });
  };

  updateTraineeInfo = async event => {
    event.preventDefault();
    console.log("in Update");

    const newTraineeInfo = {
      fullName: this.refs.fullName.value,
      email: this.refs.email.value,
      field: this.fieldType.value,
      password: this.refs.password.value,
      university: this.uniType.value,
      gender: this.state.traineeInfo.gender,
      img_path:this.state.traineeInfo.img_path
    };
    this.setState({
      isInEdit: false
    });
    await axios
      .put(
        `http://localhost:9000/EditTraineeProfile/${this.state.userid}`,
        newTraineeInfo
      )

      .then(response => {
        this.setState({
          traineeInfo: response.data
        });
      });

    console.log("this.state", this.state.traineeInfo);
  };

  updateCompanyInfo = async event=>{
    console.log(this.state.companyInfo)

    event.preventDefault();

    const newCompanyInfo ={
      companyName: this.refs.name.value,
      email: this.refs.email.value,
      password: this.refs.password.value,
      website: this.refs.website.value,
      city: this.refs.city.value,
      location: this.refs.location.value,
      comp_description: this.refs.comp_description.value,
      img_path: this.state.companyInfo.img_path
      

    }
    this.setState({
      isInEdit: false
    });
    console.log("newComp Info", newCompanyInfo)

    await axios
    .put(
      `http://localhost:9000/EditCompanyProfile/${this.state.userid}`,
      newCompanyInfo
    )

    .then(response => {
      this.setState({
        companyInfo: response.data
      });
    });

  console.log("this.state", this.state.companyInfo);
};

  


  renderEditTraineeView = () => {
    return (
      <div className="container">
        <div>
          <form 
          onSubmit={this.updateTraineeInfo}
          ref={form => this.form = form}>
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

                <option value="Al al-Bayt University">Al al-Bayt University</option>
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

  renderEditCompanyInfo =()=>{
    return (
      <div className="container">
        <div>
          <form 
          onSubmit={this.updateCompanyInfo}
          ref={form => this.form = form}>
            <h1 className="h3 mb-3 font-weight-normal">
       
              Edit your Information
            </h1>
     
            <div className="form-group">
              <label>Company Name : </label>
              <input
                type="text"
                name="name"
                defaultValue={this.state.companyInfo.name}
                ref="name"
              />
            </div>
            <div className="form-group">
              <label>Email : </label>
              <input
                type="text"
                name="email"
                defaultValue={this.state.companyInfo.email}
                ref="email"
              />
            </div>
            <div className="form-group">
              <label>City : </label>
              <input
                type="text"
                name="city"
                defaultValue={this.state.companyInfo.city}
                ref="city"
              />
            </div>
            <div className="form-group">
              <label>Location : </label>
              <input
                type="text"
                name="location"
                defaultValue={this.state.companyInfo.location}
                ref="location"
              />
            </div>
            <div className="form-group">
              <label>Website : </label>
              <input
                type="text"
                name="website"
                defaultValue={this.state.companyInfo.website}
                ref="website"
              />
            </div>
            <div className="form-group">
              <label>Password : </label>
              <input
                type="password"
                name="password"
                defaultValue={this.state.companyInfo.password}
                ref="password"
              />
            </div>
            <div className="form-group">
              <label>About Company  : </label>
              <textarea
                type="password"
                name="comp_description"
                defaultValue={this.state.companyInfo.comp_description}
                ref="comp_description"
              />
            </div>

            <button onClick={this.edit_info}>Cancel</button>

            <button onClick={this.updateCompanyInfo}>Save</button>
          </form>
        </div>
      </div>
    )
  }
  renderDefaultCompanyView = () => {
    return (
      <div>
        
         <div onDoubleClick={this.edit_info}>
          <span>Company Name : </span>
          {this.state.companyInfo.name}
        </div>
        <div onDoubleClick={this.edit_info}>
          <span>Website : </span>
         <a 
         href={this.state.companyInfo.website}  
         target="_blank"> {this.state.companyInfo.website}</a>
        </div>
        <div onDoubleClick={this.edit_info}>
          <span>City: </span>
          {this.state.companyInfo.city}
        </div>

        <div onDoubleClick={this.edit_info}>
          <span>location : </span>
          {this.state.companyInfo.location}
        </div>

        <div onDoubleClick={this.edit_info}>
          <span> About Company : </span>
          {this.state.companyInfo.comp_description}
        </div>

        <div onDoubleClick={this.edit_info}>
          <span>Your image : </span>
          <img
            alt=""
            style={{ width: 150, height: 150 }}
            src={this.state.companyInfo.img_path}
          ></img>
        </div> 
       </div>
    );
  };




  render() {
    const { traineeInfo, companyInfo } = this.state;
    if (cookie.load("isLoggedIn") === undefined) {
      return <div> You Can't View this</div>;
    }

    if (traineeInfo !== null) {
      return this.state.isInEdit
        ? this.renderEditTraineeView()
        : this.renderDefaultTraineeInfo()
    }
if(companyInfo !== null){
  return this.state.isInEdit
  ? this.renderEditCompanyInfo()
  : this.renderDefaultCompanyView()
}
    
    return<div>company</div>
  //   if (companyInfo !== null) {
  // return<div>company</div>
      // return (
      //   <div>
      //     <div>{companyInfo.email}</div>
      //     <div>{companyInfo.city}</div>
      //     <div>
      //       <img
      //         alt=""
      //         style={{ width: 150, height: 150 }}
      //         src={companyInfo.img_path}
      //       ></img>
      //     </div>
      //     <div>{companyInfo.location}</div>
      //     <div>{companyInfo.name}</div>
      //     <div>{companyInfo.website}</div>
      //     <div>
      //       <button onClick={edit_company_info}>Edit</button>
      //     </div>
      //   </div>
      // );
    // }

    // return <div>Out if</div>;
    // return<div>{userProfile.email}</div>
  }
}

export default userProfilePage;
