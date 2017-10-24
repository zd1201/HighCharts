ojtHighChart.controller("HighStackCtrl", function($scope, $http, $interval) {

    Highcharts.setOptions({
        global : {
            useUTC : false
        }
    });
    
    var colors = ["#591FCE", "#0C9CEE", "#3DBDC2", "#A1F480"];
    var stackedChart;

    
    
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
				var t = (new Date()).getTime();

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

	
    function mockData() {
      var mockArray = [];

      for (var i = 0; i < 4; i++) {
        mockArray.push({
          value: getRandomInt(5000000, 50000000),
          tValue: getCurrentTime(),
          application: "app" + getRandomInt(1, 10)
        })
      }
      return mockArray
    }


    function bytesToBit(bytes) {
      var bits;
      bits = bytes * 8;
      return bits;
    }


    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }

    function convertEPOCH(epoch) {
      var myDate = new Date(epoch),
        convertedDate = myDate.toLocaleString();
      return convertedDate;
    }

    function getCurrentTime() {
      var currentTime = new Date().getTime();
      return currentTime;
    }

    function getStartTime() {
      var startTime = getCurrentTime() - 10800000;
      return startTime;
    }

    function createChart() {
      var created = false,
        currenttValue = 0,
        shiftCounter = 0,
        shift = false,
        colorCounter = -1,
        latestInsertedTime = 0,
        dataToApply,
        createCounter = -1,
        updateCounter = -1;

      stopTime = $interval(function() {
        if (shiftCounter > 8) {
          shift = true;
        }


        dataToApply = mockData();

        //Initiating the chart
        if (!created) {
          Highcharts.each(dataToApply, function(val) {
            createCounter++;
            colorCounter++;
            latestInsertedTime = val.tValue - 5000;

            stackedChart.addSeries({
              name: val.application,
              color: colors[colorCounter],
            });
            stackedChart.series[createCounter].addPoint([convertEPOCH(val.tValue), bytesToBit(val.value)], false, shift);
          });
          shiftCounter++;
          stackedChart.redraw();

          created = true;
        }
        //Updating when created
        if (created) {
          Highcharts.each(dataToApply, function(val) {
            updateCounter++;

            stackedChart.series[updateCounter].addPoint([convertEPOCH(val.tValue), bytesToBit(val.value)], false, shift);
            latestInsertedTime = val.tValue - 5000;


          });
          stackedChart.redraw();
          shiftCounter++;
        }
        //Resetting temporary arrays and values
        createCounter = -1;
        updateCounter = -1;
      }, 2000);
    }

    //Creating Highchart chart
    stackedChart = new Highcharts.chart({
      chart: {
        type: "column",
        renderTo: "chartCont",
        events: {
          load: createChart,
        },
        style: {
          fontFamily: "Montserrat",
        }
      },
      title: {
        text: "CDN distribution"
      },
      subtitle: {
        text: "Updated every 5 minutes"
      },
      xAxis: {
    	tickmarkPlacement: "on",
        tickPixelInterval: 50,
        categories: [],
        labels: {
          rotation: -45
        }
      },
      yAxis: {
        title: {
          text: "Percent"
        },
        tickmarkPlacement: "on",
        plotLines: [{
          value: 0,
          width: 1,
          color: "#808080"
        }]
      },
      legend: {
        enabled: true
      },
      exporting: {
        enabled: false
      },
      plotOptions: {
        column: {
          stacking: "normal",
          // stacking: "percent",
          
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
});