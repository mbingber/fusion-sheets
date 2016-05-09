app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: 'HomeCtrl'
    });
});

app.controller('HomeCtrl', function($scope, SheetFactory) {
    $scope.sheet = SheetFactory.getSheet();
    $scope.sheets = [SheetFactory.getSheet(), SheetFactory.getSheet(), SheetFactory.getSheet()]
});
