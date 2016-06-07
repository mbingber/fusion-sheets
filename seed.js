/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var connectToDb = require('./server/db');
var User = Promise.promisifyAll(mongoose.model('User'));
var Sheet = Promise.promisifyAll(mongoose.model('Sheet'));
var Spreadsheet = Promise.promisifyAll(mongoose.model('Spreadsheet'));

var seedUsers = function () {

  var users = [
    {
      email: 'sample@sample.com'
    }
  ];

  return User.createAsync(users);

};

var seedSheets = function(users) {

  var sheets = [{
    user: users[0],
    title: 'Tutors',
    columnTitles: ['Tutor Name', 'Username', 'One to One Rate', 'Drop In Rate', 'Classroom Rate', 'Chargeout Rate'],
    rows: [{
      tutor_name: 'Mike Ingber',
      username: 'mike',
      one_to_one_rate: '9000'
    }, {
      tutor_name: 'Mark Batho',
      username: 'mark',
      drop_in_rate: Infinity
    }]
  }, {
    user: users[0],
    title: 'Client Discounts',
    columnTitles: ['Client', 'Discount Percent', 'Discount Dollar', 'Student', 'Current', 'Tutor', 'Reason', 'Other Consideration'],
    rows: [{
      client: 'House, White',
      discount_percent: 50,
      student: 'Obama, Barack',
      current: 'x',
      tutor: 'Mike Ingber',
      reason: 'Presidential privilege'
    }, {
      client: 'Sanders, Bernie',
      discount_dollar: 27,
      student: 'Sanders, Bernie',
      current: 'x',
      tutor: 'Mark Batho',
      reason: 'Feel the bern'
    }]
  }, {
    user: users[0],
    title: 'Client CustNum',
    columnTitles: ['Cust Num', 'Last Name', 'First Name', 'Client', 'Pay Type'],
    rows: [{
      cust_num: 10001,
      last_name: 'House',
      first_name: 'White',
      client: 'House, White',
      pay_type: 'check'
    }, {
      cust_num: 10002,
      last_name: 'Sanders',
      first_name: 'Bernie',
      client: 'Sanders, Bernie',
      pay_type: 'cc'
    }]
  }, {
    user: users[0],
    title: 'Subjects',
    columnTitles: ['Subject', 'Rate'],
    rows: [{
      subject: 'Algebra 2',
      rate: '88'
    }]
  }, {
    user: users[0],
    title: 'Tags',
    columnTitles: ['Tag', 'Charge', 'Pay', 'Charge Discount', 'Pay Discount'],
    rows: [{
      tag: 'after 5pm cancel',
      charge_discount: 50,
      pay_discount: 50
    }, {
      tag: 'same day booking',
      charge: 20,
      pay: 10
    }]
  }];

  return Sheet.createAsync(sheets);
}

var seedSpreadsheet = function(users, sheets) {

  var spreadsheet = {
    user: users[0],
    title: 'Sample Invoice Generator',
    category: 'Invoice Generator',
    sheets: sheets
  }

  return Spreadsheet.createAsync(spreadsheet);
}

connectToDb.then(function () {
  // User.findAsync({}).then(function (users) {
  //   if (users.length === 0) {
  //     return seedUsers();
  //   } else {
  //     console.log(chalk.magenta('Seems to already be user data, exiting!'));
  //     process.kill(0);
  //   }
  // }).then(function () {
  //   console.log(chalk.green('Seed successful!'));
  //   process.kill(0);
  // }).catch(function (err) {
  //   console.error(err);
  //   process.kill(1);
  // });
  var users;

  seedUsers()
  .then(function(u) {
    console.log(chalk.green('Seeded users!'));
    users = u;
    return seedSheets(users);
  }).then(function(sheets) {
    console.log(chalk.green('Seeded sheets!'));
    return seedSpreadsheet(users, sheets);
  }).then(function() {
    console.log(chalk.green('Seeded spreadsheet, all done!'));
    process.kill(0);
  }).catch(function(err) {
    console.error(err);
    process.kill(1);
  })
});
