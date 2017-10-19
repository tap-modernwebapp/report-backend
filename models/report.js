// ./models/report.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReportSchema = new Schema({
    body: { type: String },
    title: { type: String },
    source: { type: String },
    captureDatetime: { type: String },
    entities: String,
    docid: String
}, {collection: 'reportsdb'});

module.exports = mongoose.model('Report', ReportSchema);
