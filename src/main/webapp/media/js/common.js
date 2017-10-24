function chYM(obj,strY,strM)
{
	if(strY=='' || strM=='') obj.value='';
	obj.value=strY+'-'+strM+'-01';
}
function initYM(obj,strY,strM)
{
	if(strY=='' || strM=='') obj.value='';
	obj.value=strY+'-'+strM;
}
function initYear(yearObj,maxYear)
{
	var op=document.createElement("OPTION");
	op.text="请选择";
	op.value="";
	yearObj.add(op);
	for(var i=maxYear;i>=1900;i--)
	{
		var op=document.createElement("OPTION");
		op.text=i;
		op.value=i;
		yearObj.add(op);
	}

}
function initMonth(monthObj)
{
	var Stext,Svalue;
	for(var i=1;i<13;i++)
	{
		var op=document.createElement("OPTION");
		if(i<10)
		{
			Stext='0'+i;
			Svalue='0'+i;
		}
		else
		{
			Stext=i;
			Svalue=i;
		}
		op.text=Stext;
		op.value=Svalue;
		monthObj.add(op);
	}
}

//select中option的左右移动，将sSelect中的option移到tSelect中
  function addItem(sSelect,tSelect)
  {
  try{
	 var list1=sSelect;
	 var list2=tSelect;
	 var option;
	 //如果源select有选中则添加到目标select中
	 if(list1.selectedIndex!=-1)
	 {
	   for(var i=0;i<list1.length;i++)
	   {
		 if(list1.options[i].selected)
		  {
			option=document.createElement("OPTION");
			option.text=list1.options[i].text;
			option.value=list1.options[i].value;
			list2.add(option);
			list1.options[i]=null;
			i--;
		  }
	   }
	 }
   }
   catch(e)
   {
      alert('javaScript脚本异常:<br>\n'
      +'<br>\ne.message='+e.message
      +'<br>\ne.name='+e.name
      +'<br>\ne.number='+e.number
      +'<br>\ne.description='+e.description);
   }
  }
//select中option的左右移动，将sSelect中的option全部移到tSelect中
  function addAllItem(sSelect,tSelect)
  {
  try{

	 var list1=sSelect;
	 var list2=tSelect;
	 var option;
	 //如果源select有选中则添加到目标select中

	   for(var i=0;i<list1.length;i++)
	   {

			option=document.createElement("OPTION");
			option.text=list1.options[i].text;
			option.value=list1.options[i].value;
			list2.add(option);
			list1.options[i]=null;
			i--;

	   }

   }
   catch(e)
   {
      alert('javaScript脚本异常:<br>\n'
      +'<br>\ne.message='+e.message
      +'<br>\ne.name='+e.name
      +'<br>\ne.number='+e.number
      +'<br>\ne.description='+e.description);
   }
  }

  //去除tselect中option的焦点
  function removeFocus(tSelect)
  {
   try{

	var list=tSelect;
	if(list!=undefined)
	{
	  if(list!=null&&list.selectedIndex!=-1)
	  list.selectedIndex=-1;
	}
   }
   catch(e)
   {
      alert('javaScript脚本异常:<br>\n'
      +'<br>\ne.message='+e.message
      +'<br>\ne.name='+e.name
      +'<br>\ne.number='+e.number
      +'<br>\ne.description='+e.description);
   }
  }
 //表单提交前选中select控件中的所有元素
  function selectOptions(objname)
  {
    try
    {
        var strlength = objname.options.length;
        for(i=0;i<strlength;i++)
        {
            objname.options[i].selected = true;
        }
        return true;
    }
    catch(ex)
    {
      alert('javaScript脚本异常:<br>\n'
      +'<br>\ne.message='+e.message
      +'<br>\ne.name='+e.name
      +'<br>\ne.number='+e.number
      +'<br>\ne.description='+e.description);
    }
  }
//有关用select左右移动的教本
 //选中select控件中的所有元素
  function IsOptSel(objname)
  {
    try
    {
		var count=0;
        var strlength = objname.options.length;
        for(i=0;i<strlength;i++)
        {
            count++;
        }
		if(count>0)
           return true;
		else
		   return false;
    }
    catch(ex)
    {
      alert('javaScript脚本异常:<br>\n'
      +'<br>\ne.message='+e.message
      +'<br>\ne.name='+e.name
      +'<br>\ne.number='+e.number
      +'<br>\ne.description='+e.description);
    }
  }
/********************************以下是调用ajax得脚本 add by zhangl************************************************/
  var http_request = false;
  function createHttpRequest()
  {
	if (window.XMLHttpRequest)
	{ // Mozilla, Safari,...
		http_request = new XMLHttpRequest();
		if (http_request.overrideMimeType)
		{
			http_request.overrideMimeType('text/xml');
		}
	}
	else if (window.ActiveXObject)
	{ // IE
		try
		{
			http_request = new ActiveXObject("Msxml2.XMLHTTP");
		}
		catch (e)
		{
			try
			{
				http_request = new ActiveXObject("Microsoft.XMLHTTP");
			}
			catch (e)
			{}
		}
	}
	if (!http_request) {
		return false;
	}
  }
/**
  和服务器进行交互的脚本
**/
function callServer(url,obj,mes)
{
   createHttpRequest();
   http_request.open("GET", url, true);
    /**当服务器成功后返回客户段需要执行的脚本
    **/
   http_request.onreadystatechange = repeatAlert;
   http_request.send(null);
  if (http_request.readyState == 4)
  {
     if (http_request.status == 200)
	 {
        var response = http_request.responseText;
        if (response != "")
		{
		   obj.value='';
           alert (mes);
        }
     }
   }
}
/********************************************************************************/


//检查复选筐列表是否没有选中数据项
function checkedIsNull(inputObject,alertMes)
{
 var checkss = inputObject;//window.document.forms[0].checkBoxID
 var numChecks = checkss.length;
 var applyIds="";
 if(checkss!=null)
 {
  if((numChecks==null)&&(checkss.checked))//复选筐列表只有一项时
  {
   return true;
  }
  else
  {
   for(var i = 0; i < numChecks;i++)//复选筐列表有多项时
   {
      if(checkss[i].checked)
      {
     return true;
      }
   }
  }
 }
 alert(alertMes);
 return false;
}



/**
* 对多选列表的操作--包括选择和取消，同时对已经选择过的不会反复选择
* forSelectObj 数据源即提供选择的数据源
* toObj 目标多选列表即用户选择的数据
*/
//选择数据
function fun_select(forSelectObj,toObj,msg)
{
	var tempObj1=forSelectObj;
	var tempObj2=toObj;
	if(tempObj1.selectedIndex != -1)
	{
		for(var i = 0; i < tempObj1.length; i++)
		{
			if(tempObj1.options[i].selected)
			{
				if(CheckRepeate(tempObj1.options[i].value,tempObj2))
				{
					var nOption = document.createElement("OPTION");
					nOption.text = tempObj1.options[i].text;
					nOption.value = tempObj1.options[i].value;
					tempObj2.add(nOption);
				}
			}
		}
		//删除已经被选择过的
		fun_del(forSelectObj,msg);
	}
	else
	{
		if(msg!=undefined && msg!="")
		{
			alert(msg);
		}
	}
}

//全部选择
function fun_selectAll(forSelectObj,toObj,msg)
{
	fun_selected(forSelectObj);
	fun_select(forSelectObj,toObj,msg);
}

//全部取消
function fun_delAll(forSelectObj,delObj,msg)
{
	fun_selected(forSelectObj);
	fun_select(forSelectObj,delObj,msg)
}

//检查重复
function CheckRepeate(no,toObj)
{
	for(var i = 0; i < toObj.length; i++)
	{
		if(toObj.options[i].value==no)
		{
			return false;
		}
	}
	return true;
}

//取消选择
function fun_del(delObj,msg)
{
	tempObj=delObj;
	if(tempObj.selectedIndex != -1)
	{
		for(var i = tempObj.options.length - 1; i>=0; i--)
		{
			if(tempObj.options[i].selected)
			{
				tempObj.remove(i);
			}
		}
	}
	else
	{
		if(msg!=undefined && msg!="")
		{
			alert(msg);
		}
	}
}

//提交表单前选中内容
function fun_selected(objname)
{
    try
    {
        var strlength = objname.options.length;
        for(i=0;i<strlength;i++)
        {
            objname.options[i].selected = true;
        }
        return true;
    }
    catch(ex)
    {
      alert(ex.ErrorMessage);
      return false;
    }
}

//移动选项--上移或下移,upperOrNext移动方向
function move_select(objname,upperOrnext)
{
	
	var strlength = objname.options.length;//长度
	var index=objname.selectedIndex;//被选中的对象的索引
	if(index < 0)
	{
		alert("请选择需要移动的对象。");
		return false;
	}
	var selectedObj=objname.options[index];//被选中的对象
	if(upperOrnext=="upper")//上移
	{
		if(index==0)
		{
			return false;
		}
		var _name=objname.options[index-1].text;
		var _value=objname.options[index-1].value;
		objname.options[index-1].text=selectedObj.text;
		objname.options[index-1].value=selectedObj.value;
		objname.options[index].text=_name;
		objname.options[index].value=_value;
		objname.options[index].selected=false;
		objname.options[index-1].selected=true;
	}
	else
	{
		if(index==strlength-1)
		{
			return false;
		}
		var _name=objname.options[index+1].text;
		var _value=objname.options[index+1].value;
		objname.options[index+1].text=selectedObj.text;
		objname.options[index+1].value=selectedObj.value;
		objname.options[index].text=_name;
		objname.options[index].value=_value;
		objname.options[index].selected=false;
		objname.options[index+1].selected=true;
	}
}


