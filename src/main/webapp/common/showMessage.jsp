<%@ page language="java" pageEncoding="UTF-8"%>
  <!DOCTYPE html>
  <html xmlns="http://www.w3.org/1999/xhtml" lang="zh-cn">

  <head>
    <title>提示信息</title>
    <meta charset="utf-8">
    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,Chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1">
	<%@include file="/common/taglib.jsp"%>
	<%@include file="/common/JQuery.jsp"%>
	<%
	request.setAttribute("sys_titleInfo", "提示信息");
    %>
<script language="javascript">
function refresh_url(p_url)
{
  if(window.opener!=null)
  {
	 try{
			if('null'!=p_url  &&  p_url != null && p_url != "" )
			{
				var result_url=getExtUrl(p_url).replace("#","");
				if( window.opener.document.POSTFORMNAME.FORMNAME.value.length> 0 )
				{
				   try
				   {
					 window.opener.document.forms[window.opener.document.POSTFORMNAME.FORMNAME.value].action=result_url;
					 window.opener.document.forms[window.opener.document.POSTFORMNAME.FORMNAME.value].submit();
				   }
				   catch(e)
				   {
					 window.opener.document.forms[window.opener.document.POSTFORMNAME.FORMNAME.value][0].action=result_url;
					 window.opener.document.forms[window.opener.document.POSTFORMNAME.FORMNAME.value][0].submit();
				   }
				}
				else
				{
					window.opener.location.href=result_url;
				}
			}
			else if( window.opener.document.POSTFORMNAME.FORMNAME.value.length> 0 )
			{
			   try
			   {
				 window.opener.document.forms[window.opener.document.POSTFORMNAME.FORMNAME.value].action=window.opener.location.href;
				 window.opener.document.forms[window.opener.document.POSTFORMNAME.FORMNAME.value].submit();
			   }
			   catch(e)
			   {
				 window.opener.document.forms[window.opener.document.POSTFORMNAME.FORMNAME.value][0].action=window.opener.location.href;
				 window.opener.document.forms[window.opener.document.POSTFORMNAME.FORMNAME.value][0].submit();
			   }
			}
			else
			{
			 	window.opener.location.reload(); 
			}
	 }catch(e){
		 window.opener.location.reload(); 
		 }
  }
}

function getExtUrl(p_url)
{
	//父页面的url
	var partent_url=window.opener.document.URL;
	//最终的url
	var resultUrl="";
	//父页面中自？号后的参数
	var ext_url="";
	//如果父页面的url中含有参数时
	if(partent_url.indexOf("?")>0)
		ext_url=partent_url.substring(partent_url.indexOf("?")+1);
	if(ext_url.length>0)
	{
		//对ext_url_str要进行过滤处理－－如果ext_url_str中有与url中相同的参数时应将ext_url_str的去掉
		if(ext_url.indexOf("&")<0)//只有一个参数
		{
			if(p_url.indexOf(ext_url)<0)
			{
				resultUrl=ext_url;
			}
		}
		else //有多个参数时
		{
			var para1=new Array();
			para1=ext_url.split("&");
			for(var i=0;i<para1.length;i++)
			{
				if(p_url.indexOf(para1[i])<0)
				{
					if(resultUrl=="")
					{
						resultUrl=para1[i];
					}
					else
					{
						resultUrl+="&"+para1[i];
					}
				}
			}
		}
		if(p_url.indexOf("?")>=0)
		{
			if(resultUrl!="")
			{
				resultUrl="&"+resultUrl;
			}
			resultUrl="<%=request.getContextPath()%>"+"/"+p_url+resultUrl;
		}
		else
		{
			resultUrl="<%=request.getContextPath()%>"+"/"+p_url+"?"+resultUrl;
		}
	}
	else //父页面的url中没有参数时
	{
		resultUrl="<%=request.getContextPath()%>" + "/" + p_url;
		}
		return resultUrl;
	}
</script>
<style type="text/css">
<!--
html, body {
	margin: 0;
	padding: 0;
	width: 100%;
	height: 100%;
}

.wrap {
	position: absolute;
	top: 100px;
	right: 60px;
	bottom: 60px;
	left: 60px;
	padding: 20px;
	min-width: 360px;
	min-height: 200px;
	text-align: left;
	background: #fff;
	box-shadow: 0 0 8px rgba(100, 100, 100, .1);
	text-align: center;
	border-radius: 6px;
	-moz-border-radius: 6px;
	-webkit-border-radius: 6px;
	border: 1px solid #efefef;
	border-bottom: 1px solid #e0e0e0;
}

.bottom {
	background: #f0f0f0;
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	height: 52px;
	padding: 10px 30px 6px 6px;
	text-align: right;
	border-bottom-left-radius: 7px;
	border-bottom-right-radius: 7px;
	-moz-bottom-left-border-radius: 7px;
	-moz-bottom-right-border-radius: 7px;
	-webkit-bottom-left-border-radius: 7px;
	-webkit-bottom-right-border-radius: 7px;
}
-->
</style>
</head>
<body>
 
<div class="main"> 
<form action="" method="post">
	<div class="wrap">
		<div class="text-left">温馨提示</div>
		<div style="max-width: 450px; margin: 20px auto 0">
			<!-- 提示图标 -->
			<div class="pull-left">
				<!-- <i class="icon-exclamation-sign fg-color-yellow icon-5x"></i> -->
				<img src="../media/images/frown_face.png"/>
			</div>
			<div class="pull-left" align="left" style="line-height: 2.2;padding-top:22px;">
				<c:if test="${SYSTEM_OPERATION_INFO!=''}">
       				${SYSTEM_OPERATION_INFO}<br>
				</c:if>
				<font color="#FF0000">本窗口将在<span id="miao">3</span>秒钟之后自动关闭!
				</font>
			</div>
			<div class="clearfix"></div>
		</div>
		<div class="bottom">
			<a class="button button-rounded button-flat-caution" href="#"
				onclick="javascript:closeWindow()"><i class="icon-remove"></i>
				关闭窗口</a>
		</div>
	</div>
</form>
</div>
<script>
	function countDown(secs, mes) {
		miao.innerText = secs - 1;
		if (secs == 1) {
			window.opener.location.reload();
			window.close();
		}
		if (--secs > 0)
			setTimeout("countDown(" + secs + ")", 1000);
	}
	countDown(3);
	function closeWindow() {
		window.opener.location.reload();
		window.close();
	}
</script>
</body>
</html>
