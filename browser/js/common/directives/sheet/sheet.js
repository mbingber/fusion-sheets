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

            function navHelper(key, amount) {
                var idx = scope.sheet[key + 's'].indexOf(scope.selectedCell[key]);
                idx += amount;
                if(idx < 0) idx += scope.sheet[key + 's'].length;
                idx %= scope.sheet[key + 's'].length;
                scope.selectedCell[key] = scope.sheet[key + 's'][idx];
            }

            scope.navigate = function(e) {
                console.log(e.srcElement)
                if(scope.selectedCell.title) {
                    if(e.keyCode === 37) {
                        navHelper('title', -1);
                    } else if (e.keyCode === 39) {
                        navHelper('title', 1);
                    } else if (e.keyCode === 38) {
                        navHelper('row', -1);
                    } else if (e.keyCode === 40) {
                        navHelper('row', 1);
                    }
                }
            }

            scope.getKey = function(title) {
                if(title) return title.toLowerCase().split(' ').join('_');
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
