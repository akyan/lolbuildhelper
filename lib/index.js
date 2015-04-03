/**
 * Created by Akyan on 29/03/2015.
 */
var express = require('express');
var apiApp = express();
var logger = require('../helpers/logger')('API Service');
var common = require('../helpers/common');
var config = require('./config');

logger.log('Starting Up');

var router = express.Router();

require('./routes')(common, logger, config, router);

router.get('/', function(req,res) {
    res.json({ message: 'Nothing to see here', author: 'James Gawn'});
});

// Ensure front end can access JSON services by adding necessary CORS headers
apiApp.use('/', function(req, res, next) {


    res.header('Access-Control-Allow-Origin', 'http://'+ req.hostname +':8081');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
})

apiApp.use('/', router);

//apiApp.use('/', router);

apiApp.listen(2424);

logger.log('Started');