app.factory('GeneratorFactory', function($http) {

  var genFactory = {};

  genFactory.makeSpreadsheetFromEvents = function(allEvents, start, end) {
    return $http.post('/api/spreadsheets/generate/', {
      events: allEvents,
      start: start,
      end: end
    })
    .then(function(res) {
      return res.data;
    });
  }

  return genFactory;
});
