const db = require('../lib/db');
const mongoose = require('mongoose');

const SubjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

SubjectSchema.pre('save', function (next) {
    this.created_at = new Date();
    next();
});

SubjectSchema.methods = {
    register: function () {
        return this.save();
    }
};

const Subject = db.model('Subject', SubjectSchema);
module.exports = Subject;