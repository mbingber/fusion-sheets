'use strict';
var mongoose = require('mongoose');
var Sheet = mongoose.model('Sheet');

var schema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    sheets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sheet'
    }]
});

schema.methods.newSheet = function() {
    return Sheet.create({
        user: this.user
    }).then(function(sheet) {
        this.sheets.push(sheet);
        return this.save();
    })
}

mongoose.model('Spreadsheet', schema);
