app.factory('SheetFactory', function($http) {
    var sheetFactory = {};

    sheetFactory.getSpreadsheet = function() {
        return $http.get('/api/spreadsheets/')
        .then(function(res) {
            return res.data[0] || res.data;
        });
    }

    sheetFactory.updateRows = function(sheet) {
        $http.put(`/api/sheets/${sheet._id}/updateRows`, sheet);
    }

    return sheetFactory;

});
