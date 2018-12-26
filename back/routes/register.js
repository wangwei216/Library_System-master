var express=require ('express');
var router=express.Router();
var registerDB = require('../db/registerDB');

router.post('/adduser',(req,res)=>{
    var name=req.body.username;
    var pass=req.body.password;
    var student={      
        Student_code: req.body.username,
        Student_name: req.body.Student_name,
        Academy_name: req.body.Academy_name,
        Class_name: req.body.Class_name,
        Sex: req.body.Sex,
        Email:req.body.Email
    };
    console.log(name);
    console.log(pass);
    registerDB.select_name(name).then((data)=> {
        if(data[0] != undefined) {
            res.send('-1');
        }else {
            registerDB.insert_user(name,pass).then((data)=> {
                console.log(data);
                registerDB.insert_student(student).then((data)=> {
                    console.log(data);
                    res.send(data);
                }).catch((error)=>{
                    res.send(error);
                });
            }).catch((error)=>{
                res.send(error);
            });          
        }
    }).catch((error)=>{
        res.send(error);
    })
})

module.exports = router;