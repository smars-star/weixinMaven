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


  <script type="text/javascript" src="<%=request.getContextPath() %>/media/js/jquery/jQuery1.11.3.min.js"></script>
  <script type="text/javascript">
  $(document).ready(function () {

      $("#showConent").scroll(function () {
          var viewH = $(this).height();//可见高度
          var contentH = $(this).get(0).scrollHeight;//内容高度
          var scrollTop = $(this).scrollTop();//滚动高度
          var count = $(".showDepEmploy tr").length;
          if (contentH - viewH - scrollTop<=100) {
        	  
        	  //显示加载提示信息
        	  $("#imloading").fadeIn();
              $("#imloading").fadeIn("slow");
              $("#imloading").fadeIn(3000);
              
              //每次动态 1500秒显示
        	  setTimeout(function() {
        		  //对数据进行分装
        		  var  srollTableDate = '<tr><td colspan="12">'
                      +'<p>《世界著名计算机教材精选·人工智能:一种现代的方法(第3版)》是最权威、最经典的人工智能教材，已被全世界100多个国家的1200多所大学用作教材。《世界著名计算机教材精选·人工智能:一种现代的方法(第3版)》的最新版全面而系统地介绍了人工智能的理论和实践，阐述了人工智能领域的核心内容，并深入介绍了各个主要的研究方向。全书分为七大部分：第Ⅰ部分“人工智能”，第Ⅱ部分“问题求解”，第Ⅲ部分“知识、推理与规划”，第Ⅳ部分“不确定知识与推理”，第Ⅴ部分“学习”，第Ⅵ部分“通信、感知与行动”，第Ⅶ部分“结论”。《世界著名计算机教材精选·人工智能:一种现代的方法(第3版)》既详细介绍了人工智能的基本概念、思想和算法，还描述了其各个研究方向最前沿的进展，同时收集整理了详实的历史文献与事件。《世界著名计算机教材精选·人工智能:一种现代的方法(第3版)》适合于不同层次和领域的研究人员及学生，是高等院校本科生和研究生人工智能课的首选教材，也是相关领域的科研与工程技术人员的重要参考书。</p>'
                      +'</td></tr>'
                 //添加数据
				 $(".showDepEmploy").append(srollTableDate);
				
        		//隐藏加载提示信息
                 $("#imloading").fadeOut();
                 $("#imloading").fadeOut("slow");
                 $("#imloading").fadeOut(3000);
					
        	  },1500)
          }
      });

  })
  </script> 
</head>
<body>
  <%@include file="/common/head.jsp"%>
  
<form action="findAddressBookEmpInfo.do" method="post" onsubmit="return false;">
 <input type="hidden"  name="department" id="departmentID"  value="${department }">
 
 <div style="width:260; vertical-align:top; BORDER-RIGHT: #999999 1px dashed">
	 <ul id="tree" class="ztree" style="width:260px; overflow:auto;"></ul>
 </div>
 
<div  style="width:150px;display: block;float: right;position: absolute;top: 60px;right: 10px;">
   <button class="btn btn-primary btn-lg" type="submit" onclick="addInitEmp();">新增人员</button>
</div>
			 
 <div style="position: fixed; left:260px;  top:120px;height:550px;overflow: auto;" id="showConent">
		<display:table name="employeeList" id="row"  pagesize="30" style="width:100%;" export="true"  class="table table-condensed showDepEmploy"  requestURI="findAddressBookEmpInfo.do" >
		<display:column title="操作" sortable="false" headerClass="sortable"  media="html">
		<a href="#" onclick="deleteEmp('${row.userid}')"><img alt="删除" src="<%=request.getContextPath() %>/media/images/btn_delete.png"></a>
		</display:column>
		<display:column title="员工ID" sortable="true" headerClass="sortable"  property="userid" />
		
		<display:column title="员工名称" sortable="true" headerClass="sortable" >
		<a href="#" onclick="modifyInitEmp('${row.userid}');">${row.name}</a>
		</display:column>
		
		<display:column property="depName" title="部门名称" sortable="true" headerClass="sortable" />
		<display:column property="position" title="职位" sortable="true" headerClass="sortable"  />
		<display:column property="mobile" title="电话" sortable="true" headerClass="sortable"  />
		<display:column title="性别" sortable="true" headerClass="sortable" >
		                 <c:choose>
		                 <c:when test="${row.gender eq 1}">男</c:when>
		                 <c:otherwise>女</c:otherwise>
		            </c:choose>
		</display:column>
		
		<display:column property="email" title="email" sortable="true" headerClass="sortable"  autolink="true" />
		<display:column property="weixinid" title="微信号" sortable="true" headerClass="sortable"  />
		<display:column title="头像" sortable="true" headerClass="sortable" >
		                <c:choose>
		                <c:when test="${empty row.avatar}"><img alt="${row.name}" src="/media/images/userFace.jpg" style="width: 20px;width: 20px;position: static;"></c:when>
		                <c:otherwise><img alt="${row.name}" src="${row.avatar}" style="width: 20px;width: 20px;position: static;"></c:otherwise>
		             </c:choose>
		</display:column>
		<display:column title="是否关注" sortable="true" headerClass="sortable" >
		                  <c:choose>
		             <c:when test="${row.status eq 1}">是</c:when>
		             <c:when test="${row.status eq 2}">已冻结</c:when>
		             <c:otherwise>否</c:otherwise>
		       </c:choose>
		</display:column>
		<display:column property="extattr.attrs" title="扩展信息" sortable="true" headerClass="sortable"  />
		
		<display:setProperty name="export.csv.filename" value="StaffInfo.csv"/>
		<display:setProperty name="export.excel.filename" value="StaffInfo.xls"/>
		</display:table>
		
</div>

  <div id="imloading" style="width:150px;height:30px;line-height:30px;font-size:16px;text-align:center;border-radius:3px;opacity:0.7;background:#000;margin:10px auto 30px;color:#fff;display:none">
	       人员数据加载中.....
  </div>
	
</form>	
 
  <script type="text/javascript" src="<%=request.getContextPath() %>/media/zTree/js/jquery-1.4.4.min.js"></script>
  <script type="text/javascript" src="<%=request.getContextPath() %>/media/zTree/js/jquery.ztree.core.js"></script>
  
  
 <script type="text/javascript">
    //设置页面显示高度
    var  windowHeight = window.screen.availHeight - document.body.clientHeight -200;// 网页可见区域高度
    $("#showConent").height(windowHeight);
    
     /******************  zTree ***********************/
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
				//显示人员信息
				showDepEmployee(treeNode.id);
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
  

	 
	//根据部门Id，显示该部门的人员信息
   function  showDepEmployee(departmentID){
	   $(".pagebanner").hide();
	   $(".pagelinks").hide();
	   
	   $.ajax({
		   type: "POST",
		   url: "findDepEmployee.do",
		   data: "departmentID="+departmentID,
		   success: function(depEmpList){
			  
			    var  department = 0;                                  //定义要选择的部门Id
		        var  showEmpListStr = "";                        //定义要加载的数据
		        var depEmpList = eval(depEmpList); //转换json数据
		        //如果部门当中有数据
		        if(depEmpList.length >0){
		        
					        //展现该部门的人员信息
						    for(var i = 0; i < depEmpList.length;i++){
						    	//部门
						    	department = depEmpList[i].department;
						    	
						    	//性别
						    	var  genderStr = depEmpList[i].gender;
						    	if(genderStr == 1){
						    		genderStr = '男';
						    	}else{
						    		genderStr = '女';
						    	}
						    	
						    	//是否关注
						    	var  statusStr  = depEmpList[i].status;
						    	if(statusStr == 1){
						    		statusStr = "是";
						    	}else if(statusStr == 2){
						    		statusStr = '已冻结';
						    	}else{
						    		statusStr = '否';
						    	}
						    	
						    	//微信号ID
						    	var  wixinid  = depEmpList[i].weixinid ;
						    	if(wixinid == null || wixinid == 'undefined' || wixinid == ''){
						    		wixinid = '';
						    	}
						    	
						    	//判断是否有微信头像
						    	var  avatarStr = depEmpList[i].avatar;
						    	if(avatarStr == null || avatarStr == 'undefined' || avatarStr == '' ){
						    		avatarStr =  '<img src="<%=request.getContextPath() %>/media/images/userFace.jpg" style="width: 20px;width: 20px;position: static;">';
						    	}else{
						    		avatarStr =  '<img src="'+ avatarStr +'" style="width: 20px;width: 20px;position: static;">';
						    	}
						    	
						    	//团队数据信息集合
						        showEmpListStr  += '<tr><td><a href="#" onclick="deleteEmp('+"'"+ depEmpList[i].userid+"'"+')"><img alt="删除" src="<%=request.getContextPath() %>/media/images/btn_delete.png"></a></td><td>'
						    	                                     +depEmpList[i].userid+'</td><td><a href="#"   onclick="modifyInitEmp('+"'"+depEmpList[i].userid+"'"+');">'+depEmpList[i].name+'</a></td><td>'
						    	                                     +depEmpList[i].depName+"</td><td>"+depEmpList[i].position+"</td><td>"
						    	                                     +depEmpList[i].mobile+'</td><td>'+genderStr+'</td><td>'
						    	                                     +depEmpList[i].email+'</td><td>'+wixinid+'</td><td>'
						    	                                     +avatarStr+'</td><td>'+statusStr+'</td><td>'
						    	                                     +depEmpList[i].extattr.attrs+'</td></tr>';
						    	                                     
						    }
		        
		        }else{
		        	department = departmentID;
		        	showEmpListStr = '<tr><td colspan="11">对不起，暂无人员信息！</td></tr>';
		        	
		        }
		        
		        $("#departmentID").val(department);
			    $(".showDepEmploy tbody").html(showEmpListStr); 
			    
		   },error: function(e) {
	            alert("对不起，由于网络原因系统没有反映！<br/>请重新进入应用！");
	            
	      }
		});
     }	
	
	//修改微信人员信息
	function  modifyInitEmp(userid){
		  window.open("/weixin/modifyInitEmp.do?userid="+userid);
	}
	
	//删除人员信息
	function  deleteEmp(userid){
		var isDel=confirm("您确定要删除吗？");
		if(isDel == true){
			window.open('/weixin/deleteEmp.do?userid=' + userid);
		}
	}
	  
   //新增人员信息
   function  addInitEmp(){
	  window.open("/weixin/preAddEmp.do");
	}
	
  </script>
  
</body>
</html>