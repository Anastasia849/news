var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const pingRouter = require('./routes/ping');
// const registrationRouter = require('./routes/registration');
// const loginRouter = require('./routes/login');
// const authRouter = require('./routes/auth');
// const thingRouter = require('./routes/thing');
// const replyRouter = require('./routes/reply');
// const reviewRouter = require('./routes/review');
const userRouter = require('./routes/users');
const logsRouter = require('./routes/newsLog/index')

// const authMiddleware = require('./middlewares/auth.middleware');

var app = express();
var router = express.Router();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

app.set('view engine', 'jade');
var router = express.Router();
router.use('/ping', pingRouter);
// router.use('/registration', registrationRouter);
// router.use('/login', loginRouter);
// router.use('/auth', authMiddleware, authRouter);
// router.use('/things', authMiddleware, thingRouter);
// router.use('/replies', authMiddleware, replyRouter);
// router.use('/reviews', authMiddleware, reviewRouter);
// router.use('/users', authMiddleware, userRouter);
router.use('/users', userRouter);
router.use('/logs', logsRouter)
app.use('/api', router);



// app.get('/**', function (req, res) {
//     res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
// });

// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//     next(createError(404));
// });

// // error handler
// app.use(function (err, req, res, next) {
//     const isDevelopment = req.app.get('env') === 'development';
//     const message = isDevelopment ? err.message : 'Server';

//     console.log(message);

//     res.status(err.status || 500).send(message);
// });

app.get('/**', function (req, res) {
    res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;