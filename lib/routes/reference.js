/**
 * Created by Akyan on 30/03/2015.
 */
module.exports = function(common, logger, config, riotservice) {

  var express = require('express');
  var router = express.Router();

  router.get('/', function(req,res) {
    res.json({ message: 'This service returns useful reference data.'});
  });

  router.get('/regions', function(req, res) {

    res.send(config.riotApiConfig.riotServiceEndpoints);

  });

  logger.log("Reference Routes Created");

  return {
    router: router
  };

}