<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<script type="text/javascript">
	// context for 'Global Use'
	var ctx = "${ctx}";
	<!--
	var userId = "${userId}";
	var isAdmin = "${isAdmin}";
	-->
</script>
<link rel="StyleSheet" href="${ctx}/css/common.css" type="text/css"/>
<link rel="StyleSheet" href="${ctx}/css/highcharts.css" type="text/css"/>
<%-- <script src="${ctx}/resources/js/bootstrap.js" type="text/javascript" charset="utf-8"></script> --%>

<script src="${ctx}/scripts/angularjs/angular.js" type="text/javascript" charset="utf-8"></script>
<script src="${ctx}/scripts/angularjs/angular-route.js" type="text/javascript" charset="utf-8"></script>
<script src="${ctx}/scripts/angularjs/angular-animate.js" type="text/javascript" charset="utf-8"></script>

<script src="${ctx}/scripts/highcharts/highcharts.js" type="text/javascript" charset="utf-8"></script>
<script src="${ctx}/scripts/highcharts/highcharts-more.js" type="text/javascript" charset="utf-8"></script>
<%-- <script src="${ctx}/scripts/highcharts/modules/series-label.js" type="text/javascript" charset="utf-8"></script> --%>
<script src="${ctx}/scripts/highcharts/modules/exporting.js" type="text/javascript" charset="utf-8"></script>
		
<%-- <script src="${ctx}/scripts/angularjs/angular-sanitize.js" type="text/javascript" charset="utf-8"></script> --%>

<%-- <script src="${ctx}/scripts/angularjs/angular-file-upload-shim.js" type="text/javascript" charset="utf-8"></script> --%>
<%-- <script src="${ctx}/scripts/angularjs/angular-file-upload.js" type="text/javascript" charset="utf-8"></script> --%>

<%-- <script src="${ctx}/scripts/angularjs/ng-file-upload-shim.js" type="text/javascript" ></script> --%>
<%-- <script src="${ctx}/scripts/angularjs/ng-file-upload.js" type="text/javascript" ></script> --%>

<%-- <script src="${ctx}/scripts/bootstrap/ui-bootstrap-tpls-2.5.0.js" type="text/javascript" charset="utf-8"></script> --%>
<%-- <script src="${ctx}/scripts/bootstrap/bootstrap.js" type="text/javascript" charset="utf-8"></script> --%>

