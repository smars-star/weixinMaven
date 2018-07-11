/**
 * Copyright (c) 2017， 西安长城数字软件有限公司[www.e-u.cn]。
 *
 */
package com.application.weixin.listener;

import java.util.Timer;
import java.util.TimerTask;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.application.framework.util.AppSettingFactory;
import com.application.weixin.util.WeiXinUtils;

/**
 * 访问微信服务器钥匙(Access_token)
 * 
 * @author $Author: liuyunpeng $
 * @version $Revision: 1.0 $
 */
public class WeiXinAccessTokenListener implements ServletContextListener {

	/**
	 * AccessToken是企业号的全局唯一票据，调用接口时需携带AccessToken
	 */
	public static String access_token = "";

	@Override
	public void contextDestroyed(ServletContextEvent arg0) {

	}

	@SuppressWarnings("unused")
	@Override
	public void contextInitialized(ServletContextEvent arg0) {
		// 初始化AppSettingFactory
		AppSettingFactory appSettingFactory = AppSettingFactory.getInstance();
		String accessTokenTimeStr = appSettingFactory.getAppSetting("accessTokenTime");
		int accessTokenTime = Integer.parseInt(accessTokenTimeStr);// access_token有效时间

		Logger logger = LogManager.getLogger("mylog");

		// 创建一个新计时器，可以指定其相关的线程作为守护程序运行。
		Timer timer = new Timer();

		// 设置任务计划，启动和间隔时间
		timer.scheduleAtFixedRate(new ContractTask(), 1000, accessTokenTime);
	}

	/**
	 * 用类每间隔2个小时来重新获取一下access_tokne的静态内部类: 每间隔两个小时重新获取一下和微信企业类之间的 access_token
	 * 
	 * @author $Author: zhansan $
	 * @version $Revision: 1.14 $
	 */
	private class ContractTask extends TimerTask {

		public void run() {

			// 1.获取accss_token
			excute();

		}

		private void excute() {
			try {

				Logger log = LogManager.getLogger("微信端获取Access_token企业号唯一票据！");
				// 初始化AppSettingFactory
				AppSettingFactory appSettingFactory = AppSettingFactory.getInstance();
				String sCorpID = appSettingFactory.getAppSetting("corpID"); // 企业CorpID
				String adminSecret = appSettingFactory.getAppSetting("adminSecret");// 超级管理组

				// String adminSecret =
				// appSettingFactory.getAppSetting("addressBookSecret");//通讯录access_token
				String accessTokenURL = appSettingFactory.getAppSetting("accessTokenURL");// 获取访问微信

				// 访问微信服务器,获取access_token的url链接
				String url = accessTokenURL + "corpid=" + sCorpID + "&corpsecret=" + adminSecret;
				String tempAccess_token = WeiXinUtils.getWeiXinInfo(url, "access_token");
				access_token = tempAccess_token;

				// 打印access_token日志
				log.info("获取Access_token:" + access_token);

			} catch (Exception e) {
				e.printStackTrace();
				try {
					Thread.sleep(60000); // 线程睡眠1分钟后，再次执行
				} catch (InterruptedException e1) {
					e1.printStackTrace();
				}
				excute();
			}
		}

	}

}
