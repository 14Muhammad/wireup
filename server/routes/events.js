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
var eventSchema = new Schema({
    id : { type: Schema.ObjectId },
    title: { type: String, required: true },
    description:{ type: String, required: true },
    startDate: { type: Date , default: new Date() , required: false },
    endDate: { type: Date , default: new Date() , required: false },
    startTime:{ type: Date, required: false, default: new Date()},
    endTime:{ type: Date, required: false },
    location:{ type: String, required: true },
    shareWith:{ type: Array , required: false },
    createdAt:{ type: Date, required: false, default: new Date()},
    updatedAt:{ type: Date, required: false, default: new Date()}
});
var eventModel = mongoose.model('events', eventSchema);
module.exports = eventModel;

router.get('/events', function (req, res) {
    eventModel.find({}, function(err, events) {
        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }
        console.log(":: events ");
        res.send(events);
    });
})

router.post('/event/add', function (req, res) {
    eventSchema.pre('save', function(next) {
        var currentDate = new Date();
        this.updatedAt = currentDate;
        this.createdAt = currentDate;
        next();
    });
    console.log(":: event/add ");
    var newEvent = eventModel(req.body);
    newEvent.save(function(err) {
        if (err) throw err;
        console.log('Event Created!');
    });
})

router.put('/event/update/:id', function(req, res, next) {
    console.log(":: event/update ");
    eventModel.findByIdAndUpdate(req.params.id, req.body, function(err, project) {
        if (err) throw err;
        console.log('Event updated!');
    });
});

router.delete('/event/delete/:id', function(req, res) {
    console.log(":: event/delete ");
    eventModel.findByIdAndRemove(req.params.id, function(err) {
        if (err) throw err;
        console.log('Event deleted!');
    });
});

module.exports = router;