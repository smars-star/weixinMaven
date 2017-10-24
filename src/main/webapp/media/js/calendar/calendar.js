var checkedDate='';

var checkedRow=-1;//记录上次选择行数

var checkedCol=-1;//记录上次选择列数

//var visibleFlag='h';

var para=window.dialogArguments;



function Init_cboYear(){

	var option; 
	var d = new Date();
    var nowYear = d.getFullYear()+5;
	for(var i=nowYear-105;i<=nowYear;i++){

		option=document.createElement("OPTION"); 

		option.text=i+'年';

		option.value=i;

		cboYear.add(option);

	}

}



function Init_txtMonth(){

	txtMonth.value=cboMonth.options[cboMonth.selectedIndex].text;

}



function Init_txtYear(){

	txtYear.value=cboYear.options[cboYear.selectedIndex].text;

}



function monthChanged(){

	Init_txtMonth();

	Init_dateTable();

}



function yearChanged(){

	Init_txtYear();

	Init_dateTable();

}



function Init_dateTable(){

	var selYear=0;

	var selMonth=0;

	var selDate=0;

	var selDay;

	var tempTime;

	var monthLength=0;

	var tableRow=1;

	var tableCol=0;

	selYear=cboYear.value;

	selMonth=cboMonth.value;

	if(selDate==0) selDate=1;

	tempTime=new Date(selYear,selMonth-1,selDate);

	selDay=tempTime.getDay();

	for(tableCol=0;tableCol<selDay;tableCol++) dateTable.rows(tableRow).cells(tableCol).innerText=' ';

	monthLength=getMonthLength(selYear,selMonth);

	for(var i=1;i<=monthLength;){

		if(tableCol<7){

			dateTable.rows(tableRow).cells(tableCol).innerText=i;

			tableCol++;

			i++;

		}

		else{

			tableCol=0;

			tableRow+=1;

		}

	}

	for(var i=tableRow;i<7;i++){

		for(var j=tableCol;j<7;j++){

			if(tableCol<7){

				dateTable.rows(tableRow).cells(tableCol).innerText=' ';

				tableCol++;

			}

			else{

				break;

			}

		}

		tableCol=0;

		tableRow+=1;

	}

	var tempCol;

	var tempRow;

	var tempTime2;

	tempTime2=new Date();

	if(tempTime.getYear()==tempTime2.getYear()&&tempTime.getMonth()==tempTime2.getMonth()) tempTime=tempTime2;

	tempCol=tempTime.getDay();

	for(var i=1;i<7;i++){

		if(dateTable.rows(i).cells(tempCol).innerText==tempTime.getDate()){

			tempRow=i;

			break;	

		}

	}

	if(checkedRow!=-1)	dateTable.rows(checkedRow).cells(checkedCol).className='CalendarBody';

	dateTable.rows(tempRow).cells(tempCol).className='SelectedCell';

	checkedRow=tempRow;

	checkedCol=tempCol;

	//var tempMonth;

	//var tempDate;

	///if(cboMonth.value<10) tempMonth='0'+cboMonth.value;

	//else tempMonth=cboMonth.value;

	//if(parseInt(dateTable.rows(checkedRow).cells(checkedCol).innerText)<10) tempDate='0'+dateTable.rows(checkedRow).cells(checkedCol).innerText;

	//else tempDate=dateTable.rows(checkedRow).cells(checkedCol).innerText;

	//checkedDate=tempTime.getFullYear()+'/'+tempMonth+'/'+tempDate;

}

		

function getMonthLength(tempYear,tempMonth){

	vartempMonthLength=0;

		switch(tempMonth){

		case'1':{tempMonthLength=31;break;}

		case'2':{if(((tempYear%4)==0&&(tempYear%100!=0))||((tempYear%400)==0)) tempMonthLength=29;

			else tempMonthLength=28;

			break;

		}

		case '3':{tempMonthLength=31;break;}

		case '4':{tempMonthLength=30;break;}

		case '5':{tempMonthLength=31;break;}

		case '6':{tempMonthLength=30;break;}

		case '7':{tempMonthLength=31;break;}

		case '8':{tempMonthLength=31;break;}

		case '9':{tempMonthLength=30;break;}

		case '10':{tempMonthLength=31;break;}

		case '11':{tempMonthLength=30;break;}

		case '12':{	tempMonthLength=31;break;}

	}

	return tempMonthLength;

}



function selectDate(){
   

	var tdId='';

	var tempRow;

	var tempCol;

	if(window.event.srcElement.parentElement.rowIndex==0) return;

	if(window.event.srcElement.parentElement.rowIndex==null) return;
   
 tdId=window.document.activeElement.id;
    tempRow=parseInt(tdId.substring(0,1));

	tempCol=parseInt(tdId.substring(1));
	 if(dateTable.rows(tempRow).cells(tempCol).innerText!=' '){

		//if(checkedRow!=-1)	dateTable.rows(checkedRow).cells(checkedCol).className='CalendarBody';

		//dateTable.rows(tempRow).cells(tempCol).className='SelectedCell';

		if(checkedRow!=-1)	dateTable.rows(checkedRow).cells(checkedCol).className='CalendarBody';

		dateTable.rows(tempRow).cells(tempCol).className='SelectedCell';

		checkedRow=tempRow;

		checkedCol=tempCol;


	}

}



function get_Date(){
			 

	var tempMonth='';

	var tempDate='';

	if(checkedRow==-1){

		alert('请选择一个日期');

	}

	else{

		if(cboMonth.value<10) tempMonth='0'+cboMonth.value;

		else 

		tempMonth=cboMonth.value;

		if(parseInt(dateTable.rows(checkedRow).cells(checkedCol).innerText)<10) tempDate='0'+dateTable.rows(checkedRow).cells(checkedCol).innerText;

		else 

		tempDate=dateTable.rows(checkedRow).cells(checkedCol).innerText;

	}

	if(checkedRow!=-1)	dateTable.rows(checkedRow).cells(checkedCol).className='CalendarBody';

	return cboYear.value+'-'+tempMonth+'-'+tempDate; 

}



function Init_Calendar(){

	var tempTime=new Date();														

	for(var i=0;i<cboMonth.length;i++){

		if(cboMonth.options[i].value==(tempTime.getMonth()+1)){

			cboMonth.selectedIndex=i;

			break;

		} 

	}

	for(var i=0;i<cboYear.length;i++){

		if(cboYear.options[i].value==tempTime.getFullYear()){

			cboYear.selectedIndex=i;

			break;

		} 

	}

}



function calendarVisible(){
				   

	//if(visibleFlag=='h'){

	//visibleFlag='v';

	checkedDate='';

	checkedRow=-1;//记录上次选择行数

	checkedCol=-1;//记录上次选择列数

	Init_Calendar();

	Init_txtMonth();

	Init_txtYear();

	Init_dateTable();	

	//divCalendar.style.visibility='visible';

	//}	else return;

}



function calendarHidden(){

	//if(visibleFlag=='v'){

	//visibleFlag='h';

	checkedDate=get_Date();

	//alert(checkedDate);

	//divCalendar.style.visibility='hidden';

	para.value=checkedDate;

	window.close();

	//}	else return;



}



function dblSelectDate(){
	
	
var tdId='';

	var tempRow;

	var tempCol;

	if(window.event.srcElement.parentElement.rowIndex==0) return;

	if(window.event.srcElement.parentElement.rowIndex==null) return;

	tdId=window.document.activeElement.id;

	tempRow=parseInt(tdId.substring(0,1));

	tempCol=parseInt(tdId.substring(1));

	if(dateTable.rows(tempRow).cells(tempCol).innerText!=' '){

		if(checkedRow!=-1)	dateTable.rows(checkedRow).cells(checkedCol).className='CalendarBody';

		dateTable.rows(tempRow).cells(tempCol).className='SelectedCell';

		checkedRow=tempRow;

		checkedCol=tempCol;

	}
	
checkedDate=get_Date();

	para.value=checkedDate;
   
 window.close();

}



Init_cboYear();

calendarVisible();

//document.all("confirm").focus();



function SelectDate(para){	

	window.showModalDialog('calendar.html',para,'dialogheight=218px;dialogwidth=350px;status=no;center=yes');

}