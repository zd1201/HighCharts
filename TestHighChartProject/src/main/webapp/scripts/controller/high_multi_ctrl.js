ojtHighChart.controller("HighMultiCtrl", function($scope, $http, $interval) {
    
	var colors = ["#591FCE", "#0C9CEE", "#3DBDC2", "#A1F480"];
	var categories = ["Rainfall", "Sea-Level Pressure", "Temperature"];
    var multiChart;
    
    Highcharts.setOptions({
        global : {
            useUTC : false
        }
    });
    
    // 서버에 새로운 데이터 요청
	function getData() {
			var req = {
				method : "GET",
				url : ctx + "/getMultiData",
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
				
		    	for(var i = 0; i < 3; i++){
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

	
//    function mockData() {
//      var mockArray = [];
//
//      for (var i = 0; i < 3; i++) {
//        mockArray.push({
//          value: getRandomInt(5000000, 50000000),
//          tValue: getCurrentTime(),
//        })
//      }
//      return mockArray
//    }


//    function bytesToBit(bytes) {
//      var bits;
//      bits = bytes * 8;
//      return bits;
//    }


//    function getRandomInt(min, max) {
//      return Math.floor(Math.random() * (max - min)) + min;
//    }

//    function convertEPOCH(epoch) {
//      var myDate = new Date(epoch),
//        convertedDate = myDate.toLocaleString();
//      return convertedDate;
//    }

//    function getCurrentTime() {
//      var currentTime = new Date().getTime();
//      return currentTime;
//    }


    function createChart() {
      var created = false,
        currenttValue = 0,
        shiftCounter = 0,
        shift = false,
        colorCounter = -1,
//        latestInsertedTime = 0,
        dataToApply,
        createCounter = -1,
        updateCounter = -1;

      stopTime = $interval(function() {
        if (shiftCounter > 8) {
          shift = true;
        }
        
        getData();

        dataToApply = $scope.dataToApply;
        if(undefined != dataToApply){
        //Initiating the chart
        if (!created) {
          Highcharts.each(dataToApply, function(val) {
            createCounter++;
//            colorCounter++;
//            latestInsertedTime = val.tValue - 5000;

//            multiChart.addSeries({
//              name: val.application,
//              color: colors[colorCounter],
//            });
//            
//            multiChart.series[createCounter].addPoint([val.time, val.value], false, shift);
          });
          shiftCounter++;
          multiChart.redraw();

          created = true;
        }
        //Updating when created
        if (created) {
          Highcharts.each(dataToApply, function(val) {
            updateCounter++;

            multiChart.series[updateCounter].addPoint([val.time,val.value], false, shift);
//            latestInsertedTime = val.tValue - 5000;


          });
          multiChart.redraw();
          shiftCounter++;
        }
        //Resetting temporary arrays and values
        createCounter = -1;
        updateCounter = -1;
        }
      }, 2000);
    }

    
	multiChart = new Highcharts.chart("chartCont", {
	    chart: {
	        zoomType: "xy",
            events: {
                load: createChart
            }
	    },
	    title: {
	        text: "Average Monthly Weather Data for Tokyo"
	    },
	    subtitle: {
	        text: "Source: WorldClimate.com"
	    },
        xAxis: {
            type: "datetime",
            tickmarkPlacement: "on",
//            tickPixelInterval: 150
        },
//	    xAxis: [{
//	        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
//	            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
//	        crosshair: true
//	    }],
	    yAxis: [{ // Primary yAxis
	        labels: {
	            format: "{value}°C",
	            style: {
	                color: Highcharts.getOptions().colors[2]
	            }
	        },
	        title: {
	            text: "Temperature",
	            style: {
	                color: Highcharts.getOptions().colors[2]
	            }
	        },
	        opposite: true,
	        max: 40
	    }, { // Secondary yAxis
	        gridLineWidth: 0,
	        title: {
	            text: "Rainfall",
	            style: {
	                color: Highcharts.getOptions().colors[0]
	            }
	        },
	        labels: {
	            format: "{value} mm",
	            style: {
	                color: Highcharts.getOptions().colors[0]
	            }
	        },
	        max: 250

	    }, { // Tertiary yAxis
	        gridLineWidth: 0,
	        title: {
	            text: "Sea-Level Pressure",
	            style: {
	                color: Highcharts.getOptions().colors[1]
	            }
	        },
	        labels: {
	            format: "{value} mb",
	            style: {
	                color: Highcharts.getOptions().colors[1]
	            }
	        },
	        opposite: true,
	        max: 1040
	    }],
	    tooltip: {
	        shared: true
	    },
	    legend: {
	        layout: "vertical",
	        align: "left",
	        x: 80,
	        verticalAlign: "top",
	        y: 55,
	        floating: true,
	        backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || "#FFFFFF"
	    },
	    series: [{
	        name: "Rainfall",
	        type: "column",
	        yAxis: 1,
//	        data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
	        tooltip: {
	        	valueDecimals: 2,
	            valueSuffix: " mm"
	        }

	    }, {
	        name: "Sea-Level Pressure",
	        type: "spline",
	        yAxis: 2,
//	        data: [1016, 1016, 1015.9, 1015.5, 1012.3, 1009.5, 1009.6, 1010.2, 1013.1, 1016.9, 1018.2, 1016.7],
	        marker: {
	            enabled: false
	        },
	        dashStyle: "shortdot",
	        tooltip: {
	        	valueDecimals: 2,
	            valueSuffix: " mb"
	        }

	    }, {
	        name: "Temperature",
	        type: "spline",
//	        data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
	        tooltip: {
	        	valueDecimals: 2,
	            valueSuffix: " °C"
	        }
	    }]
	});


});