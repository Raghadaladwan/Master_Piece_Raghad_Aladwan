import { BrowserRouter, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import "@firebase/storage";
import cookie from "react-cookies";

//import routes
import LandingPage from "./routes/landingPage";
import PostsPage from "./routes/postsPage";
import CompanyInfo from "./routes/companyInfo";
import UserProfilePage from "./routes/userProfilePage";
import AdminDashBoardPage from "./routes/adminDashBoardPage";
import AboutUsPage from "./routes/aboutUsPage";
import RegisterPage from "./routes/registerPage";
import LoginPage from "./routes/loginPage";

//import components
import FooterComponent from "./component/footerComponent";
import HeaderComponent from "./component/headerComponent";


//initilize App class
class App extends React.Component {
  state = {
    cookieItem: cookie.load("isLoggedIn")
  };

  render() {


    if (this.state.cookieItem === undefined) {
      return (
        <>
          <BrowserRouter>
            <HeaderComponent />
            <Route exact path="/" component={LandingPage} 
            cookieItem={this.state} />

            <Route path="/loginpage" component={LoginPage}></Route>
            <Route path="/registerpage" component={RegisterPage}></Route>
            <Route path="/aboutUs" component={AboutUsPage}></Route>
            <FooterComponent />
          </BrowserRouter>
        </>
      );
    } else {
      return (
        <>
          <BrowserRouter>
            <HeaderComponent />
            <Route exact path="/" component={LandingPage} cookieItem={this.state} />
            <Route path="/admindashboardpage" component={AdminDashBoardPage} ></Route>
            <Route path="/loginpage" component={LoginPage}></Route>
            <Route path="/registerpage" component={RegisterPage}></Route>
            <Route path="/postspage" component={PostsPage} ></Route>
            <Route path="/CompanyInfo" component={CompanyInfo}></Route>
            <Route path="/userprofile" component={UserProfilePage}></Route>
            <Route path="/aboutUs" component={AboutUsPage}></Route>
            <FooterComponent />

          </BrowserRouter>
        </>
      );
    }
  }
}

export default App;


  /* <Router>
<HeaderComponent />

<Route path="/" exact component={LandingPage} />
<Route path="/about" component={AboutUsPage} />
<Route path="/postspage" component={PostsPage} />
<Route path="/postpage" component={PostPage} />
<Route path="/userprofilepage" component={UserProfilePage} />

<Route
  path="/admindashboardpage"
  component={props => (
    <AdminDashBoardPage
      {...props}
      user={this.state.user}
      checkLogin={this.checkLogin}
    />
  )}
/>

<Route
  path="/loginpage"
  component={props => (
    <LoginPage {...props} checkLogin={this.checkLogin} />
  )}
/>


<Route
  path="/registerpage"
  component={props => <RegisterPage {...props} />}
/>

<Route path="/postspage" component={PostsPage} />

<FooterComponent />
</Router> */
