/**
 * Created by Akyan on 29/03/2015.
 */

var assert = require('assert');
var riotservice = require('../../../lib/controllers/riotservice');

describe('riotservice', function () {
  it('should return true for valid region euw', function(){
    assert.equal(riotservice.isValidRegion('euw'), true);
  })

  it('should return false for invalid region abc', function(){
    assert.equal(riotservice.isValidRegion('abc'), false);
  })
});
