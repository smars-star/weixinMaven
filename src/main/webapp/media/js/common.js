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
	op.text="��ѡ��";
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

//select��option�������ƶ�����sSelect�е�option�Ƶ�tSelect��
  function addItem(sSelect,tSelect)
  {
  try{
	 var list1=sSelect;
	 var list2=tSelect;
	 var option;
	 //���Դselect��ѡ������ӵ�Ŀ��select��
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
      alert('javaScript�ű��쳣:<br>\n'
      +'<br>\ne.message='+e.message
      +'<br>\ne.name='+e.name
      +'<br>\ne.number='+e.number
      +'<br>\ne.description='+e.description);
   }
  }
//select��option�������ƶ�����sSelect�е�optionȫ���Ƶ�tSelect��
  function addAllItem(sSelect,tSelect)
  {
  try{

	 var list1=sSelect;
	 var list2=tSelect;
	 var option;
	 //���Դselect��ѡ������ӵ�Ŀ��select��

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
      alert('javaScript�ű��쳣:<br>\n'
      +'<br>\ne.message='+e.message
      +'<br>\ne.name='+e.name
      +'<br>\ne.number='+e.number
      +'<br>\ne.description='+e.description);
   }
  }

  //ȥ��tselect��option�Ľ���
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
      alert('javaScript�ű��쳣:<br>\n'
      +'<br>\ne.message='+e.message
      +'<br>\ne.name='+e.name
      +'<br>\ne.number='+e.number
      +'<br>\ne.description='+e.description);
   }
  }
 //���ύǰѡ��select�ؼ��е�����Ԫ��
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
      alert('javaScript�ű��쳣:<br>\n'
      +'<br>\ne.message='+e.message
      +'<br>\ne.name='+e.name
      +'<br>\ne.number='+e.number
      +'<br>\ne.description='+e.description);
    }
  }
//�й���select�����ƶ��Ḻ̌�
 //ѡ��select�ؼ��е�����Ԫ��
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
      alert('javaScript�ű��쳣:<br>\n'
      +'<br>\ne.message='+e.message
      +'<br>\ne.name='+e.name
      +'<br>\ne.number='+e.number
      +'<br>\ne.description='+e.description);
    }
  }
/********************************�����ǵ���ajax�ýű� add by zhangl************************************************/
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
  �ͷ��������н����Ľű�
**/
function callServer(url,obj,mes)
{
   createHttpRequest();
   http_request.open("GET", url, true);
    /**���������ɹ��󷵻ؿͻ�����Ҫִ�еĽű�
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


//��鸴ѡ���б��Ƿ�û��ѡ��������
function checkedIsNull(inputObject,alertMes)
{
 var checkss = inputObject;//window.document.forms[0].checkBoxID
 var numChecks = checkss.length;
 var applyIds="";
 if(checkss!=null)
 {
  if((numChecks==null)&&(checkss.checked))//��ѡ���б�ֻ��һ��ʱ
  {
   return true;
  }
  else
  {
   for(var i = 0; i < numChecks;i++)//��ѡ���б��ж���ʱ
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
* �Զ�ѡ�б�Ĳ���--����ѡ���ȡ����ͬʱ���Ѿ�ѡ����Ĳ��ᷴ��ѡ��
* forSelectObj ����Դ���ṩѡ�������Դ
* toObj Ŀ���ѡ�б��û�ѡ�������
*/
//ѡ������
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
		//ɾ���Ѿ���ѡ�����
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

//ȫ��ѡ��
function fun_selectAll(forSelectObj,toObj,msg)
{
	fun_selected(forSelectObj);
	fun_select(forSelectObj,toObj,msg);
}

//ȫ��ȡ��
function fun_delAll(forSelectObj,delObj,msg)
{
	fun_selected(forSelectObj);
	fun_select(forSelectObj,delObj,msg)
}

//����ظ�
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

//ȡ��ѡ��
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

//�ύ��ǰѡ������
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

//�ƶ�ѡ��--���ƻ�����,upperOrNext�ƶ�����
function move_select(objname,upperOrnext)
{
	
	var strlength = objname.options.length;//����
	var index=objname.selectedIndex;//��ѡ�еĶ��������
	if(index < 0)
	{
		alert("��ѡ����Ҫ�ƶ��Ķ���");
		return false;
	}
	var selectedObj=objname.options[index];//��ѡ�еĶ���
	if(upperOrnext=="upper")//����
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


