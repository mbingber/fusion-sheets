app.directive('spreadsheetView', function (SheetFactory) {
  return {
    restrict: 'E',
    templateUrl: 'js/common/directives/spreadsheet/spreadsheet.html',
    scope: {
      spreadsheet: '='
    },
    link: function(scope, element, attr) {

      if(scope.spreadsheet.sheets.length) scope.spreadsheet.sheets[0].active = true;

      scope.addSheet = function() {
        SheetFactory.addSheet(scope.spreadsheet._id)
        .then(function(newSheet) {
          scope.spreadsheet.sheets.push(newSheet);
          newSheet.active = true;
        });
      }
    }
  }
});
