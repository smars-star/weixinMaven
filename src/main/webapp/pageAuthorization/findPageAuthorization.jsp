<%@ page language="java" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="renderer" content="webkit">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,Chrome=1">
  <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0">
  <title>网页应用授权和JS-SDK应用</title>
    <%
	request.setAttribute("sys_titleInfo", "网页应用授权和JS-SDK应用");
    %>
    
  <%@include file="/common/taglib.jsp"%>
  <%@include file="/common/js_css.jsp"%>
  <%--@include file="/common/JQuery.jsp"--%>
  
</head>
<body>
  <%@include file="/common/head.jsp"%>
    
		 
		  <div style="text-align: center;margin-top: 20px;">
		   <div id="wx_reg"></div>
		        <a href="https://open.work.weixin.qq.com/wwopen/sso/qrConnect?appid=wxf7a04f0e99c52b6f&agentid=1000004&redirect_uri=http%3a%2f%2fsmars.iok.la%2frenewalevaluateweixin%2ffindAllRenewalEvaluate.do">
		                 <button type="button" class="btn btn-info">手动跳转链接</button>
		        </a>
		  </div>
		  
		<script type="text/javascript" src="/media/weixin/js/wwLogin-1.0.0.js"></script>
		<script type="text/javascript" src="/media/weixin/js/jweixin-1.2.0.js"></script>
		 <script type="text/javascript">
		    //网页授权
			 window.WwLogin({
			        "id" : "wx_reg",  
			        "appid" : "wxf7a04f0e99c52b6f",
			        "agentid" : "35",
			        "redirect_uri" :"http%3a%2f%2f16i640f688.imwork.net%3a24130%2frenewalevaluateweixin%2ffindAllRenewalEvaluate.do",
			       
			});
		    
		     //JS-SDK 开始
			 wx.config({
				    beta: true,// 必须这么写，否则在微信插件有些jsapi会有问题
				    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
				    appId: 'wxf7a04f0e99c52b6f', // 必填，企业微信的cropID
				    timestamp: 1504489723, // 必填，生成签名的时间戳
				    nonceStr: 'h2z7e42b5gqtzkt', // 必填，生成签名的随机串
				    signature: '${sessionScope.jsapi_ticket}',// 必填，签名，见附录1
				    jsApiList: ['getNetworkType','getLocation'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
			  });
			 
		     //成功
			 wx.ready(function(){
				    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
				    
						//判断当前客户端版本是否支持指定JS接口
						wx.checkJsApi({
							    jsApiList: ['getNetworkType','getLocation'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
							    success: function(res) {
							        // 以键值对的形式返回，可用的api值true，不可用为false
							        // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
							    }
						 });
						    
						//获取GPS地理位置    
						 wx.getLocation({
							    type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
							    success: function (res) {
							        var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
							        var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
							        var speed = res.speed; // 速度，以米/每秒计
							        var accuracy = res.accuracy; // 位置精度
							        
							        console.log(latitude+":"+":"+longitude+":"+speed+":"+accuracy);
							        
							    }
							});
						
						//获取网络状态接口
						 wx.getNetworkType({
							    success: function (res) {
							        var networkType = res.networkType; // 返回网络类型2g，3g，4g，wifi
							    }
						 });
						
						 //隐藏右上角菜单接口
						 wx.hideOptionMenu();
						 
						 //批量隐藏功能按钮接口
						 wx.hideMenuItems({
							    menuList: ['share:email'] // 要隐藏的菜单项，所有menu项见附录3
						 });
				    
				});
			 
		     //失败
		     wx.error(function(res){
			    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
		   	});
		
					
		 </script>
		 
</body>
</html> 