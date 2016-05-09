app.directive('spreadsheet', function() {
    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/spreadsheet/spreadsheet.html',
        scope: {
            sheets: '='
        },
        link: function(scope, element, attr) {

        }
    }
});
