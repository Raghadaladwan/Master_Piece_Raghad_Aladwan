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
  let email_Password_Role = request.body;
  DB.checkUserLogin(user => {
    res.json(user);
  }, email_Password_Role);
});

// ____________________________________________Trainee Register
app.post("/traineeregister", (req, res) => {
  let box = req.body.newUser;
  // console.log("/traineeregister", box)
  DB.registTrainee(tr => {
    res.json(tr);
  }, box);
});


app.post("/companyregister", (req, res) => {
  let box = req.body.newCompany;
  // console.log("/companyregister", box)
  DB.registCompany(response => {
    res.json(response);
  }, box);
});

// __________________________________________Get Trainee
app.get('/getUser/:id', (req, res) => {

  DB.getUser(result => {
    res.json(result)
  },req.params.id);
});
//____________________________________Profile
app.get('/profile/:id' , (req ,res)=>{
  // console.log("// Porfile //",req.params.id)
  DB.profileInfo(result=>{
    res.json(result);

  } , req.params.id)

} )



//________________________________ ADD GET Post

app.put('/add_post/:id' , (req,res)=>{
  let box = req.body;
console.log(req.params.id)
  DB.addPost((response)=>{res.send(response)},box ,req.params.id);
})

app.get('/copmany_posts/:id' , (req,res)=>{
  // console.log("/company_posts/:id", req.params.id)
  DB.companyPosts(result =>{
    res.json(result);
  }, req.params.id)
})


app.delete("/delete_Post/:id_company/:id_post", (req, res) => {
  console.log("CALL BACK FROM SERVER  DELETE");
  console.log("req.params.id_company",req.params.id_company)
  console.log("req.params.id_post",req.params.id_post)
  DB.deletePost(
    result => {
      res.json(result);
    },
    req.params.id_company,
    req.params.id_post
  );
});
// app.get('/posts',(req,res)=>{
//   DB.getPosts(res =>{
//     console.log("///Posts get post server");
//     res.json(res);
//   })
// })
//_____________________________




// app.get('postspage/:id', (req ,res)=>{
//   DB.getPosts((response)=>{ res.send(response)}, req.params.id)
// })





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

