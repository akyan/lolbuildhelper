/**
 * Created by Akyan on 29/03/2015.
 */

module.exports = function(logger, app) {

    logger.log('Building Routes');

    app.use('/summoner', require('./summoner')(logger).router);

    logger.log('Routes Created');
};





