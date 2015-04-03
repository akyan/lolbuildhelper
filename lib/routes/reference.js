/**
 * Created by Akyan on 30/03/2015.
 */
module.exports = function(common, logger, config, riotservice) {

  var express = require('express');
  var router = express.Router();
  var loggedrequest = require('../../helpers/loggedrequest')(logger);

  router.get('/', function(req,res) {
    res.json({ message: 'This service returns useful reference data.'});
  });

  router.get('/regions', function(req, res) {

    res.json(config.riotApiConfig.riotServiceEndpoints);

  });

  logger.log("Reference routes created");

  return {
    router: router
  };

}