/**
 * Copyright (c)  2017， 西安长城数字软件有限公司[www.e-u.cn]。
 *
 */
package com.application.weixin.dto;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

import javax.xml.bind.annotation.XmlRootElement;

import lombok.Getter;
import lombok.Setter;


/** 
 *微信部门员工DTO
 * 
 * @author $Author: liuyunpeng $
 * @version $Revision: 1.0 $
 */
@XmlRootElement
@Getter
@Setter
public class WeixinEmployeeDTO implements Serializable {

	/**
	 *  生成唯一序列号
	 */
	private static final long serialVersionUID = 985782072975019760L;

	/** 企业微信用户Id  */
	private  String  userid ="";
	/** 企业微信用户名称 */
	private  String  name = "";
	/** 	企业微信用户部门集合 */
	private  List<Integer>  department = null;
	/** 企业微信用户部门 */
	private  String   depName = "";
	/** 	企业微信用户职位 */
	private  String  position = "";
	/** 	企业微信用户手机号码 */
	private  String  mobile = "";
	/** 企业微信用户性别 */
	private  String  gender = "";
	/** 	企业微信用户Email */
	private  String  email = "";
	/** 	企业微信用户微信Id */
	private  String  weixinid = "";
	/** 企业微信用户头像 */
	private  String  avatar = "";
	/** 企业微信用户是否关注ע */
	private  int  status = 1;
	/** 同级别排序 */
	private  List<Integer> order= null;
	/** 微信字段扩展 */
	private  Map<String,Map<String,?>>  extattr = null;
	
	/** 错误提示信息 */
    private  String  errmsg = "";
    /**  错误编码 */
	private  String  errcode = "";
	/** 是否是领导 */
	private  int  isleader = 0;
	 /** 英文名称 */
	private  String english_name = "";
	/**  电话 */
	private  String  telephone = "";
	
}
