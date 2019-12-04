const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const router = require('./router');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());
require('./passport')(passport);

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_CONNECT_URL, { useNewUrlParser: true, useUnifiedTopology: true });
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

app.use('/api', router);
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});