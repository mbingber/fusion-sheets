app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: 'HomeCtrl',
        resolve: {
            spreadsheet: function(SheetFactory) {
                return SheetFactory.getSpreadsheet();
            }
        }
    });
});

app.controller('HomeCtrl', function($scope, spreadsheet) {
    $scope.spreadsheet = spreadsheet;
});
