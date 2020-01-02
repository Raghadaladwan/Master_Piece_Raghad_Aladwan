const express = require("express");
const cors = require("cors");
const DB = require("./db");
const app = express();
const path = require("path");
var bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

app.use(express.json());
app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", (req, res) => {
  res.json(`SERVER WORKING`);
});

// ____________________________________________Login User

app.post("/loginUser", (request, res) => {
  let email_Password = request.body;
  // console.log(email_Password);
  DB.checkUserLogin(user => {
    res.json(user);
  }, email_Password);
});

// ____________________________________________Trainee Register
app.post("/traineeregister", (req, res) => {
  let box = req.body.newUser;
  DB.registTrainee(tr => {
    res.json(tr);
  }, box);
});

app.post("/companyregister", (req, res) => {
  let box = req.body.newCompany;
  DB.registCompany(response => {
    res.json(response);
  }, box);
});

// __________________________________________Get Trainee
app.get("/getUser/:id", (req, res) => {
  DB.getUser(result => {
    res.json(result);
  }, req.params.id);
});
//____________________________________Profile
app.get("/profile/:id", (req, res) => {
  DB.profileInfo(result => {
    res.json(result);
  }, req.params.id);
});

//______________________________________ ADD GET Post

app.put("/add_post/:id", (req, res) => {
  let box = req.body;
  DB.addPost(
    response => {
      res.send(response);
    },
    box,
    req.params.id
  );
});

app.put("/EditTraineeProfile/:id", (req, res) => {
  DB.EditTraineeProfile(
    response => {
      res.send(response);
    },
    req.body,
    req.params.id
  );
});

app.put("/EditCompanyProfile/:id", (req, res) => {
  DB.EditCompanyProfile(
    response => {
      res.send(response);
    },
    req.body,
    req.params.id
  );
});

app.get("/copmany_posts/:id", (req, res) => {
  DB.companyPosts(result => {
    res.json(result);
  }, req.params.id);
});


app.get('/all_posts/:id',(req,res)=>{
  DB.allPosts(result=>{
    res.json(result)
  }, req.params.id)
})

app.post('/getCompanyInfo/:id',(req,res)=>{
  DB.getCompanyInfo(result=>{
    res.json(result)
  }, req.params.id)

})


app.delete("/delete_Post/:id_company/:id_post", (req, res) => {
  // console.log("CALL BACK FROM SERVER  DELETE");
  // console.log("req.params.id_company", req.params.id_company);
  // console.log("req.params.id_post", req.params.id_post);
  DB.deletePost(
    result => {
      res.json(result);
    },
    req.params.id_company,
    req.params.id_post
  );
});












app.post("/traineeRequest/:id_trainee/:id_post", (req,res)=>{
  console.log("Trainee",req.params.id_trainee)
  console.log("post",req.params.id_post)
  DB.newRequest(result=>{

    res.json(result)
  }, req.params.id_trainee, )
})
















const PORT = 9000;
app.listen(PORT, () => console.log(`Server listening to ${PORT}`));

// __________________________________________________________________________

// app.use(bodyParser.json())
// app.use(cors())
// app.use(
//   bodyParser.urlencoded({
//     extended: false
//   })
// )
