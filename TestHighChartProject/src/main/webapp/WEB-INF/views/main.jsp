<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%-- <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%> --%>
<%@ include file="/WEB-INF/views/taglibs.jsp"%>
<%@ page session="false"%>

<!-- request 객체에 저장된 contextpath를 참조하여 경로 명시 -->
<c:set var="ctx" value="${pageContext.request.contextPath}" />

<html ng-app="ojtHighChart">

	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		
		<script type="text/javascript">
		 	var stopTime;
			var APP_NAME = "ojtHighChart";
			var ojtHighChart = angular.module(APP_NAME, [ "ngRoute"]);
		</script>
		
		
<!-- 		<script src="https://code.highcharts.com/highcharts.js"></script> -->
		<script src="${ctx}/scripts/controller/high_main_ctrl.js" type="text/javascript" charset="utf-8"></script>
		<script src="${ctx}/scripts/controller/high_line_ctrl.js" type="text/javascript" charset="utf-8"></script>
		<script src="${ctx}/scripts/controller/high_stack_ctrl.js" type="text/javascript" charset="utf-8"></script>
		<script src="${ctx}/scripts/controller/high_bar_ctrl.js" type="text/javascript" charset="utf-8"></script>
		<script src="${ctx}/scripts/controller/high_pie_ctrl.js" type="text/javascript" charset="utf-8"></script>
		<script src="${ctx}/scripts/controller/high_multi_ctrl.js" type="text/javascript" charset="utf-8"></script>
		<script src="${ctx}/scripts/controller/high_area_ctrl.js" type="text/javascript" charset="utf-8"></script>
		
		<title>HighChart main page</title>
	</head>
	
	<body ng-controller="HighChartMainCtrl">
	
		<div id="header">
			<h1>HELLO HighChart</h1>
		</div>
		
<%-- 		<P>  The time on the server is ${serverTime}. </P> --%>
		
		<!-- MENU -->
		<div id="mNavi">
			<div id="mNaviG">
				<ul>
					<li ng-repeat="menu in routeMenus"><a href="{{menu.getUrl()}}" ng-click="updateMenu(menu)" ng-style="menu.selected && {'color':'#d61185'}">{{menu.display}}</a></li>
				</ul>
			</div>
		</div>
		<!-- END MENU-->
		
		
		<!-- cont -->
		<div id="container">
			<div id="cont" ng-view></div>
		</div>
		<!-- end cont-->
		
	</body>

</html>
