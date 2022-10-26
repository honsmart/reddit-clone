var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')
const Pusher = require("pusher");
const SwaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
require("dotenv").config();

//Routes
var indexRouter = require('./routes/index.routes');
var usersRouter = require('./routes/users.routes');
var subredditRouter = require('./routes/subreddit.routes');
var postRouter = require('./routes/post.routes');
var commentRouter = require('./routes/comment.routes');

//Error controller 
var errorController = require('./controllers/error.contoller')

//Api docs
var apiDocs = require('./docs/api.docs')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Pusher
const pusher = new Pusher({
  appId: process.env.PusherAppiD,
  key: process.env.PusherKey,
  secret: process.env.PusherSeceret,
  cluster: "mt1",
  useTLS: true
});

const swaggerDefinition = apiDocs
const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./routes/users.routes.js', './routes/subreddit.routes.js', './routes/post.routes.js', './routes/comment.routes.js'],
};

const swaggerSpec = SwaggerJSDoc(options);



//Use route
app.use('/', indexRouter);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/users', usersRouter);
app.use('/subreddit', subredditRouter);
app.use('/post', postRouter);
app.use('/comment', commentRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});





// error handler
app.use(errorController);
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  console.log('congrats you hit the error middleware');
  console.log(err);

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;