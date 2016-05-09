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
})
