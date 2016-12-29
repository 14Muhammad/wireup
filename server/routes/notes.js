var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
require('mongoose-double')(mongoose);
var mPromise = require('mpromise'); // not implemented yet
var SchemaTypes = mongoose.Schema.Types;

var Schema = mongoose.Schema;
var noteSchema = new Schema({
    id : { type: Schema.ObjectId },
    name: { type: String, required: true },
    labels:{ type: Array, required: false },
    description:{ type: String, required: false },
    createdAt:{ type: Date, required: false, default: new Date()},
    updatedAt:{ type: Date, required: false, default: new Date()}
});
var noteModel = mongoose.model('notes', noteSchema);
module.exports = noteModel;

router.get('/notes', function (req, res) {
    noteModel.find({}, function(err, notes) {
        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }
        console.log(":: notes ");
        res.send(notes);
    });
})

router.post('/note/add', function (req, res) {
    noteSchema.pre('save', function(next) {
        var currentDate = new Date();
        this.updatedAt = currentDate;
        this.createdAt = currentDate;
        next();
    });
    console.log(":: note/add ");
    var newNote = noteModel(req.body);
    newNote.save(function(err) {
        if (err) throw err;
        console.log('New note created!');
    });
})

router.put('/note/update/:id', function(req, res, next) {
    console.log(":: note/update ");
    noteModel.findByIdAndUpdate(req.params.id, req.body, function(err, project) {
        if (err) throw err;
        console.log('Note updated!');
    });
});

router.delete('/note/delete/:id', function(req, res) {
    console.log(":: note/delete ");
    noteModel.findByIdAndRemove(req.params.id, function(err) {
        if (err) throw err;
        console.log('note deleted!');
    });
});

module.exports = router;