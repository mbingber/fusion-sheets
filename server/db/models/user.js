'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    email: {
        type: String
    },
    google: {
        id: String,
        accessToken: String,
        refreshToken: String
    },
    firstName: String,
    lastName: String
});

schema.virtual('fullName').get(function() {
    return this.firstName + ' ' + this.lastName;
});

mongoose.model('User', schema);
