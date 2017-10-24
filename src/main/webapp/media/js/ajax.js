/* Create a new XMLHttpRequest object to talk to the Web server */
var xmlHttp = false;
try {
  xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
} catch (e) {
  try {
    xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
  } catch (e2) {
    xmlHttp = false;
  }
}
if (!xmlHttp && typeof XMLHttpRequest != 'undefined') {
  xmlHttp = new XMLHttpRequest();
}
/** addCourse开始**/
/**
  和服务器进行交互的脚本
**/
/*function callServer(url,parameter,value) {
  // var url = "/jwcore/checkCourseNOAction.do?courseNO="+value;
   var url=url+"?"+parameter+"="+value;
   callServerRepeat(url,'课程编号已经被使用！',document.forms[0].courseNO);
}*/
function callServerCourse(url,parameter,value) {
  // var url = "/jwcore/checkCourseNOAction.do?courseNO="+value;
   var url=url+"?"+parameter+"="+value;
   callServerRepeat(url,'课程编号已经被使用！',document.forms[0].courseNO);
}
//系统推荐
function systemCommend(url,parameter)
{
    if (document.forms[0].staffroomID.value ==''){
         alert('请首先选择开课教研室，系统才能为您推荐！');
         staffroomID.focus();
         return false;
      }
   //var url ='/jwcore/systemCommendCourseNOAction.do?staffroomID='+document.forms[0].staffroomID.value;
   var url=url+"?"+parameter+"="+document.forms[0].staffroomID.value;

   xmlHttp.open("GET", url, true);
    /**当服务器成功后返回客户段需要执行的脚本
    **/
   xmlHttp.onreadystatechange = genCourseNO;
   xmlHttp.send(null);
}
function genCourseNO(){
  if (xmlHttp.readyState == 4) {
        var response = xmlHttp.responseText;
        document.forms[0].courseNO.value=response;
  }
}
/** addCourse结束**/
/** addTaskPlan结束**/
//var objectTaskValue='';
function findOjbect(url,parameter, value)
{

   var url=url+"?"+parameter+"="+value;
  // objectTaskValue=value;
   xmlHttp.open("GET", url, false);
    /**当服务器成功后返回客户段需要执行的脚本
    **/
   xmlHttp.onreadystatechange = genObjectValue;
   xmlHttp.send(null);
}

function genObjectValue(){
  if (xmlHttp.readyState == 4) {
    var response = xmlHttp.responseText;
	var selectObj=document.forms[0].taskProjectID;
    var tValues=selectObj.options;
    for(var j=tValues.length-1;j>=0;j--)
    {
          selectObj.options.remove(tValues[j]);
    }
	var strs=response.split(";");
	var e_option=document.createElement("OPTION");
    e_option.text="----请选择----";
    e_option.value="";
    selectObj.add(e_option);
	if(response.indexOf(",")>=0)
	{
        for(var i=0;i<strs.length;i++)
        {
            e_option=document.createElement("OPTION");
            e_option.text=strs[i].split(",")[1];
            e_option.value=strs[i].split(",")[0];
            selectObj.add(e_option);
        }
	}
  }
}

/** addTaskPlan结束**/

/** addCourseGroup结束**/
function callAddCourseServer(url,parameter,value) {

   //var url = "/jwcore/checkCourseGroupNameAction.do?courseGroupName="+value;
    var url=url+"?"+parameter+"="+value;
    callServerRepeat(url,'板块名称已经被使用！',document.forms[0].courseGroupName);
}
/** addCourseGroup结束**/
/** 得到未分配宿舍的学生**/
function findNum(url)
{
   var url=url;
   xmlHttp.open("GET", url, false);
    /**当服务器成功后返回客户段需要执行的脚本
    **/
   xmlHttp.onreadystatechange = genDormByStudent;
   xmlHttp.send(null);
}
function genDormByStudent(){
var aValue="";
if (xmlHttp.readyState == 4) {
    var response = xmlHttp.responseText;
    aValue=response;
     document.forms[0].sudentNum.value=response;
  }
}
/** 得到未分配宿舍的学生结束**/

//验证部门编号重复的脚本
function checkDapNORepeat(depNO,depNORe){
	var url;
	if(depNORe=='')
       url="/jap/fastCheckAction.do?depNO="+depNO;
	else
	   url="/jap/fastCheckAction.do?depNO="+depNO+"&depNORe="+depNORe;
    callServerRepeat(url,'部门编号已经被使用！',document.forms[0].depNO);
}
//验证部门编号完成

//验证培养计划名称重复的脚本
function checkTrainPlanNameRepeat(trainPlanName,existTrainPlanName)
{
	var url;
	if(existTrainPlanName=="")
	{
       url="/jwcore/checkTrainPlanStepThreeAction.do?trainPlanName="+trainPlanName;
	}
	else
	{
		url="/jwcore/checkTrainPlanStepThreeAction.do?trainPlanName="+trainPlanName+"&existTrainPlanName="+existTrainPlanName;
	}
	callServerRepeatNoEmpty(url,'人才培养方案名称已经存在！',document.forms[0].trainPlanName);
}
//验证学生是否是毕业生
function callIsGraduateServer(url,parameter,value){
   var url=url+"?"+parameter+"="+value;
   callServerRepeat(url,'该学员不是毕业生！',document.forms[0].studentName);
}
//验证检验此学号是否存在
function callStudentNOServer(url,parameter,value){
   var url=url+"?"+parameter+"="+value;
   callServerRepeat(url,'该学号不存在或已录入该学员开题论证报告！',document.forms[0].studentID);
}
//判断增加的版本名称是否已经存在
function checkVersionName(url,parameter,value){
 var url=url+"?"+parameter+"="+value;
   callServerRepeat(url,'您所添加的版本名称已经被使用！',document.forms[0].versionName);

}
//验证培养计划模板名称重复的脚本
function checkTempletNameRepeat(trainPlanName,existTrainPlanName)
{
	var url;
	if(existTrainPlanName=="")
	{
       url="/jwcore/checkTempletNameRepeatAction.do?trainPlanName="+trainPlanName;
	}
	else
	{
		url="/jwcore/checkTempletNameRepeatAction.do?trainPlanName="+trainPlanName+"&existTrainPlanName="+existTrainPlanName;
	}
	callServerRepeatNoEmpty(url,'人才培养方案模板名称已经存在！',document.forms[0].trainPlanName);
}

function checkExsitsPlanAtSpeGrade(specialityID,existSpecialityID,grade,existGrade)
{
	var url;
	url="/jwcore/checkTrainPlanStepThreeAction.do?specialityID="+specialityID+"&grade="+grade+"&existSpecialityID="+existSpecialityID+"&existGrade="+existGrade;
	return callServerRepeat(url,'该年级专业人才培养方案已经存在！',document.forms[0].specialityID);
}

//验证专业名称重复的脚本
function checkSpecialityNameRepeat(specialityName,specialityNameRe){
	var url;
	if(specialityName=='')
       url="/ujap/checkFashAction.do?specialityName="+specialityName;
	else
	   url="/ujap/checkFashAction.do?specialityName="+specialityName+"&specialityNameRe="+specialityNameRe;
   callServerRepeat(url,'专业名称已经被使用！',document.forms[0].specialityName);


}

//验证专业名称完成
//验证专业简码重复的脚本
function checkShortNameRepeat(shortName,shortNameRe){
	var url;
	if(shortName=='')
       url="/ujap/checkFashAction.do?shortName="+shortName;
	else
	   url="/ujap/checkFashAction.do?shortName="+shortName+"&shortNameRe="+shortNameRe;
    callServerRepeat(url,'专业简码已经被使用！',document.forms[0].shortName);

}
//验证专业简码完成
//验证校内代码重复的脚本
function checkInnerCodeRepeat(InnerCode,InnerCodeRe){
	var url;
	if(InnerCode=='')
       url="/ujap/checkFashAction.do?innerCode="+InnerCode;
	else
	   url="/ujap/checkFashAction.do?innerCode="+InnerCode+"&InnerCodeRe="+InnerCodeRe;
    callServerRepeat(url,'校内代码已经被使用！',document.forms[0].innerCode);

}
//验证校内代码完成

//员工管理（员工编号）开始
function callEmployeeServer(url,parameter,value) {
   var url=url+"?"+parameter+"="+value;
   callServerRepeat(url,'员工编号已经被使用！',document.forms[0].employeeNO);
}
//员工管理（员工编号）结束
//班级管理开始
  //验证班级名称是否重复
function callServerClassName(value,value1) {
   var url = "/jwcore/checkClassNameAction.do?className="+value+"&flag="+value1;
   callServerRepeat(url,'新建专业班次名称重复！',document.forms[0].className);
}
//收费验证学号是否在数据库中存在
function checkStudentNO(value) {
   var url = "/jwext/checkStudentNOAction.do?studentNO="+value;
   callServerRepeat(url,'对不起，找不到对应学员！',document.forms[0].studentName);
}

//验证班级别名是否重复
function callServerAlias(value,value1) {
   var url = "/jwcore/checkClassNameAction.do?classAlias="+value+"&flag="+value1;
   callServerRepeat(url,'新建专业班次别名重复！',document.forms[0].classAlias);
}
//班级管理结束

//员工管理（员工编号）开始
function setTrainCredite(p_classifyID,p_mustCreditNum,p_eleCreditNum,p_requireDescription) {
  var url="/jwcore/setTrainPlanCrediteAction.do?mustCreditHour="+p_mustCreditNum+"&electiveCreditHour="+p_eleCreditNum+"&classfiyID="+p_classifyID+"&requireDescription="+p_requireDescription;
   xmlHttp.open("GET", url, true);
    /**当服务器成功后返回客户段需要执行的脚本
    **/
   xmlHttp.send(null);
}
//人才培养方案模板点击应用设定“必修课额定学分:选修课额定学分:要求 ：”
function setTempletCredite(p_classifyID,p_mustCreditNum,p_eleCreditNum,p_requireDescription) {
  var url="/jwcore/setTempletCrediteAction.do?mustCreditHour="+p_mustCreditNum+"&electiveCreditHour="+p_eleCreditNum+"&classfiyID="+p_classifyID+"&requireDescription="+p_requireDescription;
   xmlHttp.open("GET", url, true);
    /**当服务器成功后返回客户段需要执行的脚本
    **/
   xmlHttp.send(null);
}
//判断教学班自动合并规则的新教学班名称是否与已有重复--教学任务管理
function callClassMergeRuleServer(url,parameter,value){
 var url=url+"?"+parameter+"="+value;
   callServerRepeat(url,'新教学班名称已经被使用！',document.forms[0].className);

}

//验证学生是否可以异动
function checkStudentChange(studentid,changeCode,changname){
	var url="/jwcore/checkStudentChangeAction.do?studentid="+studentid+"&changeCode="+changeCode;
	xmlHttp.open("GET", url, false);
	xmlHttp.onreadystatechange = function (){
      if (xmlHttp.readyState == 4) {
        var response = xmlHttp.responseText;
        if (response.indexOf("no") >-1){
			document.forms[0].studentChangeCode.value="05";
			document.forms[0].studentChangeCode.style.color="white";
			document.forms[0].studentChangeCode.style.backgroundColor="red";
            //textObj.focus();
            alert("您选择的学员不能"+changname+"！");
			return false;
        }else{
			document.forms[0].studentChangeCode.style.color="black";
			document.forms[0].studentChangeCode.style.backgroundColor="white";
		}
       }
     };
   xmlHttp.send(null)

   //callServerRepeat(url,'您选择的学员不能异动！',document.forms[0].studentName);


}
/**
 验证是否重复的提示
 url 为要传给服务器的url
alterMessage 如果不符合要求提示的语言
textObj 为要提示的控件 如 document.forms[0].classNO ，清空原来的值
**/
function  callServerRepeat (url,alterMessage,textObj){
   xmlHttp.open("GET", url, true);
   xmlHttp.onreadystatechange = function (){
      if (xmlHttp.readyState == 4) {
        var response = xmlHttp.responseText;
        if (response != ""){
            textObj.value="";
			textObj.style.color="white";
			textObj.style.backgroundColor="red";
            textObj.focus();
            alert(alterMessage);
			return false;
        }
       }
     };

   xmlHttp.send(null)
}

/**
 验证是否重复的提示
 url 为要传给服务器的url
alterMessage 如果不符合要求提示的语言
textObj 为要提示的控件 如 document.forms[0].classNO ,不清空原来的值
**/
function  callServerRepeatNoEmpty (url,alterMessage,textObj){
   xmlHttp.open("GET", url, false);
   xmlHttp.onreadystatechange = function (){
      if (xmlHttp.readyState == 4) {
        var response = xmlHttp.responseText;
        if (response != ""){
			textObj.style.color="white";
			textObj.style.backgroundColor="red";
            textObj.focus();
            alert(alterMessage);
			return false;
        }
       }
     };

   xmlHttp.send(null)
}
//@desc    load a page(some html) via xmlhttp,and display on a container
//@param   url          the url of the page will load,such as "index.php"
//@param   request      request string to be sent,such as "action=1&name=surfchen"
//@param   method       POST or GET
//@param   container          the container object,the loaded page will display in container.innerHTML
//@usage
//         ajaxLoadPage('index.php','action=1&name=surfchen','POST',document.getElementById('my_home'))
//         suppose there is a html element of "my_home" id,such as "<span id='my_home'></span>"
//@author  SurfChen <surfchen@gmail.com>
//@url     http://www.surfchen.org/
//@license http://www.gnu.org/licenses/gpl.html GPL
function ajaxLoadPage(url,request,method,container,returnUrl,windowsizeurl,openwindowname)
{

	//method=method.toUpperCase();
	var loading_msg='Loading...';//the text shows on the container on loading.
	if (method=='get')
	{
		urls=url.split("?");
		if (urls[1]=='' || typeof urls[1]=='undefined')
		{
			url=urls[0]+"?"+request;
		}
		else
		{
			url=urls[0]+"?"+urls[1]+"&"+request;
		}

		request=null;//for GET method,loader should send NULL
	}

	xmlHttp.open(method,url,true);
	if (method=="post")
	{
		xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	}
	 xmlHttp.onreadystatechange=function(){
		if (xmlHttp.readyState==4)
		{
		     if (windowsizeurl == "undefined" || windowsizeurl=="")
		     {
				  window.open(returnUrl);
		     }else{
			     window.open(returnUrl,openwindowname,windowsizeurl);

			 }



		}
	}
	xmlHttp.send(request);
}
//@desc    transform the elements of a form object and their values into request string( such as "action=1&name=surfchen")
//@param   form_obj          the form object
//@usage   formToRequestString(document.form1)
//@notice  this function can not be used to upload a file.if there is a file input element,the func will take it as a text input.
//         as I know,because of the security,in most of the browsers,we can not upload a file via xmlhttp.
//         a solution is iframe.
//@author  SurfChen <surfchen@gmail.com>
//@url     http://www.surfchen.org/
//@license http://www.gnu.org/licenses/gpl.html GPL
function formToRequestString(form_obj)
{
	var query_string='';
	var and='';

	for (i=0;i<form_obj.length ;i++ )
	{

		e=form_obj[i];
		e=form_obj[i];
        if (e.name) {
            if (e.type=='select-one') {
                element_value=e.options[e.selectedIndex].value;
            } else if (e.type=='select-multiple') {
                for (var n=0;n<e.length;n++) {
                    var op=e.options[n];
                    if (op.selected) {
                        query_string+=and+e.name+'='+encodeURIComponent(op.value);
                        and="&"
                    }
                }
                continue;
            } else if (e.type=='checkbox' || e.type=='radio') {
                if (e.checked==false) {
                    continue;
                }
                element_value=e.value;
            } else if (typeof e.value != 'undefined') {
                element_value=e.value;
            } else {
                continue;
            }
            query_string+=and+e.name+'='+encodeURIComponent(element_value);
            and="&"
        }

	}
	return query_string;
}
//@desc    no refresh submit(ajax) by using ajaxLoadPage and formToRequestString
//@param   form_obj          the form object
//@param   container          the container object,the loaded page will display in container.innerHTML
//@usage   ajaxFormSubmit(document.form1,document.getElementById('my_home'))
//@author  SurfChen <surfchen@gmail.com>
//@url     http://www.surfchen.org/
//@license http://www.gnu.org/licenses/gpl.html GPL
function ajaxFormSubmit(form_obj,container,returnUrl,windowsizeurl,openwindowname)
{
   ajaxLoadPage(form_obj.getAttributeNode("action").value,formToRequestString(form_obj),form_obj.method,container,returnUrl,windowsizeurl,openwindowname)
}
function callScoreServer(teachingClassID,barCode,examScore,flag){
  if (barCode==""){
       document.forms[0].studentBar.focus();
       return;
   }
   var  url = "/jwcore/checkScoreByBarCodeAction.do?flag_todo="+flag+"&barCode="+barCode+"&examScore="+examScore+"&teachingClassID="+teachingClassID
   xmlHttp.open("GET", url, false);
   xmlHttp.onreadystatechange = function (){
      if (xmlHttp.readyState == 4) {
         var response = xmlHttp.responseText;
         if (flag == "check"){
            if (response.indexOf("NOEXIST")>-1){
                alert ("没有该学员");
               document.forms[0].studentBar.value="";
               document.forms[0].studentBar.focus();
            } if (response.indexOf("HAVSCORE")>-1){
               alert ("该学员的成绩已经录入过,且不能修改");
               document.forms[0].studentBar.value="";
               document.forms[0].studentBar.focus();
            }else{
               document.forms[0].score.focus();
            }
         }
         if (flag == "checkscore"){
            if (response.indexOf("success")<0){
            	if(response.indexOf("null")<0){
                var altstr="该学员的成绩已录为"+response+"分，是否修改为"+examScore+"分";
                 if (!confirm(altstr)){
                    return;
                 }
            	}
            }
            document.forms[0].flag.value="add";
            document.forms[0].submit();
         }
       }
     };
     xmlHttp.send(null)
}
	 //创建学生类别码
function addXslbm(xslbmname){
var url = "/jwext/addXSLBMAction.do?XSLBM="+xslbmname;
	xmlHttp.open("GET", url, false);
	xmlHttp.onreadystatechange = function (){
      if (xmlHttp.readyState == 4) {
        var response = xmlHttp.responseText;
		if(response!=""){
			option=document.createElement("OPTION");
			option.text=xslbmname;
			option.value=response;
			document.forms[0].studentTypeCode.add(option);
			var len=document.forms[0].studentTypeCode.length;
			document.forms[0].studentTypeCode.options[len-1].selected="true";
			return false;
		}
       }
     };
   xmlHttp.send(null)

}
	 //创建单位类别码
function addDwlbm(dwlbmname,boxname){
var url = "/jwext/addDWLBMAction.do?DWLBM="+dwlbmname;
	xmlHttp.open("GET", url, false);
	xmlHttp.onreadystatechange = function (){
      if (xmlHttp.readyState == 4) {
        var response = xmlHttp.responseText;
		if(response.indexOf("不能重复")>-1){
			alert("单位类别已经存在！");
		}else{
			var list=document.getElementById("dwlbm");
			var chkbox =document.createElement("input");
			chkbox.type="checkbox";
			chkbox.value=response;
			chkbox.name=boxname;
			var txt=document.createTextNode(dwlbmname);
		    var div=document.createElement("div");
			list.appendChild(chkbox);
			list.appendChild(txt);

			return false;
		}
       }
     };
   xmlHttp.send(null)

}

	 //创建岗位类别码
function addGwlbm(gwlbmname){
var url = "/jwext/addGWLBMAction.do?GWLBM="+gwlbmname;
	xmlHttp.open("GET", url, false);
	xmlHttp.onreadystatechange = function (){
      if (xmlHttp.readyState == 4) {
        var response = xmlHttp.responseText;
		if(response.indexOf("不能重复")>-1){
			alert("岗位类别已经存在！");
		}else{
			var list=document.getElementById("gwlbm");
			var chkbox =document.createElement("input");
			chkbox.type="checkbox";
			chkbox.value=response;
			chkbox.name=gwlbmname;
			var txt=document.createTextNode(gwlbmname);
		    var div=document.createElement("div");
			list.appendChild(chkbox);
			list.appendChild(txt);

			return false;
		}
       }
     };
   xmlHttp.send(null)

}
	 //创建岗位类别码，用于就业安置
function addGwlbmValue(gwlbmname){
var url = "/jwext/addGWLBMAction.do?GWLBM="+gwlbmname;
	xmlHttp.open("GET", url, false);
	xmlHttp.onreadystatechange = function (){
      if (xmlHttp.readyState == 4) {
        var response = xmlHttp.responseText;
		if(response.indexOf("不能重复")>-1){
			alert("岗位类别已经存在！");
		}else{
			option=document.createElement("OPTION");
			option.text=gwlbmname;
			option.value=gwlbmname;
			document.forms[0].positionType.add(option);
			var len=document.forms[0].positionType.length;
			document.forms[0].positionType.options[len-1].selected="true";
			return false;
		}
       }
	   };
   xmlHttp.send(null)
}
	 //创建单位类别码,用于就业安置
function addDWLBMValue(dwlbmname){
var url = "/jwext/addDWLBMAction.do?DWLBM="+dwlbmname;
	xmlHttp.open("GET", url, false);
	xmlHttp.onreadystatechange = function (){
      if (xmlHttp.readyState == 4) {
        var response = xmlHttp.responseText;
		if(response.indexOf("不能重复")>-1){
			alert("单位类别已经存在！");
		}else{
			option=document.createElement("OPTION");
			option.text=dwlbmname;
			option.value=response;
			document.forms[0].orgType.add(option);
			var len=document.forms[0].orgType.length;
			document.forms[0].orgType.options[len-1].selected="true";
			return false;
		}
       }
     };
   xmlHttp.send(null)

}

//创建教学成果获奖等级码,用于教学成果
function addPrizeGradeValue(name)
{
	if(name == '')return;
	if (name.length>15)
	{
		alert("成果获奖等级长度不能超过15个汉字！");
		return;
	}
	var url = "/jwcore/addTeachFruitAction.do?cghjdjm="+name;
	xmlHttp.open("GET", url, false);
	xmlHttp.onreadystatechange = function (){
      if (xmlHttp.readyState == 4) {
        var response = xmlHttp.responseText;
		if(response == 'iteranceLabel'){
			alert("该成果获奖等级已经存在！");
		}else{
			option=document.createElement("OPTION");
			option.text=name;
			option.value=response;
			document.forms[0].prizeGrade.add(option);
			var len=document.forms[0].prizeGrade.length;
			document.forms[0].prizeGrade.options[len-1].selected="true";
			return cancleTextBookType(1);
		}
       }
     };
   xmlHttp.send(null)
}

//创建教学成果获奖等级码,用于教学成果
function addFruitTypeValue(name)
{
	if(name == '')return;
	if (name.length>15)
	{
		alert("成果类别长度不能超过15个汉字！");
		return;
	}
	var url = "/jwcore/addTeachFruitAction.do?cglbm="+name;
	xmlHttp.open("GET", url, false);
	xmlHttp.onreadystatechange = function (){
      if (xmlHttp.readyState == 4) {
        var response = xmlHttp.responseText;
		if(response == 'iteranceLabel'){
			alert("该成果类别已经存在！");
		}else{
			option=document.createElement("OPTION");
			option.text=name;
			option.value=response;
			document.forms[0].fruitType.add(option);
			var len=document.forms[0].fruitType.length;
			document.forms[0].fruitType.options[len-1].selected="true";
			return cancleTextBookType(2);
		}
       }
     };
   xmlHttp.send(null)
}
//创建教材获奖等级码,用于教材
function addPrizeGradeValue_jc(name)
{
	if(name == '')return;
	if (name.length>15)
	{
		alert("教材获奖等级长度不能超过15个汉字！");
		return;
	}
	var url = "/jwcore/addExcellentTextBookAction.do?cghjdjm="+name;
	xmlHttp.open("GET", url, false);
	xmlHttp.onreadystatechange = function (){
      if (xmlHttp.readyState == 4) {
        var response = xmlHttp.responseText;
		if(response == 'iteranceLabel'){
			alert("该教材获奖等级已经存在！");
		}else{
			option=document.createElement("OPTION");
			option.text=name;
			option.value=response;
			document.forms[0].prizeGrade.add(option);
			var len=document.forms[0].prizeGrade.length;
			document.forms[0].prizeGrade.options[len-1].selected="true";
			return cancleTextBookType(1);
		}
       }
     };
   xmlHttp.send(null)
}

//创建教材类别码,用于教材
function addTextBookTypeValue(name)
{
	if(name == '')return;
	if (name.length>15)
	{
		alert("教材类别长度不能超过15个汉字！");
		return;
	}
	var url = "/jwcore/addExcellentTextBookAction.do?cglbm="+name;
	xmlHttp.open("GET", url, false);
	xmlHttp.onreadystatechange = function (){
      if (xmlHttp.readyState == 4) {
        var response = xmlHttp.responseText;
		if(response == 'iteranceLabel'){
			alert("该教材类别已经存在！");
		}else{
			option=document.createElement("OPTION");
			option.text=name;
			option.value=response;
			document.forms[0].textBookType.add(option);
			var len=document.forms[0].textBookType.length;
			document.forms[0].textBookType.options[len-1].selected="true";
			return cancleTextBookType(2);
		}
       }
     };
   xmlHttp.send(null)
}
//创建交货方式码,用于征订单
function addDeliverWayValue(name)
{
    if(name == '')return;
	if (name.length>15)
	{
		alert("交货方式长度不能超过15个汉字！");
		return;
	}
	var url = "/textbook/addJHFSMAction.do?jhfsm="+name;
	xmlHttp.open("GET", url, false);
	xmlHttp.onreadystatechange = function (){
      if (xmlHttp.readyState == 4) {
        var response = xmlHttp.responseText;
		if(response == 'iteranceLabel'){
			alert("该交货方式已经存在！");
		}else{
			option=document.createElement("OPTION");
			option.text=name;
			option.value=response;
			document.forms[0].deliverWay.add(option);
			var len=document.forms[0].deliverWay.length;
			document.forms[0].deliverWay.options[len-1].selected="true";
			return cancleDeliverWay(1);
		}
       }
     };
   xmlHttp.send(null)
}

//创建教材种类码,用于教材编写出版计划报批系统
function addStudyTypeValue(name)
{
    if(name == '')return;
	if (name.length>15)
	{
		alert("教材种类长度不能超过15个汉字！");
		return;
	}
	var url = "/textbook/addJCZLMAction.do?jczlm="+name;
	xmlHttp.open("GET", url, false);
	xmlHttp.onreadystatechange = function (){
      if (xmlHttp.readyState == 4) {
        var response = xmlHttp.responseText;
		if(response == 'iteranceLabel'){
			alert("该教材种类已经存在！");
		}else{
			option=document.createElement("OPTION");
			option.text=name;
			option.value=response;
            alert(response+"_____"+name);
			document.forms[0].studyType.add(option);
			var len=document.forms[0].studyType.length;
			document.forms[0].studyType.options[len-1].selected="true";
			return cancleStudyType(1);
		}
       }
     };
   xmlHttp.send(null)
}

//创建获奖类型码,用于教材维护
function addHonourTypeValue(name)
{
    if(name == '')
		return;
	if (name.length>15)
	{
		alert("获奖类型长度不能超过15个汉字！");
		return;
	}
	var url = "/textbook/addHJLXMAction.do?hjlxm="+name;
	xmlHttp.open("GET", url, false);
	xmlHttp.onreadystatechange = function (){
      if (xmlHttp.readyState == 4) {
        var response = xmlHttp.responseText;
		if(response == 'iteranceLabel'){
			alert("该获奖类型已经存在！");
		}else{
			option=document.createElement("OPTION");
			option.text=name;
			option.value=response;
            document.forms[0].honourType.add(option);
			var len=document.forms[0].honourType.length;
			document.forms[0].honourType.options[len-1].selected="true";
			return cancleHonourType(3);
		}
       }
     };
   xmlHttp.send(null)
}



//创建银行名称码,用于供书单位管理
function addBankNameValue(name)
{
    if(name == '')return;
	if (name.length>15)
	{
		alert("银行名称长度不能超过15个汉字！");
		return;
	}
	var url = "/textbook/addYHMCMAction.do?yhmcm="+name;
	xmlHttp.open("GET", url, false);
	xmlHttp.onreadystatechange = function (){
      if (xmlHttp.readyState == 4) {
        var response = xmlHttp.responseText;
		if(response == 'iteranceLabel'){
			alert("该银行名称已经存在！");
		}else{
			option=document.createElement("OPTION");
			option.text=name;
			option.value=response;
            document.forms[0].bankName.add(option);
			var len=document.forms[0].bankName.length;
			document.forms[0].bankName.options[len-1].selected="true";
			return cancleBankName(1);
		}
       }
     };
   xmlHttp.send(null)
}
//得到学生信息
function getstudentInfo(studentNO){
    if(studentNO == '')return;
	var url = "/jwext/getStudentInfoAction.do?studentNO="+studentNO;
	xmlHttp.open("GET", url, false);
	xmlHttp.onreadystatechange = function (){
      if (xmlHttp.readyState == 4) {
        var response = xmlHttp.responseText;
		if(response == 'null'){
			alert("该学员不存在！");
			document.forms[0].studentName.value="";
		}else
			if(response=='noGetStu'){
				alert("该学员不存在或您无权管理！");
				document.forms[0].studentName.value="";
			}else{
				var studentinfo=response.split("&");
				document.forms[0].studentID.value=studentinfo[0];
				document.forms[0].studentName.value=studentinfo[1];
				document.forms[0].depName.value=studentinfo[2];
				document.forms[0].nationPlace.value=studentinfo[3];
				document.forms[0].homeAddress.value=studentinfo[4];
				document.forms[0].linkPhone.value=studentinfo[5];
				return false;
			}
       }
     };
   xmlHttp.send(null)
}
//公文收发检查主送单位的合法性
function checkDep(depIDs){
    if(depIDs == '')return false;
	var url = "/jwext/returnCheckDepAction.do?deps="+depIDs;
	xmlHttp.open("GET", url, false);
	xmlHttp.onreadystatechange = function (){
      if (xmlHttp.readyState == 4) {
        var response = xmlHttp.responseText;
		if(response == 'false'){
			alert("选择的单位中存在没有经过设置的发文单位，请检查！");
			document.forms[0].CopySendDeptname.value="";
			document.forms[0].CopySendDept.value="";
			return false;
		}else{
				return true;
			}
       }
     };
   xmlHttp.send(null)

}
//公文收发检查部门的合法性
function checkDepInccept(depIDs){
    if(depIDs == '')return false;
	var url = "/jwext/returnCheckDepAction.do?deps="+depIDs;
	xmlHttp.open("GET", url, false);
	xmlHttp.onreadystatechange = function (){
      if (xmlHttp.readyState == 4) {
        var response = xmlHttp.responseText;
		if(response == 'false'){
			alert("选择的单位中存在没有经过设置的发文单位，请检查！");
			document.forms[0].MainSendDeptname.value="";
			document.forms[0].checkDepInccept.value="";

			return false;
		}else{
				return true;
			}
       }
     };
   xmlHttp.send(null)

}
