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
/** addCourse��ʼ**/
/**
  �ͷ��������н����Ľű�
**/
/*function callServer(url,parameter,value) {
  // var url = "/jwcore/checkCourseNOAction.do?courseNO="+value;
   var url=url+"?"+parameter+"="+value;
   callServerRepeat(url,'�γ̱���Ѿ���ʹ�ã�',document.forms[0].courseNO);
}*/
function callServerCourse(url,parameter,value) {
  // var url = "/jwcore/checkCourseNOAction.do?courseNO="+value;
   var url=url+"?"+parameter+"="+value;
   callServerRepeat(url,'�γ̱���Ѿ���ʹ�ã�',document.forms[0].courseNO);
}
//ϵͳ�Ƽ�
function systemCommend(url,parameter)
{
    if (document.forms[0].staffroomID.value ==''){
         alert('������ѡ�񿪿ν����ң�ϵͳ����Ϊ���Ƽ���');
         staffroomID.focus();
         return false;
      }
   //var url ='/jwcore/systemCommendCourseNOAction.do?staffroomID='+document.forms[0].staffroomID.value;
   var url=url+"?"+parameter+"="+document.forms[0].staffroomID.value;

   xmlHttp.open("GET", url, true);
    /**���������ɹ��󷵻ؿͻ�����Ҫִ�еĽű�
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
/** addCourse����**/
/** addTaskPlan����**/
//var objectTaskValue='';
function findOjbect(url,parameter, value)
{

   var url=url+"?"+parameter+"="+value;
  // objectTaskValue=value;
   xmlHttp.open("GET", url, false);
    /**���������ɹ��󷵻ؿͻ�����Ҫִ�еĽű�
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
    e_option.text="----��ѡ��----";
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

/** addTaskPlan����**/

/** addCourseGroup����**/
function callAddCourseServer(url,parameter,value) {

   //var url = "/jwcore/checkCourseGroupNameAction.do?courseGroupName="+value;
    var url=url+"?"+parameter+"="+value;
    callServerRepeat(url,'��������Ѿ���ʹ�ã�',document.forms[0].courseGroupName);
}
/** addCourseGroup����**/
/** �õ�δ���������ѧ��**/
function findNum(url)
{
   var url=url;
   xmlHttp.open("GET", url, false);
    /**���������ɹ��󷵻ؿͻ�����Ҫִ�еĽű�
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
/** �õ�δ���������ѧ������**/

//��֤���ű���ظ��Ľű�
function checkDapNORepeat(depNO,depNORe){
	var url;
	if(depNORe=='')
       url="/jap/fastCheckAction.do?depNO="+depNO;
	else
	   url="/jap/fastCheckAction.do?depNO="+depNO+"&depNORe="+depNORe;
    callServerRepeat(url,'���ű���Ѿ���ʹ�ã�',document.forms[0].depNO);
}
//��֤���ű�����

//��֤�����ƻ������ظ��Ľű�
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
	callServerRepeatNoEmpty(url,'�˲��������������Ѿ����ڣ�',document.forms[0].trainPlanName);
}
//��֤ѧ���Ƿ��Ǳ�ҵ��
function callIsGraduateServer(url,parameter,value){
   var url=url+"?"+parameter+"="+value;
   callServerRepeat(url,'��ѧԱ���Ǳ�ҵ����',document.forms[0].studentName);
}
//��֤�����ѧ���Ƿ����
function callStudentNOServer(url,parameter,value){
   var url=url+"?"+parameter+"="+value;
   callServerRepeat(url,'��ѧ�Ų����ڻ���¼���ѧԱ������֤���棡',document.forms[0].studentID);
}
//�ж����ӵİ汾�����Ƿ��Ѿ�����
function checkVersionName(url,parameter,value){
 var url=url+"?"+parameter+"="+value;
   callServerRepeat(url,'������ӵİ汾�����Ѿ���ʹ�ã�',document.forms[0].versionName);

}
//��֤�����ƻ�ģ�������ظ��Ľű�
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
	callServerRepeatNoEmpty(url,'�˲���������ģ�������Ѿ����ڣ�',document.forms[0].trainPlanName);
}

function checkExsitsPlanAtSpeGrade(specialityID,existSpecialityID,grade,existGrade)
{
	var url;
	url="/jwcore/checkTrainPlanStepThreeAction.do?specialityID="+specialityID+"&grade="+grade+"&existSpecialityID="+existSpecialityID+"&existGrade="+existGrade;
	return callServerRepeat(url,'���꼶רҵ�˲����������Ѿ����ڣ�',document.forms[0].specialityID);
}

//��֤רҵ�����ظ��Ľű�
function checkSpecialityNameRepeat(specialityName,specialityNameRe){
	var url;
	if(specialityName=='')
       url="/ujap/checkFashAction.do?specialityName="+specialityName;
	else
	   url="/ujap/checkFashAction.do?specialityName="+specialityName+"&specialityNameRe="+specialityNameRe;
   callServerRepeat(url,'רҵ�����Ѿ���ʹ�ã�',document.forms[0].specialityName);


}

//��֤רҵ�������
//��֤רҵ�����ظ��Ľű�
function checkShortNameRepeat(shortName,shortNameRe){
	var url;
	if(shortName=='')
       url="/ujap/checkFashAction.do?shortName="+shortName;
	else
	   url="/ujap/checkFashAction.do?shortName="+shortName+"&shortNameRe="+shortNameRe;
    callServerRepeat(url,'רҵ�����Ѿ���ʹ�ã�',document.forms[0].shortName);

}
//��֤רҵ�������
//��֤У�ڴ����ظ��Ľű�
function checkInnerCodeRepeat(InnerCode,InnerCodeRe){
	var url;
	if(InnerCode=='')
       url="/ujap/checkFashAction.do?innerCode="+InnerCode;
	else
	   url="/ujap/checkFashAction.do?innerCode="+InnerCode+"&InnerCodeRe="+InnerCodeRe;
    callServerRepeat(url,'У�ڴ����Ѿ���ʹ�ã�',document.forms[0].innerCode);

}
//��֤У�ڴ������

//Ա������Ա����ţ���ʼ
function callEmployeeServer(url,parameter,value) {
   var url=url+"?"+parameter+"="+value;
   callServerRepeat(url,'Ա������Ѿ���ʹ�ã�',document.forms[0].employeeNO);
}
//Ա������Ա����ţ�����
//�༶����ʼ
  //��֤�༶�����Ƿ��ظ�
function callServerClassName(value,value1) {
   var url = "/jwcore/checkClassNameAction.do?className="+value+"&flag="+value1;
   callServerRepeat(url,'�½�רҵ��������ظ���',document.forms[0].className);
}
//�շ���֤ѧ���Ƿ������ݿ��д���
function checkStudentNO(value) {
   var url = "/jwext/checkStudentNOAction.do?studentNO="+value;
   callServerRepeat(url,'�Բ����Ҳ�����ӦѧԱ��',document.forms[0].studentName);
}

//��֤�༶�����Ƿ��ظ�
function callServerAlias(value,value1) {
   var url = "/jwcore/checkClassNameAction.do?classAlias="+value+"&flag="+value1;
   callServerRepeat(url,'�½�רҵ��α����ظ���',document.forms[0].classAlias);
}
//�༶�������

//Ա������Ա����ţ���ʼ
function setTrainCredite(p_classifyID,p_mustCreditNum,p_eleCreditNum,p_requireDescription) {
  var url="/jwcore/setTrainPlanCrediteAction.do?mustCreditHour="+p_mustCreditNum+"&electiveCreditHour="+p_eleCreditNum+"&classfiyID="+p_classifyID+"&requireDescription="+p_requireDescription;
   xmlHttp.open("GET", url, true);
    /**���������ɹ��󷵻ؿͻ�����Ҫִ�еĽű�
    **/
   xmlHttp.send(null);
}
//�˲���������ģ����Ӧ���趨�����޿ζѧ��:ѡ�޿ζѧ��:Ҫ�� ����
function setTempletCredite(p_classifyID,p_mustCreditNum,p_eleCreditNum,p_requireDescription) {
  var url="/jwcore/setTempletCrediteAction.do?mustCreditHour="+p_mustCreditNum+"&electiveCreditHour="+p_eleCreditNum+"&classfiyID="+p_classifyID+"&requireDescription="+p_requireDescription;
   xmlHttp.open("GET", url, true);
    /**���������ɹ��󷵻ؿͻ�����Ҫִ�еĽű�
    **/
   xmlHttp.send(null);
}
//�жϽ�ѧ���Զ��ϲ�������½�ѧ�������Ƿ��������ظ�--��ѧ�������
function callClassMergeRuleServer(url,parameter,value){
 var url=url+"?"+parameter+"="+value;
   callServerRepeat(url,'�½�ѧ�������Ѿ���ʹ�ã�',document.forms[0].className);

}

//��֤ѧ���Ƿ�����춯
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
            alert("��ѡ���ѧԱ����"+changname+"��");
			return false;
        }else{
			document.forms[0].studentChangeCode.style.color="black";
			document.forms[0].studentChangeCode.style.backgroundColor="white";
		}
       }
     };
   xmlHttp.send(null)

   //callServerRepeat(url,'��ѡ���ѧԱ�����춯��',document.forms[0].studentName);


}
/**
 ��֤�Ƿ��ظ�����ʾ
 url ΪҪ������������url
alterMessage ���������Ҫ����ʾ������
textObj ΪҪ��ʾ�Ŀؼ� �� document.forms[0].classNO �����ԭ����ֵ
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
 ��֤�Ƿ��ظ�����ʾ
 url ΪҪ������������url
alterMessage ���������Ҫ����ʾ������
textObj ΪҪ��ʾ�Ŀؼ� �� document.forms[0].classNO ,�����ԭ����ֵ
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
                alert ("û�и�ѧԱ");
               document.forms[0].studentBar.value="";
               document.forms[0].studentBar.focus();
            } if (response.indexOf("HAVSCORE")>-1){
               alert ("��ѧԱ�ĳɼ��Ѿ�¼���,�Ҳ����޸�");
               document.forms[0].studentBar.value="";
               document.forms[0].studentBar.focus();
            }else{
               document.forms[0].score.focus();
            }
         }
         if (flag == "checkscore"){
            if (response.indexOf("success")<0){
            	if(response.indexOf("null")<0){
                var altstr="��ѧԱ�ĳɼ���¼Ϊ"+response+"�֣��Ƿ��޸�Ϊ"+examScore+"��";
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
	 //����ѧ�������
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
	 //������λ�����
function addDwlbm(dwlbmname,boxname){
var url = "/jwext/addDWLBMAction.do?DWLBM="+dwlbmname;
	xmlHttp.open("GET", url, false);
	xmlHttp.onreadystatechange = function (){
      if (xmlHttp.readyState == 4) {
        var response = xmlHttp.responseText;
		if(response.indexOf("�����ظ�")>-1){
			alert("��λ����Ѿ����ڣ�");
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

	 //������λ�����
function addGwlbm(gwlbmname){
var url = "/jwext/addGWLBMAction.do?GWLBM="+gwlbmname;
	xmlHttp.open("GET", url, false);
	xmlHttp.onreadystatechange = function (){
      if (xmlHttp.readyState == 4) {
        var response = xmlHttp.responseText;
		if(response.indexOf("�����ظ�")>-1){
			alert("��λ����Ѿ����ڣ�");
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
	 //������λ����룬���ھ�ҵ����
function addGwlbmValue(gwlbmname){
var url = "/jwext/addGWLBMAction.do?GWLBM="+gwlbmname;
	xmlHttp.open("GET", url, false);
	xmlHttp.onreadystatechange = function (){
      if (xmlHttp.readyState == 4) {
        var response = xmlHttp.responseText;
		if(response.indexOf("�����ظ�")>-1){
			alert("��λ����Ѿ����ڣ�");
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
	 //������λ�����,���ھ�ҵ����
function addDWLBMValue(dwlbmname){
var url = "/jwext/addDWLBMAction.do?DWLBM="+dwlbmname;
	xmlHttp.open("GET", url, false);
	xmlHttp.onreadystatechange = function (){
      if (xmlHttp.readyState == 4) {
        var response = xmlHttp.responseText;
		if(response.indexOf("�����ظ�")>-1){
			alert("��λ����Ѿ����ڣ�");
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

//������ѧ�ɹ��񽱵ȼ���,���ڽ�ѧ�ɹ�
function addPrizeGradeValue(name)
{
	if(name == '')return;
	if (name.length>15)
	{
		alert("�ɹ��񽱵ȼ����Ȳ��ܳ���15�����֣�");
		return;
	}
	var url = "/jwcore/addTeachFruitAction.do?cghjdjm="+name;
	xmlHttp.open("GET", url, false);
	xmlHttp.onreadystatechange = function (){
      if (xmlHttp.readyState == 4) {
        var response = xmlHttp.responseText;
		if(response == 'iteranceLabel'){
			alert("�óɹ��񽱵ȼ��Ѿ����ڣ�");
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

//������ѧ�ɹ��񽱵ȼ���,���ڽ�ѧ�ɹ�
function addFruitTypeValue(name)
{
	if(name == '')return;
	if (name.length>15)
	{
		alert("�ɹ���𳤶Ȳ��ܳ���15�����֣�");
		return;
	}
	var url = "/jwcore/addTeachFruitAction.do?cglbm="+name;
	xmlHttp.open("GET", url, false);
	xmlHttp.onreadystatechange = function (){
      if (xmlHttp.readyState == 4) {
        var response = xmlHttp.responseText;
		if(response == 'iteranceLabel'){
			alert("�óɹ�����Ѿ����ڣ�");
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
//�����̲Ļ񽱵ȼ���,���ڽ̲�
function addPrizeGradeValue_jc(name)
{
	if(name == '')return;
	if (name.length>15)
	{
		alert("�̲Ļ񽱵ȼ����Ȳ��ܳ���15�����֣�");
		return;
	}
	var url = "/jwcore/addExcellentTextBookAction.do?cghjdjm="+name;
	xmlHttp.open("GET", url, false);
	xmlHttp.onreadystatechange = function (){
      if (xmlHttp.readyState == 4) {
        var response = xmlHttp.responseText;
		if(response == 'iteranceLabel'){
			alert("�ý̲Ļ񽱵ȼ��Ѿ����ڣ�");
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

//�����̲������,���ڽ̲�
function addTextBookTypeValue(name)
{
	if(name == '')return;
	if (name.length>15)
	{
		alert("�̲���𳤶Ȳ��ܳ���15�����֣�");
		return;
	}
	var url = "/jwcore/addExcellentTextBookAction.do?cglbm="+name;
	xmlHttp.open("GET", url, false);
	xmlHttp.onreadystatechange = function (){
      if (xmlHttp.readyState == 4) {
        var response = xmlHttp.responseText;
		if(response == 'iteranceLabel'){
			alert("�ý̲�����Ѿ����ڣ�");
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
//����������ʽ��,����������
function addDeliverWayValue(name)
{
    if(name == '')return;
	if (name.length>15)
	{
		alert("������ʽ���Ȳ��ܳ���15�����֣�");
		return;
	}
	var url = "/textbook/addJHFSMAction.do?jhfsm="+name;
	xmlHttp.open("GET", url, false);
	xmlHttp.onreadystatechange = function (){
      if (xmlHttp.readyState == 4) {
        var response = xmlHttp.responseText;
		if(response == 'iteranceLabel'){
			alert("�ý�����ʽ�Ѿ����ڣ�");
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

//�����̲�������,���ڽ̲ı�д����ƻ�����ϵͳ
function addStudyTypeValue(name)
{
    if(name == '')return;
	if (name.length>15)
	{
		alert("�̲����೤�Ȳ��ܳ���15�����֣�");
		return;
	}
	var url = "/textbook/addJCZLMAction.do?jczlm="+name;
	xmlHttp.open("GET", url, false);
	xmlHttp.onreadystatechange = function (){
      if (xmlHttp.readyState == 4) {
        var response = xmlHttp.responseText;
		if(response == 'iteranceLabel'){
			alert("�ý̲������Ѿ����ڣ�");
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

//������������,���ڽ̲�ά��
function addHonourTypeValue(name)
{
    if(name == '')
		return;
	if (name.length>15)
	{
		alert("�����ͳ��Ȳ��ܳ���15�����֣�");
		return;
	}
	var url = "/textbook/addHJLXMAction.do?hjlxm="+name;
	xmlHttp.open("GET", url, false);
	xmlHttp.onreadystatechange = function (){
      if (xmlHttp.readyState == 4) {
        var response = xmlHttp.responseText;
		if(response == 'iteranceLabel'){
			alert("�û������Ѿ����ڣ�");
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



//��������������,���ڹ��鵥λ����
function addBankNameValue(name)
{
    if(name == '')return;
	if (name.length>15)
	{
		alert("�������Ƴ��Ȳ��ܳ���15�����֣�");
		return;
	}
	var url = "/textbook/addYHMCMAction.do?yhmcm="+name;
	xmlHttp.open("GET", url, false);
	xmlHttp.onreadystatechange = function (){
      if (xmlHttp.readyState == 4) {
        var response = xmlHttp.responseText;
		if(response == 'iteranceLabel'){
			alert("�����������Ѿ����ڣ�");
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
//�õ�ѧ����Ϣ
function getstudentInfo(studentNO){
    if(studentNO == '')return;
	var url = "/jwext/getStudentInfoAction.do?studentNO="+studentNO;
	xmlHttp.open("GET", url, false);
	xmlHttp.onreadystatechange = function (){
      if (xmlHttp.readyState == 4) {
        var response = xmlHttp.responseText;
		if(response == 'null'){
			alert("��ѧԱ�����ڣ�");
			document.forms[0].studentName.value="";
		}else
			if(response=='noGetStu'){
				alert("��ѧԱ�����ڻ�����Ȩ����");
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
//�����շ�������͵�λ�ĺϷ���
function checkDep(depIDs){
    if(depIDs == '')return false;
	var url = "/jwext/returnCheckDepAction.do?deps="+depIDs;
	xmlHttp.open("GET", url, false);
	xmlHttp.onreadystatechange = function (){
      if (xmlHttp.readyState == 4) {
        var response = xmlHttp.responseText;
		if(response == 'false'){
			alert("ѡ��ĵ�λ�д���û�о������õķ��ĵ�λ�����飡");
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
//�����շ���鲿�ŵĺϷ���
function checkDepInccept(depIDs){
    if(depIDs == '')return false;
	var url = "/jwext/returnCheckDepAction.do?deps="+depIDs;
	xmlHttp.open("GET", url, false);
	xmlHttp.onreadystatechange = function (){
      if (xmlHttp.readyState == 4) {
        var response = xmlHttp.responseText;
		if(response == 'false'){
			alert("ѡ��ĵ�λ�д���û�о������õķ��ĵ�λ�����飡");
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
