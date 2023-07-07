sending authorization token in api call is compulsory
token needs to be same for generateotp and verifyotp

Note: In the parameters, 'healthIdNumber' refers to ABHA number and 'healthId' refers to ABHA Address.

can i use mongodb in backend to store txnId and aadhaar number, so that 
when getting healthId, we don't sent OTP again and again because it shows: 
Data:  {
  code: 'HIS-422',
  message: 'Unable to process the current request due to incorrect data entered.',   
  details: [
    {
      message: 'You have requested multiple OTPs in this transaction. Please try again in 30 minutes.',
      code: 'HIS-2017',
      attribute: null
    }
  ]
}

1: check if txnId is unique for particular aadhaar number or not?
Yes, transaction id is changing for every new request of the same user

2: data should not be displayed in url of browser

3: healthId/healthNumber is unique?
healthid i.e. abha number is unique but a person can have multiple abha addresses i.e. health id number but it should be unique in the sense, no other person has taken that address with same name

4: do we pass healthid from our frontend?




<<<<<<< HEAD
npm install crypto
npm install axios
=======
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
>>>>>>> dee357abdf8dab5134a2b8951511bd7c735eb746
