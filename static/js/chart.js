//$(document).ready(function (){
//	console.log($('#status').eq(0).text()
//	)
//	if($('#status').eq(0).text() =="Running"){
//		document.getElementById("trainTd").className='badge bg-success me-1';
//	}
//	if($('#status').eq(0).text() =="Standby"){
//		document.getElementById("trainTd").className='badge bg-warning me-1';
//	}
//	if($('#status').eq(0).text() =="In Risk")
//	{
//		document.getElementById("trainTd").className='badge bg-danger me-1';
//	}
//	if($('#status').eq(0).text() =="Finished")
//	{
//		document.getElementById("trainTd").className='badge bg-secondary me-1';
//	}
//});


document.addEventListener("DOMContentLoaded", function() {
	$.ajax({
		type: "get",
		url: "/l1",
		success: function(data) {
			//			alert(data.date);
			all_data_options.xaxis.categories = data.date;
			all_data_options.series[0].data = data.power[0];
			all_data_options.series[1].data = data.power[1];
			all_data_options.series[2].data = data.power[2];
			all_data_options.series[3].data = data.power[3];
			all_data_options.series[4].data = data.power[4];
			all_data_options.series[5].data = data.power[5];
			all_data_options.series[6].data = data.power[6];
			all_data_options.series[7].data = data.power[7];
			all_data_options.series[8].data = data.power[8];
			all_data_chart = new ApexCharts(document.getElementById('chart-mentions'), all_data_options);
			all_data_chart.render();
		},
		error: function(data) {
			//alert(data);
		}
	});

	var all_data_options = {
		chart: {
			type: "bar",
			fontFamily: 'inherit',
			height: 260,
			parentHeightOffset: 0,
			toolbar: {
				show: false,
			},
			animations: {
				enabled: false
			},
			stacked: true,
		},
		plotOptions: {
			bar: {
				columnWidth: '30%',
			}
		},
		dataLabels: {
			enabled: false,
		},
		fill: {
			opacity: 1,
		},
		series: [{
			name: "Frdige",
			data: []
		}, {
			name: "Dish washer",
			data: []
		}, {
			name: "sockets",
			data: []
		}, {
			name: "light",
			data: []
		}, {
			name: "microwave",
			data: []
		}, {
			name: "electric space heater",
			data: []
		}, {
			name: "electric stover",
			data: []
		}, {
			name: "electric oven",
			data: []
		}, {
			name: "washer dryer",
			data: []
		}],
		tooltip: {
			theme: 'dark'
		},
		grid: {
			padding: {
				top: -20,
				right: 0,
				left: -4,
				bottom: -4
			},
			strokeDashArray: 4,
			xaxis: {
				lines: {
					show: true
				}
			},
		},
		xaxis: {
			categories: [],
			labels: {
				padding: 0,
			},
			tooltip: {
				enabled: false
			},
			axisBorder: {
				show: false,
			},
			type: 'datetime',
		},
		yaxis: {
			min: 0,
			max: 8000,
			labels: {
				padding: 1
			},
		},

		colors: [tabler.getColor("primary"), tabler.getColor("primary", 0.8), tabler.getColor("primary", 0.6), tabler.getColor("primary", 0.4), tabler.getColor("primary", 0.2),
			tabler.getColor("green"), tabler.getColor("green", 0.8), tabler.getColor("green", 0.6), tabler.getColor("green", 0.4),

		],
		legend: {
			show: false,
		}
	}

	var all_data_chart = new ApexCharts(document.getElementById('chart-mentions'), all_data_options);
});
// @formatter:on

document.addEventListener("DOMContentLoaded", function() {
	$.ajax({
		type: "get",
		url: "/l2",
		success: function(data) {
			//alert(data.date);
			one_chart_options.xaxis.categories = data.date;
			one_chart_options.series[0].data = data.power;
			one_chart = new ApexCharts(document.getElementById('chart-development-activity'), one_chart_options);
			one_chart.render();
		},
		error: function(data) {
			//alert(data);
		}
	});
	var one_chart_options = {
		chart: {
			type: "area",
			fontFamily: 'inherit',
			height: 192,
			sparkline: {
				enabled: true
			},
			animations: {
				enabled: false
			},
		},
		dataLabels: {
			enabled: false,
		},
		fill: {
			opacity: .16,
			type: 'solid'
		},
		stroke: {
			width: 2,
			lineCap: "round",
			curve: "smooth",
		},
		series: [{
			name: "Total Power per day",
			data: [3, 5, 4, 6, 7, 5, 6, 8, 24, 7, 12, 5, 6, 3, 8, 4, 14, 30, 17, 19, 15, 14, 25, 32, 40, 55, 60, 48, 52, 70]
		}],
		tooltip: {
			theme: 'dark'
		},
		grid: {
			strokeDashArray: 4,
		},
		xaxis: {
			labels: {
				padding: 0,
			},
			tooltip: {
				enabled: false
			},
			axisBorder: {
				show: false,
			},
			type: 'datetime',
		},
		yaxis: {
			labels: {
				padding: 4
			},
		},
		//		labels: [
		//			'2020-06-20', '2020-06-21', '2020-06-22', '2020-06-23', '2020-06-24', '2020-06-25', '2020-06-26', '2020-06-27', '2020-06-28', '2020-06-29', '2020-06-30', '2020-07-01', '2020-07-02', '2020-07-03', '2020-07-04', '2020-07-05', '2020-07-06', '2020-07-07', '2020-07-08', '2020-07-09', '2020-07-10', '2020-07-11', '2020-07-12', '2020-07-13', '2020-07-14', '2020-07-15', '2020-07-16', '2020-07-17', '2020-07-18', '2020-07-19'
		//		],
		colors: [tabler.getColor("primary")],
		legend: {
			show: false,
		},
		point: {
			show: false
		},
	}
	var one_chart = new ApexCharts(document.getElementById('chart-development-activity'), one_chart_options)
});
// @formatter:on

// @formatter:off
document.addEventListener("DOMContentLoaded", function() {
	$.ajax({
		type: "get",
		url: "/patternLDP",
		success: function(data) {
			patternLDP_options.xaxis.categories = data.time;
			patternLDP_options.series[0].data = data.process_data;
			patternLDP_options.series[1].data = data.data;
			patternLDP_chart = new ApexCharts(document.getElementById('chart-new-clients'), patternLDP_options);
			patternLDP_chart.render();
		},
		error: function(data) {
			console.log(data);
		}
	});
	
	patternLDP_options = {
		chart: {
			type: "line",
			fontFamily: 'inherit',
			height: 40.0,
			sparkline: {
				enabled: true
			},
			animations: {
				enabled: false
			},
		},
		fill: {
			opacity: 1,
		},
		stroke: {
			width: [2, 1],
			dashArray: [0, 3],
			lineCap: "round",
			curve: "smooth",
		},
		series: [{
			name: "process_data",
			data: [37, 35, 44, 28, 36, 24, 65, 31, 37, 39, 62, 51, 35, 41, 35, 27, 93, 53, 61, 27, 54, 43, 4, 46, 39, 62, 51, 35, 41, 67]
		}, {
			name: "origin_data",
			data: [93, 54, 51, 24, 35, 35, 31, 67, 19, 43, 28, 36, 62, 61, 27, 39, 35, 41, 27, 35, 51, 46, 62, 37, 44, 53, 41, 65, 39, 37]
		}],
		tooltip: {
			theme: 'dark'
		},
		grid: {
			strokeDashArray: 4,
		},
		xaxis: {
			labels: {
				padding: 0,
			},
			tooltip: {
				enabled: false
			},
			type: 'datetime',
		},
		yaxis: {
			labels: {
				padding: 4
			},
		},
//		labels: [
//			'2020-06-20', '2020-06-21', '2020-06-22', '2020-06-23', '2020-06-24', '2020-06-25', '2020-06-26', '2020-06-27', '2020-06-28', '2020-06-29', '2020-06-30', '2020-07-01', '2020-07-02', '2020-07-03', '2020-07-04', '2020-07-05', '2020-07-06', '2020-07-07', '2020-07-08', '2020-07-09', '2020-07-10', '2020-07-11', '2020-07-12', '2020-07-13', '2020-07-14', '2020-07-15', '2020-07-16', '2020-07-17', '2020-07-18', '2020-07-19'
//		],
		colors: [tabler.getColor("primary"), tabler.getColor("gray-600")],
		legend: {
			show: false,
		},
	}
	patternLDP_chart = new ApexCharts(document.getElementById('chart-new-clients'), patternLDP_options)
});
// @formatter:on

// @formatter:off
document.addEventListener("DOMContentLoaded", function() {
	$.ajax({
		type: "get",
		url: "/l1",
		success: function(data) {
//			console.log(data)
			rate1_options.series[0].data = data.power[0];
			rate2_options.series[0].data = data.power[1];
			rate3_options.series[0].data = data.power[2];
			rate4_options.series[0].data = data.power[3];
			rate5_options.series[0].data = data.power[4];
			rate6_options.series[0].data = data.power[5];
			rate1_chart = new ApexCharts(document.getElementById('sparkline-bounce-rate-1'), rate1_options);
			rate2_chart = new ApexCharts(document.getElementById('sparkline-bounce-rate-2'), rate2_options);
			rate3_chart = new ApexCharts(document.getElementById('sparkline-bounce-rate-3'), rate3_options);
			rate4_chart = new ApexCharts(document.getElementById('sparkline-bounce-rate-4'), rate4_options);
			rate5_chart = new ApexCharts(document.getElementById('sparkline-bounce-rate-5'), rate5_options);
			rate6_chart = new ApexCharts(document.getElementById('sparkline-bounce-rate-6'), rate6_options);
			rate1_chart.render();
			rate2_chart.render();
			rate3_chart.render();
			rate4_chart.render();
			rate5_chart.render();
			rate6_chart.render();
		},
		error: function(data) {
			console.log(data);
		}
	});
	rate1_options = {
		chart: {
			type: "line",
			fontFamily: 'inherit',
			height: 24,
			animations: {
				enabled: false
			},
			sparkline: {
				enabled: true
			},
		},
		tooltip: {
			enabled: false,
		},
		stroke: {
			width: 2,
			lineCap: "round",
		},
		series: [{
			color: tabler.getColor("primary"),
			data: [17, 24, 20, 10, 5, 1, 4, 18, 13]
		}],
	}
	rate2_options = {
		chart: {
			type: "line",
			fontFamily: 'inherit',
			height: 24,
			animations: {
				enabled: false
			},
			sparkline: {
				enabled: true
			},
		},
		tooltip: {
			enabled: false,
		},
		stroke: {
			width: 2,
			lineCap: "round",
		},
		series: [{
			color: tabler.getColor("primary"),
			data: [17, 24, 20, 10, 5, 1, 4, 18, 13]
		}],
	}
	rate3_options = {
		chart: {
			type: "line",
			fontFamily: 'inherit',
			height: 24,
			animations: {
				enabled: false
			},
			sparkline: {
				enabled: true
			},
		},
		tooltip: {
			enabled: false,
		},
		stroke: {
			width: 2,
			lineCap: "round",
		},
		series: [{
			color: tabler.getColor("primary"),
			data: [17, 24, 20, 10, 5, 1, 4, 18, 13]
		}],
	}
	rate4_options = {
		chart: {
			type: "line",
			fontFamily: 'inherit',
			height: 24,
			animations: {
				enabled: false
			},
			sparkline: {
				enabled: true
			},
		},
		tooltip: {
			enabled: false,
		},
		stroke: {
			width: 2,
			lineCap: "round",
		},
		series: [{
			color: tabler.getColor("primary"),
			data: [17, 24, 20, 10, 5, 1, 4, 18, 13]
		}],
	}
	rate5_options = {
		chart: {
			type: "line",
			fontFamily: 'inherit',
			height: 24,
			animations: {
				enabled: false
			},
			sparkline: {
				enabled: true
			},
		},
		tooltip: {
			enabled: false,
		},
		stroke: {
			width: 2,
			lineCap: "round",
		},
		series: [{
			color: tabler.getColor("primary"),
			data: [17, 24, 20, 10, 5, 1, 4, 18, 13]
		}],
	}
	rate6_options = {
		chart: {
			type: "line",
			fontFamily: 'inherit',
			height: 24,
			animations: {
				enabled: false
			},
			sparkline: {
				enabled: true
			},
		},
		tooltip: {
			enabled: false,
		},
		stroke: {
			width: 2,
			lineCap: "round",
		},
		series: [{
			color: tabler.getColor("primary"),
			data: [17, 24, 20, 10, 5, 1, 4, 18, 13]
		}],
	}
	rate1_chart = new ApexCharts(document.getElementById('sparkline-bounce-rate-1'),rate1_options)
	rate2_chart = new ApexCharts(document.getElementById('sparkline-bounce-rate-2'),rate2_options)
	rate3_chart = new ApexCharts(document.getElementById('sparkline-bounce-rate-3'),rate3_options)
	rate4_chart = new ApexCharts(document.getElementById('sparkline-bounce-rate-4'),rate4_options)
	rate5_chart = new ApexCharts(document.getElementById('sparkline-bounce-rate-5'),rate5_options)
	rate6_chart = new ApexCharts(document.getElementById('sparkline-bounce-rate-6'),rate6_options)
});