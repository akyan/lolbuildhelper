/**
 * Created by Akyan on 29/03/2015.
 */

module.exports = function(common, logger, config, app) {

    logger.log('Building routes');

    var RiotService = require('../controllers/riotservice');
    var rsservice = RiotService(config.riotApiConfig);

    app.use('/summoner', require('./summonerService')(common, logger, config, rsservice).router);
    app.use('/reference', require('./referenceService')(common, logger, config, rsservice).router);

    logger.log('Routes created');
};





