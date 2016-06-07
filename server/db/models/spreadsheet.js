'use strict';
var mongoose = require('mongoose');
var Sheet = mongoose.model('Sheet');
var User = mongoose.model('User');
var Promise = require('bluebird');
var moment = require('moment');

var schema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['Invoice Generator', 'Main Sheets']
    },
    sheets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sheet'
    }]
});

schema.methods.addSheet = function() {
    var sheet, self = this;
    return Sheet.create({
        user: this.user
    }).then(function(s) {
        sheet = s;
        self.sheets.push(sheet);
        return self.save();
    }).then(function() {
        return sheet;
    });
}

schema.statics.copy = function(spreadsheet, userId) {
    var self = this;
    var promisesForSheets = spreadsheet.sheets.map(function(sheet) {
        return Sheet.copy(sheet, userId);
    });

    return Promise.all(promisesForSheets)
    .then(function(sheets) {
        return self.create({
            user: userId,
            title: spreadsheet.title,
            category: spreadsheet.category,
            sheets: sheets
        });
    });
}

schema.statics.makeSample = function(userId) {
    var self = this;
    return User.findOne({email: 'sample@sample.com'})
    .then(function(sampleUser) {
        return self.findOne({user: sampleUser._id}).populate('sheets')
    }).then(function(sampleSpreadsheet) {
        return self.copy(sampleSpreadsheet, userId);
    });
}

schema.statics.generateFromEvents = function(userId, allEvents, start, end) {
    var self = this;
    var billingPeriod = moment(start).format('MM/DD/YY') + '-' + moment(end).format('MM/DD/YY');
    return this.findOne({user: userId, category: 'Invoice Generator'}).populate('sheets')
    .then(function(invoiceGenerator) {
        var tutorsSheet = invoiceGenerator.sheets[0];
        var clientDiscountSheet = invoiceGenerator.sheets[1];
        var clientCustNumSheet = invoiceGenerator.sheets[2];
        var subjectsSheet = invoiceGenerator.sheets[3];
        var tagsSheet = invoiceGenerator.sheets[4];
        var mainSheet = new Sheet();
        mainSheet.user = userId;
        mainSheet.title = 'Appointment List';
        mainSheet.columnTitles = [
            'Date', //
            'Invoice Number',
            'Client', //
            'Student', //
            'Subject', //
            'Tutor', //
            'Location', //
            'Tag', //
            'Concatenated Title',
            'Hours', //
            'Sessions',
            'Rate', //
            'Dollars Added', //
            'Actual Rate', //
            'Percent Discount', //
            'Amount', //
            'Pay Rate', //
            'Extra Pay', //
            'Actual Pay Rate', //
            'Pay Amount', //
            'Comments' //
        ];
        mainSheet.rows = allEvents.map(function(event) {
            var row = {};
            row.date = event.start.dateTime.split('T')[0];
            // row.invoice_number
            var summary = event.summary.split(';');
            var description = event.description.split(';');
            row.student = summary[0].trim();
            row.subject = summary[1].trim();
            row.tag = summary[3] ? summary[3].trim().slice(1,-1) : '';

            var tutorData = tutorsSheet.rows.filter(function(tutorRow) {
                return tutorRow.username === summary[2].trim().toLowerCase();
            })[0];

            row.tutor = tutorData.tutor_name;
            row.pay_rate = +(tutorData.one_to_one_rate);

            row.client = description[0].trim();
            row.comments = description[1].trim();

            row.location = event.location;

            var start = Date.parse(event.start.dateTime);
            var end = Date.parse(event.end.dateTime);
            row.hours = (end-start)/1000/60/60;

            row.rate = +(subjectsSheet.rows.filter(function(subjRow) {
                return subjRow.subject === row.subject;
            })[0].rate);

            var tagDataArr = tagsSheet.rows.filter(function(tagRow) {
                return tagRow.tag === row.tag;
            });
            var tagData;
            if(tagDataArr.length) tagData = tagDataArr[0];
            if(tagData) {
                console.log('tagData', tagData)
                row.dollars_added = tagData.charge ? +(tagData.charge): 0;
                row.extra_pay = tagData.pay? +(tagData.pay) : 0;
                row.percent_discount = tagData.charge_discount ? +(tagData.charge_discount) : 0;
                var pay_discount = tagData.pay_discount ? +(tagData.pay_discount) : 0;
            } else {
                row.dollars_added = 0;
                row.extra_pay = 0;
                row.percent_discount = 0;
                var pay_discount = 0;
            }

            row.actual_rate = row.rate + row.dollars_added;
            row.amount = row.actual_rate*(1-row.percent_discount/100);

            row.actual_pay_rate = row.pay_rate + row.extra_pay;
            row.pay_amount = row.actual_pay_rate*(1 - pay_discount/100);
            console.log(row.pay_amount, row.actual_pay_rate, pay_discount)

            return row;
        });
        var sheets = [mainSheet];
        return Promise.map(sheets, function(sheet) {
            return sheet.save();
        });
    }).then(function(sheets) {
        return self.create({
            user: userId,
            title: billingPeriod,
            category: 'Main Sheets',
            sheets: sheets
        });
    });
}

mongoose.model('Spreadsheet', schema);
