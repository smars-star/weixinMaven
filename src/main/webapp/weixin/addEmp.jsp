<%@ page language="java" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,Chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0">
    <title>新增微信人员信息</title>
    <%
	request.setAttribute("sys_titleInfo", "新增微信人员信息");
    %>
    
    <%@include file="/common/taglib.jsp"%>
  <%@include file="/common/js_css.jsp"%>
  <%--@include file="/common/JQuery.jsp"--%>
  
</head>
<body>
  <%@include file="/common/head.jsp"%>
  
<form action="addEmp.do" method="post" onsubmit="return false;">
  
  <div style="max-width: 85%;vertical-align: top;margin-top: 25px;line-height: 40px;" align=center>
 <table  style="vertical-align:top;max-height: 850px;overflow: auto;">
	   <tr>
	           <td class="text-right">用户ID(userNO)：</td>
	           <td>
	                  <input name="userid" type="text"  class="form-control">
	           </td>
	   </tr>
	   <tr>
	           <td class="text-right">姓名：</td>
	           <td>
	                  <input name="name" " type="text" class="form-control">
	           </td>
	   </tr>
	   <tr>
	           <td class="text-right">性别：</td>
	           <td>
	                  <input name="gender"  type="radio" value="1" checked="checked" >男
	                  <input name="gender"  type="radio" value="2" checked="checked">女
	           </td>
	   </tr>
	   <tr>
	           <td class="text-right">部门名称：</td>
	           <td>
	             <input type="text" name="depName" readonly="readonly" class="form-control"  style="cursor:hand;">
	             <input type="hidden" name="department" >
	             <div id="showDepTreeID" style="width:180px;vertical-align: top;margin-top:0px;display: none;max-height: 150px;overflow: auto;position: absolute;background-color: #C1C1C1;" align=center >
				     <ul id="tree" class="ztree"></ul>
				</div>	
	           </td>
	   </tr>
	   <tr>
	           <td class="text-right">职务：</td>
	           <td><input  type="text"  name="position"  class="form-control"></td>
	   </tr>
	   <tr>
	           <td class="text-right">手机：</td>
	           <td><input  type="text"  name="mobile"  class="form-control"></td>
	   </tr>
	   <tr>
	           <td class="text-right">电话：</td>
	           <td><input  type="tel"  name="telephone"  class="form-control"></td>
	   </tr>
	   <tr>
	           <td class="text-right">email：</td>
	           <td><input  type="text"  name="email"  class="form-control"></td>
	   </tr>
	   <tr>
	           <td class="text-right">身份：</td>
	           <td>
	              <c:choose>
	                   <c:when test="${weixinEmpDTO.isleader eq 1}">
	                       <input type="radio"  name="isleader"  value ="1" checked="checked"> 普通成员
	                       <input type="radio"  name="isleader"  value ="2" > 上级
	                   </c:when>
	                   <c:when test="${weixinEmpDTO.isleader eq 2}">
	                       <input type="radio"  name="isleader"  value ="1" >  普通成员
	                       <input type="radio"  name="isleader"  value ="2"  checked="checked"> 上级
	                   </c:when>
	                   <c:otherwise>
	                       <input type="radio"  name="isleader"  value ="1" >  普通成员
	                       <input type="radio"  name="isleader"  value ="2"> 上级
	                   </c:otherwise>
	              </c:choose>
	           </td>
	   </tr>
	   <tr>
	           <td class="text-right">英文名称：</td>
	           <td>
	                  <input type="text" name="english_name" class="form-control">
	           </td>
	   </tr>

</table>
 
  <div  style="margin-top: 10px;padding-left: 20px;">
     <button type="button" class="btn btn-primary" onclick="addSave();">保存</button>
      <button type="button" class="btn btn-default"  onclick="window.close()"> 取消</button>
  </div>
  
 </div>
</form>	
 
  <!-- <script type="text/javascript" src="../../media/js/jquery/jquery.js"></script> -->
  <script type="text/javascript" src="../../media/zTree/js/jquery-1.4.4.min.js"></script>
  <script type="text/javascript" src="../../media/zTree/js/jquery.ztree.core.js"></script>
  
  <script type="text/javascript">
  
  var zTree;
	var demoIframe;

	var setting = {
		view: {
			dblClickExpand: false,
			showLine: true,
			selectedMulti: false
		},
		data: {
			simpleData: {
				enable:true,
				idKey: "id",
				pIdKey: "parentid",
				rootPId: "1"
			}
		},
		callback: {
			beforeClick: function(treeId, treeNode) {
				var zTree = $.fn.zTree.getZTreeObj("tree");
				showDepInfo(treeNode.id,treeNode.name);
			}
		}
	};

	//部门信息
	var zNodes =${departmentList};

	$(document).ready(function(){
		var t = $("#tree");
		t = $.fn.zTree.init(t, setting, zNodes);
		demoIframe = $("#showDepTreeID");
		demoIframe.bind("load", loadReady);
		var zTree = $.fn.zTree.getZTreeObj("tree");
		
		//展开所有节点
		zTree.expandAll(true); 
		
		//默认选择那个节点
		//zTree.selectNode(zTree.getNodeByParam("id", 101));

	});

	function loadReady() {
		var bodyH = demoIframe.contents().find("body").get(0).scrollHeight,
		htmlH = demoIframe.contents().find("html").get(0).scrollHeight,
		maxH = Math.max(bodyH, htmlH), minH = Math.min(bodyH, htmlH),
		h = demoIframe.height() >= maxH ? minH:maxH ;
		if (h < 530) h = 530;
		demoIframe.height(h);
	}
	
	//显示选择的部门名称
	function showDepInfo(depID,depName){
		 //alert(depID+":"+depName);
		 $("input[name='depName']").val(depName);
		 $("input[name='department']").val(depID);
		 $("#showDepTreeID").hide();
	}
	
	//点击显示部门树
	$("input[name='depName']").click(function(e){
		if($("#showDepTreeID").css("display")=="none"){
			  $("#showDepTreeID").show();
	    }else{
	    	  $("#showDepTreeID").hide();
	    }
			e.stopPropagation();
	})

	$(document).click(function(){
		   $("#showDepTreeID").hide();
   })
    
  //保存
   function addSave(){
	    document.forms[0].submit();
   }
	


  
  </script>
  
</body>
</html>