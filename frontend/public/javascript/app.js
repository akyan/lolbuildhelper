

var buildFinderApp = angular.module('buildFinderApp', []);

buildFinderApp.serv

buildFinderApp.controller('titleCtrl', function($scope, $http) {

    var apiUrl = location.protocol + '//' + location.hostname + ':2424';

    $scope.title = 'LoL Build Assist';
    $scope.summonerSearch;
    $scope.summoner = null;

    $scope.search = function() {
        $http.get(apiUrl + '/summoner/euw/' + $scope.summonerSearch + '/champion')
            .success(function (data, status, headers, config) {
                $scope.summoner = data;
                console.log(data);
            })
            .error(function(data, status, headers, config) {
                $scope.summoner = null;
                console.log(JSON.stringify(headers));
            });
    }
});