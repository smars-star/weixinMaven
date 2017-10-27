/**
 * Copyright (c) 2017， 西安长城数字软件有限公司[www.e-u.cn]。
 * 
 */
package com.application.common.department.dto;

import java.io.Serializable;

import lombok.Getter;
import lombok.Setter;

/**
 * 部门信息集合
 * @author $Author: liuyunpeng $
 * @version $Revision: 1.0 $
 */
@Getter
@Setter
public class DepartmentDTO implements Serializable{

    /**
     * 生成为唯一序列号
     */
    private static final long serialVersionUID = 1441598588549344902L;

    /**
     * 部门Id
     */
    private String depId = "";

    /**
     * 部门名称
     */
    private String depName = "";

    /**
     * 部门编号
     */
    private String depNo = "";

    /**
     * 父部门 Id
     */
    private String parentDepId = "";

    /**
     * 部门简称
     */
    private String depShortName = "";

    /**
     * 英文名称
     */
    private String englishName = "";

    /**
     * 部门排序
     */
    private int sortby = 99999;

    /**
     * 部门类型
     */
    private String organType = "";

    /**
     * 是否有效
     */
    private String infoStatus = "";

}
