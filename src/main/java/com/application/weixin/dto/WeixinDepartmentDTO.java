/**
 * Copyright (c)  2017， 西安长城数字软件有限公司[www.e-u.cn]。
 *
 */
package com.application.weixin.dto;

import java.io.Serializable;

import lombok.Getter;
import lombok.Setter;


/** 
 * 企业微信部门DTO
 * 
 * @author $Author: liuyunpeng $
 * @version $Revision: 1.0 $
 */
@Getter
@Setter
public class WeixinDepartmentDTO implements Serializable {

	/**
	 *  生成唯一序列号
	 */
	private static final long serialVersionUID = 4745698008753552455L;
	
	/** 部门ID */
	private  int id = 0;
	/** 	部门名称  */
	private  String name = "";
	/** 	父亲部门id。根部门为1  */
	private  int parentid;
	/** 		在父部门中的次序值。order值小的排序靠前  */
	private  int order;
	

}
