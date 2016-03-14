// public/app/nav/nav.controller.js

var nav = angular.module('nav.controller', []);

nav.controller('nav', ['$scope', '$http', '$location',
	function($scope, $http, $location) {
		$scope.isActive = function (viewLocation) {
			return viewLocation === $location.path();
		};
	}
]);