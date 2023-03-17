var ec_left = echarts.init(document.getElementById("l1"), "dark");
ec_left_option = {
	title: {
		text: '各电器功耗情况',
		left: 'left',
	},
	tooltip: {
		trigger: 'axis'
	},
	legend: {
		data: ['Fri', 'dish washer','sockets', 'light', 'microwave','electric space heater', 
		'electric stover','electric oven','washer dryer'],
		left: 'center',
		width: '75%'
		
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
	
	dataZoom: [
	    {
	        id: 'dataZoomX',
	        type: 'slider',
	        xAxisIndex: [0],
	        filterMode: 'filter',
	        height: '20px',
	        bottom: '0%'
	    },
	    {
	        id: 'dataZoomY',
	        type: 'slider',
	        yAxisIndex: [0],
	        filterMode: 'empty'
	    }
	],
	xAxis: {
		type: 'category',
		boundaryGap: false,
		data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
	},
	yAxis: {
		type: 'value'
	},
	series: [{
			name: 'fridge',
			type: 'line',
			stack: 'Total',
			data: [120, 132, 101, 134, 90, 230, 210]
		},
		{
			name: 'dish washer',
			type: 'line',
			stack: 'Total',
			data: [220, 182, 191, 234, 290, 330, 310]
		},
		{
			name: 'sockets',
			type: 'line',
			stack: 'Total',
			data: [150, 232, 201, 154, 190, 330, 410]
		},
		{
			name: 'light',
			type: 'line',
			stack: 'Total',
			data: [320, 332, 301, 334, 390, 330, 320]
		},
		{
			name: 'microwave',
			type: 'line',
			stack: 'Total',
			data: [820, 932, 901, 934, 1290, 1330, 1320]
		},
		{
			name: 'electric space heater',
			type: 'line',
			stack: 'Total',
			data: [120, 132, 101, 134, 90, 230, 210]
		},
		{
			name: 'electric stover',
			type: 'line',
			stack: 'Total',
			data: [220, 182, 191, 234, 290, 330, 310]
		},
		{
			name: 'electric oven',
			type: 'line',
			stack: 'Total',
			data: [150, 232, 201, 154, 190, 330, 410]
		},
		{
			name: 'washer dryer',
			type: 'line',
			stack: 'Total',
			data: [320, 332, 301, 334, 390, 330, 320]
		}
	]
};

ec_left.setOption(ec_left_option);