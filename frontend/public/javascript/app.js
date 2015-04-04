var buildFinderApp = angular.module('buildFinderApp', []);

buildFinderApp.controller('titleCtrl', function($scope, $http) {

    $http.get('./javascript/config.js')
        .success(function(data, status, headers, config) {

            var apiUrl = location.protocol + '//' + location.hostname + ':' + data.port;

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
});