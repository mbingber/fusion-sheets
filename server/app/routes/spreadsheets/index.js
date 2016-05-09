'use strict';
var router = require('express').Router();
module.exports = router;

var Spreadsheet = require('mongoose').model('Spreadsheet');

router.get('/', function(req, res, next) {
    Spreadsheet.find({}).populate('sheets')
    .then(function(ss) {
        res.send(ss);
    }, next);
});

router.param('spreadsheetId', function(req, res, next) {
    Spreadsheet.findById(req.params.spreadsheetId)
    .then(function(ss) {
        req.spreadsheet = ss;
        next();
    }, next);
});

router.post('/:spreadsheetId/addSheet', function(req, res, next) {
    req.spreadsheet.addSheet()
    .then(function(newSheet) {
        res.send(newSheet);
    }, next);
});
