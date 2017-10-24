ojtHighChart.controller("HighLineCtrl", function($scope, $http, $interval) {

//	Highcharts.setOptions({
//	        global: {
//	        	//Highcharts.dateFormat에 축 스케일링, 눈금 표시 위치 및 시간 표시에 UTC 시간을 사용할지 여부
//	            useUTC: false
//	        }
//	    });

	    Highcharts.chart("chartCont", {
	        chart: {
	            type: "spline",
	            animation: Highcharts.svg, // don"t animate in old IE
	            marginRight: 10,
	            events: {
	                load: function () {
	                    // set up the updating of the chart each second
	                    var series = this.series[0];
//	                    setInterval(function () {
//	                    	getData();
//	                        var x = (new Date()).getTime(), // current time
////	                            y = Math.random();
//	                        	y = $scope.newData;
//	                        series.addPoint([x, y], true, true);
//	                    }, 1000);
	                    
	                    stopTime = $interval(function(){
	                    	
	                    	getData()
	                    	
	                    
	                    	var x = Math.floor((new Date()).getTime() / 1000) * 1000, // current time
//	                    	var x = Date.getUnixTime(), // current time
	                    	y = $scope.newData;
	                    	if(undefined != y){
	                    	series.addPoint([x, y], true, true);
	                    	}
                }, 1000);
	                }
	            }
	        },
	        title: {
	            text: "Live random data"
	        },
	        xAxis: {
	            type: "datetime",
	            tickmarkPlacement: "on",
//	            tickPixelInterval: 150
	        },
	        yAxis: {
	            title: {
	                text: "Value"
	            },
	            max:1,
	            
//	            tickPositioner: function () {
//	                var positions = [],
//	                    tick = Math.floor(this.dataMin),
//	                    increment = Math.ceil((this.dataMax - this.dataMin) / 6);
//
//	                if (this.dataMax !== null && this.dataMin !== null) {
//	                    for (tick; tick - increment <= this.dataMax; tick += increment) {
//	                        positions.push(tick);
//	                    }
//	                }
//	                return positions;
//	            },
	            plotLines: [{
	                value: 0,
	                width: 1,
	                color: "#808080"
	            }]
	        },
	        tooltip: {
	            formatter: function () {
	                return "<b>" + this.series.name + "</b><br/>" +
	                    Highcharts.dateFormat("%Y-%m-%d %H:%M:%S", this.x) + "<br/>" +
	                    Highcharts.numberFormat(this.y, 2);
	            }
	        },
//	        plotOptions: {
//	            area: {
//	                stacking: 'normal',
//	                lineColor: '#666666',
//	                lineWidth: 1,
//	                marker: {
//	                    lineWidth: 1,
//	                    lineColor: '#666666'
//	                }
//	            }
//	        },
	        
	        legend: {
	            enabled: false
	        },
	        exporting: {
	            enabled: false
	        },
	        series: [{
	            name: "Random data",
	            data: (function () {
	                // generate an array of random data
	                var data = [],
	                    time = (new Date()).getTime(),
	                    i;
	                
	                // 초기 데이터 생성
	                for (i = -19; i <= 0; i += 1) {
	                    data.push({
	                        x: time + i * 1000,
//	                        y: Math.random()
	                        y: 0
	                    });
	                }
	                return data;
	            }())
	        }]
	    });
	    
	    // 서버에 새로운 데이터 요청
		function getData() {
				var req = {
					method : "GET",
					url : ctx + "/getLineData",
					headers : {
						"Content-Type" : "application/json; charset=UTF-8"
					}
				};

				$http(req) // 요청 파라미터
				.then(function (response) {
					
					$scope.newData = response.data.value;
					
					console.log("i'm $scope.newData: "+$scope.newData);
					
				}, function (response) {
					alert(response);
				});
		}

});