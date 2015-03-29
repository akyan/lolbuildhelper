/**
 * Created by Akyan on 29/03/2015.
 */

module.exports = function(source) {

    if (typeof source === "undefined") {
        source = 'Unknown';
    }

    return {
        log: function (message) {
            console.log(source + ': ' + message);
        }
    }
};