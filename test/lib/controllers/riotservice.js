/**
 * Created by Akyan on 29/03/2015.
 */

var assert = require('assert');
var RiotService = require('../../../lib/controllers/riotservice');
var service = new RiotService(require('../../../lib/config').riotApiConfig);

describe('riotservice', function () {
  it('should return true for valid region euw', function(){
    assert.equal(service.isValidRegion('EUW'), true);
  })

  it('should return false for invalid region abc', function(){
    assert.equal(service.isValidRegion('abc'), false);
  })

  it('should return correct summoner details for Akyan when finding by name', function(done) {
    service.findSummonerByName('EUW', 'akyantor', function(result) {
      var summonerId = result.id;
      assert.equal(summonerId, '38422131', 'Summoner Id should be 38422131');
      done();
    });
  })
});
