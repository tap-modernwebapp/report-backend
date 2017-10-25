var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var mongodb = require("mongodb");
var ObjectId = require('mongodb').ObjectId;
var cors = require('cors');
const cookieParser = require('cookie-parser');

var url = 'mongodb://admin:Password123@ds139942.mlab.com:39942/reportsdb';
var app = express();
var VerifyToken = require('./auth/VerifyToken');

var whitelist = ['http://localhost:8001', 'http://35.197.155.91:8080', 'http://35.201.124.147'];
var corsOptions = {
  origin: function (origin, callback) {
    if (origin === undefined || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }, credentials: true
}

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json());

var db;

var Report = require('./models/report');

var COLLECTION = 'reportsdb';

function convertToEpoch(datetime){
process.env.TZ = 'GMT-8';
var dateTaken = new Date(datetime);
var myEpochDate = dateTaken.getTime()/1000.0;

return myEpochDate;
}

function convertToDate(datetime){
process.env.TZ = 'GMT-8';
var dateConverted = new Date(datetime * 1000);
var newDate = dateConverted.getDate() + '/' + (dateConverted.getMonth() + 1) + '/' + dateConverted.getFullYear();

return newDate;
}


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
app.post('/api/reports', VerifyToken, function(req, res) {
res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
res.setHeader("Accept", "application/json");
res.setHeader("Content-Type", "application/json");

var myEpochDate = convertToEpoch(req.body.captureDatetime);

var newReport = Report({
  title: req.body.title,
  content: req.body.content,
  docid: req.body.docid,
  source: req.body.source,
  captureDatetime: myEpochDate
});

newReport.save(function(err) {
     if (err) {
     handleError(res, err.message, "Failed to create new report." + err);
     res.status(400).json();
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

function convertManager(reports) {
//console.log(reports);
var temp = reports[0].captureDatetime;
if (temp) {
reports[0].captureDatetime = convertToDate(temp);
return reports;
}
}

//PLACEHOLDER FUNCTION TO GET 1 REPORT
app.get('/api/reports/:id', VerifyToken, function(req, res) {
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

var query;
query = Report.find({'docid' : req.params.id});

query.exec(function (err, reports) {
  if (err) {
    handleError(res, err.message, "Failed to get reports.");
    }else{
//     res.status(200).json(reports);
       res.status(200).json(convertManager(reports));
    }
  });
});

//PLACEHOLDER FUNCTION TO UPDATE 1 REPORT
app.put('/api/reports/:id', VerifyToken, function(req, res) {
res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
res.setHeader("Accept", "application/json");
res.setHeader("Content-Type", "application/json");

var query   = { 'docid': req.params.id }; 
var update  = { title: req.body.title, content: req.body.content, source: req.body.source, captureDatetime: convertToEpoch(req.body.captureDatetime) }; 

Report.findOneAndUpdate(query, update, function(err, report){ 
 if (err) {
   handleError(res, err.message, "Failed to get reports.")
    }else{
     res.status(200).json(report);
    }
  });
});

//PLACEHOLDER FUNCTION TO DELETE 1 REPORT
app.delete('/api/reports/:id', VerifyToken, function(req, res) {
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
app.get('/api/test', VerifyToken, function(req, res) {
res.status(200).json("Testing GET & POST methods"); 
});

//PLACEHOLDER FOR CONNECTING TO DATABASE & APP SERVER
var server = app.listen(8001, function() {
var port = server.address().port;
console.log("Started server at port", port);
});

var mongoose = require('mongoose');
mongoose.connect(url);
