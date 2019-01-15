const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/user');
const cities = require('./routes/city');


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://admin:password123@ds115420.mlab.com:15420/project', { useNewUrlParser: true });
const db = mongoose.connection;

// mongo connection check
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
console.log("Connected to MongoDB.")
});

//Enable CORS
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
  });

app.use(passport.initialize());
require('./passport')(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/users', users);
app.use('/api/cities', cities);

app.listen(8000, () => {
    console.log("Server running on port 8000")
});