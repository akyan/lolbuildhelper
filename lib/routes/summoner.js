module.exports = function(common, logger, config, riotservice) {

    var express = require('express');
    var router = express.Router();

    router.get('/', function(req,res) {
        res.json({ message: 'Request summoner details here', author: 'James Gawn'});
    });

    router.get('/:region/:name', function(req, res) {

      if(riotservice.isValidRegion(req.params.region))
      {
        riotservice.findSummonerByName(req.params.region, req.params.name, function(result) {
          res.send(result);
        });
      }
      else
      {
        res.send(common.buildErrorJson('Error', 'Please select a valid region.'));
      }

    });

    logger.log("Summoner Routes Created");

    return {
        router: router
    };

}

