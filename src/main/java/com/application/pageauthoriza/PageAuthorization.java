/**
 * Copyright (c) 2017， 西安长城数字软件有限公司[www.e-u.cn]。
 *
 */
package com.application.pageauthoriza;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.application.weixin.listener.WeiXinAccessTokenListener;
import com.application.weixin.util.AesException;
import com.application.weixin.util.SHA1;

/**
 * 网页应用授权、JS-SDK网页应用
 * 
 * @author $Author: liuyunpeng $
 * @version $Revision: 1.0 $
 */
@RequestMapping("/pageAuthorization")
@Controller
public class PageAuthorization{

    /**
     * 网页应用首页
     * @param request HttpServletRequest 对象用于获取页面数据
     * @param model Model对象用于设置页面数据
     * @return String 跳转页面
     * @throws AesException
     */
    @RequestMapping("/findPageAuthorization.do")
    public String findPageAuthorization(HttpServletRequest request, Model model) throws IOException, AesException {
        // 把access_token放到session中
        HttpSession session = request.getSession();
        session.setAttribute("accessToken_session", WeiXinAccessTokenListener.access_token);

        // JS-SDK 签名标签,有效时间为7200s(2小时)
        String url = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + request
                .getRequestURI();
        String jsapi_ticket = SHA1.getSHA1(WeiXinAccessTokenListener.access_token, "1504489723", "h2z7e42b5gqtzkt", url);
        session.setAttribute("jsapi_ticket", jsapi_ticket);

        // 返回页面
        return "/pageAuthorization/findPageAuthorization";
    }

}
