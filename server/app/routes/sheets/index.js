'use strict';
var router = require('express').Router();
module.exports = router;

var Sheet = require('mongoose').model('Sheet');

router.param('sheetId', function(req, res, next) {
    Sheet.findById(req.params.sheetId)
    .then(function(sheet) {
        req.sheet = sheet;
        next();
    }, next);
});

router.put('/:sheetId/updateRows', function(req, res, next) {
    req.sheet.updateRows(req.body.rows)
    .then(function() {
        res.sendStatus(202);
    }, next);
});

router.post('/:sheetId/addColumn', function(req, res, next) {
    if(req.sheet.columnTitles.indexOf(req.body.columnTitle) > -1) {
        next(new Error('this sheet already has that column'));
    }
    req.sheet.columnTitles.push(req.body.columnTitle);
    req.sheet.save()
    .then(function() {
        res.sendStatus(201);
    }, next);
});
