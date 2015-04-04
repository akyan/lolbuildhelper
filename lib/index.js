/**
 * Created by Akyan on 29/03/2015.
 */

module.exports = function(config) {
    var express = require('express');
    var apiApp = express();
    var logger = require('../helpers/logger')('API Service');
    var common = require('../helpers/common');

    logger.log('Starting Up');

    var router = express.Router();

    require('./routes')(common, logger, config, router);

    router.get('/', function (req, res) {
        res.json({message: 'Nothing to see here', author: 'James Gawn'});
    });

    // Ensure front end can access JSON services by adding necessary CORS headers
    apiApp.use('/', function (req, res, next) {

        if (config.frontend.port == 80)
        {
            res.header('Access-Control-Allow-Origin', 'http://' + req.hostname);
        }
        else
        {
            res.header('Access-Control-Allow-Origin', 'http://' + req.hostname + ':' + config.frontend.port);
        }

        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        next();
    })

    apiApp.use('/', router);

    //apiApp.listen(config.api.port);
    logger.log('Started on port ' + config.api.port);
}