'use strict';

var fs = require('fs');
var http = require('http');
var soap = require('strong-soap').soap;

var services = require('./soap-service');
var xml = require('fs').readFileSync('service.wsdl', 'utf8')

var server = http.createServer(function(req, res) {
  res.statusCoade = 404;
  res.end();
});

server.listen(8000);
soap.listen(server, '/service', services, xml);

module.exports = server;
