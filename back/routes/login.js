var express = require('express');
var router = express.Router();
var loginDB = require('../db/loginDB');

// 查找用户名和密码
router.post('/selectUser',(req,res)=>{
    var name=req.body.username;
    var pass=req.body.password;
    console.log(name);
    console.log(pass);
    loginDB.select_name(name).then((data)=>{
        console.log(data[0]);
        if(data[0] == undefined){
            console.log('error');
            res.send('-1');
        }else if(data[0] != undefined){
            loginDB.select_password(name).then((data)=>{
                console.log(data[0].password);
                if(data[0].password != pass){
                    console.log('error');
                    res.send('0');
                }else if(name == 'admin'){
                    res.send('1')
                    console.log('管理员登录');
                }else {
                    res.send('ok');
                    console.log('学生登录');
                }
            }).catch((error)=>{
                res.send(error);
            });
            }
    }).catch((error)=>{
        res.send(error);
    });
});

module.exports= router;