/**
* Copyright (c)  2017， 西安长城数字软件有限公司[www.e-u.cn]。
*
*/
package com.application.weixin.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.application.framework.base.controller.BaseController;
import com.application.framework.util.AppSettingFactory;
import com.application.weixin.dto.WeixinDepartmentDTO;
import com.application.weixin.dto.WeixinEmployeeDTO;
import com.application.weixin.service.WeixinService;
import com.application.weixin.util.AesException;
import com.application.weixin.util.QRCodeUtils;
import com.application.weixin.util.SHA1;
import com.application.weixin.util.WeiXinUtils;

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
	 * @param attr
	 *            RedirectAttributes 重定向
	 * @param model
	 *            Model对象用于设置页面数据
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
	 * @param model
	 *            Model对象用于设置页面数据
	 * @param aMap
	 *            Map 对象页面传入参数集合：
	 *            <p>
	 *            <li>key=userid 企业微信用户Id</li>
	 *            </p>
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
	 * @param model
	 *            Model对象用于设置页面数据
	 * @param weixinEmployeeDTO
	 *            企业微信人员DTO
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
	 * @param model
	 *            Model对象用于设置页面数据
	 * @param userid
	 *            企业微信用户Id
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
	 * @param model
	 *            Model对象用于设置页面数据
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
	 * @param model
	 *            Model对象用于设置页面数据
	 * @param depID
	 *            部门ID
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
	 * 生成微信获取登录二维码
	 * 
	 * @param response
	 * @throws Exception
	 *             抛出异常
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
	 * @throws Exception
	 *             抛出异常
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
