app.factory('SheetFactory', function($http) {
    var sheetFactory = {};

    sheetFactory.getMyInvoiceGenerator = function() {
        console.log('in factory function')
        return $http.get('/api/spreadsheets/invoiceGenerator')
        .then(function(res) {
            return res.data[0] || res.data;
        });
    }

    sheetFactory.getMyMainSheets = function() {
        return $http.get('/api/spreadsheets/main')
        .then(function(res) {
            return res.data;
        });
    }

    sheetFactory.addSheet = function(ssId) {
        return $http.post(`/api/spreadsheets/${ssId}/addSheet`)
        .then(function(res) {
            return res.data;
        });
    }

    sheetFactory.updateRows = function(sheet) {
        return $http.put(`/api/sheets/${sheet._id}/updateRows`, sheet);
    }

    sheetFactory.addColumn = function(sheet, columnTitle) {
        columnTitle = columnTitle || 'Untitled';
        if(sheet.columnTitles.indexOf(columnTitle) > -1) return;
        return $http.post(`/api/sheets/${sheet._id}/addColumn`, {columnTitle})
        .then(function() {
            sheet.columnTitles.push(columnTitle);
        });
    }

    return sheetFactory;

});
