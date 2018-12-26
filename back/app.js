require('babel-polyfill');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var bookRouter= require('./routes/bookRouter');
var studentRouter= require('./routes/studentRouter');
var bookstudentRouter= require('./routes/bookstudentRouter');
var bookTypeRouter= require('./routes/bookTypeRouter');
var loginRouter=require('./routes/login');
var registerRouter=require('./routes/register');
var passwordRouter=require('./routes/update_password');
var topRouter=require('./routes/topRouter');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//设置跨域访问
app.all('*',function(req,res,next) {
  res.header("Access-Control-Allow-Origin","*");//包含本域地址
  res.header("Access-Control-Allow-Headers", "X-PINGOTHER,Content-type,X-Requested-With,Authorization");  
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");  
  res.header("X-Powered-By",' 3.2.1')  
  res.header("Content-Type", "application/json;charset=utf-8");  
  next();  
})

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/book',bookRouter);
app.use('/student',studentRouter);
app.use('/bookstudent',bookstudentRouter);
app.use('/booktype',bookTypeRouter);
app.use('/login',loginRouter);
app.use('/register',registerRouter);
app.use('/user',passwordRouter);
//这个是借阅数量排行榜
app.use('/top',topRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
