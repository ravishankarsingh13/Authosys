const express = require('express');
const cookiesparser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const middleware=require('./config/middleware');
const passportLocal = require('./config/passport-local-strategy');
const googlePassport = require('./config/passport-google-oauth2-strategy');
const MongoStore = require('connect-mongo')(session);
require('dotenv').config();                                                 //configure dotenv for ENv VARIABLES


console.log(process.env);

app.use(express.urlencoded()); 
app.use(cookiesparser());
app.use(express.static('./asset'));
app.use(expressLayouts);
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
app.set('view engine','ejs');
app.set('views','./views');
// mongo store is being used to store session cookie in the db
app.use(session({
    name: "Authosys",
    // ToDo Change this secret before deployment in production-mode
    secret: "TheSecretKeyIsHiddenSomeWhereInThisDirectory",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100),
    },
    store: new MongoStore({
        mongooseConnection: db,
        autoRemove: "disabled"
    },
        function (err) {
            console.log(err || "connect-mongo setup is established!")
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(middleware.setFlash);
app.use('/',require('./routes/index'));

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Yup! server is running on port: ${port}`);
});