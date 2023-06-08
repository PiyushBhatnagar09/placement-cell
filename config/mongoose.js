//connecting to database using mongoose
const mongoose= require('mongoose');

mongoose.connect(`mongodb+srv://pbpiyush34:<password>@cluster0.bqvdloa.mongodb.net/?retryWrites=true&w=majority`);

//making connection with database
const db= mongoose.connection;

//checking connection
db.on('error', console.error.bind(console, 'Error connecting to mongoDb'));

db.once('open', function() {
    console.log('Successfully connected to the database');
});

module.exports= db;