var request = require("request");
var expect = require("chai").expect;

var service = "http://192.168.111.129:8001";
var apiCalls = "/api/reports_docids/";
var apiCalls2 = "/api/reports/";
var sampleReportId = "068115";

describe('Test Landing Page', function() {

it("Page Status", function(done) {
  request.get(service, function(error, res, body) {   
    expect(res.statusCode).to.equal(200);

    // THIS IS ASYNC
    done();
  });
});

it("Page Content", function(done) {
  request.get(service, function(error, request, body) {
    expect(body).contain("Working");

    // THIS IS ASYNC
    done();
  });
});

});

describe('Test APIs', function() {

this.timeout(10000);

it("Gets first 100 reports", function(done) {
  request.get(service+apiCalls, function(error, res, body) {
    expect(res.statusCode).to.equal(200);

    // THIS IS ASYNC
    done();
  });
});

it("Get sample report content", function(done) {
  request.get(service+apiCalls2+sampleReportId, function(error, request, body) {
    expect(body).contain("Bush");

    // THIS IS ASYNC
    done();
  });
});

});

