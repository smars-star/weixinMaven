<%@ page language="java" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
   <meta charset="UTF-8">
  <meta name="renderer" content="webkit">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,Chrome=1">
  <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0">
  <title>微信MVC框架首页</title>
  
  <%
	request.setAttribute("sys_titleInfo", "微信MVC框架首页");
    %>
    
  <%@include file="/common/taglib.jsp"%>
  <%@include file="/common/js_css.jsp"%>
  <%@include file="/common/JQuery.jsp"%>
  
  <style type="text/css">
body, div, ul, li, p, a, img {
	padding: 0;
	margin: 0;
}

/*右侧悬浮菜单*/
.slide {
	width: 50px;
	height: 100px;
	position: fixed;
	top: 50%;
	margin-top: -126px;
	background: #018D75;
	right: 0;
	border-radius: 5px 0 0 5px;
	z-index: 999;
}

.slide ul {
	list-style: none;
}

.slide .icon li {
	width: 50px;
	height: 50px;
	background: url(<%=request.getContextPath() %>/media/images/pay.jpg) no-repeat;
}

.slide .icon li.wx {
	background-position: 0px 1px;
	background-size: 100px 50px;
}

.slide .icon li.zhi {
	background-position: -50px -1px;
	background-size: 100px 50px;
}

.slide .info {
	top: 50%;
	height: 180px;
	position: absolute;
	right: 100%;
	background: #FFFFFF;
	width: 0px;
	overflow: hidden;
	margin-top: -73.5px;
	transition: 0.5s;
	border-radius: 4px 0 0 4px;
}

.slide .info.hover {
	width: 160px;
}

.slide .info li {
	width: 160px;
	color: #CCCCCC;
	text-align: center;
}

.slide .info li div.img {
	height: 100%;
	background: #DEFFF9;
}

.slide .info li div.img img {
	width: 100%;
	height: 100%;
}

/*自适应 当屏小于1050时隐藏*/
@media screen and (max-width: 1050px) {
	.slide {
		display: none;
	}
	#btn {
		display: none;
	}
}

/* 图片进行缩放  */
div image {
	cursor: pointer;
	transition: all 0.6s;
	margin-bottom: 0px;
}

 div img:hover {
	transform: scale(0.98);
} 

div p {
	position: absolute;
	top: 0;
	left: 0;
}

 .miaoshu{
    width:310px;
    height:20px;
    text-align:center;
    font:bolder;
    margin-bottom:-20px;
    position: relative;
}
</style>
  
</head>
<body>
  <%@include file="/common/head.jsp"%>
        
<div class="list-group">
		   <a href="./test/findEmployee.do" class="list-group-item list-group-item-success" >查询人员(部门)信息【滚动加载数据】</a>
		   <a href="./weixin/findAddressBookEmpInfo.do" class="list-group-item list-group-item-info">微信通讯录人员维护</a>
		   <a href="./weixin/findAddressBookDepInfo.do" class="list-group-item list-group-item-warning">微信通讯录部门维护</a>
		   <a href="./qrcode/findAllQRCode.do" class="list-group-item list-group-item-danger">常用链接二维码入口(网页授权) </a>
		   <a href="./pageAuthorization/findPageAuthorization.do" class="list-group-item list-group-item-success" >网页应用(JS-SDK)</a>
		   <a href="javascript:alert('暂未开通！');" class="list-group-item list-group-item-success" >企业微信支付</a>
		   <a href="./qrcode/findBase64QRCode.jsp" class="list-group-item list-group-item-info">二维码生成工具</a>

		   <div style="position: absolute;bottom: 100px;width: 100%;" align="center">
		          <p class="miaoshu">欢迎关注陕西长城数字软件有限公司</p>
		          <img alt="企业号二维码" src="<%=request.getContextPath() %>/media/images/qrcode_gds_small.png"   class="img-responsive">
		          <h4>长城数字企业号二维码</h4>
		   </div>
		
		   <!--右侧悬浮菜单-->
			<div class="slide">
				<ul class="icon">
					<li class="zhi"></li>
					<li class="wx"></li>
				</ul>
				<ul class="info">
					<li class="wx">
					    <div style="width:100%;text-align: center;padding: 2px;font-weight: 200;color: #A94442;background-color: #F2DEDE;">请您使用《微信》捐赠</div>
						<div class="img"><img src="<%=request.getContextPath() %>/media/images/weixin_pay.png" /></div>
					</li>
					<li class="zhi">
					    <div style="width:100%;text-align: center;padding: 2px;font-weight: 200;color: #A94442;background-color: #F2DEDE;">请您使用《支付宝》捐赠</div>
						<div class="img"><img src="<%=request.getContextPath() %>/media/images/zhi_pay.png" /></div>
					</li>
				</ul>
			</div>

</div>
        
        
        
<script type="text/javascript">
$(function(){
      
	//鼠标悬浮显示
 	$('.slide .icon li').mouseenter(function(){
		$('.slide .info').addClass('hover');
		$('.slide .info li').hide();
		$('.slide .info li.'+$(this).attr('class')).show();//.slide .info li.qq
	});
 	
	//鼠标悬浮隐藏
 	$('.slide').mouseleave(function(){
		$('.slide .info').removeClass('hover');
	}); 

	
});
</script>

</body>
</html>