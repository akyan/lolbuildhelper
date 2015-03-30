module.exports = function(common, logger, config, riotservice) {

    var express = require('express');
    var router = express.Router();

    router.get('/', function(req,res) {
        res.json({ message: 'Request summoner details here', author: 'James Gawn'});
    });

    router.get('/:region/:name', function(req, res) {

      console.log('Valid region? ' + riotservice.isValidRegion(req.params.region));

        try {
            res.send({name:req.params.name, notes: 'poes'});
        }
        catch (error)
        {
            res.send({name:req.params.name, notes: 'poes'});
        }

    });

    logger.log("Summoner Routes Created");

    return {
        router: router
    };

}

