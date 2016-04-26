app.directive('sheetView', function($timeout) {
    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/sheet/sheet.html',
        scope: {
            sheet: '='
        },
        link: function(scope, element, attr) {
            element.on('click', function(e) {
                if(e.srcElement.classList[0] !== 'idx') {
                    scope.selectedRow = {};
                    $timeout();
                }
            });

            scope.getKey = function(title) {
                return title.toLowerCase().split(' ').join('_');
            };

            scope.selectedCell = {
                row: {},
                title: ''
            };

            scope.select = function(row, title) {
                scope.selectedCell.row = row;
                scope.selectedCell.title = title;
            };

            scope.selectRow = function(row) {
                scope.selectedRow = row;
            };

            scope.addRow = function() {
                scope.sheet.rows.push({});
            };

            scope.deleteRow = function(idx) {
                scope.sheet.rows.splice(idx,1);
            };
        }
    }
})
