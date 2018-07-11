<!DOCTYPE html>
<html>
<head>
  <%@include file="/common/taglib.jsp"%>
  <meta charset="UTF-8">
  <meta name="renderer" content="webkit">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,Chrome=1">
  <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0">
  <title>智能监控终端</title>
  
  <link rel="stylesheet" href="../../media/css/weui.min.css">
  <link rel="stylesheet" href="../../media/css/weui-gds.css">
  <link rel="stylesheet" href="../../media/jquery-weui/css/jquery-weui.css">
  
  <style type="text/css">
   .swiper-container {
     width: 100%;
     height: 230px;
   } 

  .swiper-container img {
    display: block;
    width: 100%;
  }
 </style>
</head>
<body ontouchstart>

<div class="container">
    
    <input type="hidden" name="warningID" id="warningID" value="${phoneWarningDTO.warningID }">
    
    <div class="weui-tab" style="height:auto;">
      <div class="weui-navbar">
        <div class="weui-navbar__item weui-bar__item_on">图集</div>
        <div class="weui-navbar__item">视频</div>
      </div>
      
          <div class="weui-tab__panel">
          
               <div class="weui-cells">
		           <div class="weui-cell">
		               <div class="swiper-container">
		               
					      <div class="swiper-wrapper">
					        <c:choose>
					        
					           <c:when test="${not empty phoneWarningDTO.imagespathList }">
					              <c:forEach items="${phoneWarningDTO.imagespathList }" var="imagespath">
							        <div class="swiper-slide"><img src="http://119.3.19.153:10083/file/${imagespath}" width="100%" height="194"/></div>
							      </c:forEach>
					           </c:when>
					           
					           <c:otherwise>
					              <div class="swiper-slide"><img src="../../media/phoneWarning/images\1.jpg" /></div>
					           </c:otherwise> 
					           
					        </c:choose>
					
                         </div>
					      <div class="swiper-pagination"></div>
					      
					    </div>
		           </div>
		       </div> 
		       
		       <div id="os_dcl" class="hidden">
		         <div class="weui-cells">
		           
		          <c:choose>
		            <c:when test="${ not empty  phoneWarningDTO.videospathList }">
		                <c:forEach items="${phoneWarningDTO.videospathList }" var="videospath">
				           <div class="weui-cell">
					          <video controls="controls" style="width:100%;height: 230;">
		                        <source  src="http://119.3.19.153:10083/file/${videospath}" type="video/mp4">						
								您的浏览器不支持此种视频格式。
							  </video> 
						  </div>
				        </c:forEach>
		            </c:when>
		            <c:otherwise>
		                <div class="weui-cell">
				          <video controls="controls" width="100%" height="230">
	                        <source  src="../../media/phoneWarning/wav/Robotica_720.mp4" type="video/mp4">						
							您的浏览器不支持此种视频格式。
						  </video> 
					  </div>
		            </c:otherwise>
		          </c:choose>
				  
		         </div>    
		       </div>
		       
       </div>
             
   </div>
   
   
   <div class="weui-cells">
              <div class="weui-cell">
	                <a href="javascript:void(0);" id="openLocation"  latitude="${phoneWarningDTO.warninglat }" longitude="${phoneWarningDTO.warninglon }"  class="weui-media-box weui-media-box_appmsg">
                    <div class="weui-media-box__hd">
                        <img class="weui-media-box__thumb" src="../../media/phoneWarning/images/map-marker.png" alt="">
                    </div>
                    <div class="weui-media-box__bd">
                        <h4 class="weui-media-box__title">${phoneWarningDTO.warningTypeName}告警地点</h4>
                        <p class="weui-media-box__desc">${phoneWarningDTO.district }${phoneWarningDTO.town }${phoneWarningDTO.village }</p>
                    </div>
                   </a>
	           </div>
	            
	            <div class="weui-cell" >
				    <c:if test="${phoneWarningDTO.warningStatusCode eq '1' }">
				       <a href="javascript:void(0)" id="openDepContacts" class="weui-btn weui-btn_plain-default" style="margin-top: 0px;width:25%;font-size: 16px;">派警</a>
	                </c:if>
				    <a href="javascript:void(0)" class="weui-btn weui-btn_primary" onclick="modifyPhoneWarning('${phoneWarningDTO.warningID}','3');" style="margin-top: 0px;width:33%;font-size: 16px;">确认该警告</a>
					<a href="javascript:void(0)" id="shareAppMessage" class="weui-btn weui-btn_warnning"  onclick="modifyPhoneWarning('${phoneWarningDTO.warningID}','2');" style="margin-top: 0px;width:33%;font-size: 16px;" >标记为误报</a>
				</div>
				
      </div>
      
 </div>

		         


  <script src="../../media/js/jquery/jquery2.1.4.min.js"></script>
  <script src="../../media/jquery-weui/js/jweixin-1.2.0.js"></script>
  
  <script src="../../media/jquery-weui/js/jquery-weui.js"></script>
  <script src="../../media/jquery-weui/js/swiper.js"></script>

    <script>
    
    var navbarIndex;
    $(function() {
      $('.weui-navbar__item').on('click', function() {
        $(this).addClass('weui-bar__item_on').siblings('.weui-bar__item_on').removeClass('weui-bar__item_on');
        navbarIndex = $(this).index();
        showNavbar(navbarIndex);
      });
    });
    
    //显示第几个标签页
    function showNavbar(index) {
      $('.weui-tab__panel>div').eq(index).show().siblings().hide();
    }
    
    
      $(".swiper-container").swiper({
        loop: true,
        autoplay: 3000
      });
        
        //configWx();
        function configWx() {  
        	// 获取当前页面URL链接
        	var  httpUrl = location.href.split('#')[0];
        	$.ajax({
                cache: true, //缓存开启加速
                type: "POST",
                url: "/phoneWarning/getJsTicket.do",
                data: "url="+httpUrl,
                async: false, //同步、异步                
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                  $.toast("JsTicket配置请求错误！", function() {
                      console.log('close');
                    });
                },
                success: function(data) {
                	 if (data != null) {  
                		 
                        wx.config({  
                        	beta: true,// 必须这么写，否则wx.invoke调用形式的jsapi会有问题
                            debug : false,// 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。  
                            appId : data.appId,  
                            timestamp : data.timestamp,  
                            nonceStr : data.nonceStr,  
                            signature : data.signature,  
                            jsApiList : [
                                         'getLocation',
                                         'openLocation',
                                         'openEnterpriseContact',
                                         'selectEnterpriseContact',
                                         'openEnterpriseChat'
                                         ]  
                        }); 
                        wx.ready(function () {
                           
                        	// 查看地理位置
                        	document.querySelector('#openLocation').onclick = function () {
                        		var latitude = parseFloat($(this).attr("latitude"));
                        	    var longitude = parseFloat($(this).attr("longitude"));
                        	    
                        		wx.openLocation({
                            	    latitude: latitude, // 纬度，浮点数，范围为90 ~ -90
                            	    longitude: longitude, // 经度，浮点数，范围为180 ~ -180。
                            	    name: '', // 位置名
                            	    address: '', // 地址详情说明
                            	    scale: 16, // 地图缩放级别,整形值,范围从1~28。默认为16
                            	});
                        		
                        	}
                      
                      // 创建通讯录联系人
                      var selectEnterpriseContactFun  = function (){
                          
                    	  wx.invoke("selectEnterpriseContact", {
                              "fromDepartmentId": -1,// 必填，-1表示打开的通讯录从自己所在部门开始展示, 0表示从最上层开始
                              "mode": "single",// 必填，选择模式，single表示单选，multi表示多选
                              "type": ["user"],// 必填，选择限制类型，指定department、user中的一个或者多个
                              "selectedDepartmentIds": [],// 非必填，已选部门ID列表。用于多次选人时可重入
                              "selectedUserIds": []// 非必填，已选用户ID列表。用于多次选人时可重入
			                        },function(res){
			                                if (res.err_msg == "selectEnterpriseContact:ok"){
			                                	
				                                	if (res.err_msg.indexOf('function_not_exist') > -1) {
				                                        alert('版本过低请升级');
				                                    } else if (res.err_msg.indexOf('openEnterpriseContact:fail') > -1) {
				                                        return;
			                                   		}
			                                        
			                                	    // 获取选择的UserIds
		                                            var tempUserIds = "";
		                                        
			                                        if(typeof res.result == 'string'){
			                                            res.result = JSON.parse(res.result) //由于目前各个终端尚未完全兼容，需要开发者额外判断result类型以保证在各个终端的兼容性
			                                        }
			                                        var selectedDepartmentList = res.result.departmentList;// 已选的部门列表
			                                        for (var i = 0; i < selectedDepartmentList.length; i++) {
			                                            var department = selectedDepartmentList[i];
			                                            var departmentId = department.id;// 已选的单个部门ID
			                                            var departemntName = department.name;// 已选的单个部门名称
			                                        }
			                                        var selectedUserList = res.result.userList; // 已选的成员列表
			                                        for (var i = 0; i < selectedUserList.length; i++){
			                                            var user = selectedUserList[i];
			                                            var userId = user.id; // 已选的单个成员ID
			                                            var userName = user.name;// 已选的单个成员名称
			                                            var userAvatar= user.avatar;// 已选的单个成员头像
			                                            tempUserIds  +=  user.id +";";
			                                        }
			                                        
			                                        // 对获取userIds进行封装
			                                        tempUserIds = tempUserIds.substring(0,tempUserIds.length-1);
			                                       
			                                        // 获取告警Id
			                                        var  warningID = $("#warningID").val();
			                                        
			                                        $.ajax({
			                                            cache: true, //缓存开启加速
			                                            type: "POST",
			                                            url: "/phoneWarning/sendUsersMessage.do",
			                                            data: "userIds="+tempUserIds+"&warningID="+warningID,
			                                            async: false, //同步、异步                
			                                            error: function(XMLHttpRequest, textStatus, errorThrown) {
			                                              $.toast("发送消息失败，请重试！", function() {
			                                                     console.log('close');
			                                                   });
			                                            },
			                                            success: function(data) {
			                                            	 if (data != null) {  
			                                            		 $.toast(data, function() {
				                                                     console.log('close');
				                                                   });
			                                            	 }
			                                            	
			                                            }
			                                    	});
                                      
			                                }
			                        }
			                );
                    	  
                      }
                      
                      var  warningStatusCode  = '${phoneWarningDTO.warningStatusCode}';
                      
                      if( warningStatusCode == '1'  ){
                    	 // 打开通讯录
                    	document.querySelector('#openDepContacts').onclick = function () {
                    	   //内部能联系人 
                    	   selectEnterpriseContactFun();
                    	}  
                      }  	 
                        
                            
                     });
                     
                     wx.error(function (res) {
                       alert("err....:"+res.errMsg);
                     }); 
                     
                  } else {  
                 	 $.toast("配置weixin jsapi失败", function() {
                         console.log('close');
                       });
                  }  
             }
           });
     } 
        
      //  修改警告状态
      function modifyPhoneWarning(warningID,waringStatusCode){
    	  $.ajax({
              cache: true, //缓存开启加速
              type: "POST",
              url: "/phoneWarning/modifyPhoneWarning.do",
              data: "waringStatusCode="+waringStatusCode+"&warningID="+warningID,
              async: false, //同步、异步                
              error: function(XMLHttpRequest, textStatus, errorThrown) {
                weui.alert("修改警告状态失败，请重试！");
              },
              success: function(data) {
              	 if (data != null) {  
              		$.toast(data, function() {
                        console.log('close');
                      });
              	 }
              }
      	});
      }
     
    </script>
</body>
</html>