'use strict';
var mongoose = require('mongoose');

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
    columnTitles: [String],
    rows: [mongoose.Schema.Types.Mixed]
});

schema.methods.newColumn = function(columnTitle) {
    this.columnTitles.push(columnTitle);
    return this.save();
}

schema.methods.updateRows = function(rows) {
    this.rows = rows;
    this.markModified('rows');
    return this.save();
}

mongoose.model('Sheet', schema);
