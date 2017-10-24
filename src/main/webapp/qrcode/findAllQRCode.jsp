<%@ page language="java" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="renderer" content="webkit">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,Chrome=1">
  <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0">
  <title>微信 应用常用应用二维码</title>
  
      <%
	request.setAttribute("sys_titleInfo", "微信应用常用应用二维码");
    %>
    
  <%@include file="/common/taglib.jsp"%>
  <%@include file="/common/js_css.jsp"%>
  <%--@include file="/common/JQuery.jsp"--%>
  
</head>
<body>
  <%@include file="/common/head.jsp"%>
  
<form action="findAllQRCode.do" method="post" onsubmit="return false;">
	
<div style="width:100%;vertical-align: top;margin-top: 25px;line-height: 40px;text-align: center;padding: 10px;">
		    <div class="row">
            <c:forEach  items="${qrCodeImageStrMap }" var="qrCodeImageStr">
							  
							  <div class="col-sm-6 col-md-4">
							    <div class="thumbnail">
							           <a href="#" > <img alt=" ${qrCodeImageStr.key}" src="${qrCodeImageStr.value}"></a>
							           <div class="caption">
							               <h3> ${qrCodeImageStr.key}</h3>
							  	       </div>
							    </div>
							  </div>
							  
							  
            </c:forEach>
			</div>
</div>	

 
</form>	
 
  <!-- <script type="text/javascript" src="../../media/js/jquery/jquery.js"></script> -->
  <script type="text/javascript" src="../../media/zTree/js/jquery-1.4.4.min.js"></script>
  
</body>
</html>