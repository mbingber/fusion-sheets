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
        default: 'Untitled'
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

schema.statics.copy = function(sheet, userId) {
    return this.create({
        user: userId,
        title: sheet.title,
        columnTitles: sheet.columnTitles.slice(),
        rows: sheet.rows.map(function(row) {
            var newRow = {};
            Object.keys(row).forEach(function(key) {
                newRow[key] = row[key];
            });
            return newRow;
        })
    });
}

mongoose.model('Sheet', schema);
