var express=require('express');
var router=express.Router();
var studentDB=require('../db/studentDB');

// 管理员查询所有学生信息
router.get('/findAll',(req,res)=>{
    studentDB.findAll().then((data)=>{
        res.send(data);
    }).catch((error)=>{
        res.send(error);
    })
})
// 查询学生信息
router.get('/findStudent',(req,res)=> {
    var name=req.query.username
    console.log(name);
    studentDB.findStudent(name).then((data)=> {
        console.log(data);
        res.send(data);
    }).catch((error)=> {
        res.send(error); 
    })
})
// 模糊查询
router.get('/query',(req,res)=>{
    studentDB.query(req.query.keys).then((data)=>{
      res.send(data);
    }).catch((error)=>{
      res.send(err);
    });
  })
//保存学生信息
router.post('/save',(req,res)=>{
    let student={
        Student_num:req.body.Student_num,
        Student_code: req.body.Student_code,
        Student_name: req.body.Student_name,
        Academy_name: req.body.Academy_name,
        Class_name: req.body.Class_name,
        Sex: req.body.Sex,
        Email: req.body.Email
    };
    studentDB.save(student).then((data)=>{
        res.send(data);
    }).catch((error)=>{
        res.send(error);
    })
})
// 管理员修改学生信息
router.post('/update',(req,res)=>{
    console.log('id'+req.body.Student_num);
    let student={
        Student_num: req.body.Student_num,
        Student_code: req.body.Student_code,
        Student_name: req.body.Student_name,
        Academy_name: req.body.Academy_name,
        Class_name: req.body.Class_name,
        Sex: req.body.Sex,
        Email: req.body.Email, 
    };
    studentDB.update(student).then((data)=>{
        console.log(data);
        res.send(data);
    }).catch((error)=>{
        res.send(error);
    })
})
// 修改学生信息
router.post('/updateinfo',(req,res)=>{
    console.log('学号'+req.body.Student_code);
    let student={
        Student_code: req.body.Student_code,
        Student_name: req.body.Student_name,
        Academy_name: req.body.Academy_name,
        Class_name: req.body.Class_name,
        Sex: req.body.Sex,
        Email: req.body.Email, 
    };
    studentDB.updateInfo(student).then((data)=>{
        console.log(data);
        res.send(data);
    }).catch((error)=>{
        res.send(error);
    })
})
// 删除学生信息
router.post('/batchDelete',(req,res)=>{
    var ids=req.body.ids;
    studentDB.batchDelete(ids).then((data)=>{
        console.log(data);
        res.send(data);
    }).catch((error)=>{
        res.send(error);
    })
})


module.exports=router;