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

schema.methods.addSheet = function() {
    var sheet, self = this;
    return Sheet.create({
        user: this.user
    }).then(function(s) {
        sheet = s;
        self.sheets.push(sheet);
        return self.save();
    }).then(function() {
        return sheet;
    });
}

mongoose.model('Spreadsheet', schema);
