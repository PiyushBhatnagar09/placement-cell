//connecting to database using mongoose
const mongoose= require('mongoose');

mongoose.connect(`mongodb+srv://piyush:piyushbhat@cluster0.uv1du9w.mongodb.net/?retryWrites=true&w=majority`);

//making connection with database
const db= mongoose.connection;

//checking connection
db.on('error', console.error.bind(console, 'Error connecting to mongoDb'));

db.once('open', function() {
    console.log('Successfully connected to the database');
});

module.exports= db;