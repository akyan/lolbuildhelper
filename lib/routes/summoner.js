module.exports = function(common, config, logger, controller) {

    var express = require('express');

    var router = express.Router();

    router.get('/', function(req,res) {
        res.json({ message: 'Request summoner details here', author: 'James Gawn'});
    });

    router.get('/:name', function(req, res) {

        try {
            res.send({name:req.param.name, notes: 'poes'});
        }
        catch (error)
        {
            res.send({name:req.param.name, notes: 'poes'});
        }

    });

    logger.log("Summoner Routes Created");

    return {
        router: router
    };

}

