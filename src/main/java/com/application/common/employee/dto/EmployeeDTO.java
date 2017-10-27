/**
 * Copyright (c) 2017， 西安长城数字软件有限公司[www.e-u.cn]。
 * 
 */
package com.application.common.employee.dto;

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
public class EmployeeDTO implements Serializable{

    /**
     * 生成唯一序列号
     */
    private static final long serialVersionUID = -8218440900404463861L;

    /**
     * 人员Id
     */
    private String employeeID = "";

    /**
     * 人员名称
     */
    private String employeeName = "";

    /**
     * 部门Id
     */
    private String workdepID = "";

    /**
     * 部门名称
     */
    private String workDepName = "";

    /**
     * 人员性别：1：女 2：男
     */
    private int genderCode = 1;

    /**
     * 人员性别：男、女
     */
    private String genderCodeValue = "";

    /**
     * 人员编号
     */
    private String employeeNo = "";

    /**
     * 出生日期
     */
    private Date brithday;

    /**
     * 企业微信用户职位
     */
    private String position = "";
    
    /**
     *  邮箱
     */
    private String email = "";

}
