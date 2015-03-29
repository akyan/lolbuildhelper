/**
 * Created by Akyan on 29/03/2015.
 */

module.exports = function(common, logger, config, app) {

    logger.log('Building Routes');

    app.use('/summoner', require('./summoner')(common, config, logger, require('../controllers/summoners')).router);

    logger.log('Routes Created');
};





