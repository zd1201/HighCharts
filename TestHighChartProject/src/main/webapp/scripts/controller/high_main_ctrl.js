
routeMenu = function(display, url, selected) {
	this.display = display;
	this.url = url;
//	this.grade = grade;
	this.selected = selected;
};

routeMenu.prototype.getUrl = function() {
	return "#/" + this.url;
};


var forwardErrorPages = function(httpStatus) {
	window.location = ctx + "/errorpages/" + httpStatus;
}


ojtHighChart.controller("HighChartMainCtrl", function($scope, $route, $routeParams, $location, $interval) {

	$scope.routeMenus = [ 
	                     new routeMenu("Bar", "bar", null), 
	                     new routeMenu("Stacked Bar", "stack", null),
	                     new routeMenu("Line", "line", null),
	                     new routeMenu("Area", "area", null),
	                     new routeMenu("Pie", "pie", null),
	                     new routeMenu("Combo-Multi-Axes", "multi", null)
                     ]

	var currMenu = $location.url().split("/");
	console.log(currMenu[1]);
//	if(undefined == currMenu[1]){
//		$scope.routeMenus.forEach(function(menu, index){
//			menu.selected = false;
//			if(menu.url == "board"){
//				menu.selected = true;
//			}
//		});
//	}
//	else{
//		$scope.routeMenus.forEach(function(menu, index){
//			menu.selected = false;
//			if(menu.url == currMenu[1]){
//				menu.selected = true;
//			}
//		});
//	}
	
//	$scope.checkMemus = function(grade){
//		if(grade){
//			return false;
//		}
//	}
	
	$scope.updateMenu = function(menu) {
		if(undefined != stopTime){
			$interval.cancel(stopTime);
		}
		if (!menu) {
			return;
		}
		
		$scope.routeMenus.forEach(function(e) {
			e.selected = (e.url == menu.url);
		});
		
		console.log("$scope.routeMenus", $scope.routeMenus);
	}
	
//	// 로그 클릭시 게시판 화면으로 이동
//	$scope.goBoard = function(){
//		$scope.routeMenus.forEach(function(menu, index){
//			menu.selected = false;
//			if(menu.url == "board"){
//				menu.selected = true;
//			}
//		});
//		window.location = "#/board"
//	}
});

// 상단 메뉴 Route 설정
ojtHighChart.config(function($routeProvider, $locationProvider) {

	$routeProvider
	.when('/bar', {
		templateUrl : ctx + "/templates/high_bar_chart.html"
	})	//
	.when('/stack', {
		templateUrl : ctx + "/templates/high_stack_chart.html"
	})	//
	.when('/line', {
		templateUrl : ctx + "/templates/high_line_chart.html"
	})
	.when('/area', {
		templateUrl : ctx + "/templates/high_area_chart.html"
	})
	.when('/multi', {
		templateUrl : ctx + "/templates/high_multi_chart.html"
	})
	.when('/pie', {
		templateUrl : ctx + "/templates/high_pie_chart.html"
	});
});