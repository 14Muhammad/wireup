var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
require('mongoose-double')(mongoose);
var mPromise = require('mpromise'); // not implemented yet
var SchemaTypes = mongoose.Schema.Types;
var Schema = mongoose.Schema;
var memberSchema = new Schema({
    id : { type: Schema.ObjectId },
    firstName: { type: String, required: true },
    lastName:{ type: String, required: false },
    email: { type: String, required: false },
    phone:{ type: String, required: false},
    gender:{ type: String, required: false },
    jobTitle:{ type: String, required: false },
    salary:{ type: String, required: false },
    salaryTerm:{ type: String, required: false },
    hireDate:{ type: Date, required: false, default: new Date()},
    role:{ type: String, required: false},
    createdAt:{ type: Date, required: false, default: new Date()},
    updatedAt:{ type: Date, required: false, default: new Date()}
});
var memberModel = mongoose.model('members', memberSchema);
module.exports = memberModel;

router.get('/members', function (req, res) {
    memberModel.find({}, function(err, members) {
        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }
        console.log(":: members ");
        res.send(members);
    });
})

router.post('/member/add', function (req, res) {
    memberSchema.pre('save', function(next) {
        var currentDate = new Date();
        this.updatedAt = currentDate;
        this.createdAt = currentDate;
        next();
    });
    console.log(":: member/add ");
    var newMember = memberModel(req.body);
    newMember.save(function(err) {
        if (err) throw err;
        console.log('New Member created!');
    });
})

router.put('/member/update/:id', function(req, res, next) {
    console.log(":: member/update ");
    memberModel.findByIdAndUpdate(req.params.id, req.body, function(err, member) {
        if (err) throw err;
        console.log('Member updated!');
    });
});

router.delete('/member/delete/:id', function(req, res) {
    console.log(":: member/delete ");
    memberModel.findByIdAndRemove(req.params.id, function(err) {
        if (err) throw err;
        console.log('Member deleted!');
    });
});

module.exports = router;