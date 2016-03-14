// public/app/shared/chart.service.js

var chart = angular.module('chartService', []);

chart.service('chartSvc', [
	function() {

		// Flags
		// var aggFlag;

		// var addAggLine = function() {
		// 	var series = percentData(chartData.detail.series);

		// 	var chartSeries = [];
		// 	for (i in series) {
		// 		chartSeries.push({
		// 			type: 'column',
		// 			name: chartData.detail.seriesNames[i],
		// 			data: series[i]
		// 		});
		// 	}

		// 	// Calc agg data
		// 	var agg = [aggregateData(chartData.detail.series)];

		// 	var aggSeries = percentData(agg);

		// 	for (i in aggSeries) {
		// 		chartSeries.push({
		// 			name: 'Portfolio Aggregate',
		// 			data: aggSeries[i]
		// 		});
		// 	}

		// 	var chartxAxis = {
		// 		categories: chartData.detail.xAxis
		// 	}

		// 	renderChart(chartxAxis, chartSeries);
		// }

		// var addPortAggLine = function(portID) {
		// 	getChartData('56941e1cc48ef6086104cc16', function(data) {

		// 		var agg1 = [aggregateData(chartData.detail.series)];

		// 		var series = percentData(agg1);

		// 		// Merge the x-axis, cohort rules
		// 		for (var i = 0; i < series.length; i++) {
		// 			var newData = [];
		// 			for (var j = 0; j < data.detail.xAxis.length; j++) {
		// 				var v = series[i][chartData.detail.xAxis.indexOf(data.detail.xAxis[j])];
		// 				if (v == undefined) {
		// 					newData.push(0);
		// 				} else {
		// 					newData.push(v);
		// 				}
		// 			}
		// 			series[i] = newData;
		// 		}

		// 		var chartSeries = [];
		// 		for (i in series) {
		// 			chartSeries.push({
		// 				type: 'column',
		// 				name: 'Portfolio Aggregate',
		// 				data: series[i]
		// 			});
		// 		}

		// 		var agg = [aggregateData(data.detail.series)];

		// 		var aggSeries = percentData(agg);

		// 		for (i in aggSeries) {
		// 			chartSeries.push({
		// 				name: '56941e1cc48ef6086104cc16' + ' Aggregate',
		// 				data: aggSeries[i],
		// 				lineWidth: 0,
		// 				marker: {
		// 					lineWidth: 1,
		// 					lineColor: Highcharts.getOptions().colors[3],
		// 					fillColor: 'white'
		// 				}								
		// 			});
		// 		}

		// 		var chartxAxis = {
		// 			categories: data.detail.xAxis
		// 		}

		// 		renderChart(chartxAxis, chartSeries);
		
		// 	});
		// }

		// var aggregateData = function(series) {
		// 	var agg = [];
		// 	for (var i = 0; i < series[0].length; i++) {
		// 		agg.push(null);
		// 		for (var j = 0; j < series.length; j++) {
		// 			agg[i] += series[j][i];
		// 		}
		// 	}
		// 	return agg;
		// }

		// var percentData = function(series) {
		// 	// Convert series data balance to percentage
		// 	var sd = [];
		// 	for (i in series) {
		// 		var sum = series[i].reduce(function(pv, cv) { return pv + cv; }, 0) || 1;
		// 		var perc = series[i].map(function(d) {
		// 			return (d / sum) * 100;
		// 		});
		// 		sd.push(perc);
		// 	}
		// 	return sd;
		// }

		// var aggChart = function() {
		// 	var aggFlag = true;

		// 	var agg = [aggregateData(chartData.detail.series)];

		// 	var series = percentData(agg);

		// 	var chartSeries = [];
		// 	for (i in series) {
		// 		chartSeries.push({
		// 			type: 'column',
		// 			name: 'Portfolio Aggregate',
		// 			data: series[i]
		// 		});
		// 	}				

		// 	var chartxAxis = {
		// 		categories: chartData.detail.xAxis
		// 	}

		// 	renderChart(chartxAxis, chartSeries);
		// }


		this.renderChart = function(id, series, xAxis, yAxis, chartType, tooltip, legend) {
			var chartType = typeof chartType !== 'undefined' ?  chartType : {};
			var tooltip = typeof tooltip !== 'undefined' ?  tooltip : {valueDecimals: 2};
			var legend = typeof legend !== 'undefined' ?  legend : {enabled: true};

			// Use JQuery render chart
			$(function () { 
				$('#' + id).highcharts({
					title: {
						text: ''
					},
					chart: chartType,
					legend: legend,
					tooltip: tooltip,
					xAxis: xAxis,
					yAxis: yAxis,
					series: series
				});
			});
		}

	}
]);
