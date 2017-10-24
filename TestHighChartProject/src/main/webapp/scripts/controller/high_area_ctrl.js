ojtHighChart.controller("HighAreaCtrl", function($scope, $http, $interval) {
	
	var colors = ["#591FCE", "#0C9CEE", "#3DBDC2", "#A1F480"];
	var categories = ["Asia", "Africa", "Europe", "America"];
	var stackedAreaChart;
	
	Highcharts.setOptions({
        global: {
        	//Highcharts.dateFormat에 축 스케일링, 눈금 표시 위치 및 시간 표시에 UTC 시간을 사용할지 여부
            useUTC: false
        }
    });

	stackedAreaChart = new Highcharts.chart("chartCont", {
        chart: {
            type: "area",
//            animation: Highcharts.svg, // don"t animate in old IE
            marginRight: 10,
            events: {
            	load: createChart,
            }
        },
        style: {
        	fontFamily: "Montserrat"
        },
        title: {
            text: "Worldwide Growth by Region"
        },
        subtitle:{
        	text: "updated every 1 second"
        },
        xAxis: {
            type: "datetime",
            tickmarkPlacement: "on",
            tickPixelInterval: 150
        },
        yAxis: {
            title: {
            	text: "Billions"
            },
//            tickmarkPlacement: "on",
            plotLines: [{
                value: 0,
                width: 1,
                color: "#808080"
            }],
            
        },
        tooltip: {
        	shared: true,
        	useHTML: true,
        	valueSuffix: " millions",
        	xDateFormat: "%H:%M:%S",
//            formatter: function(series) {
//var s;            	
////            	console.log(series);
////            	return "<br>"+series.name+"</br>";
//                      s += "<br/>" + series.name;
//                  return s;
//            	
//            }
            headerFormat: "<small>{point.key}</small><table>",
            pointFormat: "<tr><td style='color: {series.color}'>{series.name}: </td>" +
                "<td style='width:800px'><b>{point.y}</b></td></tr>",
            footerFormat: "</table>",
            style: {
                width: "1000px"
            }
        },
        legend: {
            enabled: true
        },
        exporting: {
            enabled: false
        },
        plotOptions: {
            series: {
                fillOpacity: 0.75
            },
            area: {
                stacking: "normal",
                lineColor: "#666666",
                lineWidth: 1,
                marker: {
                    lineWidth: 1,
                    lineColor: "#666666"
                }
            }
        },
        series: []
  });
	
	//실시간 데이터 생성
//	function getDataSet(){
//		var dataset = [];
//		var t = (new Date()).getTime();
//		
//		while(flag){
//			console.log("data is not arrival");
//		}
//	
//    	for(var i = 0; i < 4; i++){
//
//    		dataset.push({
//    			name: categories[i],
//    			time:t,
//    			value: $scope.newData[i]
//    			})
//    			console.log(categories[i]+":" + $scope.newData[i]);
//    		}
//    	return dataset;
//    }
	
	   function getRandomInt(min, max) {
		     return Math.floor(Math.random() * (max - min)) + min;
		   }
	
    // 실시간 차트 생성
    function createChart() {
    	var created = false
         shiftCounter = 0,
         shift = false,
         colorCounter = -1,
         dataToApply = null,
         createCounter = -1,
         updateCounter = -1;
    	
    	// set up the updating of the chart each second
    	stopTime = $interval(function(){
    		if(shiftCounter > 8){
    			shift = true;
    	}
    		
    	getData()
    	dataToApply = $scope.dataToApply;
//    	dataToApply = getDataSet();
    	console.log($scope.dataToApply);
    	if(undefined != dataToApply){
    	//차트 초기화
    	if(!created){
    		Highcharts.each(dataToApply, function(val){
    			createCounter++;
    			colorCounter++;
    		
    		stackedAreaChart.addSeries({
    			name: val.name,
    			color: colors[colorCounter],
    		});
    		
    		// 초기 데이터 생성
          for (i = -7; i <= 0; i += 1) {
        	  var x = val.time + i * 1000;
        	  console.log("initTime: " + x);
        	  stackedAreaChart.series[createCounter].addPoint([x, 0], false, shift);
        	  shiftCounter++;
          }
    	});
    		stackedAreaChart.redraw(); // point 추가 완료 된 뒤 에 호출
    		
    		created = true;
    		
    	}
    	// 차트 업데이트
    	if(created && shift){
    		var s = "<table style= 'border: 1px solid black;'> <tr> <td> Asia </td> <td> Africa </td> <td> Europe </td> <td> America </td></tr> <tr>";
    		Highcharts.each(dataToApply, function(val){
    			updateCounter++;
    			console.log("updateTime: " + val.time);
    			stackedAreaChart.series[updateCounter].addPoint([val.time, val.value], false, shift);
    			s+= "<td>"+val.value+"</td>";
    		})
    		
//    	stackedAreaChart.tooltip.options.formatter(val.name, val.time);
    	s+="</tr> </table>";
//    	for(i = 0; i < 4; i++){
//    		stackedAreaChart.series[updateCounter].tooltipOptions.formatter(s);
//    	}
        stackedAreaChart.redraw();
        shiftCounter++;
    	
    	}
        //Resetting temporary arrays and values
        createCounter = -1;
        updateCounter = -1;
    	}
    },1000);
}
    
    // 서버에 새로운 데이터 요청
	function getData() {
			var req = {
				method : "GET",
				url : ctx + "/getAreaData",
				headers : {
					"Content-Type" : "application/json; charset=UTF-8"
				}
			};

			$http(req) // 요청 파라미터
//			.then(function (response) {
				.success(function (data, config) {
				$scope.newData = data.value;
				
				var dataset = [];
				var t = Math.floor((new Date()).getTime() / 1000) * 1000;
		    	for(var i = 0; i < 4; i++){
		    		dataset.push({
		    			name: categories[i],
		    			time:t,
		    			value: $scope.newData[i]
//		    			value: getRandomInt(5000000, 50000000)
		    			})
		    			console.log("getDataTime: " + t);
		    			console.log(categories[i]+":" + $scope.newData[i]);
		    		}
//		    	}
		    	$scope.dataToApply = dataset;

			}, function (response) {
				alert(response);
			});
	}


});