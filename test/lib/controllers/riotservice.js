/**
 * Created by Akyan on 29/03/2015.
 */

var assert = require('assert');
var RiotService = require('../../../lib/controllers/riotservice');
var config = require('../../../lib/config');
var service = new RiotService(config.riotApiConfig);

describe('riotservice', function () {

  // Riot service pre-loading of cache takes a while to start, so give it up-to 10 seconds.
  before(function(done) {
    this.timeout(10000);
    var repeater = setInterval(function () {
      if (service.isReadyForRequests())
      {
        clearInterval(repeater);
        done();
      }
    }, 1000);
  })

  it('should return valid formated URL for region', function(){
    var url = service.buildEndpointUrl(config.riotApiConfig.riotServiceMethods['summonerByName'], {region: 'euw', name: 'akyantor'});
    assert.equal(url, 'https://euw.api.pvp.net/api/lol/euw/v1.4/summoner/by-name/akyantor?api_key='+config.riotApiConfig.accesskey);
  })

  it('should return true for valid region euw', function(){
    assert.equal(service.isValidRegion('euw'), true);
  })

  it('should return false for invalid region abc', function(){
    assert.equal(service.isValidRegion('abc'), false);
  })

  it('should return correct summoner details for akyantor when finding by name', function(done) {
    service.findSummonerByName('euw', 'akyantor', function(result) {
      var summonerId = result.id;
      assert.equal(summonerId, '40397382', 'Summoner Id should be 40397382');
      done();
    });
  })
});
