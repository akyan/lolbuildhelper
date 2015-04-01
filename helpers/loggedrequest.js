/**
 * Created by Akyan on 01/04/2015.
 */

function LoggedRequest(logger) {

  if (!(this instanceof LoggedRequest)) {
    return new LoggedRequest(logger);
  }
  this.requestlib = require('request');
  this.logger = logger;

};

LoggedRequest.prototype.cleanUrlForLogging = function (url) {
  var i = url.indexOf('?api_key');
  var cleanstring = url.substr(0,i);
  return cleanstring;
};

LoggedRequest.prototype.request = function (options, callback) {
  var logger = this.logger;
  var stripper = this.cleanUrlForLogging;
  logger.log('Starting call to ' + stripper(options.url));
  var startTime = Date.now();

  this.requestlib(options, function(err, res, json) {
    var endTime = Date.now();
    var difference = endTime - startTime;

    logger.log('Completed call to ' + stripper(options.url) + ' in ' + difference + 'ms');
      callback(err, res, json);
    });

};

module.exports = LoggedRequest;