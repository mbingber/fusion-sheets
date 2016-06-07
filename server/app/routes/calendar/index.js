'use strict'
var router = require('express').Router();
module.exports = router;

var Promise = require('bluebird');
var gcal = require('google-calendar');

router.use(function(req, res, next) {
  req.calendar = new gcal.GoogleCalendar(req.user.google.accessToken);
  next();
});

router.get('/list', function(req, res, next) {
  req.calendar.calendarList.list(function(err, list) {
    if(err) next(err);
    else res.send(list);
  });
});

router.post('/events', function(req, res, next) {
  var eventsPromise = Promise.promisify(req.calendar.events.list).bind(req.calendar.events);
  var promisesForEvents = req.body.calIds.map(function(calId) {
    return eventsPromise(calId, {
      timeMin: req.body.start,
      timeMax: req.body.end
    });
  });
  Promise.all(promisesForEvents)
  .then(function(arrOfCals) {
    res.send(arrOfCals.reduce(function(allEvents, cal) {
      return allEvents.concat(cal.items);
    }, []));
  }).catch(next);
});
