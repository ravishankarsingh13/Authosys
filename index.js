// import all the dependencies
const express = require('express');
const cookiesparser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');      // for creating layouts
const db = require('./config/mongoose');       //for connecting the database
const session = require('express-session');    // for session cookies
const passport = require('passport');           // passport
const flash = require('connect-flash');         // for showing notification
const middleware=require('./config/middleware');    
const passportLocal = require('./config/passport-local-strategy');
const googlePassport = require('./config/passport-google-oauth2-strategy');
const MongoStore = require('connect-mongo')(session);   //for mongostore
require('dotenv').config();                                                 //configure dotenv for ENv VARIABLES


console.log(process.env);

app.use(express.urlencoded()); 
app.use(cookiesparser());
app.use(express.static('./asset'));      //static files
app.use(expressLayouts);
// extract style and scripts into sub pages
app.set('layout extractStyles',true);        
app.set('layout extractScripts',true);

// set up ejs
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

//for show notification
app.use(flash());
app.use(middleware.setFlash);

app.use('/',require('./routes/index'));

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Yup! server is running on port: ${port}`);
});