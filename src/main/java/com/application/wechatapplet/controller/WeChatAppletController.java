/**
 * Copyright (c) 2017， 西安长城数字软件有限公司[www.e-u.cn]。 
 * 
 * 
 * 
 */
package com.application.wechatapplet.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 微信小程序。微信小程序Controller
 * @author $Author: liuyunpeng $
 * @version $Revision: 1.0 $
 */
@Controller
@RequestMapping(value="/phoneWarning")
public class WeChatAppletController {
  
	 /**
	  *  初始化报警信息页面
	  * @param request
	  * @param response
	  * @param model
	  * @param warningID
	  * @return
	  */
     @RequestMapping(value="/preModifyPhoneWarning")
	 public String  preModifyPhoneWarning(HttpServletRequest request, HttpServletResponse response,Model model,String warningID){
		
    	 return "/wechatapplet/modifyPhoneWarning";
	 }
}
