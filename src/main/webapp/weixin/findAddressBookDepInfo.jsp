<%@ page language="java" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
   <meta charset="UTF-8">
  <meta name="renderer" content="webkit">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,Chrome=1">
  <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0">
  <title>微信通讯录部门列表</title>
  
    <%
	request.setAttribute("sys_titleInfo", "微信通讯录部门列表");
    %>
    
  <%@include file="/common/taglib.jsp"%>
  <%@include file="/common/js_css.jsp"%>
  <%--@include file="/common/JQuery.jsp"--%>
  
</head>
<body>
  <%@include file="/common/head.jsp"%>
  
<form action="findAddressBookEmpInfo.do" method="post" onsubmit="return false;">
 
 <input type="hidden"  name="department" id="departmentID"  value="${department }">
	

<div style="float: right;margin-right: 5px;margin-top: 5px;">
	      <button class="btn btn-primary btn-lg" type="submit" onclick="addInitDep();">新增部门</button>
</div>
	
	
<div style="width:100%;vertical-align: top;margin-top: 25px;line-height: 40px;" align=center >
     <ul id="tree" class="ztree" style="width:260px; overflow:auto;"></ul>
</div>	

 
</form>	
 
  <script type="text/javascript" src="<%=request.getContextPath() %>/media/zTree/js/jquery-1.4.4.min.js"></script>
  <script type="text/javascript" src="<%=request.getContextPath() %>/media/zTree/js/jquery.ztree.core.js"></script>
  <script type="text/javascript" src="<%=request.getContextPath() %>/media/zTree/js/jquery.ztree.excheck.js"></script>
  <script type="text/javascript" src="<%=request.getContextPath() %>/media/zTree/js/jquery.ztree.exedit.js"></script>
  
  
  <script type="text/javascript">
  
    var zTree;
	var demoIframe;

	//删除
	function zTreeBeforeRemove(treeId, treeNode) {
		return false;
	}
	//修改
	function zTreeBeforeRename(treeId, treeNode, newName, isCancel) {
		return newName.length > 5;
	}
	
	function showIconForTree(treeId, treeNode) {
		return treeNode.level != 2;
	};
	
	var setting = {
		view: {
			dblClickExpand: false,
			showLine: true,
			selectedMulti: false
		},
		edit: {
			enable: true,
			drag: {
				isCopy: false,
				isMove: false
			},
			showRemoveBtn: true,
			removeTitle: "删除部门",
			showRenameBtn: true,
			renameTitle: "修改部门名称"
			
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
			beforeRemove: function(treeId, treeNode){
				var a=confirm("您确定要删除吗？");
				if(a == true){
					window.open('/weixin/deleteDep.do?depID=' + treeNode.id);
				}
			},
			onRename: function(event, treeId, treeNode, isCancel){
			
				 //alert(treeNode.id+":"+treeNode.name+":"+treeNode.parentid);
				  var a=confirm("您确定要修改吗？");
				if(a == true){
					window.open('/weixin/modifyDep.do?id=' + treeNode.id+"&name="+treeNode.name+"&parentid="+treeNode.parentid);
				}
			}
		
		}
	};

	//部门信息
	var zNodes =${departmentList};

	$(document).ready(function(){
		var t = $("#tree");
		t = $.fn.zTree.init(t, setting, zNodes);
		demoIframe = $(".showDepEmploy");
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
  
	//添加部门
	function  addInitDep(){
		window.open("/weixin/preAddDep.do");
	}
	
  </script>
  
</body>
</html>