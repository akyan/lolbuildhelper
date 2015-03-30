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
});
