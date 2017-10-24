<%@ page language="java" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="renderer" content="webkit">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,Chrome=1">
  <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0">
  <title>部门人员查询</title>
  
  	<%
	request.setAttribute("sys_titleInfo", "部门人员查询");
    %>
  <%@include file="/common/taglib.jsp"%>
  <%@include file="/common/js_css.jsp"%>
  <%--@include file="/common/JQuery.jsp"--%>
  
  <style type="text/css">
   body{
   overflow: hidden;
   }
  </style>
   <script type="text/javascript" src="/media/js/jquery/jQuery1.11.3.min.js"></script>
  <script type="text/javascript">
  $(document).ready(function () {
	  //加载数据标志位 ,防止ajax重复提交
	  var loading = false; 

	  //滚动加载页面数据
      $("#showConent").scroll(function () {
          var viewH = $(this).height();                            //可见高度
          var contentH = $(this).get(0).scrollHeight; //内容高度
          var scrollTop = $(this).scrollTop();                //滚动高度
          var count = $(".showDepEmploy").length;  //已经在显示页面的高度
          
          //判断是否已经到网页底部
          if (contentH - viewH - scrollTop<=100) {
        	  //设置数据重复加载标志位
        	  loading = true;    
        	  
        	  //显示加载提示信息
              $("#imloading").fadeIn("slow");
              $("#imloading").fadeIn(3000);
        	  $("#imloading").fadeIn();
        	  
              setTimeout(function() {
            	  
            	  //获取需要已经加载的条数
                  var  showDataLineCount  =  $("#showDataLineCountID").val();
                  
                  $.ajax({
                     type: "post",
                     async:false,
                     url: "/test/findAjaxSpringHello.do?showDataLineCount="+showDataLineCount ,
                     data: $("#findAllEmpId").serialize(),
                     processData: false,
                     contentType: false,
                     success: function (data) {
                    	  var  employeeList = eval(data);
                    	  
                    	//添加数据
                    	 if(employeeList == null || employeeList.length ==0){
                    		 loading = true; 
                    		 $("#imloading").text("数据已经加载完了...");
                    		 $("#imloading").show();
                    		 
                    	 }else{
                    		
	   	                   	  var  srollTableDate = "";
	   	                   	  for(var i = 0; i < employeeList.length; i++){
	   	                   		  srollTableDate += '<tr>'
	   	   	                                                          +'<td>'+employeeList[i].employeeName+'</td>'
	   	   	                                                          +'<td>'+employeeList[i].genderCodeValue+'</td>'
	   	   	                                                          +'<td>'+employeeList[i].workDepName+'</td>'
	   	   	                                                          +'</tr>';
	   	                   	   }
	   	                   	
	   	                   	    //加载数据
	   	                        $(".showDepEmploy tbody").append(srollTableDate);
	   	                        //修改页面数据显示行数
	   	                        $("#showDataLineCountID").val(Number(showDataLineCount)+Number(employeeList.length));
	   	                        //设置数据重复加载标志位
	   	                        loading = false; 
	   	                        
	   	                       //隐藏加载提示信息
	   	                       $("#imloading").fadeOut();
	   	                       $("#imloading").fadeOut("slow");
	   	                       $("#imloading").fadeOut(3000);
                    	 }
	                   	 
                     }
                 }); 
                  
            
                  
              }, 1500);
            
          }
      });

  })

  </script> 
</head>
<body>
  <%@include file="/common/head.jsp"%>
  
<form action="findSrpingHello.do"  id="findAllEmpId"  method="post" onsubmit="return false;">
<input type="hidden"  name="showDataLineCount"  id="showDataLineCountID" value="${map.showDataLineCount}">

<div class="row" >
	<div class="col-lg-6" style="width:100%;">
	   <div class="input-group">
		      <input type="text" class="form-control"  name="employeeName"  value="${map.employeeName }" placeholder="请输入名字或部门">
		      <span class="input-group-btn">
		        <button class="btn btn-default " type="button"  id="queryEmployeeName">查询</button>
		      </span>
	   </div>
	</div>
</div>

<div class="panel panel-default"  id="showConent" style="height: 780px;overflow: auto;">
    <div class="panel-heading text-center">公司人员信息查询</div>
    <table class="table showDepEmploy">
           <thead>
                <tr>
                    <td >名字</td>
                    <td >性别</td>
                    <td >部门名称</td>
                </tr>
           </thead>
           <tbody>
             <c:forEach items="${employeeList}" var="employee" varStatus="index">
	               <tr>
	                      <td class="text-left">${employee.employeeName }</td>
	                      <td class="text-left">${employee.genderCodeValue }</td>
	                      <td class="text-left">${employee.workDepName }</td>
	               </tr>
               </c:forEach>
           </tbody>
    </table>
    
    <%--
    <display:table name="employeeList" id="row" pagesize="15" export="true" class="table text-left"  requestURI="findSrpingHello.do" >
	   <display:column property="employeeName" title="名字" sortable="true" headerClass="sortable"  value="${row.employeeName }"/>
	   <display:column property="genderCodeValue" title="性别" sortable="true" headerClass="sortable"  value="${row.genderCodeValue }"/>
	   <display:column property="workDepName" title="部门名称" sortable="true" headerClass="sortable"  value="${row.workDepName }"/>
	   <display:setProperty name="export.csv.filename" value="StaffInfo.csv"/>
	   <display:setProperty name="export.excel.filename" value="StaffInfo.xls"/>
   </display:table>
    --%>
    
     <div id="imloading" style="width:150px;height:30px;line-height:30px;font-size:16px;text-align:center;border-radius:3px;opacity:0.7;background:#000;margin:10px auto 10px;color:#fff;display:none;">
	       人员数据加载中.....
	</div>
</div>


	
</form>	

  <script type="text/javascript">
    //设置页面高度
	var  windowHeight = document.body.scrollHeight-130;// 网页可见区域高度
	$("#showConent").height(windowHeight);
	
    //查询人员信息
    $("#queryEmployeeName").click(function(){
 	     document.forms[0].submit();
    });  
  </script>
  
	
</body>
</html>