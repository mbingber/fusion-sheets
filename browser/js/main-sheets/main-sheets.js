app.config(function ($stateProvider) {
  $stateProvider.state('home.main', {
    url: '/main',
    templateUrl: 'js/main-sheets/main-sheets.html',
    controller: 'MainSheetsCtrl',
    resolve: {
      spreadsheets: function(SheetFactory, AuthService) {
        if(AuthService.isAuthenticated()) {
          return SheetFactory.getMyMainSheets();
        }
      }
    }
  });
});

app.controller('MainSheetsCtrl', function($scope, spreadsheets) {

  $scope.spreadsheets = spreadsheets;
  console.log($scope.spreadsheets)
  if($scope.spreadsheets && $scope.spreadsheets.length) {
    $scope.spreadsheet = $scope.spreadsheets[0];
  }
});
