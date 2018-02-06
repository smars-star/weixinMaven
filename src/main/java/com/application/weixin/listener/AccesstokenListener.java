/**
 * Copyright (c) 2017， 西安长城数字软件有限公司[www.e-u.cn]。
 *
 */
package com.application.weixin.listener;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Timer;
import java.util.TimerTask;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

/**
 * 访问微信服务器钥匙(Access_token)
 * 
 * @author $Author: liuyunpeng $
 * @version $Revision: 1.0 $
 */
public class AccesstokenListener implements ServletContextListener {

	@Override
	public void contextDestroyed(ServletContextEvent arg0) {
    
	}

	@Override
	public void contextInitialized(ServletContextEvent arg0) {
		Logger logger = LogManager.getLogger("mylog");  
		
		// 创建一个新计时器，可以指定其相关的线程作为守护程序运行。
		Timer timer = new Timer();
		
		// 创建TimeTask
		TimerTask timerTask = new TimerTask() {
			
			@Override
			public void run() {
				DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss:ms");
				LocalDateTime localDateTime = LocalDateTime.now();
				//System.out.println("现在时间：" + dateTimeFormatter.format(localDateTime));
				logger.info("执行时间：" + dateTimeFormatter.format(localDateTime));
			}
		};
		
		// 设置任务计划，启动和间隔时间
		timer.scheduleAtFixedRate(timerTask, 1000, 1000 * 60);
	}

}
