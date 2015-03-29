var express = require('express');
var path = require('path');
var webApp = express();
var logger = require('../helpers/logger')('Front End');

logger.log('Starting Up');

webApp.use(express.static(path.join(__dirname, './public')));
webApp.listen(8081);

logger.log('Started');
