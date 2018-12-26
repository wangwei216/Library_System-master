var express=require('express');
var router=express.Router();
var TopDB= require('../db/topDB');

//查询借阅书籍数量排行榜
router.get('/findTop',(req,res)=>{
    TopDB.findTop().then((data)=>{
        res.send(data);
    }).catch((error)=>{
        res.send(error);
    });
});

module.exports=router;