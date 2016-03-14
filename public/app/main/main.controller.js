// public/app/main/main.controller.js

var main = angular.module('main.controller', []);

main.controller('main', 
    [
        '$scope',
        'mainService',
    function(
        $scope,
        mainService
    ) {
        $scope.main = {};

        mainService.startGame(); 


    }
]);
