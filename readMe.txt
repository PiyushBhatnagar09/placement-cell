This is a MERN stack developemnt project

STEPS TO RUN CODE ON YOUR PC:-
1. Install vscode, nodejs, mongodb

2. copy this whole folder in your pc


3. USE THESE NPM COMMANDS TO INSTALL ALL REQUIRED LIBRARIES:-

npm init
npm install -g express
npm install -g nodemon

Paste this in package.json to use 'npm start'
"scripts": {
    "start": "nodemon index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
},

npm install ejs
npm install express-ejs-layouts
npm install mongoose
npm install cookie-parser
npm install passport
npm install passport-local
npm install express-session
npm install connect-mongo
npm install node-sass
npm install node-sass-middleware
npm install connect-flash

put the NOTY stylesheet, script and code link in both layout.ejs files

npm install nodemailer

npm install crypto //to generate random number of 6digits for OTP in reset password

NOTE: when we are sending params in the form action then the method must be POST because otherwise in GET, you can't access req.body !!

npm install passport-google-oath

NOTE: when existing module cannot be installed in npm,
then just replace node_modules folders with the codeial's 

npm install passport-google-oauth
npm install objects-to-csv

To use fetch in fetching api data:-
npm install node-fetch@2, Then do:-
const fetch= require('node-fetch')

npm install multer