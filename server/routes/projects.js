var express = require('express');

/*
 express.Router class to create modular, mountable route handlers.
 A Router instance is a complete middleware and routing system; for this reason, it is often referred to as a “mini-app”.
 The following example creates a router as a module, loads a middleware function in it,
 defines some routes, and mounts the router module on a path in the main app.
 */

var router = express.Router();
/*

 Before we can handle CRUD operations, we will need a mongoose Model.
 These models are constructors that we define.
 They represent documents which can be saved and retrieved from our database.
 The mongoose Schema is what is used to define attributes for our documents.
 Mongoose Methods can also be defined on a mongoose schema.

 */
var mongoose = require('mongoose');
require('mongoose-double')(mongoose); //Provides Double support for Mongoose.
var mPromise = require('mpromise'); // not implemented yet
/*
 SchemaTypes handle definition of path defaults, validation, getters, setters,
 field selection defaults for queries and other general characteristics for Strings and Numbers.
 Following are all valid Schema Types.

 String
 Number
 Date
 Buffer
 Boolean
 Mixed
 Objectid
 Array
 */
var SchemaTypes = mongoose.Schema.Types;

/*
 Everything in Mongoose starts with a Schema.
 Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.
 */
var Schema = mongoose.Schema;
var projectSchema = new Schema({
    id : { type: Schema.ObjectId },
    name: { type: String, required: true },
    client:{ type: String, required: false },
    price: { type: SchemaTypes.Double, required: false },
    startTime:{ type: Date, required: false, default: new Date()},
    endTime:{ type: Date, required: false },
    progress:{ type: Number, required: false },
    status:{ type: String, required: false },
    labels:{ type: Array, required: false },
    description:{ type: String, required: false },
    createdAt:{ type: Date, required: false, default: new Date()},
    updatedAt:{ type: Date, required: false, default: new Date()}
});

// the schema is useless so far
// we need to create a model using it

var projectModel = mongoose.model('projects', projectSchema);

// make this available to our users in our Node applications

module.exports = projectModel;

// get all the projects (accessed at GET http://localhost:8081/wireup/projects)
router.get('/projects', function (req, res) {
    /*
     Finding documents is easy with Mongoose, which supports the rich query syntax of MongoDB.
     Documents can be retrieved using each models find, findById, findOne, or where static methods.
    */
    projectModel.find({}, function(err, projects) {
        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }
        console.log(":: projects ");
        res.send(projects);
    });
})

// create the new project (accessed at POST http://localhost:8081/wireup/project/add)
router.post('/project/add', function (req, res) {
    projectSchema.pre('save', function(next) {
        var currentDate = new Date();
        this.updatedAt = currentDate;
        this.createdAt = currentDate;
        next();
    });
    console.log(":: project/add ");

    // create a new instance of the Project model
    var newProject = projectModel(req.body);

    // save the project and check for errors
    newProject.save(function(err) {
        if (err) throw err;
        console.log('New Project created!');
    });
})

// update the previous project with id (accessed at PUT http://localhost:8081/wireup/project/update)
router.put('/project/update/:id', function(req, res, next) {
    console.log(":: project/update ");
    projectModel.findByIdAndUpdate(req.params.id, req.body, function(err, project) {
        if (err) throw err;
        console.log('Project updated!');
    });
});

// delete the project with id (accessed at PUT http://localhost:8081/wireup/project/delete)
router.delete('/project/delete/:id', function(req, res) {
    console.log(":: project/delete ");
    projectModel.findByIdAndRemove(req.params.id, function(err) {
        if (err) throw err;
        console.log('Project deleted!');
    });
});

module.exports = router;