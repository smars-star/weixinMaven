/**
* Copyright (c)  2017， 西安长城数字软件有限公司[www.e-u.cn]。
*
*/
package com.application.weixin.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.net.ssl.HttpsURLConnection;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.application.framework.base.controller.BaseController;
import com.application.framework.util.AppSettingFactory;
import com.application.weixin.constant.PhoneWarningConstant;
import com.application.weixin.dto.WeixinDepartmentDTO;
import com.application.weixin.dto.WeixinEmployeeDTO;
import com.application.weixin.dto.WeixinPublicEmployeeDTO;
import com.application.weixin.listener.WeiXinAccessTokenListener;
import com.application.weixin.service.WeixinService;
import com.application.weixin.util.AesException;
import com.application.weixin.util.SHA1;
import com.application.weixin.util.WeiXinUtils;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;



/**
 * 微信Controller.java : 微信测系统，主要包括微信的access_token、管理通讯录、发送微信消息、微信JS-SDK等操作。
 * 
 * @author $Author: liuyunpeng $
 * @version $Revision: 1.0 $
 */
@RequestMapping("/weixin")
@Controller
public class WeixinController extends BaseController {

	/**
	 * 注入微信server接口
	 */
	@Autowired
	private WeixinService weixinServiceImpl;

	/**
	 * 查询企业微信上所有的人员信息
	 * 
	 * @param attr RedirectAttributes 重定向
	 * @param model Model对象用于设置页面数据
	 * @return String 跳转页面
	 * @throws Exception
	 */
	@SuppressWarnings({ "static-access" })
	@RequestMapping("/findAddressBookEmpInfo.do")
	public String findAddressBookEmpInfo(HttpServletRequest request, Model model, String department) {
		// 获取企业微信部门信息
		List<WeixinDepartmentDTO> departmentList = this.weixinServiceImpl.findWeixinDepList();

		// 设置企业微信通讯录部门人员信息
		// 企业微信通讯录人员信息集合
		List<WeixinEmployeeDTO> employeeList = null;
		if (StringUtils.isEmpty(department)) {
			// 获取企业微信通讯录部门下的所有员工信息
			employeeList = this.weixinServiceImpl.findWeixinEmpList("1");
		} else {
			// 部门Id不为空,获取企业微信通信录当前部门下的所有人员信息
			employeeList = this.weixinServiceImpl.findWeixinEmpList(department);
		}

		// 设置页面数据
		model.addAttribute("departmentList", new JSONArray().fromObject(departmentList));
		model.addAttribute("employeeList", new JSONArray().fromObject(employeeList));
		model.addAttribute("department", department);

		// 返回页面
		return "/weixin/findAddressBookEmpInfo";
	}

	/**
	 * 查询企业微信部门人员信息
	 * 
	 * @param model
	 *            Model对象用于设置页面数据
	 * @param aMap
	 *            Map 对象页面传入参数集合：
	 *            <p>
	 *            <li>key=userid 企业微信用户Id</li>
	 *            <li>key=departmentID 企业微信部门Id</li>
	 *            </p>
	 * @return String 跳转页面
	 * @throws IOException
	 */
	@SuppressWarnings("static-access")
	@RequestMapping("/findDepEmployee")
	public void findDepEmployee(HttpServletRequest request, HttpServletResponse response,
			@RequestParam Map<String, String> map) throws IOException {
		// 获取部门人员信息
		List<WeixinEmployeeDTO> employeeList = this.weixinServiceImpl.findWeixinEmpList(map.get("departmentID"));

		// 解决跨域乱码问题
		WeiXinUtils.setResponseContent(response);

		// 设置页面数据
		response.getWriter().println(new JSONArray().fromObject(employeeList));
	}

	/**
	 * 初始化修改企业微信通讯录人员信息页面
	 * 
	 * @param model Model对象用于设置页面数据
	 * @param aMap Map 对象页面传入参数集合：
	 * <p>
	 *   <li>key=userid 企业微信用户Id</li>
	 * </p>
	 * @return String 跳转页面
	 * @throws Exception
	 */
	@SuppressWarnings("static-access")
	@RequestMapping("/preModifyWexinEmp")
	public String preModifyWexinEmp(HttpServletRequest request, Model model, String userid) throws Exception {
		// 获取企业微信通信录人员信息
		WeixinEmployeeDTO weixinEmpDTO = this.weixinServiceImpl.getWeixinEmployee(userid);

		// 获取部门信息
		List<WeixinDepartmentDTO> departmentDTOs = this.weixinServiceImpl.findWeixinDepList();

		// 设置页面数据
		model.addAttribute("weixinEmpDTO", weixinEmpDTO);
		model.addAttribute("departmentDTOs", new JSONArray().fromObject(departmentDTOs));

		// 返回页面
		return "/weixin/modifyEmp";
	}

	/**
	 * 更新微信通讯录人员信息
	 * 
	 * @param model Model对象用于设置页面数据
	 * @param weixinEmployeeDTO 企业微信人员DTO
	 * @return String 跳转页面
	 * @throws Exception
	 */
	@RequestMapping("/modifyEmp.do")
	public String modifyEmp(HttpServletRequest request, HttpServletResponse response, Model model,
			WeixinEmployeeDTO weixinEmployeeDTO) {
		// 跳转页面
		String urlPage = "";
		// 获取企业微信提示信息
		String system_operation_info = "";

		// 获取修改企业微信通讯录人员 返回信息
		String updateStr = this.weixinServiceImpl.modifyWeixinEmployee(weixinEmployeeDTO);

		if ("updated".equals(updateStr)) {
			urlPage = "/common/doSuccessed";
			system_operation_info = "更新成功！";
		} else {
			urlPage = "/common/showMessage";
			system_operation_info = "更新失败！errmsg：" + updateStr;
		}

		// 设置页面数据
		model.addAttribute("SYSTEM_OPERATION_INFO", system_operation_info);

		// 返回页面
		return urlPage;
	}

	/**
	 * 删除人员信息
	 * 
	 * @param model  Model对象用于设置页面数据
	 * @param userid 企业微信用户Id
	 * @return String 跳转页面
	 * @throws Exception
	 */
	@RequestMapping("/deleteEmp")
	public String deleteEmp(Model model, String userid) throws Exception {
		// 跳转页面
		String urlPage = "";
		// 获取企业微信提示信息
		String system_operation_info = "";

		// 删除企业微信通讯录人员信息
		String deleteStr = this.weixinServiceImpl.deleteWeixinEmployee(userid);
		if ("deleted".equals(deleteStr)) {
			urlPage = "/common/doSuccessed";
			system_operation_info = "删除成功！";
		} else {
			urlPage = "/common/showMessage";
			system_operation_info = "删除失败！errmsg：" + deleteStr;
		}

		// 设置页面数据
		model.addAttribute("SYSTEM_OPERATION_INFO", system_operation_info);

		// 返回页面
		return urlPage;
	}

	/**
	 * 初始化添加企业微信通讯录人员页面
	 * 
	 * @param model Model对象用于设置页面数据
	 * @return String 跳转页面
	 * @throws Exception
	 */
	@SuppressWarnings({ "static-access" })
	@RequestMapping("/preAddEmp")
	public String preAddEmp(HttpServletRequest request, Model model) {
		// 获取部门信息
		List<WeixinDepartmentDTO> departmentList = this.weixinServiceImpl.findWeixinDepList();

		// 设置页面数据
		model.addAttribute("departmentList", new JSONArray().fromObject(departmentList));

		// 返回页面
		return "/weixin/addEmp";
	}

	/**
	 * 添加人员信息
	 * 
	 * @param model
	 *            Model对象用于设置页面数据
	 * @param weixinEmployeeDTO
	 *            企业微信人员DTO
	 * @return String 跳转页面
	 * @throws ConstantToMapException
	 */
	@RequestMapping("/addEmp")
	public String addEmp(Model model, WeixinEmployeeDTO weixinEmployeeDTO) {
		// 跳转页面
		String urlPage = "";
		// 获取企业微信提示信息
		String system_operation_info = "";

		// 添加企业微信通讯录人员信息
		String addStr = this.weixinServiceImpl.addWeixinEmployee(weixinEmployeeDTO);
		if ("created".equals(addStr)) {
			urlPage = "/common/doSuccessed";
			system_operation_info = "添加成功！";
		} else {
			urlPage = "/common/showMessage";
			system_operation_info = "添加失败！errmsg：" + addStr;
		}

		// 设置页面数据
		model.addAttribute("SYSTEM_OPERATION_INFO", system_operation_info);

		// 返回页面
		return urlPage;
	}

	/**
	 * 初始化添加部门页面
	 * 
	 * @param model
	 *            Model对象用于设置页面数据
	 * @return String 跳转页面
	 * @throws Exception
	 */
	@RequestMapping("/preAddDep.do")
	public String preAddDep(HttpServletRequest request, HttpServletResponse response, Model model) {
		// 获取微信部门信息集合
		List<WeixinDepartmentDTO> departmentList = this.weixinServiceImpl.findWeixinDepList();

		// 设置页面数据
		model.addAttribute("departmentList", departmentList);

		// 返回页面
		return "/weixin/addDep";
	}

	/**
	 * 添加企业微信部门信息
	 * 
	 * @param model
	 *            Model对象用于设置页面数据
	 * @param weixinDepartmentDTO
	 *            企业微信部门信息
	 * @return String 跳转页面
	 * @throws Exception
	 */
	@RequestMapping("/addDep")
	public String addDep(HttpServletRequest request, HttpServletResponse response, Model model,
			WeixinDepartmentDTO weixinDepartmentDTO) {
		// 跳转页面
		String urlPage = "";
		// 获取企业微信提示信息
		String system_operation_info = "";

		// 添加企业微信通讯录部门
		String addStr = this.weixinServiceImpl.addWexinDep(weixinDepartmentDTO);
		if ("created".equals(addStr)) {
			urlPage = "/common/doSuccessed";
			system_operation_info = "添加成功！";
		} else {
			urlPage = "/common/showMessage";
			system_operation_info = "添加失败！errmsg：" + addStr;
		}

		// 设置页面数据
		model.addAttribute("SYSTEM_OPERATION_INFO", system_operation_info);

		// 返回页面
		return urlPage;
	}

	/**
	 * 删除企业微信部门信息
	 * 
	 * @param model Model对象用于设置页面数据
	 * @param depID 部门ID
	 * @return String 跳转页面
	 * @throws ConstantToMapException
	 */
	@RequestMapping("/deleteDep")
	public String deleteDep(HttpServletRequest request, HttpServletResponse response, Model model, String depID) {
		// 跳转页面
		String urlPage = "";
		// 获取企业微信提示信息
		String system_operation_info = "";

		// 删除企业微信通讯录部门
		String deleteStr = this.weixinServiceImpl.deleteWeixinDep(depID);
		if ("deleted".equals(deleteStr)) {
			urlPage = "/common/doSuccessed";
			system_operation_info = "删除成功！";
		} else {
			urlPage = "/common/showMessage";
			system_operation_info = "删除失败！errmsg：" + deleteStr;
		}

		// 设置页面数据
		model.addAttribute("SYSTEM_OPERATION_INFO", system_operation_info);

		// 返回页面
		return urlPage;
	}

	/**
	 * 修改部门信息
	 * 
	 * @param model
	 *            Model对象用于设置页面数据
	 * @param weixinDepartmentDTO
	 *            企业微信部门DTO
	 * @return String 跳转页面
	 */
	@RequestMapping("/modifyDep.do")
	public String modifyDep(HttpServletRequest request, HttpServletResponse response, Model model,
			WeixinDepartmentDTO weixinDepartmentDTO) {
		// 跳转页面
		String urlPage = "";
		// 获取企业微信提示信息
		String system_operation_info = "";

		// 修改企业微信通讯录部门信息
		String updateStr = this.weixinServiceImpl.modifyWeixinDep(weixinDepartmentDTO);
		if ("updated".equals(updateStr)) {
			urlPage = "/common/doSuccessed";
			system_operation_info = "更新成功！";
		} else {
			urlPage = "/common/showMessage";
			system_operation_info = "更新失败！errmsg：" + updateStr;
		}

		// 设置页面数据
		model.addAttribute("SYSTEM_OPERATION_INFO", system_operation_info);

		// 返回页面
		return urlPage;
	}

	/**
	 * 获取微信通讯录部门信息集合
	 * 
	 * @param model
	 *            Model对象用于设置页面数据
	 * @return String 跳转页面
	 */
	@SuppressWarnings("static-access")
	@RequestMapping("/findAddressBookDepInfo.do")
	public String findAddressBookDepInfo(Model model) throws Exception {
		// 获取部门信息
		List<WeixinDepartmentDTO> departmentList = this.weixinServiceImpl.findWeixinDepList();

		// 设置页面数据
		model.addAttribute("departmentList", new JSONArray().fromObject(departmentList));

		// 返回页面
		return "/weixin/findAddressBookDepInfo";
	}

	/**
	 * 同步企业微信通讯录人员信息
	 * 
	 * @param attr
	 *            RedirectAttributes 重定向
	 * @return String 跳转页面
	 * @throws IOException
	 */
	@RequestMapping("/synchWeixinEmp")
	public void synchWeixinEmp(Model model) throws IOException {
		// 获取企业微信提示信息
		String system_operation_info = "";

		// 同步企业微信通讯录人员信息
		boolean isSynchronized = this.weixinServiceImpl.isSynchWeixinEmp();
		if (isSynchronized) {
			system_operation_info = "同步企业微信通讯录人员成功！";
		} else {
			system_operation_info = "更新企业微信通讯录人员失败！";
		}

		// 返回页面信息
		reponse.getWriter().println(system_operation_info);
	}

	/**
	 * 开启微信办公系统-回调模式
	 * 
	 * @param <WXBizMsgCrypt>
	 * @param request
	 * @param response
	 * @param model
	 * @return
	 * @throws IOException
	 * @throws AesException
	 */
	@RequestMapping(value = "/openCallBackMode.do")
	public void openCallBackMode(HttpServletRequest request, HttpServletResponse response, Model model)
			throws IOException, AesException {

		// 用于生成签名
		String sToken = "gwdsgzhtoken";
		// 是AES密钥的Base64编码
		// String sEncodingAESKey = "lFATqxpIqVT5v5P0hXOWbbaGLU2URBdlP2Mxny02OTC";

		System.out.println("开始获取签名校验");
		// 微信加密签名，msg_signature结合了企业填写的token、请求中的timestamp、nonce参数、加密的消息体
		String signature = request.getParameter("signature");
		String timestamp = request.getParameter("timestamp");// 微信时间戳
		String nonce = request.getParameter("nonce");// 随机数
		// 加密的随机字符串，以msg_encrypt格式提供。需要解密并返回echostr明文，解密后有random、msg_len、msg、$CorpID四个字段，其中msg即为echostr明文
		// 只有第一次调用时才用
		String echostr = request.getParameter("echostr");

		// 加密
		String sEchoStr = SHA1.checkSignature(sToken, signature, timestamp, nonce);

		PrintWriter out = response.getWriter();
		// 校验签名
		if (sEchoStr != null && sEchoStr != "" && sEchoStr.equals(signature.toUpperCase())) {
			System.out.println("签名校验通过。");
			out.print(echostr);
		} else {
			System.out.println("签名校验失败。");
		}

	}
	
	
	  /**
     *  发送微信公众号消息
     * @param request
     * @param response
	 * @param paramsMap HashMap<String, String> 对象页面传入参数集合：
	 * <p>
	 * <li>key=warningType 警告类型： alarm(告警)、early(预警)</li>
	 * <li>key=userOpenID 发送派警用户openid</li>
	 * <li>key=warningID 对象警告ID</li>
	 * </p>
     * @throws Exception  抛出异常
     */
    @ResponseBody  
    @RequestMapping(value = "/sendUsersMessage.do")  
    public void  sendUsersMessage(HttpServletResponse response, @RequestParam HashMap<String, String> paramsMap,@RequestBody String param) {
    	// 初始化AppSettingFactory
    	AppSettingFactory  appSettingFactory = AppSettingFactory.getInstance();
    	// 消息提示内容 默认失败
    	String messageContent = "faile";
		try {
			// 获取微信公众号模板URL链接
			String url = appSettingFactory.getAppSetting("public_weixin_messageTemplateURL")+WeiXinAccessTokenListener.access_token;
	    	
			// 获取微信公众号消息JSON 内容
	    	JSONObject  messageJSONObject  = getWeixinPublicMessageData(paramsMap,param);
	    	
	    	// 发送微信公众号消息
    		HttpsURLConnection httpsURLConnection = null;
	    	// 预警
	    	if( PhoneWarningConstant.PHONE_WARNING_EARLY.equals(paramsMap.get("warningType")) ){
	    		// 获取微信公众号关注人员集合
	    		//List<WeixinPublicEmployeeDTO> employeeList  = this.phoneWarningServiceImpl.findWeixinPublicEmployeeList(AppSettingFactory.getInstance().getAppSetting("pubic_weixin_phoneWarnGroupid"));
	    		List<WeixinPublicEmployeeDTO> employeeList  = null;
	    		for( int i = 0; i < employeeList.size(); i++){
	    			// 获取发送消息人DTO信息
	    			WeixinPublicEmployeeDTO  weixinPublicEmployeeDTO = employeeList.get(i);
	    			
	    			// 设置发送人openid
	    			JSONObject tempJSON = JSONObject.fromObject(messageJSONObject);
	    			tempJSON.put("touser", weixinPublicEmployeeDTO.getOpenid());
	    			 
	    			// 发送微信公众号消息
			    	//httpsURLConnection = WeiXinUtils.sendWeixinTemplateMessageByPost(url,tempJSON);
			    	System.out.println("预警发送消息,第"+ i +"个JSON内容："+tempJSON);
	    		}
	    		
	    	}else{ // 告警
		    	System.out.println("开始发送消息JSON内容："+messageJSONObject);
	    		// 发送微信公众号消息
	    	    //httpsURLConnection = WeiXinUtils.sendWeixinTemplateMessageByPost(url,messageJSONObject);
	    	}
	    	
			
			// 返回消息执行后JSON
			messageJSONObject = new JSONObject();
			
			// 获取发送微信公众号消息状态返回值
			int httpResponseCode = httpsURLConnection.getResponseCode();
			if(httpResponseCode == 200){
				messageContent = PhoneWarningConstant.STATE_CODE_success ;
			}
			
			// 设置执行发送消息码值
			messageJSONObject.put(PhoneWarningConstant.STATE_CODE, httpResponseCode);
			// 设置执行发送消息与否内容
			messageJSONObject.put(PhoneWarningConstant.MESSAGE, messageContent);
			
    		System.out.println("结束发送消息内容："+messageJSONObject);
			
			//设置JSON数据跨域 编码
			WeiXinUtils.setResponseContent(response);
			response.getWriter().write(messageJSONObject.toString());
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		   
    }
    
   /**
     *  封装微信公众号消息内容JSON
     * @param paramsMap  HashMap<String, String> 参数集合
	 * <p>
	 * <li>key=warningType 警告类型： alarm(告警)、early(预警)</li>
	 * <li>key=userOpenID 发送派警用户openid</li>
	 * <li>key=warningID 对象警告ID</li>
	 * </p>
     * @param param String独享为JSON字符串
     * @return 返回微信公众号消息JSON
     * @throws AppException  抛出异常
     */
    private JSONObject getWeixinPublicMessageData(HashMap<String, String> paramsMap, String param){

    	// 警告类型
    	String warningType = "";
    	// 获取模板消息ID
    	String  template_id = "";
    	// 消息URL链接
    	String messgeURL = "";
    	// 消息接收人openid
    	String userOpenID = "";
    	// 消息标题
    	String title = "";
    	// 告警1
    	String keyword1 = "";
    	// 告警2
    	String keyword2 = "";
        // 备注信息
    	String  remark = "";
    	
    	// 获取告警类型
    	warningType = paramsMap.get("warningType");
    	
    	// 预警
    	if( PhoneWarningConstant.PHONE_WARNING_EARLY.equals(warningType) ){
    		
    		// 获取模板消息ID
	        template_id = AppSettingFactory.getInstance().getAppSetting("public_weixin_messageTemplateID_yjts");
	        
            JSONObject paramObject = JSONObject.fromObject(param);
	        // 消息链接URL
	        messgeURL = paramObject.get("messgeURL").toString();
	        
	        // 告警title
	        title = paramObject.get("title").toString();
	        
	        // 告警内容
	        keyword1 = paramObject.get("warningContent").toString();
	        
	        // 告警时间
	        keyword2 = paramObject.get("warningTime").toString();
	        
	        // 告警备注信息 
	        remark  = paramObject.get("remark").toString();
	        
    	}

    	// 告警
    	if( PhoneWarningConstant.PHONE_WARNING_ALARM.equals(warningType) ){
    		
    	 	// 获取模板消息ID
	        template_id = AppSettingFactory.getInstance().getAppSetting("public_weixin_messageTemplateID_gjts");
	    	
	        /*
	        
	    	// 获取告警信息DTO集合
		    PhoneWarningDTO  phoneWarningDTO = this.phoneWarningServiceImpl.getPhoneWarningDTO(paramsMap.get("warningID").toString());
	    	    	
	    	// 获取微信内置地图导航链接
	        messgeURL =  "http://apis.map.qq.com/uri/v1/marker?marker=coord:"+phoneWarningDTO.getWarninglon()+","+phoneWarningDTO.getWarninglat();

	        // 告警title
	        title = phoneWarningDTO.getWarningTypeName() +"告警：";
	        
	        // 告警时间
	        keyword1 = phoneWarningDTO.getCreatetime();
	        
	        // 告警内容
	        keyword2  = phoneWarningDTO.getDistrict()+phoneWarningDTO.getTown()+phoneWarningDTO.getVillage()
		    		+"【"+ phoneWarningDTO.getLongitude()+"，"+phoneWarningDTO.getLatitude() +"】发生"
		    		+"【"+ phoneWarningDTO.getWarningTypeName() +"】告警，请立即前往查看。";
	        */
	        
	        // 备注信息
	        remark =  "点击链接导航至告警点：" + messgeURL;
	        
	        userOpenID = paramsMap.get("userOpenID").toString();
    	}
    	
    	// 封装公众号模板消息
    	JSONObject jsonObject = new JSONObject();
    	// 消息接收人openID
    	jsonObject.put("touser", userOpenID);
    	// 消息模板ID
    	jsonObject.put("template_id", template_id);
    	// 消息模板链接
    	jsonObject.put("url", messgeURL);
    	// 头部颜色
    	jsonObject.put("topcolor", "#FF0000");
    	
    	// 消息模板内容
        JSONObject  jsonData= new JSONObject();
    	
    	// 消息模块first.DATA
    	JSONObject  jsonObjectFristValue = new JSONObject();
    	jsonObjectFristValue.put("value", title);
    	jsonObjectFristValue.put("color", "#FF0000");
    	jsonData.put("first", jsonObjectFristValue);
    	
    	// 消息模块keyword1.DATA
        JSONObject  jsonObjectkeyword1 = new JSONObject();
    	jsonObjectkeyword1.put("value", keyword1);
    	jsonObjectkeyword1.put("color", "#FF0000");
    	jsonData.put("keyword1", jsonObjectkeyword1);
    	
    	// 消息模块keyword2.DATA
    	JSONObject  jsonObjectkeyword2 = new JSONObject();
    	jsonObjectkeyword2.put("value", keyword2);
    	jsonObjectkeyword2.put("color", "#FF0000");
    	jsonData.put("keyword2", jsonObjectkeyword2);
    	
    	// 消息备注remark.DATA
    	JSONObject  remarkJsonObject = new JSONObject();
    	remarkJsonObject.put("value", remark );
    	remarkJsonObject.put("color", "#173177");
    	jsonData.put("remark", remarkJsonObject);
    	
    	jsonObject.put("data", jsonData);
    	
    	// 返回微信公众号消息JSON
    	return jsonObject;
	}


}
