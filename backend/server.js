let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
let bodyParser = require('body-parser');
let app = express();


// Express Route
const studentRoute = require('../backend/routes/student.route')

// DB Config
// const db = require('./database/keys').mongoURI;

const dbRoute ='mongodb+srv://your_mongo_username:your_mongo_password@nodeapi-autrq.mongodb.net/your_database' 



// Connecting mongoDB Database
mongoose.connect(dbRoute, {useUnifiedTopology: true, useNewUrlParser: true });

let db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors());
app.use('/students', studentRoute)


// PORT
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log('Connected to port ' + port)
})

// 404 Error
app.use((req, res, next) => {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});