/**
 * Copyright (c)  2017， 西安长城数字软件有限公司[www.e-u.cn]。
 *
 */
package com.application.weixin.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.application.weixin.dao.impl.WeixinDaoImpl;
import com.application.weixin.service.WeixinService;

/** 
 * 微信WeixinService接口实现类  
 * 
 * @author $Author: liuyunpeng $
 * @version $Revision: 1.0 $
 */
@Service
public class WeixinServiceImpl implements WeixinService{

	/**
	 *  注入微信DAO 接口
	  */
	@Autowired
	private  WeixinDaoImpl weixinDaoImpl;
	
	
}
