//using express
const express= require('express');

//using cookie parser to access cookies in browser
const cookieParser= require('cookie-parser'); //to create and edit cookies
const app= express();

const port= 8000;

//frontend to backend connection
var cors= require('cors');
app.use(cors());

const db= require('./config/mongoose'); //connecting to mongoose to get access to database

//used for create session cookie which is used by passport.js to setup the identity of user
const session= require('express-session');

//using mongo store to store the session cookies in mongodb database to increase the time of cookie expiration
const MongoStore= require('connect-mongo');

//this is compulsary to inlcude: it enables us to use the form data as req.body object
app.use(express.urlencoded());

//telling express app to use cookie parser
app.use(cookieParser());

//telling the express app that for static files look into assets folder
app.use(express.static('./assets'));

//telling to use express layouts and extract the stylesheets and script files and place them as specified in layout.ejs

//setup view engine, for all ejs files use views folder
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.json());

//mongo store is used to store the session cookie in the db
const mongoose= require('mongoose');
app.use(session({
    name: 'abha_service',
    //change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    store: MongoStore.create(
        {
            mongoUrl: 'mongodb://localhost/abha_service', //this URL i got by using console.log(mongoose.connection) and then search in the object returned for the url like this
            autoRemove: 'disabled'
        },
        function(err) {
            console.log(err, 'connect-mongodb setup ok');
        }
    )
    }));


/*
app.use(passport.initialize()) and app.use(passport.session()): 
These lines initialize and enable the use of Passport.js for authentication 
within the Express app. Passport is a popular authentication middleware for 
Node.js that provides various strategies (such as local, OAuth, etc.) for 
handling user authentication.
*/
//telling express app to use these libraries


/*
app.use(passport.setAuthenticatedUser): This line likely refers to a custom 
middleware function that sets the authenticated user in the request object. 
It's common to attach user information to the request object after successful
authentication, allowing subsequent routes to access and utilize this 
information.
*/
//use express router
app.use('/', require('./routes')); //must place this line after passport lines

//listening our current project on 8000 port
app.listen(port, function(err) {
    if(err) {
        console.log(`Error in running the server : ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
})