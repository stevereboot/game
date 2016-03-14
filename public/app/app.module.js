// public/app/app.module.js

var thirdPartyApps = [
	'ui.router',
]

var sharedApps = [
	'toolsService'
]

var componentApps = [
	'appStates',
	'main.controller',
	'main.service',
	'error.controller',
	'nav.controller',

]

// Define App Module
var app = angular.module('appModule', [].concat(thirdPartyApps, sharedApps, componentApps));

// Run on app startup
// app.run([function() {
// }]);
