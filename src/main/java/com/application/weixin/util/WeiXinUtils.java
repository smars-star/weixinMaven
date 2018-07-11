/**
 * Copyright (c) 2017， 西安长城数字软件有限公司[www.e-u.cn]。
 *
 */
package com.application.weixin.util;

import java.io.InputStream;
import java.io.OutputStreamWriter;
import java.io.StringWriter;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSocketFactory;
import javax.servlet.http.HttpServletResponse;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;

import net.sf.json.JSONObject;

import org.apache.commons.lang3.StringUtils;

import com.application.weixin.dto.WeixinMessageDTO;

/**
 * 微信WeixinUtil工具类
 * 
 * @author $Author: liuyunpeng $
 * @version $Revision: 1.0 $
 */
public class WeiXinUtils{

    /**
     * 根据url链接和要获取的字段，查询要获取的字段的value值
     * @param url String对象用于访问第三方服务
     * @param messageName String对象用于当访问第三方服务返回的信息，得到相对应的字段信息
     * @return String 返回 根据messageName获取的字段信息
     * @throws Exception
     */
    public static String getWeiXinInfo(String url, String messageName) {

        try {
            // 链接
            URL getUrl = null;

            // 创建一个管理证书的任务管理器
            // TrustManager[] tm = { new
            // gds.office.weixin.weixin.dto.MyX509TrustManager() };

            // 创建SSL安全链接
            SSLContext sslContext = SSLContext.getInstance("SSL", "SunJSSE");
            sslContext.init(null, null, new java.security.SecureRandom());
            // 从上述SSLContext对象中得到SSLSocketFactory对象
            SSLSocketFactory ssf = sslContext.getSocketFactory();

            // 根据URL链接第三方服务
            // 和第三方服务建立连接通道
            getUrl = new URL(url);
            HttpsURLConnection http = (HttpsURLConnection) getUrl.openConnection();
            http.setSSLSocketFactory(ssf);
            http.setRequestMethod("GET");
            http.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
            http.setDoOutput(true);
            http.setDoInput(true);
            http.connect();

            // 获取访问URL获取的信息
            InputStream is = http.getInputStream();
            StringBuilder sb = new StringBuilder();
            int i = 0;
            byte[] b = new byte[1024];
            while ((i = is.read(b)) != -1) {
                String read = new String(b, 0, i, "UTF-8");
                sb.append(read);
            }

            // 关闭和第三方建立的连接通道
            is.close();

            // 从返回信息中，获取要获取的字段信息
            JSONObject json = JSONObject.fromObject(sb.toString());
            if (messageName.isEmpty()) {
                messageName = json.toString();
            } else {
                messageName = json.get(messageName).toString();
            }

         
        } catch (Exception e) {
            e.printStackTrace();
        }
        // 返回获取的信息
        return messageName;
    }

    /**
     * 发送企业微信消息
     * @param accessToken AccessToken对象用于访问企业微信接口的证书
     * @param url String对象用于发送企业微信消息链接
     * @param toUser String对象用于消息接收人(人员NO)
     * @param agentID Int对象用于发送消息的企业微信应用ID
     * @param content String对象用于发送企业微信消息内容
     * content:文本消息、voice:语音消息、file：文件消息、textcard：卡片消息内容、news：图文消息内容
     * @param msgtype String对象用发送企业微信消息类型
     * @throws Exception
     */
    @SuppressWarnings("static-access")
    public static void sendWeixinMessageByPost(String url, String accessToken, int agentID, String toUser,
            String content, String msgtype) throws Exception {
        if (!url.isEmpty()) {

            // 创建一个管理证书的任务管理器
            // TrustManager[] tm = { new
            // gds.office.weixin.weixin.dto.MyX509TrustManager() };
            SSLContext sslContext = SSLContext.getInstance("SSL", "SunJSSE");
            sslContext.init(null, null, new java.security.SecureRandom());

            // 从上述SSLContext对象中得到SSLSocketFactory对象
            SSLSocketFactory ssf = sslContext.getSocketFactory();
            URL getUrl = null;

            // 对数据进行分装
            WeixinMessageDTO userDTO = new WeixinMessageDTO();
            userDTO.setAgentid(agentID);
            userDTO.setMsgtype(msgtype);
            userDTO.setTouser(toUser);
            userDTO.setSafe(0);
            Map<String, String> text = new HashMap<String, String>();
            text.put("content", content);
            userDTO.setText(text);

            JSONObject jsonObject = new JSONObject().fromObject(userDTO);

            // 打开URL链接
            getUrl = new URL(url);
            HttpsURLConnection http = (HttpsURLConnection) getUrl.openConnection();
            http.setSSLSocketFactory(ssf);

            http.setRequestMethod("POST");
            http.setRequestProperty("Content-Type", "application/json;charset=utf-8");
            http.setRequestProperty("Connection", "Keep-Alive");// 维持长连接
            http.setRequestProperty("Charset", "UTF-8");
            http.setDoOutput(true);
            http.setDoInput(true);
            http.connect();

            // 建立输入流，向指向的URL传入参数
            OutputStreamWriter osw = new OutputStreamWriter(http.getOutputStream(), "UTF-8");
            osw.write(jsonObject.toString());
            osw.flush();
            osw.close();

            // 这句才是真正发送请求
            http.getInputStream();

        }
    }

    /**
     * 使用Post方式访问http 链接,对微信发送对象信息
     * @param url String对象用于访问第三方链接
     * @param object Object对象用于要发送的对象信息
     * @param errmsg String对象用于报错时，返回的提示信息
     * @return String 返回访问企业微信失败时的提示信息
     * @throws Exception
     */
    @SuppressWarnings("static-access")
    public static String sendHttpWeixinBodyByPost(String url, Object object, String errmsg){
        
        //获取返回JSON数据对象
        JSONObject json = null;
        try {
            // 创建一个管理证书的任务管理器
            // TrustManager[] tm = { new
            // gds.office.weixin.weixin.dto.MyX509TrustManager() };
            SSLContext sslContext = SSLContext.getInstance("SSL", "SunJSSE");
            sslContext.init(null, null, new java.security.SecureRandom());

            // 从上述SSLContext对象中得到SSLSocketFactory对象
            SSLSocketFactory ssf = sslContext.getSocketFactory();
            URL getUrl = null;

            JSONObject jsonObject = new JSONObject().fromObject(object);

            // 打开URL链接
            getUrl = new URL(url);
            HttpsURLConnection http = (HttpsURLConnection) getUrl.openConnection();
            http.setSSLSocketFactory(ssf);

            http.setRequestMethod("POST");
            http.setRequestProperty("Content-Type", "application/json;charset=utf-8");
            http.setRequestProperty("Connection", "Keep-Alive");// 维持长连接
            http.setRequestProperty("Charset", "UTF-8");
            http.setDoOutput(true);
            http.setDoInput(true);
            http.connect();

            // 建立输入流，向指向的URL传入参数
            OutputStreamWriter osw = new OutputStreamWriter(http.getOutputStream(), "UTF-8");
            osw.write(jsonObject.toString());
            osw.flush();
            osw.close();

            // 这句才是真正发送请求
            http.getInputStream();

            // 返回信息
            InputStream is = http.getInputStream();
            int size = is.available();
            byte[] b = new byte[size];
            is.read(b);
            is.close();
            String message = new String(b, "UTF-8");
            json = JSONObject.fromObject(message);
        } catch (Exception e) {
            e.printStackTrace();
        }

        // 返回访问企业微信失败时的提示信息
        return json.get(errmsg).toString();
    }

    /**
     * 
     * 使用Get方式访问http 链接,对微信发送对象信息
     * @param url String对象用于访问第三方链接
     * @param str String对象用于要发送的对象信息
     * @param errmsg String对象用于报错时，返回的提示信息
     * @return String 返回访问企业微信失败时的提示信息
     * @throws Exception
     */
    @SuppressWarnings("static-access")
    public static String sendHttpWeixinBodyByGet(String url, String str, String errmsg){
        //获取返回JSON数据对象
        JSONObject json = null; 
        
        try {
            // 创建一个管理证书的任务管理器
            // TrustManager[] tm = { new
            // gds.office.weixin.weixin.dto.MyX509TrustManager() };
            SSLContext sslContext = SSLContext.getInstance("SSL", "SunJSSE");
            sslContext.init(null, null, new java.security.SecureRandom());

            // 从上述SSLContext对象中得到SSLSocketFactory对象
            SSLSocketFactory ssf = sslContext.getSocketFactory();
            URL getUrl = null;

            // 打开URL链接
            getUrl = new URL(url);
            HttpsURLConnection http = (HttpsURLConnection) getUrl.openConnection();
            http.setSSLSocketFactory(ssf);

            http.setRequestMethod("GET");
            http.setRequestProperty("Content-Type", "application/json;charset=utf-8");
            http.setRequestProperty("Connection", "Keep-Alive");// 维持长连接
            http.setRequestProperty("Charset", "UTF-8");
            http.setDoOutput(true);
            http.setDoInput(true);
            http.connect();

            // 建立输入流，向指向的URL传入参数
            if (!StringUtils.isEmpty(str)) {
                JSONObject jsonObject = new JSONObject().fromObject(str);
                OutputStreamWriter osw = new OutputStreamWriter(http.getOutputStream(), "UTF-8");
                osw.write(jsonObject.toString());
                osw.flush();
                osw.close();
            }

            // 这句才是真正发送请求
            http.getInputStream();

            // 返回信息
            InputStream is = http.getInputStream();
            int size = is.available();
            byte[] b = new byte[size];
            is.read(b);
            is.close();
            String message = new String(b, "UTF-8");
            json = JSONObject.fromObject(message);
            
        } catch (Exception e) {
            e.printStackTrace();
        }
        
        // 返回访问企业微信失败时的提示信息
        return json.get(errmsg).toString();
    }

    /**
     * 获取人员微信头像
     * @param user_userid_infoUrl String对象用于获取微信人员头像url
     * @param employeeNo String对象用于企业微信人员编号
     * @param access_token String对象用访问微信服务器密钥
     * @return photoUrl 返回人员微信头像地址
     * @throws Exception 抛出异常
     */
    public static String getWeixinPhotoUrl(String user_userid_infoUrl, String employeeNo ,String access_token) throws Exception {
        // 从微信里面获取当前人的微信头像
        String photoUrl = WeiXinUtils.getWeiXinInfo(user_userid_infoUrl + "access_token="
                + access_token + "&userid=" + employeeNo, "avatar");

        // 返回微信头像链接地址
        return photoUrl;
    }

    /**
     * 将对象直接转换成String类型的 XML输出
     * @param obj Object对象用于把对象数据格式转换成xml格式
     * @return photoUrl 返回人员微信头像地址
     * @throws JAXBException
     */
    public static String convertToXml(Object obj) throws JAXBException {
        // 创建输出流
        StringWriter sw = new StringWriter();

        // 利用jdk中自带的转换类实现
        JAXBContext context = JAXBContext.newInstance(obj.getClass());
        Marshaller marshaller = context.createMarshaller();
        // 格式化xml输出的格式
        marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, Boolean.TRUE);
        // 将对象转换成输出流形式的xml
        marshaller.marshal(obj, sw);

        // 返回xml格式数据
        return sw.toString();
    }

    /**
     * 解决跨域JSON数据乱码问题
     * @param response HttpServletResponse 对象用于
     * @return 返回设置UTF-8格式后的HttpServletResponse对象
     */
    public static HttpServletResponse setResponseContent(HttpServletResponse response) {
        // 解决乱码问题
        response.setContentType("text/html; charset=utf-8");
        
        // 解决ajax跨域问题
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
        response.setHeader("Access-Control-Max-Age", "3600");
        response.setHeader("Access-Control-Allow-Headers", "x-requested-with");
        
        //返回HttpServletResponse对象
        return response;
    }

}
