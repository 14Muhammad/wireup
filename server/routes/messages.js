var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
require('mongoose-double')(mongoose);
var mPromise = require('mpromise'); // not implemented yet
var SchemaTypes = mongoose.Schema.Types;

var Schema = mongoose.Schema;
var messageSchema = new Schema({
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
var messageModel = mongoose.model('messages', messageSchema);
module.exports = messageModel;

router.get('/messages', function (req, res) {
    messageModel.find({}, function(err, messages) {
        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }
        console.log(":: messages ");
        res.send(messages);
    });
})

router.post('/message/add', function (req, res) {
    messageSchema.pre('save', function(next) {
        var currentDate = new Date();
        this.updatedAt = currentDate;
        this.createdAt = currentDate;
        next();
    });
    console.log(":: message/add ");
    var newProject = messageModel(req.body);
    newProject.save(function(err) {
        if (err) throw err;
        console.log('New message created!');
    });
})

router.put('/message/update/:id', function(req, res, next) {
    console.log(":: message/update ");
    messageModel.findByIdAndUpdate(req.params.id, req.body, function(err, message) {
        if (err) throw err;
        console.log('message updated!');
    });
});

router.delete('/message/delete/:id', function(req, res) {
    console.log(":: message/delete ");
    messageModel.findByIdAndRemove(req.params.id, function(err) {
        if (err) throw err;
        console.log('message deleted!');
    });
});

module.exports = router;