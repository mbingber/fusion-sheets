app.config(function ($stateProvider) {
  $stateProvider.state('home.calendar', {
    url: '/calendar',
    templateUrl: 'js/calendar/calendar.html',
    controller: 'CalendarCtrl',
    resolve: {
      calendarList: function(CalendarFactory) {
        return CalendarFactory.getList();
      }
    }
  });
});

app.controller('CalendarCtrl', function($scope, calendarList, CalendarFactory, GeneratorFactory) {
  $scope.calendarList = calendarList;

  $scope.getEvents = function() {
    var calIds = $scope.calendarList.items.filter(function(item) {
      return item.checked;
    }).map(function(cal) {
      return cal.id;
    });

    CalendarFactory.getEvents(calIds, $scope.startDate, $scope.endDate)
    .then(function(allEvents) {
      console.log(allEvents);
      $scope.events = allEvents;
    });
  }

  $scope.generateSheets = function() {
    GeneratorFactory.makeSpreadsheetFromEvents($scope.events, $scope.startDate, $scope.endDate)
    .then(function() {
      $scope.complete = true;
    });
  }
});
