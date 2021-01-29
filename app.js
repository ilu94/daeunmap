const express = require("express");
const app = express();
const path = require("path");
const indexRouter = require("./src/routes");
const morgan = require('morgan');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const flash = require('connect-flash');

//const webSocket = require('./socket');
//const configs = require("./configs");
const session = require("express-session");


require('dotenv').config();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set("port", process.env.PORT || 8005);


//bodyparser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//cookieparser
app.use(cookieParser());

//session
app.use(session({
    key: 'sid',
    secret: 'googlemapservice',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        maxAge: 24000 * 60 * 60,
        httpOnly: true,
        secure: false
    },
}));

app.use(flash());

//api router
app.use('/', indexRouter);

//catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
  app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
  });

const server = app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기중');
  });
//webSocket(server, app, sessionMiddleware);

module.exports = app;




