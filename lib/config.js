/**
 * Created by Akyan on 29/03/2015.
 */

exports.riotApiConfig = require('./config/riotapiconfig');

var RiotServiceEndpoint = require('./models/RiotServiceEndpoint');

exports.riotApiConfig.riotServiceEndpoints = [
    new RiotServiceEndpoint('BR','BR1','br.api.pvp.net'),
    new RiotServiceEndpoint('EUNE','EUN1','eune.api.pvp.net'),
    new RiotServiceEndpoint('EUW','EUW1','euw.api.pvp.net'),
    new RiotServiceEndpoint('KR','KR','kr.api.pvp.net'),
    new RiotServiceEndpoint('LAN','LA1','lan.api.pvp.net'),
    new RiotServiceEndpoint('LAS','LA2','las.api.pvp.net'),
    new RiotServiceEndpoint('NA','NA1','na.api.pvp.net'),
    new RiotServiceEndpoint('OCE','OC1','oce.api.pvp.net'),
    new RiotServiceEndpoint('TR','TR1','tr.api.pvp.net'),
    new RiotServiceEndpoint('RU','RU','ru.api.pvp.net'),
    new RiotServiceEndpoint('PBE','PBE1','pbe.api.pvp.net'),
    new RiotServiceEndpoint('Global','GLOBAL','global.api.pvp.net')
];