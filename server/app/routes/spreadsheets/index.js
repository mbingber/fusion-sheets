'use strict';
var router = require('express').Router();
module.exports = router;

var Spreadsheet = require('mongoose').model('Spreadsheet');

router.get('/invoiceGenerator', function(req, res, next) {
    console.log('hit route')
    Spreadsheet.findOne({
        user: req.user,
        category: 'Invoice Generator'
    }).populate('sheets')
    .then(function(ss) {
        if(ss) return ss;
        else return Spreadsheet.makeSample(req.user._id);
    }).then(function(ss) {
        res.send(ss);
    }).then(null, next);
});

router.get('/main', function(req, res, next) {
    Spreadsheet.find({
        user: req.user,
        category: 'Main Sheets'
    }).populate('sheets')
    .then(function(spreadsheets) {
        res.send(spreadsheets);
    }).then(null, next);
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

router.post('/generate', function(req, res, next) {
    Spreadsheet.generateFromEvents(req.user._id, req.body.events, req.body.start, req.body.end)
    .then(function() {
        console.log('got here?')
        res.status(201).end();
    }, next);
});
