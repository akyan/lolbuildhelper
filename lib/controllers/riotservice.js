/**
 * Created by Akyan on 29/03/2015.
 */


function RiotService(riotapiconfig) {

  if (!(this instanceof RiotService)) {
    return new RiotService(riotapiconfig);
  }

  this.riotApiConfig = riotapiconfig;
  this.logger = require('../../helpers/logger')('RiotService');
  var LoggedRequest = require('../../helpers/loggedrequest');
  this.loggedrequest = LoggedRequest(this.logger);
}

RiotService.prototype.findRegion = function(region) {

  var availableEndpoints = this.riotApiConfig.riotServiceEndpoints;

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
  this.loggedrequest.request({url: 'https://'+region+'.api.pvp.net/api/lol/'+region+'/v1.4/summoner/by-name/'+name+'?api_key=f14c2686-1bd3-4481-9842-96b8131b762f', json: true}, function(err, res, json) {
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
};

module.exports = RiotService;