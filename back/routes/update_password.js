var express = require('express');
var router = express.Router();
var updatePassDB = require('../db/loginDB')

router.post("/updatepassword",(req,res)=>{
    var name=req.body.username;
    var pass=req.body.password;
    console.log(name);
    console.log(pass);
    updatePassDB.update_password(name,pass).then((data)=>{
        res.send(data);
        console.log(data);
    }).catch((error)=>{
        res.send(error);
    })
  });

  module.exports = router;