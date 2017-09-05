// ./models/report.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReportSchema = new Schema({
    body: { type: String, required: true },
    title: { type: String, required: true },
    source: { type: String, required: true },
    date: { type: Date, required: true },
    entities: String,
    docid: String
}, {collection: 'reportsdb'});

module.exports = mongoose.model('Report', ReportSchema);
