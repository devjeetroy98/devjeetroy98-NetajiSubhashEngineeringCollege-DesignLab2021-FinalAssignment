var express = require('express');
var crypto = require('crypto');
const User = require('../schema/authSchema');
const Profile = require('../schema/profile');
const bcrypt = require('bcrypt');
var multer  = require('multer');
var uuid = require('uuid');
var fs = require("fs");
var router = express.Router();


const storage = multer.diskStorage({
  destination: (req,file,cb) =>{

    // Different paths to save different kinds of files
    const pathsToCheck = ['public/images/pictures','public/images/others'];
    for(let i = 0; i< pathsToCheck.length; i ++){
      // If any path, doesn't exist, create the folder
      if(!fs.existsSync(pathsToCheck[i])){
        fs.mkdir(pathsToCheck[i], { recursive: true }, (err) => {
          if (err) throw err;
        });
      }
    }
        if(file.mimetype.startsWith("image/")){
          cb(null, 'public/images/pictures')
        } else{
          cb(null, 'public/images/others')
        }    
  },
  filename : (req, file, cb)=>{
    cb(null, file.originalname)
  }
})


var upload = multer({ storage: storage})



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/signup', function(req, res, next) {
  var msg = undefined;
    var { username, email, password } = req.body
    // Check if all the fields ae properly filled
    if (!email || !username || !password) {
      msg = "Please fill all the details.";
      res.json({
        "Status": msg,
        "User" : null
      })
    }
    else if (typeof msg == 'undefined') {
      User.findOne({ email: email }, function (err, data) {
        if (err) throw err;
        if (data) {
          msg = "User already exist, try to login.";
          res.json({
            "Status": msg,
            "User" : null
          })
        } else {
                bcrypt.hash(password, "$2b$10$5FVaEKP7y7yTmmI6vgPNXe", (err, hash) => {
                    if (err) throw err;
                    password = hash;
                    User({
                        username,
                        email,
                        password,
                    }).save((err, data) => {
                        if (err) throw err;
                        msg = "User registered successfully.";
                        res.json({
                          "Status": msg,
                          "User" : data
                        })
                    });
                });
        }
    });
    }
  });


router.post("/login",(req,res,next)=>{
  var { email, password } = req.body
    bcrypt.hash(password, "$2b$10$5FVaEKP7y7yTmmI6vgPNXe", (err, hash) => {
        if (err) throw err;
        password = hash;
        console.log(password)
        User.findOne({ email: email, password: password}, (err, data)=>{
          if(err) throw err
          if(data){
            msg = "User loggedin successfully.";
                        res.json({
                          "Status": msg,
                          "User" : data
                        })
          }else{
            msg = "Credentials don't match.";
                        res.json({
                          "Status": msg,
                          "User" : null
                        })
          }
        })
    });
});

router.get("/get-profile",(req,res,next)=>{
  Profile.find({},(err,data)=>{
    if(err) throw err
    res.json({
      payload : data
    })
  })
})

router.post('/add', upload.fields([{
  name: 'picture', maxCount: 1
}]) , function(req, res, next) {

  var { name, email, dob } = req.body
  var profile = req.files.picture[0].filename
    Profile({
      profile,
      name,
      email,
      dob,
  }).save((err, data) => {
      if (err) throw err;
      msg = "Profile inserted successfully.";
      res.json({
        "Status": msg,
        "Profile" : data
      })
  });
})
module.exports = router;
