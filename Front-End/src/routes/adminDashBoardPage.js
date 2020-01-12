import React, { Component } from "react";
// import axios from "axios";
import axios from 'axios';
import cookie from "react-cookies";
import AllRequestsComponent from '../component/allRequestsComponent'
import AcceptedOrRejected from '../component/acceptedOrRejected'


class adminDashBoardPage extends Component {
  state = {
    tranineeRequest:null,
    companyRequests:null,
    
   
  };

  componentDidMount=()=>{

    axios
    .get(`http://localhost:9000/getUser/${cookie.load("isLoggedIn")._id}`)

    .then(response => {
      if (response.data.role === "company") {
       
        this.getAllTraineeRequests()
      }
      if (response.data.role === "trainee") {
        this.setState({
          tranineeRequest: response.data
        });

       
      }
    })
    .catch(() => {
      console.log("ERROR");
    });
    
  }


  getAllTraineeRequests=()=>{
    axios
       .get(`http://localhost:9000/getAllTraineeRequests/${cookie.load("isLoggedIn")._id}`)
    .then(response =>{
      console.log('response>>>>>>>>>>', response.data)
      cookie.load("isLoggedIn").role ==="company"? 
      this.setState({
        companyRequests : response.data
      })
      : this.setState({ 
        tranineeRequest: response.data
      })
    })
    
  }

  






  CompanyRequests=()=>{

   return(
     <div>
        {this.state.companyRequests.map(requests=>{
          return(
            <AllRequestsComponent 
            key={requests._id}
            companyRequests={requests} />
          );

        })}
        </div>
   );
      
     
    
  }
  TranineeRequest =()=>{
    return(
    <div>Trainee
      {/* <h1>{this.state.tranineeRequest.Accepted}</h1> */}
    </div>

      );

  }
  render() {

    return this.state.companyRequests ?
    this.CompanyRequests()
    :this.TranineeRequest()
  }
}

export default adminDashBoardPage;
