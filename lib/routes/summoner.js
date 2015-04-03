module.exports = function(common, logger, config, riotservice) {

    var express = require('express');
    var router = express.Router();

    router.get('/', function(req,res) {
        res.jsonp({ message: 'Request summoner details here', author: 'James Gawn'});
    });

    router.get('/:region/:name', function(req, res) {

      if(riotservice.isValidRegion(req.params.region))
      {
        riotservice.findSummonerByName(req.query.callback + req.params.region, req.params.name, function(result) {
          res.json(result);
        });
      }
      else
      {
        res.jsonp(common.buildErrorJson('Error', 'Please select a valid region.'));
      }

    });

    router.get('/:region/:name/champion', function(req, res) {

        if(riotservice.isValidRegion(req.params.region))
        {
            riotservice.findChampionBySummonerName(req.params.region, req.params.name, function(result) {
                res.json(result);
            });
        }
        else
        {
            res.jsonp(common.buildErrorJson('Error', 'Please select a valid region.'));
        }

    });

    logger.log("Summoner routes created");

    return {
        router: router
    };

}

