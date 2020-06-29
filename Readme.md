# Authentication Task

This is a node project which consists of Authentication modules like passport.js, social authentication(google oauth).


# Project Structure:--

-assets\
    &emsp;--css\
    &emsp;&emsp;---footer.css\
    &emsp;&emsp;---header.css\
        &emsp;&emsp;---home.css\
        &emsp;&emsp;---layout.css\
        &emsp;&emsp;---resetPassword.css\
        &emsp;&emsp;---user_profile.css\
        &emsp;&emsp;---user_sign_in.css\
    &emsp;--images\
    &emsp;--js\
        &emsp;&emsp;---sign-in.js\
-config\
    &emsp;--middleware.js\
    &emsp;--mongoose.js\
    &emsp;--nodemailer.js\
    &emsp;--passport-google-oauth2-strategy.js\
    &emsp;--passport-local-strategy.js\
-controllers\
    &emsp;--home_controller.js\
    &emsp;--users_controller.js\
-mailers\
    &emsp;--login_mailers.js\
    &emsp;--reset_mailer.js\
-models\
    &emsp;--user.js\
-routes\
    &emsp;--index.js\
    &emsp;--users.js\
-views\
    &emsp;--_footer.ejs\
    &emsp;--_header.ejs\
    &emsp;--forgot_password.ejs\
    &emsp;--home.ejs\
    &emsp;--layout.ejs\
    &emsp;--sendMail.ejs\
    &emsp;--user_profile.ejs\
    &emsp;--user_sign_in.ejs\
    &emsp;--user_sign_up.ejs\
-index.js\
-package.lock.json\
-package.json\
-README

# How to setup project

1. Clone this project
2. Start by installing npm and mongoDB if you don't have them already.
3. Run the Mongo Server.
4. Create a google login credentials and subsequently a google Oauth ID. Refer this : https://developers.google.com/identity/protocols/oauth2
5. Create a dummy email id which can be used by mailer.
6. Navigate to Project Directory by :
    >cd Authosys

7. Run command:

    > npm install 

    > npm start or node index.js

8. Go to (.env):\
&emsp;CLIENT_ID= Enter your Client Id\
&emsp;CLIENT_SECRET= Enter Client_secret\
&emsp;EMAIL= Enter your Gmail Id\
&emsp;PASSWORD= Enter your Gmail Password


Feel free to use and contribute! :)