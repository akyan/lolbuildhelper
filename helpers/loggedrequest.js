/**
 * Created by Akyan on 01/04/2015.
 */

var requestlib = require('request');
var logger;

function LoggedRequest(logger) {

  if (!(this instanceof LoggedRequest)) {
    return new LoggedRequest(logger);
  }
  this.logger = logger;

};

LoggedRequest.prototype.cleanUrlForLogging = function (url) {
  var i = url.indexOf('api_key');
  if (i!=-1)
  {
    return url.substr(0,i-1);
  }
  else
  {
    return url;
  }
};

LoggedRequest.prototype.request = function (options, callback) {
  var logger = this.logger;
  var stripper = this.cleanUrlForLogging;
  logger.log('Starting call to ' + stripper(options.url));
  var startTime = Date.now();

  requestlib(options, function(err, res, json) {
    var endTime = Date.now();
    var difference = endTime - startTime;

    logger.log('Completed call to ' + stripper(options.url) + ' in ' + difference + 'ms');
      callback(err, res, json);
    });

};

module.exports = LoggedRequest;