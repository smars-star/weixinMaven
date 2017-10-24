<%@ page contentType="text/html; charset=UTF-8" %>
<%@include file="/common/taglib.jsp"%>
<%request.setAttribute("titleInfo","GDS CSS 使用规范");%>
<title>GDS CSS 使用规范</title>

<div class="portlet BorderColor paddingTopAndBottom30" style="width:650px;height:420px;margin:0 auto">
	<table width="95%" border="0" cellpadding="0" cellspacing="0" align="left">
		<tr>
			<td>
				<img src="<%=request.getContextPath()%>/media/images/unknownErrorPic.png"/>
				<div id="wrongContent" style="display: none;"><%=(String)request.getAttribute("MSG")%></div>
				<div id="sugges" style="display: none;"><%=(String)request.getAttribute("Error")%></div>
			</td>
		</tr>
		<tr>
			<td align="right">
				<a class="button button-rounded button-flat-highlight" href="#" name="closeButton" onclick="window.close()"><i class="icon-remove"></i>关闭</a>
			</td>
		</tr>
	</table>
</div>

<script language="javascript">
    var urlflag = true;
    if (window.opener != null){  //如果其首页面上的连接有homepage， 则不认为是弹出的页面
       var strurl = window.opener.document.URL
       urlflag = (strurl.indexOf("homepage")>-1);
    }
</script>

