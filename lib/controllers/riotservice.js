/**
 * Created by Akyan on 29/03/2015.
 */
var readyForUse = false;
var logger = require('../../helpers/logger')('RiotService');
var loggedrequest = require('../../helpers/loggedrequest')(logger);
var async = require('async');
var sf = require('sf');
var riotApiConfig;

// Data Cache
var champions = [];

function RiotService(riotapiconfig) {

  if (!(this instanceof RiotService)) {
    return new RiotService(riotapiconfig);
  }

  riotApiConfig = riotapiconfig;

  // Pre-loading useful reference data from riots services
  var self = this;
  logger.log('Reference data pre-load started');
  async.each(riotApiConfig.riotServiceEndpoints, function(endpoint, callback) {

    var builtUrl = self.buildEndpointUrl(riotApiConfig.riotServiceMethods['champions'], {region: endpoint.region});
    loggedrequest.request({url: builtUrl, json:true}, function(err, res, json) {
      if (err) {
        throw err;
      }

      champions[endpoint.region] = json;
      callback();
    });

  }, function(err) {

    readyForUse = true;
    logger.log('Reference data pre-load completed');

  })

  }

RiotService.prototype.isReadyForRequests = function()
{
  return readyForUse;
}

RiotService.prototype.buildEndpointUrl = function(url, inputs)
{
  var builtUrl = sf(url, inputs);
  return builtUrl;
}

RiotService.prototype.findRegion = function(region) {

  var availableEndpoints = riotApiConfig.riotServiceEndpoints;

  for (var i = 0; i<availableEndpoints.length;i++)
  {
    if (availableEndpoints[i].region === region)
    {
      return availableEndpoints[i];
    }
  }
  return undefined;
};

RiotService.prototype.isValidRegion = function(region) {
  var rawRegion = this.findRegion(region);
  if (typeof rawRegion === "undefined")
  {
    return false;
  }
  else
  {
    return true;
  }
};

RiotService.prototype.findSummonerByName = function(region, name, callback)
{
  if (readyForUse)
  {
    var builtUrl = this.buildEndpointUrl(riotApiConfig.riotServiceMethods['summonerByName'], {region: region, name: name});

    loggedrequest.request({url: builtUrl, json: true}, function(err, res, json) {
      if (err) {
        throw err;
      }

      if (typeof json.status != "undefined")
      {
        callback(json.status)
      }
      else
      {
        var summoner = json[name];

        if (typeof summoner === "undefined")
        {
          callback({message: 'Summoner not found', status_code: 404});
        }
        else
        {
          callback(summoner);
        }
      }
    })

  } else {
    callback({message: 'Services not yet ready', status_code: 503});
  }
};


module.exports = RiotService;