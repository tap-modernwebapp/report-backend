var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var mongodb = require("mongodb");
var ObjectId = require('mongodb').ObjectId;

var url = 'mongodb://admin:Password123@ds139942.mlab.com:39942/reportsdb';
var app = express();
app.use(bodyParser.json());
var db;

var Report = require('./models/report');

var COLLECTION = 'reportsdb';

function handleError(res, reason, message, code) {
console.log("ERROR: " + reason);
res.status(code || 500).json({"error": message});
}

/* "/"
 * GET: to ensure that landing page is working
 */

app.get('/', function (req, res) {
  res.status(200).send('Report Backend is Working!')
})

/* "api/reports"
 * GET: find all reports
 * POST: creates a new report
 */

//PLACEHOLDER FUNCTION TO FIND ALL REPORTS
app.get('/api/reports', function(req, res) {

res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Methods', 'GET');

var query;
query = Report.find({});

query.exec(function (err, reports) {
  if (err) {
     handleError(res, err.message, "Failed to get reports.");
    }else{
     res.status(200).json(reports);
    }
  });
});

//PLACEHOLDER FUNCTION TO FIND ALL REPORTS AND RETURN DOCIDS
app.get('/api/reports_docids', function(req, res) {

res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Methods', 'GET');

var query;
query = Report.find({},'docid');
query.limit(100);

query.exec(function (err, reports) {
  if (err) {
     handleError(res, err.message, "Failed to get reports.");
    }else{
     res.status(200).json(reports);
    }
  });
});

//PLACEHOLDER FUNCTION TO CREATE A NEW REPORT
app.post('/api/reports', function(req, res) {

res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Methods', 'GET');

// var newReport = req.body;
 
// if (!req.body.title) {
// handleError(res, "Invalid report input", "Must provide title and report content.", 400);
// }

var newReport = Report({
  title: req.body.title,
  body: req.body.body,
  docid: req.body.docid,
  source: req.body.source,
  date: req.body.date
});

newReport.save(function(err) {
     if (err) {
     handleError(res, err.message, "Failed to create new report.");
     return res.send();
     } else{
     console.log(newReport);
     res.status(201).json(newReport);
    }
 });
});

/* "/api/reports/:id"
 * GET: find report by id
 * PUT: update report by id
 * DELETE: deletes report by id
*/

//PLACEHOLDER FUNCTION TO GET 1 REPORT
app.get('/api/reports/:id', function(req, res) {

res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

var query;
query = Report.find({'docid' : req.params.id});

query.exec(function (err, reports) {
  if (err) {
     handleError(res, err.message, "Failed to get reports.");
    }else{
     res.status(200).json(reports);
    }
  });
});

//PLACEHOLDER FUNCTION TO UPDATE 1 REPORT
app.put('/api/reports/:id', function(req, res) {

res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

var query   = { 'docid': req.params.id }; 
var update  = { title: req.body.title, body: req.body.body, source: req.body.source, date: req.body.date}; 

Report.findOneAndUpdate(query, update, function(err, report){ 
 if (err) {
   handleError(res, err.message, "Failed to get reports.")
    }else{
     res.status(200).json(report);
    }
  });
});

//PLACEHOLDER FUNCTION TO DELETE 1 REPORT
app.delete('/api/reports/:id', function(req, res) {

res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

Report.findOneAndRemove({ 'docid' : req.params.id }, function(err) {
  if (err)  {
     handleError(res, err.message, "Failed to get and delete report.");
  }else{
     res.status(200).json(req.params.id);
  }
 });
});

//PLACEHOLDER FUNCTION TO FIND ALL REPORTS
app.get('/api/test', function(req, res) {
res.status(200).json("Testing GET & POST methods"); 
});

//PLACEHOLDER FOR CONNECTING TO DATABASE & APP SERVER
var server = app.listen(8001, function() {
var port = server.address().port;
console.log("Started server at port", port);
});

var mongoose = require('mongoose');
mongoose.connect(url);
