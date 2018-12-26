var express = require('express');
var router = express.Router();
var bookTypeDB= require('../db/bookTypeDB');

//查询所有书籍
router.get('/findAll',(req,res)=>{
    bookTypeDB.findAll().then((data)=>{
        res.send(data);
    }).catch((error)=>{
        res.send(error);
    });
});
 
module.exports=router;