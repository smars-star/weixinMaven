<%@ page language="java" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="renderer" content="webkit">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,Chrome=1">
  <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0">
  <title>二维码生成页面</title>
   
   <%
	request.setAttribute("sys_titleInfo", "二维码生成页面");
    %>
  <%@include file="/common/taglib.jsp"%>
  <%@include file="/common/js_css.jsp"%>
  <%--@include file="/common/JQuery.jsp"--%>
  

  
  
  <style type="text/css">
          .content{     
		   margin-top:0px;
			border:solid #AEC7E1 2px;     
			width:200px;
			border-top: 0px;
			height: auto; 
			display:none;       
		 }         
		
		.item{
		    font-size:14px;
		    width:300px;
		   cursor:pointer;
		 }  
		 
  </style>
  
</head>
<body>
  <%@include file="/common/head.jsp"%>
  
<form action="createBase64QRCode.do" method="post" onsubmit="return false;" id="loginID">
 
<h1 class="text-center">二维码生成页面</h1>	<br /> 
	
  <div class="form-group">
    <label for="exampleInputEmail1">二维码内容</label>
    <input name="content" class="form-control" id="content" placeholder="二维码内容" style="height: 150px;">
  </div>
  
  <div >
         <div  style="float: right;margin-right: 10px;">
              <button type="submit" class="btn btn-default" onclick="createBase64QRCode();">生成二维码</button>
	     </div>
	     
        <div style="float: right;">
		             <input type="text" id="typeFormat" class="form-control"    readonly="readonly" style="width: 200px; float:left;cursor: pointer;" name="typeFormat"   value="png"/>
					 <div  id="showSelect"  class="content"  style="margin-left: 0px;margin-top: 8px;display: none;">
					         <a><div class="item" style="width:200px;margin-left: 10px;">png<input type="hidden" name="recipientEmployeeIDStr"  value="png"/></div></a>
					         <a><div class="item" style="width:200px;margin-left: 10px;">jpg<input type="hidden" name="recipientEmployeeIDStr"  value="jpg"/></div></a>
					         <a><div class="item" style="width:200px;margin-left: 10px;">bmp<input type="hidden" name="recipientEmployeeIDStr"  value="bmp"/></div></a>
					 </div>

		 </div>
    
</div>


  <div class="form-group  showQRCode">
   
  </div>


 
</form>	
 
  <script type="text/javascript" src="../media/zTree/js/jquery-1.4.4.min.js"></script>
  <script type="text/javascript">
  $(function(){
  
				//当点图片格式Input框显示下拉框
				$("#typeFormat").click(function(e){
					if($("#showSelect").css("display")=="none"){
						   $("#showSelect").show();
				    }else{
						   $("#showSelect").hide();
					}
						e.stopPropagation();
				})
				
				$(document).click(function(){
				   $("#showSelect").hide();
				})
				
			  
			  $(".item").click(function(){
				    //项目更新包接收人
					var  tempEmployeeIDStr = $(this).find("input[name=recipientEmployeeIDStr]").val().replace(/(^\s*)|(\s*$)/g, "");
					
				    $("#typeFormat").val(tempEmployeeIDStr);//更改接收人input中value的信息
					$("#showSelect").css("display","none");//隐藏接收人信息
		  	})

  })
      
  // 生成二维码
  function  createBase64QRCode(){
	  
	  var  typeFormatStr = $("#typeFormat").val();//图片格式
	  var  contentStr  = $("#content").val();// 生成二维码内容
	  
	   $.ajax({
		   type: "POST",
		   url: "createBase64QRCode.do",
		   data: "typeFormat="+typeFormatStr+"&content="+contentStr,
	      success: function(data) {
	    	  
	    	var showQRCodeStr=  '<a href="#" ><img  src="'+data+'"></a>';
	    	  
	    	  $(".showQRCode").html(showQRCodeStr);
				
	      },
	      error: function(e) {
	        alert("对不起，由于网络原因暂时生成二维码！！         请稍后重试！");
	      }
	    }); 
  }

  
  </script>
  
  
</body>
</html>