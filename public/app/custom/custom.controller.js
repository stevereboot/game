// public/app/custom/custom.controller.js

var custom = angular.module('custom.controller', []);

custom.controller('custom', 
	[
		'$scope',
		'$http',
		'customService',
		'toolsService',
	function(
		$scope,
		$http,
		customService,
		toolsService
	) {
		$scope.custom = {};
		$scope.custom.assets = {}
		$scope.custom.assets.list = [];

		$scope.custom.cashflow = {}

		// Startup
		loadAssets();

		// Dropzone
		var clearDropzone = function() {
			$scope.custom.dropzone = {
				fileName: '',
				fileSize: '',
				fileCsv: '',
				fileList: '',
				fileJson: ''
			}
		}

		clearDropzone();

		// Watch for changes to dropzone
		$scope.$watch('custom.dropzone.fileCsv', function(newValue, oldValue) {
			if ($scope.custom.dropzone.fileCsv) {
				// Only display 10 rows
				$scope.custom.assets.data = $scope.custom.dropzone.fileList.slice(0, 10);
			}
		});



		$scope.custom.assets.paste = function() {
			var raw = $scope.custom.assets.pasted;
			var data = toolsService.importExcelString(raw);
			$scope.custom.assets.data = data;
		}


		function loadAssets() {
			customService.loadAssetsList().then(function(resp) {
				data = resp.data;
				for (var i in data) {
					$scope.custom.assets.list.push({
						_id: data[i]._id,
						name: data[i].name,
						date: toolsService.getDateTime(data[i]._id)
					});
				}
			});
		}

		$scope.custom.assets.save = function() {
			var name = $scope.custom.assets.name || toolsService.defaultName('Assets_');

			// customService.saveAssets(name, $scope.custom.assets.data).then(function(resp) {
			customService.saveAssets(name, $scope.custom.dropzone.fileCsv).then(function(resp) {
				console.log('Assets added.')
				data = resp.data;

				// Add to existing list of assets
				$scope.custom.assets.list.push({
					_id: data._id,
					name: data.name,
					date: toolsService.getDateTime(data._id)
				});

				$scope.custom.assets.pasted = '';
				$scope.custom.assets.name = '';
			});
		}

		$scope.custom.assets.load = function(_id) {
			customService.loadAssets(_id).then(function(resp) {
				console.log('Assets loaded');
				console.log(resp.data.assets)
			});
		}		

		$scope.custom.assets.delete = function(_id, index) {
			customService.deleteAssets(_id).then(function(resp) {
				console.log('Assets deleted');
				$scope.custom.assets.list.splice(index, 1);
			});
		}

		$scope.custom.cashflow.run = function() {
			customService.runCashflow().then(function(resp) {
				console.log(resp);
			});
		}


	}
]);
