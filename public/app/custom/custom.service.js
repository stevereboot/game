// public/app/custom/custom.service.js

var customSvc = angular.module('custom.service', []);

customSvc.service('customService', ['$http',
	function($http) {
		
		this.saveAssets = function(name, assets) {
			// Save assets
			return $http.post('/api/custom/asset/create', {
				name: name,
				assets: assets
			});
		}

		this.loadAssets = function(_id) {
			// Load assets
			return $http.get('/api/custom/asset/get/' + _id);
		}		

		this.deleteAssets = function(_id) {
			// Delete assets
			return $http.delete('/api/custom/asset/delete/' + _id);
		}

		this.loadAssetsList = function() {
			// Load list of assets
			return $http.get('/api/custom/asset/list');
		}

		this.runCashflow = function() {
			// Run cashflow
			return $http.post('/api/custom/cashflow/run', {
				asset_id: 'foo',
				structure_id: 'bar'
			});
		}


	}
]);
