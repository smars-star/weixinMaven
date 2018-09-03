package com.application.wechatmp.listener;


import java.util.List;
import java.util.Timer;
import java.util.TimerTask;
import java.util.logging.Logger;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;




import com.alibaba.druid.util.StringUtils;
import com.application.framework.util.AppSettingFactory;
import com.application.wechatmp.dto.WeixinPublicEmployeeDTO;
import com.application.weixin.util.WeiXinUtils;

public class MPAccessTokenListener implements ServletContextListener {
	
	/**  关注公众号人员信息集合 */
	public static List<WeixinPublicEmployeeDTO> employeeList = null;

	private Timer timer = null;


	@Override
	public void contextDestroyed(ServletContextEvent arg0) {
		timer.cancel();
	}

	@Override
	public void contextInitialized(ServletContextEvent arg0) {
		
		// employeeList有效时间
		int accessTokenTime = 1000*60*10;

		// 创建一个新计时器，可以指定其相关的线程作为守护程序运行。
		timer = new Timer(true);
		// 设置任务计划，启动和间隔时间
		timer.schedule(new contractTask(), 0, accessTokenTime);
	}
	
	

	/**
	 * 微信公众号人员List集合，每间隔5分钟执行一次
	 * @author $Author: liuyunpeng $
	 * @version $Revision: 1.0 $
	 */
	class contractTask extends TimerTask {
		
		public void run() {
			
			// 获取employeeList
			excute();
			
		}

		@SuppressWarnings({ "static-access", "unchecked" })
		private void excute() {
			try {
				Logger log = Logger.getLogger("微信公众号关注人员集合！");
				
				// 初始化AppSettingFactory
				AppSettingFactory appSettingFactory = AppSettingFactory.getInstance();
				
				// 如果手机微信端access_token为空，休眠10秒
				if( StringUtils.isEmpty( MPWeiXinAccessToken.phoneWarn_access_token) ){
					Thread.sleep(10000);
				}
				
				// 获取用户openid列表URL
				String userURL = appSettingFactory.getAppSetting("public_weixin_openidURL")+ MPWeiXinAccessToken.phoneWarn_access_token;
				System.out.println("userURL="+userURL);
				
				// 获取用户列表
				String userList = WeiXinUtils.getWeiXinInfo(userURL, "data");
				JSONObject jsonObject = JSONObject.fromObject(userList);
				JSONArray openIDs = JSONArray.fromObject(jsonObject.getString("openid"));

				// 对用批量获取用户基本信息数据进行封装
				JSONArray openIDArray = new JSONArray();
				for (int i = 0; i < openIDs.size(); i++) {
					JSONObject jsonUser = new JSONObject();
					jsonUser.put("openid", openIDs.get(i));
					jsonUser.put("lang", "zh_CN");
					openIDArray.add(jsonUser);
				}
				JSONObject user_list_object = new JSONObject();
				user_list_object.put("user_list", openIDArray);

				// 批量获取关注公众号人员详细信息URL
				String userInfoURL = appSettingFactory.getAppSetting("public_weixin_openidInfoURL")
						   + MPWeiXinAccessToken.phoneWarn_access_token;
				
				// 批量获取用户基本信息列表
				String userInfoList = WeiXinUtils.getWeiXinInfoByPost(userInfoURL, user_list_object, "user_info_list");
				
				// 对JSONArray数据进行封装
				JSONArray jsonEmpArray = new JSONArray().fromObject(userInfoList);
				System.out.println("empJsonArray:"+jsonEmpArray);
				employeeList = (List<WeixinPublicEmployeeDTO>) jsonEmpArray.toCollection(jsonEmpArray,
								WeixinPublicEmployeeDTO.class);

				log.info("获取微信公众号关注人员List集合:" + employeeList);
				
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
