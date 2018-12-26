var express = require('express');
var router = express.Router();
var BookStudentDB= require('../db/bookstudentDB');

//查询所有记录
router.get('/findAll',(req,res)=>{
    BookStudentDB.findAll().then((data)=>{
        res.send(data);
    }).catch((error)=>{
        res.send(error);
    });
});
// 学生查询借阅记录
router.get('/studentRecord',(req,res)=>{
    BookStudentDB.findRecords(req.query.username).then((data)=>{
        console.log(data);
        res.send(data);
    }).catch((error)=>{
        res.send(error);
    });
});
// 模糊查询(书名)
router.get('/queryBook',(req,res)=>{
    BookStudentDB.queryBook(req.query.keys).then((data)=>{
        console.log(data);
        res.send(data);
    }).catch((error)=>{
        res.send(error);
    });
});
// 模糊查询(学号)
router.get('/queryStudent',(req,res)=>{
    BookStudentDB.queryStudent(req.query.keys).then((data)=>{
        res.send(data);
    }).catch((error)=>{
        res.send(error);
    });
});
// 管理员增加借还书记录
router.post('/save',(req,res)=>{
    let bookstudent={
        Id:null,
        Book_num:req.body.Book_num,
        Student_code:req.body.Student_code, 
        borrow_date:req.body.borrow_date.slice(0,10),
        return_date:req.body.return_date.slice(0,10)
    };
    BookStudentDB.save(bookstudent).then((data)=>{
        res.send(data);
    }).catch((error)=>{
        console.log(error);
        res.send(error);
    });
});
// 管理员删除借还书记录
router.post('/deleterecord',(req,res)=>{
    var id=req.body.id;
    console.log('ID='+id);
    BookStudentDB.deleteRecord(id).then((data)=>{
        console.log(data);
        res.send(data);
    }).catch((error)=>{
        console.log(error);
        res.send(error);
    });
});
// 学生增加借还书记录
router.post('/addrecord',(req,res)=>{
    let bookstudent={
        Id:null,
        Book_num:req.body.Book_num,
        Student_code:req.body.Student_code,
        borrow_date:req.body.borrow_date.slice(0,10),
        return_date:req.body.return_date.slice(0,10)
    };
    BookStudentDB.save1(bookstudent).then((data)=>{
        res.send(data);
    }).catch((error)=>{
        console.log(error);
        res.send(error);
    });
});
// 管理员修改借还书记录
router.post('/update',(req,res)=>{
    let bookstudent={
        Id:req.body.Id,
        return_date:req.body.return_date.slice(0,10)
    };
    console.log(bookstudent);
    BookStudentDB.update(bookstudent).then((data)=>{
        res.send(data);
    }).catch((error)=>{
        console.log(error);
        res.send(error);
    });
});
// 学生归还图书
router.post('/returnbook',(req,res)=>{
    var name=req.body.name;
    var id=req.body.id;
    console.log('学号'+name,'ID'+id);
    BookStudentDB.returnBook(id,name).then((data)=>{
        console.log(data);
        res.send(data);
    }).catch((error)=>{
        console.log(error);
        res.send(error);
    });
});

module.exports=router;