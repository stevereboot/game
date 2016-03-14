// public/app/shared/dropzone.directive.js

var dropzone = angular.module('dropzoneDirective', []);

dropzone.directive('dropZone',
	function() {
		return {
			restrict: 'A',
			scope: {
				file: '=',
				fileName: '=',
				fileSize: '=',
				fileCsv: '=',
				fileList: '=',
				fileJson: '='
			},
			link: function(scope, element, attrs) {
				var isTypeValid, processDragOverOrEnter, validMimeTypes;
				processDragOverOrEnter = function(event) {
					if (event != null) {
						event.preventDefault();
					}
					event.dataTransfer = event.originalEvent.dataTransfer;
					event.dataTransfer.effectAllowed = 'copy';
					return false;
				};
				validMimeTypes = attrs.dropZone;
				isTypeValid = function(type) {
					if ((validMimeTypes === (void 0) || validMimeTypes === '') || validMimeTypes.indexOf(type) > -1) {
						return true;
					} else {
						alert("Invalid file type.  File must be one of following types " + validMimeTypes);
						return false;
					}
				};
				element.bind('dragover', processDragOverOrEnter);
				element.bind('dragenter', processDragOverOrEnter);
				return element.bind('drop', function(event) {
					var file, name, reader, size, type;
					if (event != null) {
						event.preventDefault();
					}
					reader = new FileReader();
					reader.onload = function(evt) {
						if (isTypeValid(type)) {
							return scope.$apply(function() {
								scope.file = evt.target.result;
								if (angular.isString(scope.fileName)) {
									scope.fileName = name;
									scope.fileSize = size;

									// Parse Data URI
									var regex = /^data:.+\/(.+);base64,(.*)$/;
									var matches = scope.file.match(regex);
									var binData = matches[2];
									var csvData = atob(binData);

									scope.fileCsv = csvData;

									scope.fileList = CSVToArray(csvData);
									scope.fileList.pop();		// CSVToArray inserts an empty item at end

									// scope.fileJson = CSV2JSON(csvData);

									return scope;
								}
							});
						}
					};
					event.dataTransfer = event.originalEvent.dataTransfer;
					file = event.dataTransfer.files[0];
					name = file.name;
					type = file.type;
					size = file.size;
					reader.readAsDataURL(file);
					return false;
				});
			}
		};

		// Parse CSV to JSON
		function CSVToArray(strData, strDelimiter) {
		    // Check to see if the delimiter is defined. If not,
		    // then default to comma.
		    strDelimiter = (strDelimiter || ",");
		    // Create a regular expression to parse the CSV values.
		    var objPattern = new RegExp((
		    // Delimiters.
		    "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
		    // Quoted fields.
		    "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
		    // Standard fields.
		    "([^\"\\" + strDelimiter + "\\r\\n]*))"), "gi");
		    // Create an array to hold our data. Give the array
		    // a default empty first row.
		    var arrData = [[]];
		    // Create an array to hold our individual pattern
		    // matching groups.
		    var arrMatches = null;
		    // Keep looping over the regular expression matches
		    // until we can no longer find a match.
		    while (arrMatches = objPattern.exec(strData)) {
		        // Get the delimiter that was found.
		        var strMatchedDelimiter = arrMatches[1];
		        // Check to see if the given delimiter has a length
		        // (is not the start of string) and if it matches
		        // field delimiter. If id does not, then we know
		        // that this delimiter is a row delimiter.
		        if (strMatchedDelimiter.length && (strMatchedDelimiter != strDelimiter)) {
		            // Since we have reached a new row of data,
		            // add an empty row to our data array.
		            arrData.push([]);
		        }
		        // Now that we have our delimiter out of the way,
		        // let's check to see which kind of value we
		        // captured (quoted or unquoted).
		        if (arrMatches[2]) {
		            // We found a quoted value. When we capture
		            // this value, unescape any double quotes.
		            var strMatchedValue = arrMatches[2].replace(
		            new RegExp("\"\"", "g"), "\"");
		        } else {
		            // We found a non-quoted value.
		            var strMatchedValue = arrMatches[3];
		        }
		        // Now that we have our value string, let's add
		        // it to the data array.
		        arrData[arrData.length - 1].push(strMatchedValue);
		    }
		    // Return the parsed data.
		    return (arrData);
		}

		function CSV2JSON(csv) {
		    var array = CSVToArray(csv);
		    var objArray = [];
		    for (var i = 1; i < array.length; i++) {
		        objArray[i - 1] = {};
		        for (var k = 0; k < array[0].length && k < array[i].length; k++) {
		            var key = array[0][k];
		            objArray[i - 1][key] = array[i][k]
		        }
		    }

		    var json = JSON.stringify(objArray);
		    var str = json.replace(/},/g, "},\r\n");

		    return str;
		}
	}
);