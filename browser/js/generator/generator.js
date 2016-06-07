app.config(function ($stateProvider) {
    $stateProvider.state('home.generator', {
        url: '/generator',
        templateUrl: 'js/generator/generator.html',
        controller: 'GeneratorCtrl',
        resolve: {
            spreadsheet: function(SheetFactory, AuthService) {
                if(AuthService.isAuthenticated()) {
                    return SheetFactory.getMyInvoiceGenerator();
                }
            }
        }
    });
});

app.controller('GeneratorCtrl', function($scope, spreadsheet) {
    console.log(spreadsheet)
    if(spreadsheet) $scope.spreadsheet = spreadsheet;
});
