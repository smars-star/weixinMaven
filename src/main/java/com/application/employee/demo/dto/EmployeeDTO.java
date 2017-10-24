/**
 * Copyright (c)  2017， 西安长城数字软件有限公司[www.e-u.cn]。
 * 
 */
package com.application.employee.demo.dto;

import java.io.Serializable;
import java.util.Date;

import lombok.Getter;
import lombok.Setter;

/**
 * 人员信息 DTO。
 * @author $Author: liuyunpeng $
 * @version $Revision: 1.0 $
 */
@Getter
@Setter
public class EmployeeDTO implements Serializable {

	/**
	 *  生成唯一序列号
	 */
	private static final long serialVersionUID = -8218440900404463861L;

	private  String employeeID = "";
	private  String employeeName = "";
	private  String workdepID = "";
	private  String workDepName = "";
	private  int       genderCode = 1;
	private  String genderCodeValue = "";
	private  String employeeNo= "";
	private  Date  brithday ;
	
}
