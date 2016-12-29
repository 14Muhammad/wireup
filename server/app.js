/*
 express  is a Fast, unopinionated, minimalist web framework famous for
         Robust routing
         Focus on high performance
         Super-high test coverage
         HTTP helpers (redirection, caching, etc)
         View system supporting 14+ template engines
         Content negotiation
         Executable for generating applications quickly

 cors is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.

 body-parser is a Node.js body parsing middleware which parse incoming request bodies in a middleware before your handlers,
  available under the req.body property.

*/
var express = require('express'), cors = require('cors');
var app = express();
var path = require('path');
var bodyParser = require("body-parser");
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
/*

mongoose is an object modeling package for Node that essentially works like an ORM that you would see in other languages
Mongoose allows us to have access to the MongoDB commands for CRUD simply and easily.
To use mongoose, make sure that you add it to you Node project by using the following command:  npm install mongoose --save

*/
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/wireupdb');
var db = mongoose.connection;
db.on('error', console.error.bind(console, ':: mongoose connection error:'));
db.once('open', function() {
    console.log(":: mongoose connected");
});

/*
  IMPORTING & REGISTER OUR ROUTES
 */
var projects = require('./routes/projects');
var members = require('./routes/members');
var events = require('./routes/events');
var clients = require('./routes/clients');
var notes = require('./routes/notes');
var users = require('./routes/users');

/*
 all of our routes will be prefixed with /wireup
*/

app.use('/wireup/', projects);
app.use('/wireup/', members);
app.use('/wireup/', events);
app.use('/wireup/', clients);
app.use('/wireup/', notes);
app.use('/wireup/', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// set our port
// START THE SERVER
var server = app.listen(8090, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Wire-up app listening at http://%s:%s", host, port)
})
