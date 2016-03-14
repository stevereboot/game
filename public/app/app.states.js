//public/app/app.states.js

var appStates = angular.module('appStates', []);

appStates.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider) {
        $stateProvider.
        state('main', {
            url: '',
            templateUrl: 'app/main/main.html',
            controller: 'main'
        }).
        state('error', {
            params: {
                code: 404,
                desc: 'Not Found'
            },
            templateUrl: 'app/error/err.html',
            controller: 'error',
            resolve: {
                errorParams: function($stateParams) {
                    return $stateParams;
                }
            }
        });

        $urlRouterProvider.otherwise(function($injector, $location) {
            var state = $injector.get('$state');
            state.go('error');
        });

        // $locationProvider.html5Mode(true);
    }
]);
