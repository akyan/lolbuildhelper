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

RiotService.prototype.findChampionById = function(region, championId) {
  var championsForRegion = champions[region].data;

  if (typeof championsForRegion === 'undefined')
  {
    this.logger.log('Unable to find champion list for region ('+region+')');
  }
  else
  {
    var champion = championsForRegion[championId];
    if (typeof champion === 'undefined')
    {
      this.logger.log('Unable to find champion ('+championId+') details for region ('+region+')');
    }
    else
    {
      return champion;
    }
  }


}

RiotService.prototype.findSummonerByName = function(region, name, callback)
{
  if (readyForUse)
  {
    var builtUrl = this.buildEndpointUrl(riotApiConfig.riotServiceMethods['summonerByName'], {region: region, name: name});
    var cleanName = name.replace(' ', '').toLowerCase();

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
        var summoner = json[cleanName];

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

RiotService.prototype.findChampionBySummonerName = function(region, name, callback)
{
  if (readyForUse)
  {
    var endpoint = this.findRegion(region);

    var self = this;

    this.findSummonerByName(region,name,function(summonerResult) {

      if (typeof summonerResult.status != "undefined")
      {
        callback(summonerResult.status)
      }
      else
      {
        var builtUrl = self.buildEndpointUrl(riotApiConfig.riotServiceMethods['currentGame'], {region: endpoint.region, platform: endpoint.platformId, summonerId: summonerResult.id});
        loggedrequest.request({url: builtUrl, json: true}, function(err, res, json) {

          if (err) {
            throw err;
          }

          if (typeof json.status != "undefined")
          {
            callback(json.status)
          }
          else if (res.statusCode != 200)
          {
            callback({status_code: '404', message: 'Summoner is not currently in a game'});
          }
          else
          {
            for (i = 0; i < json.participants.length; i++)
            {
              var participant = json.participants[i];
              if (participant.summonerId = summonerResult.id)
              {
                callback({
                  summonerId: participant.summonerId,
                  summonerName: participant.summonerName,
                  championId: participant.championId,
                  championName: self.findChampionById(endpoint.region, participant.championId).name,
                  profileIconId: participant.profileIconId,
                  runes: participant.runes,
                  masteries: participant.masteries
                });
                return;
              }
            }
          }

        });
      }
    })
  } else {
    callback({message: 'Services not yet ready', status_code: 503});
  }

};

module.exports = RiotService;