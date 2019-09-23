// IMPORTS
const express = require('express'), mongoose = require('mongoose'), path = require('path'), bodyparser = require('body-parser'), cors = require('cors');

// MONGODB DB URL
var mongoDatabase = 'mongodb://localhost:27017/test';

// EXPRESS SERVER
const app = express();
mongoose.Promise = global.Promise;

// DATABASE CONNECTION
mongoose.connect(mongoDatabase, { useNewUrlParser: true }).then(
    () => { console.log('Database is Connected!') },
    err => { console.log('Ooopss!..There is a problem While connecting to database ' + err) }
);

// EXPRESS ROUTE
const employeeRoute = require('./Route/Employee.route');

// CONVERTING INCOMMING DATA TO JSON
app.use(bodyparser.json());

// Enable CORS
app.use(cors());

// SETTING PORT NUMBER
const port = process.env.PORT || 4000;

// ROUTE CONFIGURATION
app.use('/employees', employeeRoute);

// STARTING SERVER
const server = app.listen(port, () => {
    console.log('Ready!');
    console.log('find me on localhost/' + port);
});