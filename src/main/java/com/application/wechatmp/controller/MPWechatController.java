package com.application.wechatmp.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.application.framework.util.AppSettingFactory;
import com.application.weixin.util.QRCodeUtils;
import com.application.weixin.util.WeiXinUtils;

import net.sf.json.JSONObject;


/**
 * 微信公众号。 微信公众号Controller
 * @author $Author: liuyunpeng $
 * @version $Revision: 1.0 $
 */
@Controller
@RequestMapping("/mpWechat")
public class MPWechatController {
   
	/**
	 * 生成微信公众号获取登录二维码
	 * 
	 * @param response
	 * @throws Exception 抛出异常
	 */
	@SuppressWarnings("deprecation")
	@RequestMapping("/createWeixinLoginQRcode")
	public void createWeixinLoginQRcode(HttpServletResponse response) throws Exception {
		AppSettingFactory appSettingFactory = AppSettingFactory.getInstance();

		// 获取获取微信公众号用户信息的方法链接
		String getWeixinURL = appSettingFactory.getAppSetting("phoneWarningDomainURL")
				+ "/mobileMonitoring/phoneWarningWeixin/getWeixinUserInfo.do";

		// 获取生成二维码内容
		String urlContent = appSettingFactory.getAppSetting("public_weixin_webAuthorizeURLStart")
				+ appSettingFactory.getAppSetting("public_weixin_appID") + "&redirect_uri="
				+ java.net.URLEncoder.encode(getWeixinURL)
				+ appSettingFactory.getAppSetting("public_weixin_webAuthorizeURLEnd");

		// 生成微信公众号登录二维码
		String base64Img = QRCodeUtils.getBASE64AppQRCode(urlContent, 200, 202, "jpg");

		// 设置JSON数据跨域乱码
		WeiXinUtils.setResponseContent(response);
		response.getWriter().write(base64Img);
	}

	/**
	 * 获取微信公众号当前人员信息
	 * 
	 * @param request
	 * @param response
	 * @throws Exception 抛出异常
	 */
	@ResponseBody
	@RequestMapping("/getWeixinUserInfo.do")
	public void getWeixinUserInfo(HttpServletRequest request, HttpServletResponse response) throws Exception {
		AppSettingFactory appSettingFactory = AppSettingFactory.getInstance();

		// 获取code
		String code = request.getParameter("code");

		// 网页授权获取网页refresh_token链接 public_weixin_webAuthorizeRefreshAccessTokenURL
		String webRefreshAccessTokenURL = appSettingFactory
				.getAppSetting("public_weixin_webAuthorizeRefreshAccessTokenURL")
				+ appSettingFactory.getAppSetting("public_weixin_appID") + "&secret="
				+ appSettingFactory.getAppSetting("public_weixin_appsecret") + "&code=" + code
				+ "&grant_type=authorization_code";

		// 获取refresh_token
		JSONObject userJSON = WeiXinUtils.getWeiXinInfoJSON(webRefreshAccessTokenURL);
		// 获取微信公众号用户openid
		String openid = userJSON.getString("openid");
		// 获取授权accessToken(有效时间为两小时)
		String access_token = userJSON.getString("access_token");

		// 获取微信公众号用户信息链接
		String userinfoRUL = appSettingFactory.getAppSetting("public_weixin_webAuthorizeUserInfoURL") + access_token
				+ "&openid=" + openid + "&lang=zh_CN";

		// 获取刷新网页access_token后返回数据
		JSONObject userInfoJSON = WeiXinUtils.getWeiXinInfoJSON(userinfoRUL);

		// 设置JSON数据跨域乱码
		WeiXinUtils.setResponseContent(response);
		response.getWriter().write(userInfoJSON.toString());
	}
	
	
}
