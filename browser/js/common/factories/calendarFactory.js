app.factory('CalendarFactory', function($http) {
  var calFactory = {};

  calFactory.getList = function() {
    return $http.get('/api/calendar/list')
    .then(function(res) {
      return res.data;
    });
  }

  calFactory.getEvents = function(calIds, startDate, endDate) {
    return $http.post('/api/calendar/events', {
      calIds: calIds,
      start: startDate.toISOString(),
      end: endDate.toISOString()
    }).then(function(res) {
      return res.data;
    });
  }

  return calFactory;
});
