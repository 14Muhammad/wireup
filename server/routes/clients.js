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
var clientSchema = new Schema({
    id : { type: Schema.ObjectId },
    companyName: { type: String, required: true },
    address:{ type: String, required: false },
    city: { type: String, required: false },
    state:{ type: String, required: false },
    country:{ type: String, required: false },
    phone:{ type: Number, required: false },
    online:{ type: Boolean, required: false },
    zip:{ type: Number, required: false },
    website:{ type: String, required: false },
    VATNumber:{ type: String, required: false},
    currency:{ type: String, required: false },
    currencySymbol:{ type: String, required: false },
    createdAt:{ type: Date, required: false, default: new Date()},
    updatedAt:{ type: Date, required: false, default: new Date()}
});

// the schema is useless so far
// we need to create a model using it

var clientModel = mongoose.model('clients', clientSchema);

// make this available to our users in our Node applications

module.exports = clientModel;

router.get('/clients', function (req, res) {
    clientModel.find({}, function(err, clients) {
        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }
        console.log(":: clients ");
        res.send(clients);
    });
})

router.post('/client/add', function (req, res) {
    clientSchema.pre('save', function(next) {
        var currentDate = new Date();
        this.updatedAt = currentDate;
        this.createdAt = currentDate;
        next();
    });
    console.log(":: client/add ");
    var newClient = clientModel(req.body);
    newClient.save(function(err) {
        if (err) throw err;
        console.log('New Client created!');
    });
})

router.put('/client/update/:id', function(req, res, next) {
    console.log(":: client/update ");
    clientModel.findByIdAndUpdate(req.params.id, req.body, function(err, client) {
        if (err) throw err;
        console.log('Client updated!');
    });
});

router.delete('/client/delete/:id', function(req, res) {
    console.log(":: client/delete ");
    clientModel.findByIdAndRemove(req.params.id, function(err) {
        if (err) throw err;
        console.log('Client deleted!');
    });
});

module.exports = router;