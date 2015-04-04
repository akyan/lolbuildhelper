/**
 * Created by Akyan on 29/03/2015.
 */

function checkEnvVariableIsValidOrWarn(name, warning)
{
    if (typeof process.env[name] === 'undefined')
    {
        var error = 'Configuration: You must set environment variable ' + name + ' for this application to start.';
        console.log(error);
        process.exit(1)
    }
}

checkEnvVariableIsValidOrWarn('RIOT_API_KEY');
checkEnvVariableIsValidOrWarn('UI_PORT');
checkEnvVariableIsValidOrWarn('API_PORT');

exports.frontend = {
    port: process.env.UI_PORT
}

exports.api = {
    port: process.env.API_PORT
}

exports.riotApiConfig = {
    accesskey: process.env.RIOT_API_KEY
};

var RiotServiceEndpoint = require('./lib/models/RiotServiceEndpoint');

exports.riotApiConfig.riotServiceEndpoints = [
    new RiotServiceEndpoint('br','BR1','br.api.pvp.net'),
    new RiotServiceEndpoint('eune','EUN1','eune.api.pvp.net'),
    new RiotServiceEndpoint('euw','EUW1','euw.api.pvp.net'),
    new RiotServiceEndpoint('kr','KR','kr.api.pvp.net'),
    new RiotServiceEndpoint('lan','LA1','lan.api.pvp.net'),
    new RiotServiceEndpoint('las','LA2','las.api.pvp.net'),
    new RiotServiceEndpoint('na','NA1','na.api.pvp.net'),
    new RiotServiceEndpoint('oce','OC1','oce.api.pvp.net'),
    new RiotServiceEndpoint('tr','TR1','tr.api.pvp.net'),
    new RiotServiceEndpoint('ru','RU','ru.api.pvp.net')/*,
    new RiotServiceEndpoint('pbe','PBE1','pbe.api.pvp.net'),
    new RiotServiceEndpoint('global','GLOBAL','global.api.pvp.net')*/
];

exports.riotApiConfig.riotServiceMethods = [];
exports.riotApiConfig.riotServiceMethods['summonerByName'] = 'https://{region}.api.pvp.net/api/lol/{region}/v1.4/summoner/by-name/{name}?api_key='+exports.riotApiConfig.accesskey;
exports.riotApiConfig.riotServiceMethods['champions'] = 'https://global.api.pvp.net/api/lol/static-data/{region}/v1.2/champion?dataById=true&api_key='+exports.riotApiConfig.accesskey;
exports.riotApiConfig.riotServiceMethods['currentGame'] = 'https://{region}.api.pvp.net/observer-mode/rest/consumer/getSpectatorGameInfo/{platform}/{summonerId}?api_key='+exports.riotApiConfig.accesskey;