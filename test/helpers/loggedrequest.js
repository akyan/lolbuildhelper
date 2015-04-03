/**
 * Created by Akyan on 01/04/2015.
 */
var assert = require('assert');

var logger = require('../../helpers/logger')('Logged Request Test');
var LoggedRequest = require('../../helpers/loggedrequest');
var requestor = LoggedRequest(logger);

describe('loggedrequest', function () {
  it('should remove key from url', function(){

    var cleanUrl = requestor.cleanUrlForLogging('https://euw.api.pvp.net/api/lol/euw/v1.4/summoner/by-name/akyantor?api_key=kjh54-h234-jh3-5134fasf-as4532hl');

    assert.equal(cleanUrl, 'https://euw.api.pvp.net/api/lol/euw/v1.4/summoner/by-name/akyantor');
  })

  it('should remove key from url with multiple parameters', function(){

    var cleanUrl = requestor.cleanUrlForLogging('https://euw.api.pvp.net/api/lol/euw/v1.4/summoner/by-name/akyantor?blah=gasd&api_key=kjh54-h234-jh3-5134fasf-as4532hl');

    assert.equal(cleanUrl, 'https://euw.api.pvp.net/api/lol/euw/v1.4/summoner/by-name/akyantor?blah=gasd');
  })
});