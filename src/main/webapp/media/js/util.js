/*--

//like:<script language="javaScript" src="../js/util.js"></script>



//本js文件包括:

//	ChkError(flag,Obj):
		检测错误,并做显示处理.

//	ChkDate(date):
		检测日期格式'YYYY-MM-DD'，参数(date)一般为"this"。
		用例：onblur="ChkError(ChkDate(this),this)"

//	ChkCoDate(Osdate,Oedate):
		检测日期格式'YYYY-MM-DD',并比较,参数(Osdate)为开始日期，参数(Oedate)为终止日期。
		用例：onblur="ChkError(ChkCoDate(thisform.gsbeg,this),this)"

//	CheckNull():
		检测输入域是否为空，参数不固定。
		用例：flag=CheckNull('thisform.f1','thisform.f2',...)

//	ChkNsrCode(obj):
		检查纳税人识别号,参数(obj)一般为"this"。
		用例：onblur="ChkError(ChkNsrCode(this),this)"
//  ChangeCheckBox(parentChkBox, chkboxArray):
		根据parentChkBox(总的复选框)的选中状态处理chkboxArray(分的复选框)的选中状态
		用例：onclick="ChangeCheckBox(parentChkBox, chkboxArray)"

//	Map方法。用法和使用java中的map是一样的。

//	isArray，判断当前对象是不是数组。用法：isArray(object)

//	弹出窗口show_winOpenString 

//	弹出模态窗口show_modalDialogString

//	检查附件类型checkFileType

//	清除附件clearFile

//	精确的乘法计算accMul(a, b);

//	精确的加法计算accAdd(a, b);

//	格式化小数formatNum(double, 2) 格式化double成2为，此方法自带四舍五入功能

--*/
//-----------------------------------------------------------------------------//
/* 其它函数调用用例：
onblur="ChkError(ChkInt(this),this)"			//检测正整数，小于2的16次方
#onblur="ChkError(ChkReal(this,2,10),this)"		//检测实数,小数位为2位,整数位缺省为10位
onblur="ChkError(CheckReal(this,2,10),this)"		//检测正实数,小数位为2位,整数位缺省为10位
onblur="ChkError(ChkDot(this,2),this)"			//检测小数,小数点后为2位
onblur="ChkError(isPostNum(this),this)"			//检测邮政编码
onblur="ChkError(isEmail(this),this)"			//检测Email地址
onblur="ChkError(ChkTelCode(this),this)"		//检测电话号码
onblur="ChkError(ChkDigit(this,10,false),this)"	//检查不超过10位的数字
*/

/*
==================================================================
功能：检测浏览器
==================================================================
*/
var Sys = {};
var ua = navigator.userAgent.toLowerCase();
var s;
(s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
(s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
(s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
(s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
(s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;

 /**
  * 兼容IE和firefox的获取event的方法
  */
 function getEvent()
 { 
 	if(Sys.ie){
 		return window.event;   	
 	}
 	func=getEvent.caller;       
 	while(func!=null){ 
 		var arg0=func.arguments[0];
 		if(arg0)
 		{
 			if((arg0.constructor==Event || arg0.constructor ==MouseEvent) || (typeof(arg0)=="object" && arg0.preventDefault && arg0.stopPropagation))
 			{ 
 			return arg0;
 			}
 		}
 		func=func.caller;
 	}
 	return null;
 } 

 /*
  * 用来控制在弹出层之后tab键不起作用
  */
 var tabFlag = false;
 /*
  * 重写onkeydown方法，在弹出artDialog时按tab键失效
  */
 document.onkeydown=function(){
 	var event = getEvent();
 	if (tabFlag){
 		if(event.keyCode==9){
 			event.keyCode=0;   
 			event.returnValue=false;
 			return false;
 		}
 	}else{
 		event.returnValue=true;
 		return true;
 	}
 };

 /**
 * 使用artDialog重写confirm对话框，询问时使焦点默认在取消上
 */
window.confirm = function(content,yes,no)
 {
 	tabFlag = true;
     return artDialog({
 		id:'Confirm',
         icon: 'question',
 		background:'#323232',
 		title:'友情提示',
 		opacity: 0.65,
         fixed: true,
 		resize:false,
         lock: true,
         content: content,
 		button:[{
 			name: '确认',
 			callback:function(here){
 				tabFlag = false;
 				return yes.call(this, here);
 			}
 		},
 		{
 			name: '取消',
 			callback:function(here){
 				tabFlag = false;
 			}
 		}]
     });
 }
  
  /*
   * 使用artDialog重写alert弹出框
   * str是弹出框里边的内容
   * obj是为了扩展弹出框点击之后，将焦点移动到该对象上
   */
  
  //标记点击弹出框以后获取焦点的对象，如果不设置，源头对象在弹出框关闭后获取焦点。
  var windowAlertFocusObj=null;
  window.alert = function(str,obj){
  	str = str ? str + "" : "友情提示";
  	//这里artFlag = true是为了弹出层之后禁掉esc和tab键
  	tabFlag = true;
  	var event = getEvent();
  	try{
  		if(!obj){
  			if(Sys.ie){
  				obj = event.srcElement;
  			}else if (Sys.firefox || Sys.chrome){
  				obj = event.target;
  			}	
  		}
  	}catch(e){
  		//一旦出了异常，还原系统原有alert
  		window.alert = window.alert;
  	}
  	return artDialog({
  				id:'Alert',
  				fixed: true,
  				title:'友情提示',
  				icon:"warning",
  				background:'#323232',
  				resize:false,
  				opacity: 0.65,
  				lock:true,
  				content: str,
  				focus:true,
  				ok:function(){
  					tabFlag = false;
  					return true;
  				},
  				//不管该弹出层以何种方式关闭都会调用该方法
  				close:function(){
  					//去除dwr事件，去除类型为file的文本框
  					if(obj && obj.tagName && obj.getAttribute("type") != 'file'){
  						tabFlag = false;
  						//这里如果不延时，在firefox下无法获取焦点
  						window.setTimeout(
  										  function(){
  											  try{
  												if(windowAlertFocusObj!=null){
  													windowAlertFocusObj.focus();
  													windowAlertFocusObj=null;
  												}
  												else{
  													obj.focus();
  												}
  											  	obj = null;
  											  }catch(e){
  												  //一旦出了异常，还原系统原有alert
  												  window.alert = window.alert;
  											  }
  						}, 20);
  					}
  				}
  		});
  }
 /*
==================================================================
功能：检测错误,并做显示处理-
提示信息：
使用：onblur="ChkError(ChkInt(this),this)"
返回：
==================================================================
*/
var g_Obj = null; // 记住前一个焦点的控件
function ChkError(flag, obj) {
    if (flag) {
		if (obj.tagName == 'SELECT') {
			setSelectBGColor(obj, "white", "black");
		}else if (obj && obj.length && obj[0].tagName == 'INPUT' && obj[0].type == 'radio'){
			//如果单选按钮和复选框的判空边框变红有异常，请检查页面上单选按钮和复选框是否存在单独的父元素
			obj[0].parentNode.style.border = "1px solid white";
		}else {
			obj.style.border = "1px solid #cccccc";
		}
        return true;
    } else {
		if (obj.tagName == 'SELECT') {
			setSelectBGColor(obj, "red", "white")
		}else if (obj && obj.length && obj[0].tagName == 'INPUT' && obj[0].type == 'radio'){
			//如果单选按钮和复选框的判空边框变红有异常，请检查页面上单选按钮和复选框是否存在单独的父元素
			obj[0].parentNode.style.border = "1px solid #e50000";
		}else{
        	obj.style.color = "black";
            obj.style.border = "1px solid #e50000";
		}
		//延时定焦点是为了兼容firefox，如果直接获取，firefox下不起作用。
		setTimeout(function(){obj.focus();}, 0);
        return false;
    }
}

/*
==================================================================
功能：检测错误,并做显示处理-(不获取焦点)
提示信息：
使用：onblur="ChkErrorNoFocus(ChkInt(this),this)"
返回：
==================================================================
*/
function ChkErrorNoFocus(flag, obj) {
    if (flag) {
		if (obj.tagName == 'SELECT') {
			setSelectBGColor(obj, "white", "black");
		}else if (obj && obj.length && obj[0].tagName == 'INPUT' && obj[0].type == 'radio'){
			//如果单选按钮和复选框的判空边框变红有异常，请检查页面上单选按钮和复选框是否存在单独的父元素
			obj[0].parentNode.style.border = "1px solid white";
		}else if (obj && obj.tagName == 'DIV'){
			obj.style.border = "1px solid white";
		}else {
			obj.style.border = "1px solid #cccccc";
		}
        return true;
    } else {
		if (obj.tagName == 'SELECT') {
			setSelectBGColor(obj, "red", "white")
		}else if (obj && obj.length && obj[0].tagName == 'INPUT' && obj[0].type == 'radio'){
			//如果单选按钮和复选框的判空边框变红有异常，请检查页面上单选按钮和复选框是否存在单独的父元素
			obj[0].parentNode.style.border = "1px solid #e50000";
		}else {
        	obj.style.border="1px #e50000 solid";
		}
        return false;
    }
}

	
//设置下拉框颜色
function setSelectBGColor(obj, bgColor, color){
	if (obj){
		for (var j = 0; j < obj.length; j++) {
			obj[j].style.backgroundColor = bgColor;
			obj[j].style.color = color;			
		}

	}
}

//--------------------------------检查对象内容是否为空---------------------------//
function isEmptyUtil(obj) {
    var str = obj.value;
	//防止调用时传进来的是一个字符串
	if (!str) {
		str = obj.value;
	}
	
    if (str == "") {
        return true;
    } else {
        return false;
    }
}

//-----------------------------------------------------------------------------//
function isDigit(theNum){
	var theMask="0123456789";
	if(theNum==""){
		return true;
	}
	else if(theMask.indexOf(theNum)==-1){
		return false;
	}
	return true;
}
//-----------------------检测整数,不对外---------------------------------------//
function isInt(num) {
	//由于下边的正则无法验证0，所以针对输入0单独处理
	if(num === '0' || num === 0){
		return true;
	} 
	//如果用户输入的是很多0或者如果用户输入的第一位是0，0后边有非0的数字
	else if ((parseInt(num) === 0 || num.indexOf('0') == 0) && num.length > 1)
	{
		return false;
	}

	var reg = /^[0-9]+$/;
	if (!num.match(reg)) {
        return false;
    } 
    return true;
}

/*
==================================================================

功能：检查正整数和0
提示信息：
使用：onblur="ChkError(ChkIntAndZero(this),this)"
返回：

==================================================================
*/

function ChkIntAndZero(Obj,maxValue) {
	var parent = Obj.parentNode;
	//清空错误信息，重新校验
	var error = Obj.previousSibling;
	if(error && (error.id=="errorMassage" || error.id=="nullMassage")){
		parent.removeChild(error);
		Obj.style.color = "black";
		Obj.style.border = "1px solid #cccccc";
	}
    var theInt = Obj.value;
    if(theInt == ""){
    	var massageObj=document.createElement("div");
		massageObj.setAttribute("id","nullMassage");
		massageObj.innerHTML="内容不能为空";
		massageObj.style.color= "red";
		parent.insertBefore(massageObj,Obj);
		Obj.style.color = "black";
		Obj.style.border = "1px solid #e50000";
    }
    //由于下边的正则无法验证0，所以针对输入0单独处理
	if(theInt === '0'){
		return true;
	}
    var reg = /^[1-9]\d*$/;
    if (!theInt.match(reg)) {
    	var massageObj=document.createElement("div");
		massageObj.setAttribute("id","errorMassage");
		massageObj.innerHTML="请输入正整数！";
		massageObj.style.color= "red";
		parent.insertBefore(massageObj,Obj);
		Obj.style.color = "black";
		Obj.style.border = "1px solid #e50000";
    }else if(theInt > maxValue){
    	var massageObj=document.createElement("div");
		massageObj.setAttribute("id","errorMassage");
		massageObj.innerHTML="输的数字不能大于"+maxValue;
		massageObj.style.color= "red";
		parent.insertBefore(massageObj,Obj);
		Obj.style.color = "black";
		Obj.style.border = "1px solid #e50000";
        
    }
}



/*
==================================================================
功能：检测小于或等于65536的正整数
提示信息：
使用：onblur="ChkError(ChkInt(this),this)"
返回：
==================================================================
*/
function ChkInt(Obj) {
    if (isEmptyUtil(Obj)) {
        return true;
    } else {
        var theInt = Obj.value;
        var reg = /^[1-9]\d*$/;
        if (!theInt.match(reg)) {
            alert('请输入正整数！');
            Obj.focus();
            return false;
        }
		/* 测试提出了这个问题，所以这里注释掉。
        var n = eval(theInt);
        if (n > 65536) {
            alert("请输入小于或等于65536的正整数！");
            Obj.focus();
            return false;
        }*/
        return true;
    }
}

/*
==================================================================
功能：检测正整数，没有大小限制
提示信息：
使用：onblur="ChkError(ChkInteger(this),this)"
返回：
==================================================================
*/
function ChkInteger(Obj) {
    if (isEmptyUtil(Obj)) {
        return true;
    } else {
        var theInt = Obj.value;
        var reg = /^[1-9]\d*$/;
        if (!theInt.match(reg)) {
            alert('请输入正整数！');
            Obj.focus();
            return false;
        }
        return true;
    }
}

/*
==================================================================
功能：检测整数（正整数，负整数和零）
提示信息：
使用：onblur="ChkError(ChkAllInteger(this),this)"
返回：
==================================================================
*/
function ChkAllInteger(Obj) {
    if (isEmptyUtil(Obj)) {
        return true;
    } else {
        var theInt = Obj.value;
		//由于下边的正则无法验证0，所以针对输入0单独处理
		if(theInt === '0'){
			return true;
		}
        var reg = /^-?[1-9]\d*$/;
        if (!theInt.match(reg)) {
            alert('请输入整数！');
            Obj.focus();
            return false;
        }
        return true;
    }
}

//验证小于或等于65536的非负整数
function ChkIntNumber(obj) {
    if (isEmptyUtil(obj)) {
        return true;
    } else {
        var theInt = obj.value;
        var reg = /^[0-9]+$/;
        if (!theInt.match(reg)) {
            alert('请输入非负整数！');
            obj.focus();
            return false;
        }
		//上边的正则不会判断已0开头的大于1位的数据，所以这里要添加判断
		else if(theInt.indexOf('0') == 0 && theInt.length > 1){
			alert('请输入非负整数！');
            obj.focus();
            return false;
		}

        /* 测试提出了这个问题，所以这里注释掉。
		var n = eval(theInt);
        if (n > 65536) {
            alert("请输入小于或等于65536的非负整数！");
            obj.focus();
            return false;
        }*/
        return true;
    }
}

//-------------------检查不超过（或等于）n位的非负整数----------------------------//
function ChkDigit(obj, n, flag) { //flag=true 等于;flag=false 不超过.
	if (isEmptyUtil(obj)) {
        return true;
    }
    var num = obj.value;
    var reg = /^[0-9]+$/;
    if (!num.match(reg)) {
        alert('请输入非负整数！');
        obj.focus();
        return false;
    }
	//上边的正则不会判断已0开头的大于1位的数据，所以这里要添加判断
	else if(num.indexOf('0') == 0 && num.length > 1){
		alert('请输入正整数！');
        obj.focus();
        return false;
	}

    if (flag) {
        if (num.length != n) {
            alert("请输入" + n + "位正整数！");
            return false;
        }
    } else {
        if (num.length > n) {
            alert("请输入不超过" + n + "位的正整数！");
            return false;
        }
    }
    return true;
}

function InsertStr(Str,InsPlace,SubStr)		//invoke in ChkDate
{
  var s1;
  var s2;
  s1=Str.substring(0,InsPlace);
  s2=Str.substring(InsPlace,Str.length);
  s1=s1+SubStr;
  s1=s1+s2;
  return s1;
}

//弹出模态窗口
function openModal(url)
{
  window.showModalDialog(url,'',show_modalDialogString(600,400));
}

/* 弹出日历的窗口
*/
function inputDate(para)
{
		window.showModalDialog('../media/js/calendar/calendar.html',para,'dialogheight=238px;dialogwidth=218px;status=no;edge=raised;scroll=no');
}

/*************************************弹出层（动态创建遮罩层和弹出层）***************************************/


function showMsgBoxWithTextarea(operation,targetName)
{
	var WIN_HEIGHT = 200;
	var WIN_WIDTH = 320;

	var clientWidth = 0, clientHeight = 0;
	if( typeof( window.innerWidth ) == 'number' )

	var clientWidth = 0, clientHeight = 0;
	if( typeof( window.innerWidth ) == 'number' )

	{
		//非IE浏览器
		clientWidth = window.innerWidth;
		clientHeight = window.innerHeight;
	}
	else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) )
	{
		//IE6或以上版本
		clientWidth = document.documentElement.clientWidth;
		clientHeight = document.documentElement.clientHeight;
	}


	var maskDiv = document.createElement("div");

	maskDiv.setAttribute('id','maskDiv');
	maskDiv.style.position = "absolute";
	maskDiv.style.top = "0";
	maskDiv.style.left = "0";
	maskDiv.style.height = clientHeight + "px";
	maskDiv.style.width = clientWidth + "px";
	maskDiv.style.background = "#FFF";
	maskDiv.style.zIndex = "100";
	maskDiv.style.filter = "alpha(opacity=50)";

	document.body.appendChild(maskDiv);

	var maskDiv = document.createElement("div");



	var msgDiv = document.createElement("div");
	msgDiv.setAttribute('id','msgDiv');
	msgDiv.style.height = WIN_HEIGHT + "px";
	msgDiv.style.width = WIN_WIDTH + "px";
	msgDiv.style.position = "absolute";
	msgDiv.style.left = "35%";
    msgDiv.style.top = "35%";
	msgDiv.style.border = "1px solid #9BDF70";
	msgDiv.style.zIndex = "200";

	var msgTitle=document.createElement("h5");
	msgTitle.setAttribute("id","msgTitle");
	msgTitle.setAttribute("align","right");
	msgTitle.style.margin = "0px";
	msgTitle.style.padding = "2px";
	msgTitle.style.height = "16px";
	msgTitle.style.fontSize = "12px";
	msgTitle.style.color = "#000";
	msgTitle.style.backgroundColor = "#C2ECA7";

	msgTitle.innerHTML="<div style='cursor:pointer;' onclick='hideMsgBox();'>关闭</div>";


	var msgTxt=document.createElement("div");
	msgTxt.style.width = "100%";
	msgTxt.style.height = "100%";
	msgTxt.style.backgroundColor = "#F0FBEB";
	msgTxt.setAttribute("id","msgTxt");

	/* 根据参数构建HTML代码 */
	var strHTML = "";

	maskDiv.setAttribute('id','maskDiv');
	maskDiv.style.position = "absolute";
	maskDiv.style.top = "0";
	maskDiv.style.left = "0";
	maskDiv.style.height = clientHeight + "px";
	maskDiv.style.width = clientWidth + "px";
	maskDiv.style.background = "#FFF";
	maskDiv.style.zIndex = "100";
	maskDiv.style.filter = "alpha(opacity=50)";

	document.body.appendChild(maskDiv);

	var msgDiv = document.createElement("div");
	msgDiv.setAttribute('id','msgDiv');
	msgDiv.style.height = WIN_HEIGHT + "px";
	msgDiv.style.width = WIN_WIDTH + "px";
	msgDiv.style.position = "absolute";
	msgDiv.style.left = "35%";
    msgDiv.style.top = "35%";
	msgDiv.style.border = "1px solid #9BDF70";
	msgDiv.style.zIndex = "200";

	var msgTitle=document.createElement("h5");
	msgTitle.setAttribute("id","msgTitle");
	msgTitle.setAttribute("align","right");
	msgTitle.style.margin = "0px";
	msgTitle.style.padding = "2px";
	msgTitle.style.height = "16px";
	msgTitle.style.fontSize = "12px";
	msgTitle.style.color = "#000";
	msgTitle.style.backgroundColor = "#C2ECA7";

	msgTitle.innerHTML="<div style='cursor:pointer;' onclick='hideMsgBox();'>关闭</div>";


	var msgTxt=document.createElement("div");
	msgTxt.style.width = "100%";
	msgTxt.style.height = "100%";
	msgTxt.style.backgroundColor = "#F0FBEB";
	msgTxt.setAttribute("id","msgTxt");

	/* 根据参数构建HTML代码 */
	var strHTML = "";


	strHTML += "<div style='padding-left:10px;padding-top:10px;font-size: 14px;'>您确定要" + operation + "【" +  targetName + "】的信息吗？</div>";

	strHTML += "<div style='padding-top:10px;padding-bottom:5px;padding-left:10px;font-size:14px;' id='commentsDiv'><span id='commentsLabel'>" + operation + "原因</span>：<textarea name='comments' id='comments' cols='43' rows='5'></textarea></div>";

	strHTML += "<div style='font-size:12px;float:right;margin-right:15px;' id='commentsTip'>该信息将会以短消息形式发送给相关人员</div>";

	strHTML += "<div style='text-align:center;padding-top:15px;clear:both;'>";

	strHTML += "<input type='button' class='uportal-button' value='确定' onclick='handleWithTextarea(\"确定\");' />";
	strHTML += "&nbsp;";

	strHTML += "<input type='button' class='uportal-button' value='取消' onclick='hideMsgBox();' />";
	strHTML += "&nbsp;";

	strHTML += "</div>";
	/* 根据参数构建HTML代码 */

	msgTxt.innerHTML = strHTML;

	document.body.appendChild(msgDiv);
	document.getElementById("msgDiv").appendChild(msgTitle);
	document.getElementById("msgDiv").appendChild(msgTxt);

}

function handleWithTextarea(flag)
{
	doProcess(flag,document.getElementById("comments").innerText);
}

function showMsgBox(operation,targetName)
{
	var WIN_HEIGHT = 100;
	var WIN_WIDTH = 320;

	var clientWidth = 0, clientHeight = 0;
	if( typeof( window.innerWidth ) == 'number' )
	{
		//非IE浏览器
		clientWidth = window.innerWidth;
		clientHeight = window.innerHeight;
	}
	else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) )
	{
		//IE6或以上版本
		clientWidth = document.documentElement.clientWidth;
		clientHeight = document.documentElement.clientHeight;
	}

	var maskDiv = document.createElement("div");

	maskDiv.setAttribute('id','maskDiv');
	maskDiv.style.position = "absolute";
	maskDiv.style.top = "0";
	maskDiv.style.left = "0";
	maskDiv.style.height = clientHeight + "px";
	maskDiv.style.width = clientWidth + "px";
	maskDiv.style.background = "#FFF";
	maskDiv.style.zIndex = "100";
	maskDiv.style.filter = "alpha(opacity=50)";

	document.body.appendChild(maskDiv);

	var msgDiv = document.createElement("div");
	msgDiv.setAttribute('id','msgDiv');
	msgDiv.style.height = WIN_HEIGHT + "px";
	msgDiv.style.width = WIN_WIDTH + "px";
	msgDiv.style.position = "absolute";
	msgDiv.style.left = "35%";
    msgDiv.style.top = "35%";
	msgDiv.style.border = "1px solid #9BDF70";
	msgDiv.style.zIndex = "200";

	var msgTitle=document.createElement("h5");
	msgTitle.setAttribute("id","msgTitle");
	msgTitle.setAttribute("align","right");
	msgTitle.style.margin = "0px";
	msgTitle.style.padding = "2px";
	msgTitle.style.height = "16px";
	msgTitle.style.fontSize = "12px";
	msgTitle.style.color = "#000";
	msgTitle.style.backgroundColor = "#C2ECA7";

	msgTitle.innerHTML="<div style='cursor:pointer;' onclick='hideMsgBox();'>关闭</div>";


	var msgTxt=document.createElement("div");
	msgTxt.style.width = "100%";
	msgTxt.style.height = "100%";
	msgTxt.style.backgroundColor = "#F0FBEB";
	msgTxt.setAttribute("id","msgTxt");

	/* 根据参数构建HTML代码 */
	var strHTML = "";

	strHTML += "<div style='padding-left:10px;padding-top:10px;font-size: 14px;'>您确定要" + operation + "【" + targetName + "】的信息吗？</div>";

	strHTML += "<div style='text-align:center;padding-top:15px;'>";

	strHTML += "<input type='button' class='uportal-button' value='确定' onclick='doProcess(\"确定\");' />";
	strHTML += "&nbsp;";

	strHTML += "<input type='button' class='uportal-button' value='取消' onclick='hideMsgBox();' />";
	strHTML += "&nbsp;";

	strHTML += "</div>";
	/* 根据参数构建HTML代码 */

	msgTxt.innerHTML = strHTML;

	document.body.appendChild(msgDiv);
	document.getElementById("msgDiv").appendChild(msgTitle);
	document.getElementById("msgDiv").appendChild(msgTxt);

}

//隐藏上边弹出的模态层
function hideMsgBox()
{
	document.getElementById("msgDiv").removeChild(msgTxt);
	document.getElementById("msgDiv").removeChild(msgTitle);
	document.body.removeChild(msgDiv);
	document.body.removeChild(maskDiv);
}

function showMsgBoxChoice(args,targetName)
{
	var WIN_HEIGHT = 240;
	var WIN_WIDTH = 320;

	args = args.split(";");

	var clientWidth = 0, clientHeight = 0;
	if( typeof( window.innerWidth ) == 'number' )
	{
		//非IE浏览器
		clientWidth = window.innerWidth;
		clientHeight = window.innerHeight;
	}
	else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) )
	{
		//IE6或以上版本
		clientWidth = document.documentElement.clientWidth;
		clientHeight = document.documentElement.clientHeight;
	}
	if(clientHeight<document.body.scrollHeight)
	{
		clientHeight = document.body.scrollHeight;
	}


	var maskDiv = document.createElement("div");

	maskDiv.setAttribute('id','maskDiv');
	maskDiv.style.position = "absolute";
	maskDiv.style.top = "0";
	maskDiv.style.left = "0";
	maskDiv.style.height = clientHeight + "px";
	maskDiv.style.width = clientWidth + "px";
	maskDiv.style.background = "#FFF";
	maskDiv.style.zIndex = "100";
	maskDiv.style.filter = "alpha(opacity=50)";

	document.body.appendChild(maskDiv);

	var msgDiv = document.createElement("div");
	msgDiv.setAttribute('id','msgDiv');
	msgDiv.style.height = WIN_HEIGHT + "px";
	msgDiv.style.width = WIN_WIDTH + "px";
	msgDiv.style.position = "absolute";
	msgDiv.style.left = "35%";
    msgDiv.style.top = "40%";
	msgDiv.style.border = "1px solid #9BDF70";
	msgDiv.style.zIndex = "200";

	var msgTitle=document.createElement("h5");
	msgTitle.setAttribute("id","msgTitle");
	msgTitle.style.margin = "0px";
	msgTitle.style.padding = "2px";
	msgTitle.style.height = "16px";
	msgTitle.style.fontSize = "12px";
	msgTitle.style.color = "#000";
	msgTitle.style.backgroundColor = "#C2ECA7";

	msgTitle.innerHTML="<div><span style='float:left;'>" + targetName + "</span><span style='cursor:pointer;float:right' onclick='hideMsgBox();'>关闭</span></div>";


	var msgTxt=document.createElement("div");
	msgTxt.style.width = "100%";
	msgTxt.style.height = "100%";
	msgTxt.style.backgroundColor = "#F0FBEB";
	msgTxt.setAttribute("id","msgTxt");

	/* 根据参数构建HTML代码 */
	var strHTML = "";

	strHTML += "<fieldset style='margin-left:5px;margin-right:5px;margin-top:5px;height:175px;'>";
	strHTML += "<legend style='font-size:14px;color:#000;'>";
	strHTML += "请选择您要进行的操作";
	strHTML += "</legend>";

	strHTML += "<div style='padding-left:10px;padding-top:10px;font-size: 14px;'>";
	for(var i=0;i<args.length;i++)
	{

		strHTML += "<input type='radio' name='operationType' id='operationType" + i + "' value='" + args[i].split(",")[0] + "' "
		if(args[i].split(",")[1]!=undefined)
		{
			strHTML += "onclick='showComments(\"" + args[i].split(",")[1] + "\");'";
		}
		else
		{
			strHTML += "onclick='hideComments();'";
		}
		strHTML += "/>";
		strHTML += "<label for='operationType" + i + "'>"
		strHTML += args[i].split(",")[0];
		strHTML += "</label>";
		strHTML += "&nbsp;";
	}
	strHTML += "</div>";

	strHTML += "<div style='padding-top:10px;padding-bottom:5px;padding-left:10px;font-size:14px;display:none;' id='commentsDiv'><span id='commentsLabel'>备注</span>：<textarea name='comments' id='comments' cols='43' rows='5'></textarea></div>";

	strHTML += "<div style='font-size:12px;float:right;margin-right:5px;display:none;' id='commentsTip'>该信息将会以短消息形式发送给相关人员</div>";

	strHTML += "</fieldset>";

	strHTML += "<div style='text-align:center;padding-top:15px;'>";

	strHTML += "<input type='button' class='uportal-button' value='确定' onclick='handle();' />";
	strHTML += "&nbsp;";

	strHTML += "<input type='button' class='uportal-button' value='取消' onclick='hideMsgBox();' />";
	strHTML += "&nbsp;";

	strHTML += "</div>";
	/* 根据参数构建HTML代码 */

	msgTxt.innerHTML = strHTML;

	document.body.appendChild(msgDiv);
	document.getElementById("msgDiv").appendChild(msgTitle);
	document.getElementById("msgDiv").appendChild(msgTxt);
}

function showComments(label)
{
	document.getElementById("commentsLabel").innerText = label;
	document.getElementById("commentsDiv").style.display = "";
	document.getElementById("commentsTip").style.display = "";
}

function hideComments()
{
	document.getElementById("commentsDiv").style.display = "none";
	document.getElementById("commentsTip").style.display = "none";
}


function handle()
{
	var radios = document.getElementsByName("operationType");
	var flag;

	for(var i=0;i<radios.length;i++)
	{
		if(radios[i].checked==1)
		{
			flag = radios[i].value;
			break;
		}
	}
	doProcess(flag,document.getElementById("comments").innerText);
}

/*
==================================================================
功能：检测邮政编码
提示信息：
使用：
返回：
==================================================================
*/
function isPostNum(obj) {
    if (isEmptyUtil(obj)) {
        return true;
    }
    var reg = /^[0-9]\d{5}(?!\d)$/;
    if (!obj.value.match(reg)) {
        alert('请输入正确的邮政编码（邮政编码应为6位数字）！');
        obj.focus();
        return false;
    }
    return true;
}

/*
==================================================================
功能：检测E-Mail地址
提示信息：
使用：
返回：
==================================================================
*/
function isEmail(_theStr) {
    if (isEmptyUtil(_theStr)) {
        return true;
    }
    var theStr = _theStr.value;
    var reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    if (!theStr.match(reg)) {
        alert("输入E-Mail地址格式有误！");
        return false;
    }
    return true;
}

/*
==================================================================
功能：检测实数,不对外（需要测试！）
提示信息：
使用：
返回：
==================================================================
*/
function isReal(_theStr, decLen, intLen) {
    if (isEmptyUtil(_theStr)) {
        return true;
    }

    var theStr = _theStr.value;
	//如果用户输入的是-0或者-0.0或者0.0之类的数字
	if (theStr === '-0') {
		alert("请输入正确的数字！");
        return false;
	}
	//如果包含“-”
    if (theStr.indexOf("-") == 0) {
		theStr = theStr.substring(1, theStr.length);
	}
	//获取到第一个小数点位置
    var dot1st = theStr.indexOf(".");
	//获取到最后一个小数点位置
    var dot2nd = theStr.lastIndexOf(".");

	//如果两个数字不相同，说明输入的数据中有多个小数点
	if(dot1st != dot2nd) {
		alert("请输入正确的数字！");
        return false;
	}
	//如果第一个小数点在第一位
	else if (dot1st == 0) {
        alert("请输入正确的数字！");
        return false;
    }
	
	//如果没有传整数位长度，则默认整数位为10位
	if (intLen == null) {
		intLen = 10;
	}
    var OK = true;

    //如果不包含小数点
    if (dot1st == -1) {
		//判断是不是
        if (!isInt(theStr)) {
            alert("请输入正确的数字！");
            return false;
        } else if (theStr.length > intLen) {
            alert("整数位太长，最大允许输入" + intLen + "位！");
            return false;
        } 
    }
	//如果包含小数点
	else {
		//获取整数部分
        var intPart = theStr.substring(0, dot1st);
		//获取小数部分
        var decPart = theStr.substring(dot2nd + 1);
		//检测整数部分和小数部分是否合法
		if (!isInt(intPart) || !isDecimal(decPart)) {
            alert("请输入正确的数字！");
            return false;
        }
		else if (intPart.length > intLen) {
            alert("整数位太长，最大允许输入" + intLen + "位！");
            return false;
        }
		else if (decPart.length > decLen) {
            alert("小数位太长，最大允许输入" + decLen + "位！");
            return false;
        }
    }

	return true;
}

/*
==================================================================
功能：检测小数部分是否合法（不对外）
==================================================================
*/
function isDecimal(num){
    var reg = /^[0-9]+$/;
    if (!num.match(reg)) {
        return false;
    }
	return true;
}


/*
==================================================================
功能：检测正实数,小数位为n位,整数位为m位
提示信息：请输入正确的数字！
使用：
返回：
==================================================================
*/
function CheckReal(obj, n, m) {
    if (!g_Obj) {
		if(Sys.ie){
			g_Obj = getEvent().srcElement;
		}else {
			g_Obj = getEvent().target;
		}
	}
    else if (g_Obj != obj) {
        g_Obj = null;
        return true;
    }
	
	if (isEmptyUtil(obj)) {
		g_Obj = null;
        return true;
    }
    
    if (obj.value.indexOf("-") == 0) {
        alert("整数部分请输入正整数或者0！");
        g_Obj.focus();
        return false;
    } else if (!isReal(obj, n, m)) {
        g_Obj.focus();
        return false;
    } else {
        g_Obj = null;
        return true;
    }
}

/*
==================================================================
功能：取一个域的长度(考虑单双字节混合的情况)
提示信息：
使用：
返回：int
==================================================================
*/
function getLength(obj) {
    var j = 0;
    var num = obj.value;
    if (num == "") return 0;
    for (i=0;i<obj.value.length;i++) {
		/[^ -~]/.test(obj.value.charAt(i))?j+=2:j++;
    }
    return j;
}

/*
==================================================================
功能：检查最少长度
提示信息：请输入至少"+n+"位的字符！
使用：
返回：bool
==================================================================
*/
function ChkMinLength(obj, n) {
	if (isEmptyUtil(obj)) {
        return true;
    }
    var num = obj.value;    
    if (getLength(obj) < n) {
        alert("请输入至少" + n + "位的字符！");
        return false;
    } else {
        return true;
    }
}


/*
==================================================================
功能：检查最大长度(考虑单双字节混合的情况)
提示信息：请输入不超过"+n+"位的字符(一个汉字按两个字符算)！
使用：
返回：bool
==================================================================
*/
function ChkMaxLength(obj, n) {
    if (!g_Obj) {
		if(Sys.ie){
			g_Obj = getEvent().srcElement;
		}else {
			g_Obj = getEvent().target;
		}
	}
    else if (g_Obj != obj) {
        g_Obj = null;
        return true;
    }
	
	if (isEmptyUtil(obj)) {
		g_Obj = null;
        return true;
    }

    var num = obj.value;
    if (getLength(obj) > n) {
        alert("请输入不超过" + n + "个的字符（一个汉字按两个字符算）！");
        g_Obj.focus();
        return false;
    } else {
        g_Obj = null;
        return true;
    }
}

/*
==================================================================
功能：检查长度范围
提示信息：输入信息的长度应在"+minLength+"~"+maxLength+"位之间！
使用：
返回：bool
==================================================================
*/
function ChkMaxLengthIn(obj, minLength, maxLength) {
	if (isEmptyUtil(obj)) {
		g_Obj = null;
        return true;
    }
   var num = obj.value;
    if (getLength(obj) > maxLength || getLength(obj) < minLength) {
        alert("请输入长度在" + minLength + "~" + maxLength + "位之间的字符（一个汉字按两个字符算）！");
        obj.focus();
        return false;
    } else {
        return true;
    }
}

//设置下拉框颜色
function setSelectBGColor(obj, bgColor, color){
	if (obj){
		obj.style.backgroundColor = bgColor;
		obj.style.color = color;
	}
}
//---------------------------检测域值是否为空----------------------------------//
//用例：flag=CheckNull('thisform.f1','thisform.f2',...)
/*
==================================================================
功能：检测域值是否为空(通常在表单提交时用来检查)
提示信息：总共有"+num+"个必填项内容不能为空!!!
使用：onsubmit="CheckNull('thisform.f1','thisform.f2',...)"
返回：bool
==================================================================
*/
function CheckNull(inputNames) {
	var n = inputNames.length;
	var obj, objtemp;
	var flag = true;
	for (i = 0; i < n; i++) {
		obj = eval(inputNames[i]);
		var error = obj.previousSibling;
		if (obj) {
			if (!isNaN(obj.length) && obj.length > 0) {
				// 针对单选、复选验证必填
				if (obj[0].tagName == 'INPUT'
						&& (obj[0].type == 'radio' || obj[0].type == 'checkbox')) {
					var isChecked = false;
					for (var j = 0; j < obj.length; j++) {
						if (obj[j].checked) {
							isChecked = true;
							break;
						}
					}
					// 如果选中修改边框为正常
					if (isChecked) {
						/*
						 * for (var j = 0; j < obj.length; j++) {
						 * obj[j].style.border = "none"; }
						 */
						obj[0].parentNode.style.border = "1px solid white";
						if (error && error.id=="nullMassage") {
							error.parentNode.removeChild(error);
						}
					}
					// 如果没选中则把边框变为红色
					else {
						/*
						 * for (var j = 0; j < obj.length; j++) {
						 * obj[j].style.border = "1px solid #e50000"; flag =
						 * false; }
						 */
						// 如果单选按钮和复选框的判空边框变红有异常，请检查页s面上单选按钮和复选框是否存在单独的父元素
						obj[0].parentNode.style.border = "1px solid #e50000";
						if (flag) {
							objtemp = obj;
						}
						flag = false;
						if (!error || (error && error.id != "nullMassage")) {
							var massageObj = document.createElement("div");
							massageObj
									.setAttribute("id","nullMassage");
							massageObj.innerHTML = "内容不能为空";
							massageObj.style.color = "red";
							obj.parentNode.insertBefore(massageObj, obj[0]);
						}

					}
				} else if (obj.tagName == 'SELECT') {
					if (obj.value == "") {
						// obj.style.color = "black";
						// obj.style.backgroundColor = "red";
						obj.style.border = "1px solid #e50000";
						if (flag) {
							objtemp = obj;
						}
						flag = false;
						if (!error || (error && error.id != "nullMassage")) {
							var massageObj = document.createElement("div");
							massageObj
									.setAttribute("id","nullMassage");
							massageObj.innerHTML = "内容不能为空";
							massageObj.style.color = "red";
							obj.parentNode.insertBefore(massageObj, obj);
						}

					} else {
						if (error && error.id == "nullMassage") {
							error.parentNode.removeChild(error);
						}
						obj.style.color = "black";
						obj.style.border = "1px solid #99a6b6";
					}
				}
			} else {
				try {
					obj.value = obj.value.trim();
				} catch (e) {
				}
				if (!obj.value) {
					obj.style.color = "black";
					obj.style.border = "1px solid #e50000";
					if (!error || (error && error.id != "nullMassage")) {
						var massageObj = document.createElement("div");
						massageObj.setAttribute("id","nullMassage");
						massageObj.innerHTML = "内容不能为空";
						massageObj.style.color = "red";
						obj.parentNode.insertBefore(massageObj, obj);
					}
					if (flag) { 
						objtemp = obj;
						flag = false;
					}
				} else {
					if(error && error.id=="nullMassage"){
						error.parentNode.removeChild(error);
						obj.style.color = "black";
				        obj.style.border = "1px solid #cccccc";
					}
					obj.style.color = "black";
					obj.style.border = "1px solid #cccccc";
				}
			}

		}

	}
	return flag;
}

//校验下拉选的非空
function CheckSelectNull(obj){
	var parent = obj.parentNode;
	//清空错误信息，重新校验
	var error = obj.previousSibling;
	if(error && error.id=="nullMassage"){
		parent.removeChild(error);
		obj.style.color = "black";
        obj.style.border = "1px solid #cccccc";
	}
	var value = obj.value;
	if(value==""){
		var massageObj=document.createElement("div");
		massageObj.setAttribute("id","nullMassage");
		massageObj.innerHTML="内容不能为空";
		massageObj.style.color= "red";
		parent.insertBefore(massageObj,obj);
		obj.style.color = "black";
        obj.style.border = "1px solid #e50000";

	}

}

// 是否通过验证
function CheckedError() {
	var errorMassages = document.getElementById('errorMassage');
	var nullMassages = document.getElementById('nullMassage');
	if(nullMassages || errorMassages){
		return false;
	}
    return true;
}
//保存草稿检验方法
function SaveCheckedError(inputNames) {
	for(var i=0;i<inputNames.length;i++){
		obj = eval(inputNames[i]);
		var error = obj.previousSibling;
		if(error && (error.id=="errorMassage" || error.id=="nullMassage")){
			return false;
		}
	}
	var errorMassage = document.getElementById('errorMassage');
	if(errorMassage){
		return false;
	}
	return true;
}

//-----------检测小数(百分数%)------------------------------------------------//
function isDot(_theStr, n) {
	if (isEmptyUtil(_theStr)) {
        return true;
    }
    var theStr = _theStr.value;
    if (ChkReal(_theStr, n)) {
        if (eval(theStr) <= 100) {
            return true;
        } else {
            alert("数字要小于或等于100！");
            return false;
        }
    } else {
        return false;
    }
}

/*
==================================================================
功能：去掉字符串的前后空格
提示信息：该字段不能为空！
使用：
返回：String
==================================================================
*/

String.prototype.trim = function() { //去左右空格
    return this.replace(/(^\s*)|(\s*$)/g, "");
}

//将YYYYMMDDHHMMSS转化成YYYY-MM-DD
function FormatDate(str) {
    if (isEmptyUtil(str)) {
        return "";
    } else {
        return str.substring(0, 4) + "-" + str.substring(4, 6) + "-" + str.substring(6, 8);
    }
}

//校验下拉选的非空
function CheckSelectNull(obj){
	var parent = obj.parentNode;
	//清空错误信息，重新校验
	var error = obj.previousSibling;
	if(error && error.id=="nullMassage"){
		parent.removeChild(error);
		obj.style.color = "black";
        obj.style.border = "1px solid #cccccc";
	}
	var value = obj.value;
	if(value==""){
		var massageObj=document.createElement("div");
		massageObj.setAttribute("id","nullMassage");
		massageObj.innerHTML="内容不能为空";
		massageObj.style.color= "red";
		parent.insertBefore(massageObj,obj);
		obj.style.color = "black";
        obj.style.border = "1px solid #e50000";
	}

}
/*
==================================================================
功能：检测实数,小数位为n位,整数位为m位
提示信息：请输入正确的数字！
使用：
返回：
==================================================================
*/
function ChkReal(obj, n, m) {
    if (!g_Obj) {
		if(Sys.ie){
			g_Obj = getEvent().srcElement;
		}else {
			g_Obj = getEvent().target;
		}
	}
    else if (g_Obj != obj) {
        g_Obj = null;
        return true;
    }

    if (isEmptyUtil(obj)) {
		g_Obj = null;
        return true;
    }

    if (!isReal(obj, n, m)) {
        g_Obj.focus();
        return false;
    } else {
        if (parseFloat(obj.value) > 9999999999.99) {
            alert("整数位太长，最大允许输入10位！");
            g_Obj.focus();
            return false;
        } else {
            g_Obj = null;
            return true;
        }
    }
}
/**
 * 长度校验 obj:输入框元素 length:最大长度,falg:是否非空验证 true，验证
 */
function checkLength(obj,length,falg){
	var parent = obj.parentNode;
	//清空错误信息，重新校验
	var error = obj.previousSibling;
	if(error && (error.id=="errorMassage" || error.id=="nullMassage")){
		obj.parentNode.removeChild(error);
		obj.style.color = "black";
        obj.style.border = "1px solid #cccccc";
	}
	var value = obj.value;
	if(falg && value==""){
		var massageObj=document.createElement("div");
		massageObj.setAttribute("id","nullMassage");
		massageObj.innerHTML="内容不能为空";
		massageObj.style.color= "red";
		parent.insertBefore(massageObj,obj);
		obj.style.color = "black";
        obj.style.border = "1px solid #e50000";
	}else if(value.length >length){
		var massageObj=document.createElement("div");
		massageObj.setAttribute("id","errorMassage");
		massageObj.innerHTML="输入的内容不能超过"+length+"个字符！";
		massageObj.style.color= "red";
		parent.insertBefore(massageObj,obj);
		obj.style.color = "black";
        obj.style.border = "1px solid #e50000";
	} 
}

//-----------检测小数(百分数%)------------------------------------------------//
function isDot(_theStr, n) {
	if (isEmptyUtil(_theStr)) {
        return true;
    }
    var theStr = _theStr.value;
    if (ChkReal(_theStr, n)) {
        if (eval(theStr) <= 100) {
            return true;
        } else {
            alert("数字要小于或等于100！");
            return false;
        }
    } else {
        return false;
    }

}


/**
 * 格式化小数，m为要格式化的小数，n为保留的小数位数。（带四舍五入功能）
 */
function myround(m, n) {
    //return Math.round(m * Math.pow(10, n)) / Math.pow(10, n);
	return formatNum(m, n);
}

/*
==================================================================
功能：去掉字符串的前后空格
提示信息：该字段不能为空！
使用：
返回：String
==================================================================
*/



/*
==================================================================
功能：打印
使用：Print()
返回：
==================================================================
*/
function Print() {
    document.all.print.style.display = "none";
    window.print();
    window.close();
}
String.prototype.trim = function() { //去左右空格
    return this.replace(/(^\s*)|(\s*$)/g, "");
}

//将YYYYMMDDHHMMSS转化成YYYY-MM-DD HH-MM-SS
function FormatDateTime(str) {
    if (isEmptyUtil(str)) {
        return "";
    } else {
        return str.substring(0, 4) + "-" + str.substring(4, 6) + "-" + str.substring(6, 8) + " " + str.substring(8, 10) + ":" + str.substring(10, 12) + ":" + str.substring(12, 14);
    }
}

/**
 * 格式化小数，m为要格式化的小数，n为保留的小数位数。（带四舍五入功能）
 */
function myround(m, n) {
    //return Math.round(m * Math.pow(10, n)) / Math.pow(10, n);
	return formatNum(m, n);

}


/*
==================================================================
功能：精确验证身份证号码是否有效
提示信息：您输入的身份证号不正确！
使用：isIDno(obj)
返回：bool
==================================================================
*/
function isIDno(obj) {
	if (isEmptyUtil(obj)) {
        return true;
    }
    var show = true;
    var ShowMsg = "您输入的身份证号不正确！";

    //aCity={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"};
    var aCity = "11,12,13,14,15,21,22,23,31,32,33,34,35,36,37,41,42,43,44,45,46,50,51,52,53,54,61,62,63,64,65,71,81,82,91"

    var iSum = 0;
    var info = "";
    var idCardLength = obj.value.length;

    if (!/^\d{17}(\d|x)$/i.test(obj.value) && !/^\d{15}$/i.test(obj.value)) {
        if (show) {
			alert(ShowMsg);
		}
        obj.focus();
        return false;
    }

    //在后面的运算中x相当于数字10,所以转换成a
	var idStr = obj.value.replace(/x$/i, "a");
    //obj.value = obj.value.replace(/x$/i, "a");

    var curCity = idStr.substr(0, 2);

    if (! (aCity.indexOf(curCity) > 0)) {
        if (show) {
			alert(ShowMsg);
		}
        obj.focus();
        obj.select();
        return false;
    }


    if (idCardLength == 18) {
        sBirthday = idStr.substr(6, 4) + "-" + Number(idStr.substr(10, 2)) + "-" + Number(idStr.substr(12, 2));
        var d = new Date(sBirthday.replace(/-/g, "/"));
		if (sBirthday != (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate())) {
            if (show) {
				alert(ShowMsg);
			}
            obj.focus();
            return false;
        }

        for (var i = 17; i >= 0; i--) {
			iSum += (Math.pow(2, i) % 11) * parseInt(idStr.charAt(17 - i), 11);
		}

        if (iSum % 11 != 1) {
            if (show) alert(ShowMsg);
            obj.focus();
            return false;
        }

    } else if (idCardLength == 15) {
        sBirthday = "19" + idStr.substr(6, 2) + "-" + Number(idStr.substr(8, 2)) + "-" + Number(idStr.substr(10, 2));
        var d = new Date(sBirthday.replace(/-/g, "/"));
		var dd = d.getFullYear().toString() + "-" + (d.getMonth() + 1) + "-" + d.getDate();

        if (sBirthday != dd) {
            if (show) alert(ShowMsg);
            obj.focus();
            return false;
        }
    }
    return true;
}


/*
auther:zyp
target:检查18位身份证号

function isIdentify(_theStr) {
    try {
        var str = _theStr.value;
        if (str.length == 0) return true;
        var reg;
        if (str.length == 15) reg = /^\d{15}$/; //15位
        else reg = /^\d{17}(?:\d|x)$/; //18位
        if (!reg.test(str)) {
            alert('身份证号有误，请检查您的身份证号！');
            return false;
        }
        return true;
    } catch(ex) {
        alert('have error' + ex.ErrorMessage);
    }
}*/

/*
==================================================================
功能：将Html页面中的指定表格打印到excel中
提示信息：未输入或输入身份证号不正确！
使用：<input type="button" name="aa" value="倒入到Excel中察看" onclick="htmlTableToExcel('table1')" >
返回：
==================================================================
*/

function htmlTableToExcel(htmlTableID) {
    window.clipboardData.setData("Text", document.all(htmlTableID).outerHTML);
    try {
        var ExApp = new ActiveXObject("Excel.Application");
        var ExWBk = ExApp.workbooks.add();
        var ExWSh = ExWBk.worksheets(1);
        ExApp.DisplayAlerts = false;
        ExApp.visible = true;
    } catch(e) {
        alert("您的电脑没有安装Microsoft Excel软件！");
        return false;
    }
    ExWBk.worksheets(1).Paste;
}


/*
==================================================================
功能：根据parentChkBox的选中状态处理chkboxArray的选中状态
提示信息：
使用：
返回：
==================================================================
*/
function ChangeCheckBox(parentChkBox, chkboxArray) {
	var checkFlag = parentChkBox.checked;
    for (var i = 0; i < chkboxArray.length; i++) {
		chkboxArray[i].checked = checkFlag;
    }
}

//================================
//Cookie操作
//================================

//function getCookie(name) {
//    var arg = name + "=";
//    var alen = arg.length;
//    var clen = document.cookie.length;
//    var i = 0;
//    while (i < clen) {
//        var j = i + alen;
//        if (document.cookie.substring(i, j) == arg) return getCookieVal(j);
//        i = document.cookie.indexOf(" ", i) + 1;
//        if (i == 0) break;
//    }
//    return null;
//}
//
//function deleteCookie(cname) {
//
//    var expdate = new Date();
//    expdate.setTime(expdate.getTime() - (24 * 60 * 60 * 1000 * 369));
//
//    // document.cookie =" ckValue="ok"; expires="+ expdate.toGMTString();
//    setCookie(cname, "", expdate);
//
//}
//
//function setCookie(name, value, expires) {
//    t_cookie = name + "=" + escape(value);
//    if (expires != null) {
//        t_cookie = t_cookie + "; expires=" + expires.toGMTString();
//    }
//    document.cookie = t_cookie;
//}

//添加cookie值
function setCookie (name, value) {  
	document.cookie = name + "=" + escape(value); 
} 
 
//根据cookie名，取得cookie值 
function getCookie(name) {   
  var search;  
  search = name + "=" 
  offset = document.cookie.indexOf(search) 
  if (offset != -1) { 
    offset += search.length ; 
    end = document.cookie.indexOf(";", offset) ; 
    if (end == -1) 
      end = document.cookie.length; 
    return unescape(document.cookie.substring(offset, end)); 
  } 
  else 
    return ""; 
} 

//删除某一cookie 
function deleteCookie(name) {
  var Days = 30; //此 cookie 将被保存 30 天
  var expdate = new Date(); 
  expdate.setTime(expdate.getTime() - (Days*24*60*60*1000)); 
  setCookie(name, "", expdate); 
} 


/**
* 在调用confirm作对话询问时使焦点默认在false上面
*/
function confirm(str, isYes) {
    var b = 36;
    if (!isYes) {
        b = 289;
    }
    str = str.replace(/\'/g, "'&chr(39)&'").replace(/\r\n|\n|\r/g, "'&VBCrLf&'");
    execScript("n = msgbox('" + str + "'," + b + ", '信息提示')", "vbscript");
    if (b == 289) {
        return (n == 1);
    } else {
        return (n == 6);
    }
}

/**
 * 判断当前对象是不是数组，是的话返回true，否则返回false
 */
function isArray(array){
	if (array instanceof Array
		|| (!(array instanceof Object) 
		&& (Object.prototype.toString.call((array)) == '[object Array]')
		|| typeof array.length == 'number'
		&& typeof array.splice != 'undefined'
		&& typeof array.propertyIsEnumerable != 'undefined'
		&& !array.propertyIsEnumerable('splice'))) 
	{
			return true;
	}
	return false;
}

//给属性id为table的表格添加1行，obj为string类型的html标签数组
function addRow(table, obj) {
        if (table != null && table != 'undefined') {
            var theNewRow = table.insertRow(table.rows.length);
            //如果obj是个数组
            if (isArray(obj)) {
                var newtd = null;
                for (var i = 0; i < obj.length; i++) {
                    newtd = theNewRow.insertCell();
                    newtd.innerHTML = obj[i];
                }
            } else {
                var newtd = theNewRow.insertCell();
                newtd.innerHTML = obj;
            }
        }
    
}

/*
==================================================================
功能：判断invalue是否为电话号码     如果条件成立层显示
使用：onkeyup="checkPhone(form1.t1.value,form1.t1)
==================================================================
*/
function isPhone(invalue, intype) {
    var str = invalue;
    var reg = /(^[0-9]{3,4}-[0-9]{3,8}$)|(^[0-9]{3,8}$)|(^([0-9]{3,4})-[0-9]{3,8}$)|(^0{0,1}13[0-9]{9}$)/
    if (!reg.test(str)) {
        return false;
    } else {
        return true;
    }
}


/*
==================================================================
功能：判断invalue的是否为汉字                           经过测试，只要包含汉字该方法就可以验证通过
使用：onmouseout="hideDiv('divid','divid',...)"
返回：bool
==================================================================
*/
function isChinese(invalue) {
	if (isEmptyUtil(invalue)) {
        return true;
    }

	var reg=/^[u0391-uffe5]+$/; 

	var value = invalue.value;
    if ((value.match(/[\u4E00-\u9FA5]/) == null)) {
        alert("请输入纯汉字！");
		invalue.focus();
		return false;
    }
    return true;
}

//需要一个java数据结构中的map类型，扩展js实现map
//=============================begin map 定义================================
function Map() {
    /** 存放键的数组(遍历用到) */
    this.keys = new Array();
    /** 存放数据 */
    this.data = new Object();

    /**  
     * 放入一个键值对  
     * @param {String} key  
     * @param {Object} value  
     */
    this.put = function(key, value) {
        if (this.data[key] == null) {
            this.keys.push(key);
        }
        this.data[key] = value;
    };

    /**  
     * 获取某键对应的值  
     * @param {String} key  
     * @return {Object} value  
     */
    this.get = function(key) {
        return this.data[key];
    };

    /**  
     * 删除一个键值对  
     * @param {String} key  
     */
    this.remove = function(key) {
        this.keys.remove(key);
        this.data[key] = null;
    };

    /**  
     * 遍历Map,执行处理函数  
     *   
     * @param {Function} 回调函数 function(key,value,index){..}  
     */
    this.each = function(fn) {
        if (typeof fn != 'function') {
            return;
        }
        var len = this.keys.length;
        for (var i = 0; i < len; i++) {
            var k = this.keys[i];
            fn(k, this.data[k], i);
        }
    };

    /**  
     * 获取键值数组(类似Java的entrySet())  
     * @return 键值对象{key,value}的数组  
     */
    this.entrys = function() {
        var len = this.keys.length;
        var entrys = new Array(len);
        for (var i = 0; i < len; i++) {
            entrys[i] = {
                key: this.keys[i],
                value: this.data[i]
            };
        }
        return entrys;
    };

    /**  
     * 判断Map是否为空  
     */
    this.isEmpty = function() {
        return this.keys.length == 0;
    };

    /**  
     * 获取键值对数量  
     */
    this.size = function() {
        return this.keys.length;
    };

    /**  
     * 重写toString   
     */
    this.toString = function() {
        var s = "{";
        for (var i = 0; i < this.keys.length; i++, s += ',') {
            var k = this.keys[i];
            s += k + "=" + this.data[k];
        }
        s += "}";
        return s;
    };
}

function isNumber(Obj){
	var theNumber=Obj.value;
	if(-1==theNumber.indexOf("."))
	{
		return isInt(theNumber);
	}
	if(Obj.value.substring(0,1)==".")
	{
		return false;
	}
	return isInt(theNumber.substring(0,theNumber.indexOf(".")))&&isInt(theNumber.substring(theNumber.indexOf(".")+1,theNumber.length));
}

Array.prototype.remove = function(s) {
    for (var i = 0; i < this.length; i++) {
        if (s == this[i]) {
			this.splice(i, 1);
		}
    }
}

/*****************普通弹出窗口居中显示begin*****************/
function show_winOpenString(width, height) {
    var resizable = "yes";
    var scrollbars = "yes";
    var status = "no";
    var left = (window.screen.width - width) / 2;
    var top = (window.screen.height - height) / 2;
    return 'width=' + width + ',height=' + height + ',scrollbars=' + scrollbars + ',resizable=' + resizable + ',status=' + status + ',left=' + left + ',top=' + top + '';
}

/***********************模态弹出窗口************************/
function show_modalDialogString(width, height) {
    var center = 'yes';
    var resizable = 'no';
    var scroll = 'no';
    var status = 'no';
    var help = 'no';
    var left = (window.screen.width - width) / 2;
    var top = (window.screen.height - height) / 2;
    return 'dialogWidth:' + width + 'px;dialogHeight:' + height + 'px;scroll:' + scroll + ';status:' + status + ';help=' + help + ';dialogLeft:' + left + 'px;dialogTop:' + top + 'px';
}
/*****************弹出窗口居中显示end*****************/

/*
==================================================================
功能：检查上传附件的类型
使用：
返回：bool
==================================================================
*/
function checkFileType(file,fileType) {
    if (file.value.trim() != "") {
        var executeFileTypeArray = fileType.split(",")
        //将上传的文件名称用"."分隔
        var arrayUploadFile = file.value.split("\.");
        //得到上传文件扩展名
        var uploadFileType = arrayUploadFile[arrayUploadFile.length - 1];
        var flag = false;
        for (var i = 0; i < executeFileTypeArray.length; i++) {
            if (uploadFileType == executeFileTypeArray[i]) {
                executeFlag = true;
                break;
            }
        }
        if (!executeFlag) {
            alert("对不起，上传的文件格式不符合要求！");
            file.value = '';
            file.outerHTML = file.outerHTML;
            return false;
        }
        return true;
    }else{
    	return true;
    }
}

//清除所选的附件
function clearFile(_file) {
    if (_file.files) {
        _file.value = "";
    } else {
        if (typeof _file != "object") {
            return null;
        }
        var _span = document.createElement("span");
        _span.id = "__tt__";
        _file.parentNode.insertBefore(_span, _file);
        var tf = document.createElement("form");
        tf.appendChild(_file);
        document.getElementsByTagName("body")[0].appendChild(tf);
        tf.reset();
        _span.parentNode.insertBefore(_file, _span);
        _span.parentNode.removeChild(_span);
        _span = null;
        tf.parentNode.removeChild(tf);
    }
}

/**********************************提供精确的乘法并返回结果*********************************/
function accMul(arg1, arg2) {
    var m = 0,
    s1 = arg1.toString().trim(),
    s2 = arg2.toString().trim();
    try {
        m += s1.split(".")[1].length;
    } catch(e) {}
	
    try {
        m += s2.split(".")[1].length
    } catch(e) {}
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
}

/**********************************提供精确的加法并返回结果*********************************/
function accAdd(arg1, arg2) {
    var r1, r2, m, c;
    try {
        r1 = arg1.toString().trim().split(".")[1].length
    } catch(e) {
        r1 = 0
    }
    try {
        r2 = arg2.toString().trim().split(".")[1].length
    } catch(e) {
        r2 = 0
    }

    c = Math.abs(r1 - r2);
    m = Math.pow(10, Math.max(r1, r2));
	if (c > 0) {
        var cm = Math.pow(10, c);
        if (r1 > r2) {
            arg1 = Number(arg1.toString().replace(".", ""));
            arg2 = Number(arg2.toString().replace(".", "")) * cm;
        } else {
            arg1 = Number(arg1.toString().replace(".", "")) * cm;
            arg2 = Number(arg2.toString().replace(".", ""));
        }
    } else {
        arg1 = Number(arg1.toString().replace(".", ""));
        arg2 = Number(arg2.toString().replace(".", ""));
    }
    return (arg1 + arg2) / m;
}

/******************格式化小数，num为需要格式化的小数，median为要保留的小数位*****************/
function formatNum(num, median) {
	if(num==null||num==''){ 
		return '';
	}
    num = new Number(parseFloat(num));
    return num.toFixed(median);
}
//获取对象的位置
function setPosition(obj){
	var posX = obj.offsetLeft;
	var posY = obj.offsetTop;
	do {
	
		obj = obj.offsetParent;
		if(obj.tagName == "HTML")break;
		posX += obj.offsetLeft;
		
		posY += obj.offsetTop;
	} while( obj.tagName != "BODY" ||obj.tagName != "HTML" );
	//如果不加px后缀，firefox不识别
	//document.forms[0].emPhoto.style.top=posY-82 + "px";
	//document.forms[0].emPhoto.style.left=posX -6 + "px";
	var offsetObj={};
	offsetObj.top=posY;
	offsetObj.left=posX;
	return offsetObj;
}



/*
==================================================================
功能：上传图片（带预览功能）
==================================================================
*/
//清除照片
function clearPersonPicture(obj)
{
	var name = obj.name;
	var photoDivName = "newPreview";
	var picpreview=document.getElementById(photoDivName);
	picpreview.innerHTML='';
	picpreview.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src ='/media/default/images/nophoto.jpg';
	document.forms[0].devicePhotoFile.value="";
	document.forms[0].devicePhoto.value="";
	document.forms[0].devicePhotoFile.outerHTML=document.forms[0].devicePhotoFile.outerHTML;
	document.forms[0].isPicture.value="yes";
}

// 获取本地上传的照片路径   
function getFullPath(obj) {   
	 if (obj) {    
		 obj.select();   
		 // IE下取得图片的本地路径   
		 return document.selection.createRange().text; 
	 }   
}

//验证图片大小尺寸
function  checkTypeAndSize(fileObj){
	var fileObjValue=fileObj.value;
	var fileExt=fileObjValue.substr(fileObjValue.lastIndexOf(".")+1);
	if(fileExt.toLowerCase()!="gif" && fileExt.toLowerCase()!="jpg" && fileExt.toLowerCase()!="png" 
			&& fileExt.toLowerCase()!="jpeg" && fileExt.toLowerCase()!="bmp" ){
		alert("请选择jpg/gif/png/jpeg/bmp格式的图片！");
		fileObj.outerHTML=fileObj.outerHTML;
		previewPhoto(null);
		return false;
	}
	var image=new Image();
	image.src=fileObjValue;
	if(image.readystate!="complted"){
		if(image.width==0&&image.height==0){
			if(!checkPhotoSize(fileObj)){
				return false;
			}
		}
		previewPhoto(fileObj);
	}
}
//检测照片大小
 function checkPhotoSize(imgFile){
	 var photoDivName = "checkPhotoDiv";
	  var picsrc=getFullPath(imgFile);  
	  var tempDiv=document.getElementById(photoDivName);
		 tempDiv.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=image);";
		 tempDiv.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = picsrc;
	  return true;
 }
//预览照片   
function previewPhoto(imgFile){ 
	var name = imgFile.name;
	var photoDivName = "newPreview";
   var picpreview=document.getElementById(photoDivName);
 	if(imgFile){
		var picsrc=getFullPath(imgFile);   
		
		picpreview.innerHTML='';
		   picpreview.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = picsrc;
		document.forms[0].isPicture.value="";
	}
	else{
		picpreview.innerHTML='';
		   picpreview.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src ='/media/default/images/nophoto.jpg';
	   document.forms[0].isPicture.value="yes";
	}
}

/*
==================================================================
功能：检测错误,并做显示处理(只针对下拉框)
提示信息：
使用：onblur="ChkSelectError(false,this)"
返回：
==================================================================
*/
function ChkSelectError(flag,obj)
{
	for (var j = 0; j < obj.length; j++)
	{
		if(obj[j].value != "")
		{
		   if (obj[j].style.backgroundColor == "#e50000")
		   {
				obj[j].style.color = "black";
			}
		}else
		{
			obj[j].style.color = "#fff";
			obj[j].style.backgroundColor = "#e50000";
		}
	}
}

/*
==================================================================
功能：数字金额转换为中文
提示信息：
使用：
返回：
==================================================================
*/  
function changeCNAMoney(money)
{
    //debugger;
    var IntNum,PointNum,IntValue,PointValue,unit,moneyCNY;
    var Number  = "零壹贰叁肆伍陆柒捌玖";
    var NUMUnit = { LING : "零",SHI : "拾",BAI : "佰",QIAN : "仟",WAN : "万",YI : "亿" }
    var CNYUnit = { YUAN : "元",JIAO : "角",FEN : "分",ZHENG : "整" };
    var beforeReplace = 
    {
        Values :
        [
            {Name: NUMUnit.LING + NUMUnit.YI},               // 零亿
            {Name: NUMUnit.LING + NUMUnit.WAN},              // 零万
            {Name: NUMUnit.LING + NUMUnit.QIAN},             // 零千
            {Name: NUMUnit.LING + NUMUnit.BAI},              // 零百
            {Name: NUMUnit.LING + NUMUnit.SHI},              // 零十
            {Name: NUMUnit.LING + NUMUnit.LING},             // 零零
            {Name: NUMUnit.YI + NUMUnit.LING + NUMUnit.WAN}, // 亿零万
            {Name: NUMUnit.LING + NUMUnit.YI},               // 零亿
            {Name: NUMUnit.LING + NUMUnit.WAN},              // 零万
            {Name: NUMUnit.LING + NUMUnit.LING}              // 零零
        ]
    };
    var afterReplace = 
    {
        Values :
        [
            {Name: NUMUnit.YI + NUMUnit.LING}, //亿零
            {Name: NUMUnit.WAN + NUMUnit.LING},//万零
            {Name: NUMUnit.LING},              //零
            {Name: NUMUnit.LING},              //零
            {Name: NUMUnit.LING},              //零
            {Name: NUMUnit.LING},              //零
            {Name: NUMUnit.YI + NUMUnit.LING}, //亿零
            {Name: NUMUnit.YI},                //亿
           {Name: NUMUnit.WAN},               //万
            {Name: NUMUnit.LING}               //零
        ]
    };
    var pointBefore = 
    {
        Values :
        [
            {Name: NUMUnit.LING + CNYUnit.JIAO}, //零角
            {Name: NUMUnit.LING + CNYUnit.FEN},  //零分
            {Name: NUMUnit.LING + NUMUnit.LING}, //零零
            {Name: CNYUnit.JIAO + NUMUnit.LING}  //角零
        ]
    };
    var pointAfter = 
    {
        Values :
        [
            {Name: NUMUnit.LING}, //零
            {Name: NUMUnit.LING}, //零
            {Name: ""},
            {Name: CNYUnit.JIAO}  //角
        ]
    };
    
    /// 递归替换
    var replaceAll = function(inputValue,beforeValue,afterValue)
    {
        while(inputValue.indexOf(beforeValue) > -1)
        {
            inputValue = inputValue.replace(beforeValue,afterValue);
        }
        return inputValue;
    }
    /// 获取输入金额的整数部分
    IntNum = money.indexOf(".") > -1 ? money.substring(0,money.indexOf(".")) : money;
    /// 获取输入金额的小数部分
    PointNum = money.indexOf(".") > -1 ? money.substring(money.indexOf(".")+1) : "";
    IntValue = PointValue = "";
            
    /// 计算整数部分
    for(var i=0;i<IntNum.length;i++)
    {
        /// 获取数字单位
        switch((IntNum.length-i) % 8)
        {
            case 5:
               unit = NUMUnit.WAN; //万
                break;
            case 0:
            case 4:
                unit = NUMUnit.QIAN; //千
                break;
            case 7:
            case 3:
                unit = NUMUnit.BAI; //百
                break;
           case 6:
            case 2:
                unit = NUMUnit.SHI; //十
                break;
            case 1:
                if((IntNum.length-i) > 8)
                {
                    unit = NUMUnit.YI; //亿    
                }
                else { unit = ""; }
                break;
            default:
                unit = "";
                break;
        }
        /// 组成整数部分
        IntValue += Number.substr(parseInt(IntNum.substr(i,1)),1) + unit;
    }
            
    /// 替换零
    for(var i=0;i<beforeReplace.Values.length;i++)
    {
        IntValue = replaceAll(IntValue,beforeReplace.Values[i].Name,afterReplace.Values[i].Name);             
    }
    // 末尾是零则去除
    if(IntValue.substr(IntValue.length-1,1) == NUMUnit.LING) IntValue = IntValue.substring(0,IntValue.length-1);
    // 一十开头的替换为十开头
    if(IntValue.substr(0,2) == Number.substr(1,1) + NUMUnit.SHI) IntValue = IntValue.substr(1,IntValue.length-1);
    
    /// 计算小数部分
   if(PointNum != "")
    {
        PointValue = Number.substr(PointNum.substr(0,1),1) + CNYUnit.JIAO;
        PointValue += Number.substr(PointNum.substr(1,1),1) + CNYUnit.FEN;
        for(var i=0;i<pointBefore.Values.length;i++)
        {
            PointValue = replaceAll(PointValue,pointBefore.Values[i].Name, pointAfter.Values[i].Name);
        }
    }
    moneyCNY = PointValue == "" ? IntValue + CNYUnit.YUAN + CNYUnit.ZHENG : IntValue + CNYUnit.YUAN + PointValue;
    return moneyCNY;
}


/*
==================================================================
功能：检测实数和0,不对外（需要测试！）
提示信息：
使用：
返回：
==================================================================
*/
function isRealOrZero(_theStr, decLen, intLen) {
    if (isEmptyUtil(_theStr)) {
        return true;
    }
	
    var theStr = _theStr.value;
	//如果用户输入的是-0或者-0.0或者0.0之类的数字
	if (parseFloat(theStr) == 0 || theStr === '0') {
		alert("请输入正确的数字！");
        return false;
	}
	//如果包含“-”
    if (theStr.indexOf("-") == 0) {
		theStr = theStr.substring(1, theStr.length);
	}
	//获取到第一个小数点位置
    var dot1st = theStr.indexOf(".");
	//获取到最后一个小数点位置
    var dot2nd = theStr.lastIndexOf(".");

	//如果两个数字不相同，说明输入的数据中有多个小数点
	if(dot1st != dot2nd) {
		alert("请输入正确的数字！");
        return false;
	}
	//如果第一个小数点在第一位
	else if (dot1st == 0) {
        alert("请输入正确的数字！");
        return false;
    }
	
	//如果没有传整数位长度，则默认整数位为10位
	if (intLen == null) {
		intLen = 10;
	}
    var OK = true;

    //如果不包含小数点
    if (dot1st == -1) {
		//判断是不是
        if (!isInt(theStr)) {
            alert("请输入正确的数字！");
            return false;
        } else if (theStr.length > intLen) {
            alert("整数位太长，最大允许输入" + intLen + "位！");
            return false;
        } 
    }
	//如果包含小数点
	else {
		//获取整数部分
        var intPart = theStr.substring(0, dot1st);
		//获取小数部分
        var decPart = theStr.substring(dot2nd + 1);
		//检测整数部分和小数部分是否合法
		if (!isInt(intPart) || !isDecimal(decPart)) {
            alert("请输入正确的数字！");
            return false;
        }
		else if (intPart.length > intLen) {
            alert("整数位太长，最大允许输入" + intLen + "位！");
            return false;
        }
		else if (decPart.length > decLen) {
            alert("小数位太长，最大允许输入" + decLen + "位！");
            return false;
        }
    }

	return true;
}

/*
==================================================================
功能：检测正实数,小数位为n位,整数位为m位
提示信息：请输入正确的数字！
使用：
返回：
==================================================================
*/
function CheckRealOrZero(obj, n, m) {
   
	if (isEmptyUtil(obj)) {
        return true;
    }
    
    if (obj.value.indexOf("-") == 0) {
        alert("整数部分请输入正整数或者0！");
        obj.focus();
        return false;
    } else if (!isRealOrZero(obj, n, m)) {
        obj.focus();
        return false;
    } else {
        obj = null;
        return true;
    }
}
/*特殊需求，检验实数没有提示信息*/
function isRealNoSign(_theStr,decLen,intLen){
	var theStr=_theStr.value;
	if(theStr.indexOf("-")==0) theStr=theStr.substring(1,theStr.length);
	var dot1st=theStr.indexOf(".");
	var dot2nd=theStr.lastIndexOf(".");
	var OK=true;
	if(isEmptyUtil(_theStr)){ return true;}

	if(intLen==null) intLen=10;
	if(dot1st==-1)
	{
		if(!isInt2(theStr))
		{
			return false;
		}
		else if(theStr.length>intLen)
		{
			return false;
		}
		else
		{
			return true;
		}
	}
	else if(dot1st!=dot2nd)
		{
			return false;
		}
	else if(dot1st==0)
		{
			return false;
		}
	else {
		var intPart=theStr.substring(0,dot1st);
		var decPart=theStr.substring(dot2nd+1);
		if(decPart==""){
			return false;
		}
		else if(!isInt2(intPart)||!isInt2(decPart)){
			return false;
		}
		else if(intPart.length>intLen){
			return false;
		}
		else if(decPart.length>decLen){
			return false;
		}
		else if(decPart==""){
			return false;
		}
		else{
			return true;
		}
	}
}

/*
==================================================================
功能：上传图片（带预览功能）
==================================================================
*/
//清除照片
function clearBookPicture(obj)
{
	var name = obj.name;
	var photoDivName = "newPreview";
	var picpreview=document.getElementById(photoDivName);
	picpreview.innerHTML='';
	picpreview.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src ='/media/default/images/nophoto.jpg';
	document.forms[0].textBookPhotoFile.value="";
	document.forms[0].textBookPhotoFile.outerHTML=document.forms[0].textBookPhotoFile.outerHTML;
}

// 删除一行
function getTableByRow(obj) {
	// 取obj的父元素为trObj
	var trObj = obj.parentElement;
	// 若trObj不是TR 则继续取其父元素
	while (trObj.tagName != 'TR') {
		trObj = trObj.parentElement;
	}
	return trObj.parentElement;
}

//在指定元素后面追加元素
function insertAfter(newElement, targetElement) { // newElement是要追加的元素
	// targetElement 是指定元素的位置
	var parent = targetElement.parentNode; // 找到指定元素的父节点
	if (parent.lastChild == targetElement) { // 判断指定元素的是否是节点中的最后一个位置
		// 如果是的话就直接使用appendChild方法
		parent.appendChild(newElement, targetElement);
	} else {
		parent.insertBefore(newElement, targetElement.nextSibling);
	}
}
//将集合中的元素添加到数组中 tagArr:目标数组 list：要复制的集合
function putArray(tagArr,list){
	for(var i = 0;i < list.length; i++){
		tagArr.push(list[i]);
	}
	return tagArr;
}
//拖动排序的方法
function dragSort(table){
	//绑定事件
	var addEvent = document.addEventListener ? function(el, type, callback) {
		el.addEventListener(type, callback, !1);
	}
			: function(el, type, callback) {
				el.attachEvent("on" + type, callback);
			}
	//判定对样式的支持
	var getStyleName = (function() {
		var prefixes = [ '', '-ms-', '-moz-', '-webkit-', '-khtml-', '-o-' ];
		var reg_cap = /-([a-z])/g;
		function getStyleName(css, el) {
			el = el || document.documentElement;
			var style = el.style, test;
			for (var i = 0, l = prefixes.length; i < l; i++) {
				test = (prefixes[i] + css).replace(reg_cap,
						function($0, $1) {
							return $1.toUpperCase();
						});
				if (test in style) {
					return test;
				}
			}
			return null;
		}
		return getStyleName;
	})();
	var userSelect = getStyleName("user-select");
	//精确获取样式
	var getStyle = document.defaultView ? function(el, style) {
		return document.defaultView.getComputedStyle(el, null)
				.getPropertyValue(style)
	} : function(el, style) {
		style = style.replace(/\-(\w)/g, function($, $1) {
			return $1.toUpperCase();
		});
		return el.currentStyle[style];
	}
	var dragManager = {
		y : 0,
		//鼠标落下时执行的操作
		dragStart : function(e) {
			e = e || event;
			var handler = e.target || e.srcElement;
			//获取鼠标落下时的对象，是不是一个TD
			if (handler.nodeName === "TD") {
				//如果是TD则获取对应的tr对象
				handler = handler.parentNode;
				dragManager.handler = handler;
				//给tr设置行样式
				if (!handler.getAttribute("data-background")) {
					handler.setAttribute("data-background", getStyle(
							handler, "background-color"))
				}
				//给行添加颜色
				handler.style.backgroundColor = "#ccc";
				//move :　十字箭头光标。用于表示对象可被移动
				handler.style.cursor = "move";
				//获取该行的纵向位置
				dragManager.y = e.clientY;
				if (typeof userSelect === "string") {
					return document.documentElement.style[userSelect] = "none";
				}
				document.unselectable = "on";
				document.onselectstart = function() {
					return false;
				}
			}
		},
		draging : function(e) {//mousemove时拖动行
			//获取行对象
			var handler = dragManager.handler;
			if (handler) {
				e = e || event;
				//当前行移动着的横向位置
				var y = e.clientY;
				var down = y > dragManager.y; //是否向下移动
				var tr = document.elementFromPoint(e.clientX, e.clientY);
				if (tr && tr.nodeName == "TD") {
					tr = tr.parentNode
					dragManager.y = y;
					if (handler !== tr) {
						tr.parentNode.insertBefore(handler,
								(down ? tr.nextSibling : tr));
						/**重新对表格的序号进行排序,第一行不需要变动*/
						//获取table一共的行数
						var alltrs = tr.parentNode.childNodes;
						for (var iLoop = 0; iLoop < alltrs.length; iLoop++) {
							//调整页面排名的显示
							alltrs[iLoop].childNodes[1].innerHTML = iLoop + 1;
					}
				}
			  };
			}
		  },
		//鼠标抬起时执行的操作
		dragEnd : function() {
			//获取操作的对象
			var handler = dragManager.handler
			if (handler) {
				//设置tr的样式
				handler.style.backgroundColor = handler
						.getAttribute("data-background");
				//将光标设置为默认的样式
				handler.style.cursor = "default";
				//将操作的对象设置为空
				dragManager.handler = null;

			}
			if (typeof userSelect === "string") {
				return document.documentElement.style[userSelect] = "text";
			}
			document.unselectable = "off";
			document.onselectstart = null;
		},
		main : function(el) {
			addEvent(el, "mousedown", dragManager.dragStart);
			addEvent(document, "mousemove", dragManager.draging);
			addEvent(document, "mouseup", dragManager.dragEnd);
		}
	}
	dragManager.main(table);
}

//设置提交时流程变量的值
function setWorkflowValue(optionType){
	if(optionType=='ADD_SUBMIT'){
		document.getElementById("isDraft").value = false;
		document.getElementById("isAuditor").value = true;
		document.getElementById("outputTransition").value = "提交";
		document.getElementById("comment").value = "";
	}else if(optionType=='ADD_SAVE'){
		document.getElementById("isAuditor").value=false;
		document.getElementById("isDraft").value=true;
		document.getElementById("outputTransition").value = "";
		document.getElementById("comment").value = "";
	}
	
}
/**
 * 获取年度的起止日期
 * @param flag true or false true查询开始日期 false 查询结束日期
 * @param year 年 
 */
function getYearDate(flag,year){
	var resultDate = "";
	//如果为true 查询参数年的开始日期 格式为YYYY-MM-DD
	if (flag) {
		resultDate = year +  "-01-01";
	} else {
		//如果参数年等于当前年 ，结束日期到今天为止 格式为YYYY-MM-DD
		if (new Date().getYear() ==year) {
			var endMonthStr = (new Date().getMonth()+1).toString();
			if(endMonthStr.length == 1){
				endMonthStr = "0"+endMonthStr;
			}
			var endDayStr = (new Date().getDate()).toString();
			if(endDayStr.length == 1){
				endDayStr = "0"+endDayStr;
			}
			resultDate = year + "-" + endMonthStr + "-" + endDayStr;
		} else {
			//反之则是参数年的结束日期 格式为YYYY-MM-DD
			resultDate = year +  "-12-31";
		}
	}
	return resultDate;
}
/**
 * 获取月份起止日期
 * @param flag true or false true查询开始日期 false 查询结束日期
 * @param year 年份
 * @param month 月份
 */
function getMonthDate(flag,year,month){
	var resultDate = "";
	//如果为true 返回当前月份的开始时间 格式为 YYYY-MM-DD
	if(flag){
		if(month.length == 1){
			month = "0"+month;
		}
		resultDate = year + "-" +month + "-01";
	} else {
		//如果参数年月等于当前年月，那么结束日期到今天为止，格式为 YYYY-MM-DD
		if(new Date().getYear() ==year && new Date().getMonth()+1 == month){
			if(month.length == 1){
				month = "0"+month;
			}
			var dayStr = (new Date().getDate()).toString();
			if((new Date().getDate()) < 10){
				dayStr = "0" + dayStr;
			}
			resultDate = year + "-" +month + "-" + dayStr;
		} else {
			//结束日期为传递年月的结束日期
			var endDay = new Date(year,month,0).getDate();
			if(month.length == 1){
				month = "0"+month;
			}
			resultDate = year + "-" +month + "-" + endDay;
		}
	}
	return resultDate;
}
/**
 * 获取季度起止日期
 * @param flag true or false true查询开始日期 false 查询结束日期
 * @param checkRange 季度 格式 2017-1
 */
function getQuarterDate(flag,checkRange){
	var resultDate = "";
	//如果为true 返回开始日期  格式为 ：yyyy-mm-dd
	if(flag){
		var beginMonth = (checkRange.split("-")[1]-1) * 3 + 1;
		var beginMonthStr = beginMonth.toString();
		if(beginMonth < 10){
			beginMonthStr = "0" + beginMonth;
		} 
		resultDate = checkRange.split("-")[0] + "-" + beginMonthStr + "-01";
	} else {
		//如果为false 返回结束日期  格式为 ：yyyy-mm-dd
		var endMonth = checkRange.split("-")[1] * 3;
		var endMonthStr = "";
		var endDayStr = "";
		//如果是当前年等于传递进来的年份 ，且当前月份小于或等于传递季度的结束月份，那么结束时间到今天为止， 格式为 ：yyyy-mm-dd
		if(new Date().getYear() == checkRange.split("-")[0] && new Date().getMonth()+1 <= endMonth){
			endMonthStr = (new Date().getMonth()+1).toString();
			endDayStr = (new Date().getDate()).toString();
			if((new Date().getMonth()+1) < 10){
				endMonthStr = "0" + (new Date().getMonth()+1).toString();
			} 
			if((new Date().getDate()) < 10){
				endDayStr = "0" + (new Date().getDate()).toString();
			} 
			resultDate = checkRange.split("-")[0] + "-" + endMonthStr + "-" + endDayStr; 
		} else {
			//否则 获取传递季度的对应的结束月份的结束日期   格式为 ：yyyy-mm-dd
			var endDay = (new Date(checkRange.split("-")[0],endMonth,0).getDate()).toString();
			endMonthStr = endMonth;
			if(endMonth < 10){
				endMonthStr = "0" + endMonth;
			} 
			endDayStr = endDay;
			if(endDay < 10){
				endDayStr = "0" + endDay;
			} 
			resultDate = checkRange.split("-")[0] + "-" + endMonthStr + "-" + endDayStr;
		}
	}
	return resultDate;
}
//全屏处理
var fulls = "left=0,screenX=0,top=0,screenY=0,scrollbars=1"; //定义弹出窗口的参数  
if (window.screen) {
	var ah = screen.availHeight - 30;
	var aw = screen.availWidth - 10;
	fulls += ",height=" + ah;
	fulls += ",innerHeight=" + ah;
	fulls += ",width=" + aw;
	fulls += ",innerWidth=" + aw;
	fulls += ",resizable"
} else {
	fulls += ",resizable"; // 对于不支持screen属性的浏览器，可以手工进行最大化。 manually  
}

/**
 * 根据记录滚动条位置的名字设置滚动条位置
 * scrollName 滚动条位置
 */
function scrollbacks(scrollName) { 
    if (getCookie(scrollName) != null){
    	document.documentElement.scrollTop=getCookie(scrollName);
    } 
} 

/**** 公共的zTree下拉框 start ***/ 
var inputID , hidID , divID , zTreeID ,nodeName;

//展开某一节点,并把该节点写入到cookie
function onExpand(event, treeId, treeNode){
	var cookie = $.cookie("z_tree");
	var z_tree = new Array();
	if(cookie){
		z_tree=cookie.split(",");
	}
	var ishave=false;
	for(var i=0;i<z_tree.length;i++){
		if(treeNode.id==z_tree[i]){
			ishave=true;
			break;
		}
	}
	var curUrl = window.location.href;
	// 截取最后一个'/'和'.'之间的string，即为actionName，这么做是为了防止url过长
	var actionName = curUrl.substring(curUrl.lastIndexOf("/") + 1 ,curUrl.lastIndexOf("."));
//	alert(actionName);
	if(!ishave){// 为了防止页面之间cookie混乱，拼接当前页面url
		z_tree.push(actionName+'@'+treeNode.id);
	}
	
	var z_tree_str ="";//把数组生成逗号分隔的字符串
	for(var i=0;i<z_tree.length;i++){
		if(i==z_tree.length-1){
			z_tree_str=z_tree_str+z_tree[i];
		}
		else{
			z_tree_str=z_tree_str+z_tree[i]+",";
		}
	}
	$.cookie("z_tree", z_tree_str);
}

//闭合某一节点，并把该节点和所有子节点从cookie中移除（如果不移除子节点，当子节点处于展开状态，只闭合父节点不起作用）
function onCollapse(event, treeId, treeNode){
	var cookie = $.cookie("z_tree");
	var z_tree = new Array();
	if(cookie){
		z_tree=cookie.split(",");
	}
	
	var nodeChildrens = getChildren(new Array(),treeNode);

	for(var i=0;i<nodeChildrens.length;i++){
		var child_node_id=nodeChildrens[i];
		for(var j=0;j<z_tree.length;j++){
			var curUrl = window.location.href;
			// 截取最后一个'/'和'.'之间的string，即为actionName，这么做是为了防止url过长
			var actionName = curUrl.substring(curUrl.lastIndexOf("/") + 1 ,curUrl.lastIndexOf("."));
			// 如果actionName一致，闭合时移除cookie
			if(actionName == z_tree[j].split('@')[0]){
				if(child_node_id==z_tree[j].split('@')[1]){
					z_tree.splice(j, 1);
					break;
				}
			}
		}
	}
	
	var z_tree_str ="";//把数组生成逗号分隔的字符串
	for(var i=0;i<z_tree.length;i++){
		if(i==z_tree.length-1){
			z_tree_str=z_tree_str+z_tree[i];
		}
		else{
			z_tree_str=z_tree_str+z_tree[i]+",";
		}
	}
	$.cookie("z_tree", z_tree_str);
}

//递归获取某一节点下所有子节点
function getChildren(ids,treeNode){
	ids.push(treeNode.id);
	if (treeNode.isParent){
		for(var obj in treeNode.children){
			getChildren(ids,treeNode.children[obj]);
		}
	}
	return ids;
}
var setting = {
	view: {
		  //dblClickExpand: false,
		  expandSpeed: 100 ,//设置树展开的动画速度
		  selectedMulti: false,
		  showIcon: false
	},
	data:{ // 必须使用data
		key: {
			checked: "isChecked"
		},
		simpleData : {  
			enable : true
		}
	},
	// 回调函数  
	callback : {  
		onClick : function(event, treeId, treeNode, clickFlag) {  
			var zTree = $.fn.zTree.getZTreeObj(zTreeID), // zTreeID
			nodes = zTree.getSelectedNodes(),
			v = "";
			id = "" ;
			for (var i=0, l=nodes.length; i<l; i++) {
				v += nodes[i].name + ",";
				id += nodes[i].id + "," ;
				//zTree.cancelSelectedNode(nodes[i]);
			}
			if (v.length > 0 ) v = v.substring(0, v.length-1);
			if (id.length > 0 ) id = id.substring(0, id.length-1);
			
			$("#" + inputID).val(v); // inputID
			$("#" + hidID).val(id);
			$("#" + inputID).focus();
			hideMenu();
		},
		onExpand: onExpand,
		onCollapse: onCollapse
			
	}  
};  
	
//显示下拉菜单
function showMenu(param1 , param2 , param3 , param4 , param5 , param6){
	inputID = param1, hidID = param2, divID = param3, zTreeID = param4 ;
	initTree(param5,param6);
	var left = $("#" + inputID).offsetLeft; // inputID 
    var top = $("#" + inputID).offset().top;
    var sidebarWidth = $("#sidebar").outerWidth(); // 左侧导航栏外宽度，如果存在需要在计算时减去
    var marginTop = parseInt( $("#" + inputID).css('marginTop'));
    var divOffset = {left: (left - sidebarWidth ), top: top , "marginTop":-marginTop};
    // 不知道为啥要加，不加就贴不住Input
    divOffset.top += $("#" + inputID).height(true);
    // 将zTree的宽度设置成和文本框一致的宽度，要考虑input控件和zTree之间padding的差
    $("#" + zTreeID).width(
    		(parseInt($("#" + inputID).width()) 
    		+ parseInt($("#" + inputID).css('padding-right')) 
    		+ parseInt($("#" + inputID).css('padding-left')) 
    		- parseInt($("#" + zTreeID).css('padding-left')) 
    		- parseInt($("#" + zTreeID).css('padding-right'))
    		)
    		+ 'px');
    $("#" + divID).css(divOffset).slideDown("fast"); // divID
	$("html").bind("mousedown", onBodyDown);
}

//隐藏下拉菜单
function hideMenu() {
	$("#" + divID).fadeOut("fast");
	$("html").unbind("mousedown", onBodyDown);
}

function onBodyDown(event) { // inputID divID #divID
	if (!(event.target.id == inputID || event.target.id == divID ||  $(event.target).parents("#"+divID).length>0)) {
		hideMenu();
	}
}
function initTree(nodeName,settingName){
	// 如果参数中有自定义setting，按照自定义走，如果没有，按照默认走
	if(settingName && settingName != ''){
		// 加载Ztree
		$(document).ready(function() { // zTreeID
			$.fn.zTree.init($("#"+zTreeID), eval(settingName) ,eval(nodeName));
		});
	}else{
		// 加载Ztree
		$(document).ready(function() { // zTreeID
			$.fn.zTree.init($("#"+zTreeID), setting ,eval(nodeName));
		});
	}
	
	
	var zTree = $.fn.zTree.getZTreeObj(zTreeID);
	
	//选中当前Ztree上的已有节点
	var current_id = $("#" + hidID).val();
	
	if(current_id!=''){
		var current_node = zTree.getNodeByParam('id', current_id);
		zTree.selectNode(current_node,true);
	}
	
	//从cookie中获取展开的节点，并进行展开
	var cookie = $.cookie("z_tree");
	if(cookie){
//		alert(cookie);
		z_tree=cookie.split(",");
		for(var i=0; i< z_tree.length; i++){
			var curUrl = window.location.href;
			// 截取最后一个'/'和'.'之间的string，即为actionName，这么做是为了防止url过长
			var actionName = curUrl.substring(curUrl.lastIndexOf("/") + 1 ,curUrl.lastIndexOf("."));
			// 如果actionName和当前页面一致，判断展开
			if(actionName == z_tree[i].split('@')[0]){
				var node = zTree.getNodeByParam('id', z_tree[i].split('@')[1]);
				zTree.expandNode(node,true, false, false);
			}
		}
	}
}

// 显示ztree树 参数依次为：inputID 隐藏域ID zTree所在的DIVID，zTReeID，zTree数据源名称， zTree setting名称
function showTree(param1 , param2 , param3 , param4 , param5 ,param6){
	showMenu(param1 , param2 , param3 , param4 ,param5 ,param6);
}
/**** 公共的zTree下拉框 end ***/

//根据当前元素获取指定标签的父元素
function getParentNode(obj, tagName){
	var trObj = obj.parentNode;
	while(trObj.tagName != tagName) {
		trObj = trObj.parentNode;
	}
	return trObj;
}
//清空树形组件value值
function clearTreeObjValue(textID,hiddenID){
	$("#"+textID).val('');
	$("#"+hiddenID).val('');
}
