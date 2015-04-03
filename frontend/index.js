var express = require('express');
var path = require('path');
var webApp = express();
var logger = require('../helpers/logger')('Front End');

logger.log('Starting Up');

webApp.use(express.static(path.join(__dirname, './public')));

// Adding any npm loaded modules to be available for use via public facing site where appropriate.
webApp.use('/javascript/angular.min.js', function (req, res, next) {
    res.sendFile(path.join(__dirname,'../node_modules/angular/angular.min.js'));
})

webApp.use('/javascript/angular.min.js.map', function (req, res, next) {
    res.sendFile(path.join(__dirname,'../node_modules/angular/angular.min.js.map'));
})

webApp.use('/javascript/angular-resource.min.js', function (req, res, next) {
    res.sendFile(path.join(__dirname,'../node_modules/angular-resource/angular-resource.min.js'));
})

webApp.use('/javascript/angular-resource.min.js.map', function (req, res, next) {
    res.sendFile(path.join(__dirname,'../node_modules/angular-resource/angular-resource.min.js.map'));
})

webApp.listen(8081);

logger.log('Started');
