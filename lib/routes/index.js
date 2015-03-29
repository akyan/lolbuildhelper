/**
 * Created by Akyan on 29/03/2015.
 */

module.exports = function(common, logger, config, app) {

    logger.log('Building Routes');

    var riotservice = require('../controllers/riotservice');

    app.use('/summoner', require('./summoner')(common, logger, config, riotservice).router);

    logger.log('Routes Created');
};





