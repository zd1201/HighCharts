ojtHighChart.controller("HighBarCtrl", function($scope, $http, $interval) {
		
	 	var pollChart;
//        var colors = Highcharts.getOptions().colors;
	 	Highcharts.setOptions({
	 	    colors: ['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4']
	 	});
	    
        var colors = Highcharts.getOptions().colors;
 
        $scope.teamsJson = [{"name":"Team A","voteCount":"98"},
                            {"name":"Team B","voteCount":"32"},
                            {"name":"Team C","voteCount":"45"}] ; 
        
   
        var categories = [];
        
        // name 라벨 추출
        for(var i=0; i< $scope.teamsJson.length;i++){
        	categories.push($scope.teamsJson[i].name);
        }
        
        var data = [];
 
        for(var i = 0, teamJsonLength =  $scope.teamsJson.length ; i < teamJsonLength ; i++ )
        {
            var team =  $scope.teamsJson[i];
            data.push({y: parseInt(team.voteCount) , color: colors[i] });
        }
        
        getData();
        
        
        pollChart = new Highcharts.Chart({
           chart: {
              renderTo: "chartCont",
//              type: "bar", // change this to column if want to show the column chart
  	           type: "column",
              events: {
	                load: function () {
	                    // set up the updating of the chart each second
	                    var series = this.series[0];
	                    
	                    stopTime = $interval(function(){
	                    	getData();
	                    	
	                    	pollChart.series[0].setData([{y: $scope.newData[0], color: colors[0]},
	                    	                             {y: $scope.newData[1], color: colors[1]},
	                    	                             {y: $scope.newData[2], color: colors[2]}] );
	                    	
	                    	 console.log(data);
	                    	                              
                }, 1000);
	                }
	            }
           },
           title: {
              text: "Poll Name Here",
              style:{
                    color: "#3E576F",
                    fontSize: "23px",
                    fontFamily: "Helvetica Neue,Helvetica,Arial,sans-serif"
              }
           },
           /*
           subtitle: {
               text: "Poll Description here"
           },
           */
           xAxis: {
              categories: categories,
              labels: {
                  style: {
                      fontSize: "16px",
                      fontFamily: "Helvetica Neue,Helvetica,Arial,sans-serif",
                      color: "black"
                  }
              }
           },
           yAxis: {
              title: {
                 text: "Votes",
                 style: {
                     fontSize: "14px",
                     fontFamily: "Helvetica Neue,Helvetica,Arial,sans-serif",
                     color: "black",
                     fontWeight: "normal"
                 }
              }
           },
           
           
           legend: {
               enabled: false
           },
//           tooltip:{
//              enabled: false
//           },
           series: [{
              name: "Vote Count",
              data: data,
              dataLabels: {
                  enabled: true,
               }      
             }
           ],
           exporting: {
               enabled: false
           }
     });
        
     // 서버에 새로운 데이터 요청
		function getData() {
				var req = {
					method : "GET",
					url : ctx + "/getBarData",
					headers : {
						"Content-Type" : "application/json; charset=UTF-8"
					}
				};

				$http(req) // 요청 파라미터
				.then(function (response) {
					$scope.newData = response.data.value;
					console.log("$scope.newData[0]: "+$scope.newData[0]
					+"$scope.newData[1]: "+ $scope.newData[1]
					+"$scope.newData[2]: "+$scope.newData[2]);
					
//					if(data.length < 1){
//						data.push({
//							time: 0,
//							value: $scope.newData
//						})	
//					}
					
				}, function (response) {
					alert(response);
				});
		}
		

});