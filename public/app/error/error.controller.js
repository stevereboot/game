// public/app/error.controller.js

var error = angular.module('error.controller', []);

error.controller('error', ['$scope', '$http', 'errorParams',
	function($scope, $http, errorParams) {
		$scope.code = errorParams.code;
		$scope.desc = errorParams.desc;
	}
]);