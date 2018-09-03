package com.application.wechatmp.listener;

import java.util.Timer;
import java.util.TimerTask;
import java.util.logging.Logger;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import com.application.framework.util.AppSettingFactory;
import com.application.weixin.util.WeiXinUtils;

/**
 * 
 * <p>
 * Title: 微信获取访问微信企业号access_token类
 * </p>
 * <p>
 * Description: 每间隔两个小时重新获取一下和微信企业类之间的 access_toke
 * </p>
 * <p>
 * Copyright: Copyright (c) 2017>
 * <p>
 * Company: 长城数字[www.e-u.cn]
 * </p>
 * 
 * @author liuyunpeng
 * @version $Revision: 1.14 $
 */
public class MPWeiXinAccessToken implements ServletContextListener {

	
	/** 手机智能监控平台AccessToken */
	public static String phoneWarn_access_token = "";
	
	/** jsapi_ticket是H5应用调用微信公众号JS接口的临时票据  */
	public static String jsapi_ticket = "";

	private Timer timer = null;

	@Override
	public void contextDestroyed(ServletContextEvent arg0) {
		timer.cancel();
	}

	@Override
	public void contextInitialized(ServletContextEvent arg0) {
		// 初始化AppSettingFactory
		AppSettingFactory appSettingFactory = AppSettingFactory.getInstance();
		
		// access_token有效时间
		int accessTokenTime = Integer.parseInt(appSettingFactory.getAppSetting("accessTokenTime").trim());

		timer = new Timer(true);// 创建一个新计时器，可以指定其相关的线程作为守护程序运行。
		// 设置任务计划，启动和间隔时间
		timer.schedule(new contractTask(), 0, accessTokenTime);

	}

	/**
	 * 
	* <p>Title: 用类每间隔2个小时来重新获取一下access_tokne的静态内部类</p>
	* <p>Description: 每间隔两个小时重新获取一下和微信企业类之间的 access_token</p>
	* <p>Copyright: Copyright (c) 2017</p>
	* <p>Company: 长城数字[www.e-u.cn]</p>
	* @author liuyunpeng
	 * @version $Revision: 1.14 $
	 */
	class contractTask extends TimerTask {
		
		public void run() {
			
			// 获取accss_token 
			excute();
			
		}

		private void excute() {
			try {
                
				Logger log = Logger.getLogger("微信端获取Access_token企业号唯一票据！");
				
				// 初始化AppSettingFactory
				AppSettingFactory appSettingFactory = AppSettingFactory.getInstance();
				
				
				// 手机智能监控平台AccessToken URL链接
			    String phoneWarnUrl = appSettingFactory.getAppSetting("public_weixin_accessTokenURL") + "&appid=" + appSettingFactory.getAppSetting("public_weixin_appID") + "&secret="+appSettingFactory.getAppSetting("public_weixin_appsecret") ;
			    String tempPhoneWarn_access_token = WeiXinUtils.getWeiXinInfo(phoneWarnUrl, "access_token");
			    phoneWarn_access_token = tempPhoneWarn_access_token;
			    log.info("手机智能监控平台AccessToken :" + phoneWarn_access_token);
			    
				String jsapi_ticket_url = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token="+ phoneWarn_access_token +"&type=jsapi";
				String tempJsapi_ticket = WeiXinUtils.getWeiXinInfo(jsapi_ticket_url, "ticket");
				jsapi_ticket = tempJsapi_ticket;
				log.info("获取jsapi_ticket:" + jsapi_ticket);
				
			} catch (Exception e) {    
				e.printStackTrace();   
				try {
					Thread.sleep(60000);  //线程睡眠1分钟后，再次执行
				} catch (InterruptedException e1) {
					e1.printStackTrace();
				}
				excute();
			}
		}

	}

}
