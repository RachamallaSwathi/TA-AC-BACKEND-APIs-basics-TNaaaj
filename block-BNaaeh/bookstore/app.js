var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose=require('mongoose');

var indexRouter = require('./routes/index');
var booksRouter = require('./routes/books');
var categoryRouter = require('./routes/category');
var authorRouter = require('./routes/author');

var app = express();

mongoose.connect('mongodb://localhost/bookstore',(err)=>{
  console.log(err?err:'Connected to Database');
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//version1
app.use('/api/v1/', indexRouter);
app.use('/api/v1/books/', booksRouter);
app.use('/api/v1/category/',categoryRouter);
app.use('/api/v1/author/',authorRouter);

//version2
app.use('/api/v2/', indexRouter);
app.use('/api/v2/books/', booksRouter);
app.use('/api/v2/category/',categoryRouter);
app.use('/api/v2/author/',authorRouter);

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