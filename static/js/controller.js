function getTime(){
	$.ajax({
		type:"get",
		url:"/time",
		timeout:10000,
		success:function(data){
			$("#tim").html(data)
		},error:function(xhr,type,errorThrown){
			
		}
	});
}

function get_r1_data(){
	$.ajax({
		type:"get",
		url:"/r1",
		success:function(data){
			$("#r1 .num h2").eq(0).text(data.fridge);
			$("#r1 .num h2").eq(1).text(data.dish_washer);
			$("#r1 .num h2").eq(2).text(data.sockets);
			$("#r1 .num h2").eq(3).text(data.light);
			$("#r1 .num h2").eq(4).text(data.microwave);
			$("#r1 .num h2").eq(5).text(data.electric_space_heater);
			$("#r1 .num h2").eq(6).text(data.electric_stove);
			$("#r1 .num h2").eq(7).text(data.electric_oven);
			$("#r1 .num h2").eq(8).text(data.washer_dryer);
			
			categories = ['fridge','dish washer','sockets','light','microwave','electric space heater',
                'electric stove','electric oven', 'washer dryer']
			
			$("#r1 .txt h3").eq(0).text(categories[0]);
			$("#r1 .txt h3").eq(1).text(categories[1]);
			$("#r1 .txt h3").eq(2).text(categories[2]);
			$("#r1 .txt h3").eq(3).text(categories[3]);
			$("#r1 .txt h3").eq(4).text(categories[4]);
			$("#r1 .txt h3").eq(5).text(categories[5]);
			$("#r1 .txt h3").eq(6).text(categories[6]);
			$("#r1 .txt h3").eq(7).text(categories[7]);
			$("#r1 .txt h3").eq(8).text(categories[8]);
		},error:function(xhr,type,errorThrown){

		}
	})
}

function get_l1_data(){
	var that = this;
//	console.log(ec_left_option.xAxis.data);
	$.ajax({
		type:"get",
		url:"/l1",
		success:function(data){
//			alert(data.power[0]);
			var ec_left_option = that.ec_left_option;
			ec_left_option.xAxis.data = data.date;
			ec_left_option.series[0].data = data.power[0];
			ec_left_option.series[1].data = data.power[1];
			ec_left_option.series[2].data = data.power[2];
			ec_left_option.series[3].data = data.power[3];
			ec_left_option.series[4].data = data.power[4];
			ec_left_option.series[5].data = data.power[5];
			ec_left_option.series[6].data = data.power[6];
			ec_left_option.series[7].data = data.power[7];
			ec_left_option.series[8].data = data.power[8];
			ec_left.setOption(ec_left_option);
		},error:function(data){
			alert(data);
		}
	});
}
function get_patternLDP_data(){
	var that = this;
	
	$.ajax({
		type:"get",
		url:"/patternLDP",
		
		success:function(data){
			ec_pic_option.xAxis.data = data.time;
			ec_pic_option.series[0].data = data.process_data;
			ec_pic_option.series[1].data = data.data;
			ec_pic.setOption(ec_pic_option);
		},error:function(data){
			alert(data);
		}
	});
}

$("a #process").click(function (){
    $.ajax({
        url:"/process",
        type:"post",
        success:function (d){
            alert("处理数据成功")
        },error:function (){
            alert("处理数据ajax请求失败")
        }
    })
})

function refresh(){
	$.ajax({
		type:"get",
		url:"/patternLDP",
		
		success:function(data){
			ec_pic_option.xAxis.data = data.time;
			ec_pic_option.series[0].data = data.process_data;
			ec_pic_option.series[1].data = data.data;
			ec_pic.setOption(ec_pic_option);
		},error:function(data){
			alert(data);
		}
	});
}

function loading(){
	if(document.getElementById("train").style.display=='none'){
		document.getElementById("train").style.display='block'
	}else{
		document.getElementById("train").style.display='none'
	}
}
// 创立数组存放数据
var Modellist=[];
var Houselist=[];
Modellist=["VAE","DAE","S2S","S2P"]
Houselist=["House_1","House_4"]
//list["红色"]=["苹果", "西瓜"];
//list["黄色"]=["香蕉", "芒果"];
// 追加数组循环遍历输出
for(var n in Modellist){
    $("<option value='"+Modellist[n]+"'>"+Modellist[n]+"</option>").appendTo("#model");
    
}
for(var n in Houselist){
	$("<option value='"+Houselist[n]+"'>"+Houselist[n]+"</option>").appendTo("#house");
}
// 给点击一个改变事件
//$("#proc").change(function(){
//  // 1、获取第选项的选择元素
//  var su=$(this).val();
//  // 2、将获取的元素放在数组中查找
//  var zu=list[su];
//  // 将前面的元素移除/清空
//  // $(this).text();
//  $("#city option").remove();
//  // 3、给下面的选项追加
//  for(var i=0; i<zu.length; i++){
//      $("<option value='"+zu[i]+"'>"+zu[i]+"</option>").appendTo("#city");
//  }
//});
getTime()
get_r1_data()
get_l1_data()
//get_patternLDP_data()