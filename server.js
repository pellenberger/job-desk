#!/bin/env node
//  OpenShift sample Node application
var http = require('http');
var request = require('request');
// Scope
var express = require('express');
var app = express();

// Get the environment variables we need.
var ipaddr  = process.env.OPENSHIFT_NODEJS_IP || "localhost";
var port    = process.env.OPENSHIFT_NODEJS_PORT || 9000;

// Set proxies
function setProxy(host, location) {
  app.use(location, function(req, res) {
    var url = host + location + req.url;
    req.pipe(request(url)).pipe(res);
  });
}
var host = 'http://arrlee.jobarea.ch';
setProxy(host, '/jobdesk');
setProxy(host, '/arrlee');

// Set cache manifest route
app.get('/*.appcache', function(req, res) {
  res.header('Content-Type', 'text/cache-manifest');
  res.end('CACHE MANIFEST');
});

app.use(express.static(process.cwd()));

http.createServer(app).listen(port, ipaddr);

console.log("Server running at http://" + ipaddr + ":" + port + "/");
