/**
 * Created by Akyan on 29/03/2015.
 */
var config = require('./config');

var frontEndApp = require('./frontend')(config);

var apiApp = require('./lib')(config);
