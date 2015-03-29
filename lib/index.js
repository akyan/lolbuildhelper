/**
 * Created by Akyan on 29/03/2015.
 */
var express = require('express');
var apiApp = express();
var logger = require('../helpers/logger')('API Service');
logger.log('Starting Up');

var router = express.Router();

require('./routes')(logger, router);

router.get('/', function(req,res) {
    res.json({ message: 'Nothing to see here', author: 'James Gawn'});
});

apiApp.use('/', router);

apiApp.listen(2424);

logger.log('Started');