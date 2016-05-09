app.factory('SheetFactory', function() {
    var sheetFactory = {};
    sheetFactory.getSheet = function() {
        return {
            name: 'Test Sheet',
            titles: ['Name', 'Amount', 'Comment', 'Has Space'],
            rows: [{
                name: 'Mike',
                amount: 100,
                comment: 'nice!',
                has_space: 'this works'
            }, {
                name: 'Mark',
                amount: 100,
                comment: 'super!',
                has_space: 'yeppers'
            }, {
                name: 'Zeke',
                amount: 50,
                comment: 'totally rad!',
                has_space: 'uh huh'
            }]
        };
    }

    return sheetFactory;

});
