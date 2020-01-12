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
  let newUser = req.body.newUser;
  DB.registTrainee(response => {
    res.json(response);
  }, newUser);
});

app.post("/companyregister", (req, res) => {
  let newCompany = req.body.newCompany;
  DB.registCompany(response => {
    res.json(response);
  }, newCompany);
});

// __________________________________________Get Trainee
app.get("/getUser/:id", (req, res) => {
  // console.log("req",req.params.id)
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
  DB.addPost(
    response => {
      res.send(response);
    },
    req.body,
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

app.put("/all_posts/:id", (req, res) => {
  // console.log("ALL POST ",req.body)
  // console.log(field)
  DB.allPosts(
    result => {
      res.json(result);
    },
    req.body,
    req.params.id
  );
});

app.post("/getCompanyInfo/:id", (req, res) => {
  DB.getCompanyInfo(result => {
    res.json(result);
  }, req.params.id);
});

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

app.post(
  "/checkTraineeRequest/:id_trainee/:id_post/:id_company",
  (req, res) => {
    DB.checkTraineeRequest(
      response => {
        res.json(response);
      },
      req.params.id_trainee,
      req.params.id_post,
      req.params.id_company
    );
  }
);










app.get("/getAllTraineeRequests/:id_user", (req, res) => {
  console.log("request.params>>>>>>>>>>>>>", req.params.id_user);

  DB.getAllTraineeRequests(r => {
    res.json(r);
  }, req.params.id_user);
});




app.get('/getAcceptedOrNot/:id_user',(req,res)=>{

  console.log("request.params>>>>>>>>>>>>>", req.params.id_user);

  DB.getAcceptedOrNot(result =>{
    res.json(result)
  }, req.params.id_user)
  
})

































app.post("/traineeRequest/:id_company", (req, res) => {
  // console.log('req.body', req.body)
  // console.log('req.params', req.params.id_company)
  DB.newTraineeRequest(
    result => {
      res.json(result);
      console.log(result);
    },
    req.body,
    req.params.id_company
  );
});

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
