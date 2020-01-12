const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/trainee-future", {
  useNewUrlParser: true
});
const db = mongoose.connection;
db.on("error", function() {
  console.log("mongoose connection error");
  console.log("____________________________");
});
db.once("open", function() {
  console.log("mongoose connected successfully");
  console.log("____________________________");
});

// mongoose.connect('mongodb+srv://Raghad:Raghad997*@traineefuture-f1aub.mongodb.net/test?retryWrites=true&w=majority',{useNewUrlParser:true})
// .then( () => {
//    console.log('Connection to the Atlas Cluster is successful!')
//  })
//  .catch( (err) => console.error(err));

// const db = mongoose.connection;
// db.on("error", function() {
//   console.log("mongoose connection error");
//   console.log("____________________________");
// });
// db.once("open", function() {
//   console.log("mongoose connected successfully");
//   console.log("____________________________");
// });
//____________________________________________________ALL SCHEMA

let trainee = new mongoose.Schema({
  fullName: String,
  email: String,
  gender: String,
  university: String,
  password: String,
  img_path: String,
  field: String,
  role: String
});

let companies = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  website: String,
  city: String,
  location: String,
  comp_description: String,
  img_path: String,
  field: String,
  role: String,
  post: [
    {
      img_path: String,
      job_description: String,
      field: String,
      from_Date: String,
      to_Date: String,
      comments: [{ body: String }]
      //**************************************** */ btn:String
    }
  ],
  traineeRequests: [
    {
      userID: String,
      postID: String,
      Accepted: Boolean,
      field: String,
      img_path: String,
      fullName: String,
      university: String,
      btn: String
    }
  ]
});

let owner = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String
});

//____________________________________________________END ALL SCHEMA

let Trainee = mongoose.model("trainees", trainee);
let Companies = mongoose.model("companies", companies);
let Owner = mongoose.model("owner", owner);

// _______________________________________________Check User Login
let checkUserLogin = (callBack, userInfo) => {
  // shoud put if condition for role to serch in collection
  // console.log(userInfo);

  Trainee.findOne(
    {
      email: userInfo.email,
      password: userInfo.password
    },
    { _id: 1, role: 1 },
    (error, trainee_response) => {
      if (error) {
        console.log(error);
      } else if (trainee_response != null) {
        callBack(trainee_response);
      } else {
        Companies.findOne(
          {
            email: userInfo.email,
            password: userInfo.password
          },
          { _id: 1, role: 1 },
          (error, company_response) => {
            if (error) {
              callBack("User Dosent exists ", null);
            } else if (company_response !== null) {
              callBack(company_response);
            } else {
              callBack("Not a User");
            }
          }
        );
      }
    }
  );
};

let getTrainee = callBack => {
  Trainee.find({}, function(error, trainee) {
    if (error) {
      // console.log("ERR:", error);
      callBack(err);
    } else {
      callBack(trainee);
    }
  });
};

let getCompany = callBack => {
  Companies.find({}, function(error, company) {
    if (error) {
      // console.log("ERROR:", error);
      callBack(error);
    } else {
      // console.log("company", company);
      callBack(company);
    }
  });
};

let registTrainee = (callBack, newTraineeInfo) => {
  Trainee.insertMany(
    [
      {
        fullName: newTraineeInfo.fullName,
        email: newTraineeInfo.email,
        password: newTraineeInfo.password,
        gender: newTraineeInfo.gender,
        university: newTraineeInfo.university,
        img_path: newTraineeInfo.img_path,
        field: newTraineeInfo.field,
        role: newTraineeInfo.role
      }
    ],
    function(error, New) {
      if (error) {
        console.log("ERR:", error);
      }
      getTrainee(callBack);
    }
  );
};

let registCompany = (callBack, newCompanyInfo) => {
  Companies.insertMany(
    [
      {
        name: newCompanyInfo.companyName,
        email: newCompanyInfo.email,
        password: newCompanyInfo.password,
        website: newCompanyInfo.website,
        city: newCompanyInfo.city,
        location: newCompanyInfo.location,
        comp_description: newCompanyInfo.comp_description,
        img_path: newCompanyInfo.img_path,
        field: newCompanyInfo.field,
        role: newCompanyInfo.role
      }
    ],
    function(error) {
      if (error) {
        console.log("ERR:", error);
      }
      getCompany(callBack);
    }
  );
};

// ______________Get user object after login
let getUser = (callBack, id) => {
  // console.log(id)
  Trainee.findOne(
    { _id: id },
    { fullName: 1, img_path: 1, field: 1, university: 1, role: 1 },
    (error, trainee_response) => {
      if (error) {
        console.log(error);
      } else if (trainee_response != null) {
        // console.log(trainee_response)
        callBack(trainee_response);

        // shold CallBack trainee id , role , field JUST
      } else {
        Companies.findOne({ _id: id }, (error, company_response) => {
          if (error) {
            console.log(error);
          } else {
            // console.log(company_response);
            callBack(company_response);
          }
        });
      }
    }
  );
};

let profileInfo = (callBack, id) => {
  Trainee.findOne({ _id: id }, (error, trainee_info) => {
    if (trainee_info !== null) {
      callBack(trainee_info);
    } else {
      Companies.findOne({ _id: id }, (error, company_info) => {
        if (company_info !== null) {
          callBack(company_info);
        } else {
          console.log(error);
        }
      });
    }
  });
};

let addPost = (callBack, newPost, id) => {
  Companies.update(
    { _id: id },
    { $push: { post: newPost } },
    (error, response) => {
      if (error) {
        console.log("Error");
      } else {
        callBack(newPost);
      }
    }
  );
};

let companyPosts = (callBack, id) => {
  Companies.findOne({ _id: id }, (error, companyPosts) => {
    if (error) {
      console.log(error);
    } else {
      console.log("DB companyPost", companyPosts.post);

      callBack(companyPosts.post);
    }
  });
};

let getCompanyInfo = (callBack, id) => {
  Companies.findOne(
    { _id: id },
    {
      name: 1,
      email: 1,
      website: 1,
      img_path: 1,
      city: 1,
      comp_description: 1,
      location: 1,
      _id: 0
    },
    (error, companyInfo) => {
      if (error) {
        console.log(error);
      } else {
        callBack(
          // ********************* All things in CallBack WARNING
          companyInfo
        );
      }
    }
  );
};

//-----------------------------------------------
let newTraineeRequest = (callBack, newRequest, id_company) => {
  // console.log("IN DATA BASE ID",id_company)
  // console.log("IN DATA BASE REQUEST",newRequest)
  // console.log("IN DATA BASE BTN",btn)

  Companies.updateOne(
    { _id: id_company },
    { $push: { traineeRequests: newRequest } },

    // ******************************Inner Post ubdate the post btn inner the same post Line 63
    (error, response) => {
      if (error) {
        console.log("Error");
      } else {
        console.log("trainee request data base");
        callBack(response);
        // console.log("Call back from new request",response);
        // console.log("IN DATA BASE")
      }
    }
  );
};

let checkTraineeRequest = (callBack, id_trainee, id_post, id_company) => {
  Companies.findOne(
    {
      _id: id_company,
      "traineeRequests.userID": id_trainee,
      "traineeRequests.postID": id_post
    },
    { _id: 0, "traineeRequests.btn": 1 },
    (error, resposne) => {
      callBack(resposne);
    }
  );
};





let getAllTraineeRequests = (callBack, id_user) => {
  console.log("user",id_user)

 Companies.findOne(
   {_id:id_user},
  {_id:0, traineeRequests:1},
  (error,allRequest)=>{
    if(error){
      console.log(error)
    }
    console.log("allRequest DATABASE ",allRequest.traineeRequests)
    callBack(allRequest.traineeRequests)
  }
  )

  
};





let getAcceptedOrNot = (callBack , id_user)=>{

  Companies.find({})

}




















//*********************** SORT  Field */
let allPosts = (callBack, field, id) => {
  // console.log("DATABASE",field)
  Companies.aggregate(
    [
      { $match: {} },
      { $unwind: "$post" },
      { $match: { "post.field": field.field } },

      {
        $group: {
          _id: "$_id",
          post: { $push: "$post" },
          traineeRequests: { $push: "$traineeRequests" }
        }
      }

      // {$sort : { total : -1}}
    ],
    function(error, allPosts) {
      if (error) {
        console.log("ERROR");
      } else {
        // console.log("ALL POSTS", allPosts)
        callBack(allPosts);
      }
    }
  );
};

let EditTraineeProfile = (callBack, newInfo, trainee_id) => {
  Trainee.updateMany(
    { _id: trainee_id },
    {
      $set: {
        fullName: newInfo.fullName,
        email: newInfo.email,
        password: newInfo.password,
        gender: newInfo.gender,
        img_path: newInfo.img_path,
        university: newInfo.university,
        field: newInfo.field
      }
    },
    (error, response) => {
      if (error) {
        console.log(error);
      } else {
        callBack(newInfo);
      }
    }
  );
};

let EditCompanyProfile = (callBack, newInfo, company_id) => {
  Companies.updateMany(
    { _id: company_id },
    {
      $set: {
        name: newInfo.name,
        email: newInfo.email,
        password: newInfo.password,
        website: newInfo.website,
        city: newInfo.city,
        location: newInfo.location,
        comp_description: newInfo.comp_description
        // img_path:
      }
    },
    (error, response) => {
      if (error) {
        console.log(error);
      } else {
        callBack(newInfo);
      }
    }
  );
};

let deletePost = (callBack, id_company, id_post) => {
  Companies.find({ _id: id_company }, (error, Doc) => {
    if (error) {
      console.log("ERROR");
    } else {
      Doc[0].post = Doc[0].post.filter(post => {
        return id_post !== post.id;
      });
      Doc[0].save(() => {
        callBack(id_company);
      });
    }
  });
};

module.exports = {
  checkUserLogin,
  registTrainee,
  getTrainee,
  getCompany,
  registCompany,
  getUser,
  profileInfo,
  addPost,
  companyPosts,
  deletePost,
  EditTraineeProfile,
  EditCompanyProfile,
  allPosts,
  getCompanyInfo,
  newTraineeRequest,
  getAllTraineeRequests,
  checkTraineeRequest,
  getAcceptedOrNot
};
