/**
 * Created by Akyan on 29/03/2015.
 */

function RiotService(riotapiconfig) {

  if (!(this instanceof RiotService)) {
    return new RiotService(riotapiconfig);
  }

  this.riotApiConfig = riotapiconfig;
}

function matchRegion(element, index, array, region) {

}

RiotService.prototype.findRegion = function(region) {

  var availableEndpoints = this.riotApiConfig.riotServiceEnpoints;

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
  var bob = this.findRegion(region);
  if (typeof bob === "undefined")
  {
    return false;
  }
  else
  {
    return true;
  }
};

module.exports = RiotService;