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
      from_Date: Date,
      to_Date: Date,
      comments: [{ body: String }]
    }
  ]
});

let owner = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,

  LandingPageTopContant: String,
  LandingPageSecondContant: String
});

//____________________________________________________END ALL SCHEMA

let Trainee = mongoose.model("trainees", trainee);
let Companies = mongoose.model("companies", companies);
let Owner = mongoose.model("owner", owner);

// _______________________________________________Check User Login
let checkUserLogin = (callBack, userInfo) => {
  // shoud put if condition for role to serch in collection

  if (userInfo.role === "trainee") {
    Trainee.findOne(
      {
        email: userInfo.email,
        password: userInfo.password,
        role: userInfo.role
      },
      function(err, traineeInfo) {
        if (err) {
          console.log("ERR:", err);
        } else {
          console.log("DOCS trainee:", traineeInfo);
          callBack(traineeInfo._id);
        }
      }
    );
  }
  if (userInfo.role === "company") {

    Companies.findOne(
      {
        email: userInfo.email,
        password: userInfo.password,
        role: userInfo.role
      },
      function(err, copmanyInfo) {
        if (err) {
          
          console.log("ERR:", err);
        } else {
          
          console.log("DOCS Company:", copmanyInfo._id);
          callBack(copmanyInfo._id);
        }
      }
    );
  }
};

let getTrainee = cb => {
  // console.log("INNER GET TRAINEE >>>>>>>>");
  Trainee.find({}, function(err, docs) {
    if (err) {
      console.log("ERR:", err);
      cb(err);
    } else {
      console.log("DOCS FROM getTrainee:", docs);
      cb(docs);
    }
  });
};

let getCompany = cb => {
  console.log("INNER GET Company>>>>>>>>");
  Companies.find({}, function(err, docs) {
    if (err) {
      console.log("ERR:", err);
      cb(err);
    } else {
      console.log("DOCS FROM get company:", docs);
      cb(docs);
    }
  });
};

let registTrainee = (cb, box) => {
  Trainee.insertMany(
    [
      {
        fullName: box.fullName,
        email: box.email,
        password: box.password,
        gender: box.gender,
        university: box.university,
        img_path: box.img_path,
        field: box.field,
        role: box.role
      }
    ],
    function(err, New) {
      if (err) {
        console.log("ERR:", err);
      }
      getTrainee(cb);
    }
  );
};

let registCompany = (cb, box) => {
  Companies.insertMany(
    [
      {
        name: box.companyName,
        email: box.email,
        password: box.password,
        website: box.website,
        city: box.city,
        location: box.location,
        comp_description: box.comp_description,
        img_path: box.img_path,
        field: box.field,
        role: box.role
      }
    ],
    function(err, New) {
      if (err) {
        console.log("ERR:", err);
      }
      console.log("NEWrecooooooooord:", New);
      getCompany(cb);
    }
  );
};

// _______Get user object after login
let getUser = (callBack, id) => {
  console.log("id", id);

  Trainee.findOne({ _id: id }, (error, trainee_response) => {
    if (error) {
      console.log(error);
    } else if (trainee_response != null) {
      callBack(trainee_response);
      // console.log("DB getUse Trainee >>>>>>>>>>>", trainee_response);
    } else {
      Companies.findOne({ _id: id }, (error, company_response) => {
        if (error) {
          console.log(error);
        } else {
          callBack(company_response);
 
        }
      });
    }
  });
};

let profileInfo = (callBack, id) => {
  // console.log("id DB ////", id);
  console.log("callBack", id);


  // Trainee.count({_id:id}, function(error, trainee_info){
  //   console.log(count)
  //   if(count>0){
  //     console.log("TRAINEE")
  //     callBack(trainee_info)
  //   } else if( error)
  //   {
  //     console.log(error)
  //   }
  //   else{

  //     Companies.count({_id:id}, function(error,company_info){
  //       console.log(count)
  //       if(count>0){
  //         console.log("COMPANYIES")
  //         callBack(company_info)
  //       } else if (error){
  //         console.log(error)
  //       }
  //     })
  //   }
  // })  
  // Trainee.count({})


  Trainee.findOne({ _id: id }, (error, trainee_info) => {
    console.log("tranee Info", trainee_info)

    if (trainee_info !== null) {
      // console.log(error);

      console.log("tranee Info", trainee_info)

      callBack(trainee_info);

    } else  {
      console.log("FFFFFFFFFFFFFFFFFFF")
      console.log(id)
      Companies.findOne({ _id: id }, (error, company_info) => {
        if (company_info !==null) {
          callBack(company_info);
          console.log(company_info)
        } else {
          console.log(error);

          // console.log("DB company profile COMPANY >>>>>>>>>>>", company_info);
        }
      });
    }
    
  });
  // Trainee.findOne({ _id: id }, (error, trainee_info) => {
  //   if (error) {
  //     console.log(error);
  //   } else if (trainee_info != null) {
  //     callBack(trainee_info);
  //     // console.log("DB trainee profile Trainee >>>>>>>>>>>", trainee_info);
  //   } else {
  //     Companies.findOne({ _id: id }, (error, company_info) => {
  //       if (error) {
  //         console.log(error);
  //       } else {
  //         callBack(company_info);
  //         // console.log("DB company profile COMPANY >>>>>>>>>>>", company_info);
  //       }
  //     });
  //   }
  // });
};

let addPost = (callBack, newPost, id) => {
  Companies.update(
    { _id: id },
    { $push: { post: newPost } },
    (error, response) => {
      if (error) {
        console.log("Error");
      } else {
        console.log("newPost",newPost)
        callBack(newPost);
        console.log("callBAck",response)
      }
    }
  );
};

let companyPosts = (callBack , id)=>{
  // console.log("DATA BASE COPMANY POST " ,);

  Companies.findOne({_id : id }, (error , companyPosts)=>{
    if(error){
      console.log(error)
    } else {

      console.log("DB companyPost", companyPosts.post);

      callBack(companyPosts.post);
    }
  })

}

let EditTraineeProfile = (callBack ,newInfo ,trainee_id)=>{
  console.log("newInfo Database", newInfo)
  Trainee.updateMany(
    {_id:trainee_id},
    {$set :{
      fullName: newInfo.fullName,
      email: newInfo.email,
      password:newInfo.password,
      gender: newInfo.gender,
      img_path: newInfo.img_path,
      university:newInfo.university,
      field:newInfo.field
    }},
    (error, response)=>{
      if(error){
        console.log(error)
      } else {
        console.log("response from DB",response)
        callBack(newInfo);
      }
    }
  )

}

let deletePost = (callBack , id_company , id_post)=>{

  Companies.find({_id :id_company}, (error , Doc)=>{
    if(error){
      console.log("ERROR")
    } else {
      Doc[0].post = Doc[0].post.filter(post =>{
        return id_post !== post.id;
      })
      Doc[0].save(()=>{
        callBack(id_company);
      })
    }
  })
}



// let editOne = ( cb , ID )=>{
  
//   console.log('edit :', ID);

//    Tasks.findById(ID , (x,y)=>{
//     let updateStatus = !y.isCompleted;

//     Tasks.updateOne({_id:ID},{ isCompleted: updateStatus},(err,Edit)=>{
//       if(err){console.log(err);}
//       console.log('Edit', Edit)
//       getTasks(cb)
//     })
//   })

// }

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
  EditTraineeProfile
};
