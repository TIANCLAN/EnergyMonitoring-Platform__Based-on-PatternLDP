var ec_pic = echarts.init(document.getElementById("patternLDP"), "dark");
ec_pic_option = {
	title: {
		text: '电器数据加密示意图'
	},
	tooltip: {
		trigger: 'axis'
	},
	legend: {
		orient: 'horizontal',
		data: ['加密数据', '原始数据'],
		x:'center',
        y:'top'
	},
	grid: {
		left: '3%',
		right: '4%',
		bottom: '3%',
		containLabel: true
	},
	toolbox: {
		feature: {
			saveAsImage: {}
		}
	},
	xAxis: {
		type: 'category',
		nameLocation: 'middle',
		data: [1,2,3,4,5,6,7]
	},
	yAxis: {
		name: 'Power'
	},
	series: [{
			type: 'line',
			name: '加密数据',
			datasetId: 'process_data',
			showSymbol: false,
			data: [150, 132, 101, 243, 42, 70, 110]
		},
		{
			type: 'line',
			name: '原始数据',
			datasetId: 'orignal_data',
			showSymbol: false,
			data: [120, 132, 101, 134, 90, 230, 210]
		}
	]
};

ec_pic.setOption(ec_pic_option);