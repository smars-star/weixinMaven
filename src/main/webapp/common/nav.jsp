<%@ page language="java" pageEncoding="UTF-8"%>

<script type="text/javascript">
  try{ace.settings.loadState('sidebar')}catch(e){}
  $(document).ready(function() {
    //获取当前的链接地址
      var url = window.location.href;
      //用来存放当前选中的li
      var liObj;
      var liObjArray = document.getElementById('sidebar').getElementsByTagName("li");
      if (liObjArray && liObjArray.length) {
        for ( var i = 0; i < liObjArray.length; i++) {
          if (url.indexOf(liObjArray[i].id) > 0) {
            liObjArray[i].className = "active";
            liObj = liObjArray[i];
            $(liObj).parents('li').addClass('active');
          }
        }
      }

      var accordion_head = $('.nav-list>li>a.dropdown-toggle');
      var accordion_body = $('.nav-list>li>ul.submenu');
      var slideIndex = 0;
      var subLi;
      var flag = false;
      if (liObj) {

        accordion_body.each(function(i) {
         
          var subLi = this.childNodes;
          for ( var j = 0; j < subLi.length; j++) {
            if (subLi[j].id == liObj.id) {
              flag = true;
              break;
            }
          }
          if (flag) {
            slideIndex = i;
            flag = false;
          }
        
        });
        
        if (accordion_head) {
          var pclass = liObj.parentNode.className;
          if(pclass=='submenu'){
            //默认展开某栏目菜单 
            //accordion_head.eq(slideIndex).addClass('active').next().slideDown('normal');
            //alert(slideIndex);
            accordion_head.eq(slideIndex).addClass('active');
            accordion_body.eq(slideIndex).addClass('SubMenuOpen');
            $("ul.SubMenuOpen").slideDown(0);
          }
        }
        
      }

    });
  </script>
<div class='sidebar sidebar-fixed ace-save-state' id="sidebar">
<!-- <a class="sidebar-toggle sidebar-collapse" id="sidebar-collapse" title="收缩/展开左侧菜单"><i id="sidebar-toggle-icon" class="ace-save-state ace-icon fa fa-angle-double-left" data-icon1="fa fa-angle-double-left" data-icon2="fa fa-angle-double-right"></i></a> -->
  <ul class="nav-list">
    <!-- <li id="index-portal"><a href="/demo/index-portal.jsp"><i class="fa fa-columns"></i><span class="menu-text">门户型首页</span></a></li> -->
    <li id="findApplyDevice">
    	<a href="<%=request.getContextPath()%>/intentionApply/findApplyDevice.do"><span class="menu-text">购买意向管理</span></a></li>
    <li id="findPassIntentionApply">
                <a href="<%=request.getContextPath()%>/purchase/findPassIntentionApply.do?moduleType=SQYX" ><span class="menu-text">采购实施管理</span>
                </a>
    </li>		
    <li>
      <a href="#" class="dropdown-toggle"><i class="fa fa-table"></i><span class="menu-text">待我审核的申请</span> <span class="caret"></span></a>
      <ul class="submenu">
        <li id="findDeviceAuditApply"><a
			href="/audit/findDeviceAuditApply.do"><span
				class="icon-chevron-right"></span>待审核</a></li>
		<li id="findAuditHistoryApply"><a
			href="/audit/findAuditHistoryApply.do"><span
				class="icon-chevron-right"></span>查看历史审核</a>
		</li>
      </ul>
    </li>
    
    <li id="findOfficeDevice">
                <a href="<%=request.getContextPath()%>/officeDevice/findOfficeDevice.do" ><span class="menu-text">办公设备管理</span>
                </a>
    </li>
    
    <li>
      <a href="#" class="dropdown-toggle"><i class="fa fa-file-text-o"></i><span class="menu-text">借还设备管理</span> <span class="caret"></span></a>
      <ul class="submenu">
        <li id="findLendingDevice">
			<a href="/lendingAndReturn/findLendingDevice.do">
				<span class="icon-chevron-right"></span>借出管理
			</a>
		</li>
		<li id="findLendingApplyDevice">
			<a href="<%=request.getContextPath()%>/lendingAndReturn/findLendingApplyDevice.do">
				<span class="icon-chevron-right"></span>归还管理
			</a>
		</li>
      </ul>
    </li>
    
    <li>
      <a href="#" class="dropdown-toggle"><i class="fa fa-file-text-o"></i><span class="menu-text">耗材设备管理</span> <span class="caret"></span></a>
      <ul class="submenu">
        <li id="findConsumeDevice"><a
			href="/deviceOut/findConsumeDevice.do"><span
				class="icon-chevron-right"></span> 耗材设备</a>
		</li>
		<li id="findDeviceOutHistory"><a
			href="<%=request.getContextPath()%>/deviceOut/findDeviceOutHistory.do"><span
				class="icon-chevron-right"></span> 领用记录</a>
		</li>
      </ul>
    </li>
    
    
    
    <li>
      <a href="#" class="dropdown-toggle"><i class="fa fa-file-text-o"></i><span class="menu-text">报废管理</span> <span class="caret"></span></a>
      <ul class="submenu">
        <li id="findToStayScrapDevice"><a
			href="<%=request.getContextPath()%>/scrap/findToStayScrapDevice.do"><span
				class="icon-chevron-right"></span> 申请报废</a>
		</li>
		<li id="findScrapApplyDevice"><a
			href="<%=request.getContextPath()%>/scrap/findScrapApplyDevice.do"><span
				class="icon-chevron-right"></span> 报废申请管理</a>
		</li>
      </ul>
    </li>
    
    <li id="findOfficeComputer">
        <a href="<%=request.getContextPath()%>/officeComputer/findOfficeComputer.do"><span class="menu-text">办公电脑管理</span></a>
    </li>
    
    <li id="findDeviceSecrecy">
                <a href="<%=request.getContextPath()%>/deviceSecrecy/findDeviceSecrecy.do" ><span class="menu-text">保密设备</span>
                </a>
    </li>
    
    <li id="11">
        <a href="<%=request.getContextPath()%>"><span class="menu-text">设备统计</span></a>
    </li>
    

    <li>
      <a href="#" class="dropdown-toggle"><i class="fa fa-warning"></i><span class="menu-text">设置</span> <span class="caret"></span></a>
      <ul class="submenu">
        <li id="findDeviceClassify"><a
			href="/classify/findDeviceClassify.do"><span
				class="icon-chevron-right"></span>分类设置</a></li>
	   <li id="findPosition"><a
		    href="/position/findPosition.do"><span
			class="icon-chevron-right"></span>地点管理</a></li>
      </ul>
    </li>
    
  </ul>
</div>
