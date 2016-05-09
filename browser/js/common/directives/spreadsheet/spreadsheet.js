app.directive('spreadsheetView', function() {
    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/spreadsheet/spreadsheet.html',
        scope: {
            spreadsheet: '='
        },
        link: function(scope, element, attr) {

        }
    }
});
