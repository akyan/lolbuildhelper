/**
 * Created by Akyan on 29/03/2015.
 */

exports.toJson = function (object) {
    return JSON.stringify(object);
}

exports.buildErrorJson = function(type, message)
{
  return {
    type: type,
    message: message
  }
};