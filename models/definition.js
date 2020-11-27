const db = require('../lib/db');
const mongoose = require('mongoose');

const DefinitionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    created_at: Date
});

DefinitionSchema.pre('save', function (next) {

    this.created_at = new Date();
    next();
});

DefinitionSchema.methods = {
    register: function () {
        return this.save();
    }
};

const Definition = db.model('Definition', DefinitionSchema);
module.exports = Definition;