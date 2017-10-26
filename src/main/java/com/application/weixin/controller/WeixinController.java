 /**
 * Copyright (c)  2017， 西安长城数字软件有限公司[www.e-u.cn]。
 *
 */
package com.application.weixin.controller;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.application.weixin.dto.WeixinDepartmentDTO;
import com.application.weixin.dto.WeixinEmployeeDTO;
import com.application.weixin.service.WeixinService;
import com.application.weixin.util.WeiXinUtils;

import net.sf.json.JSONArray;


/**
 * 微信Controller.java :  微信测系统，主要包括微信的access_token、管理通讯录、发送微信消息、微信JS-SDK等操作。
 * 
 * @author $Author: liuyunpeng $
 * @version $Revision: 1.0 $
 */
@RequestMapping("/weixin")
@Controller
public class WeixinController {
	
    /**
     *  注入微信server接口
     */
    @Autowired
    private  WeixinService  weixinServiceImpl;

    /**
     * 查询企业微信上所有的部门信息
     * @param attr RedirectAttributes 重定向
     * @param model Model对象用于设置页面数据
     * @return String 跳转页面
     * @throws Exception 
     */
	@SuppressWarnings({ "static-access" })
    @RequestMapping("/findAddressBookEmpInfo.do")
	public  String  findAddressBookEmpInfo(HttpServletRequest request,Model model,String department){
		//获取企业微信部门信息
		List<WeixinDepartmentDTO>  departmentList = this.weixinServiceImpl.findWeixinDepList();
        
		//设置企业微信通讯录部门人员信息
		//企业微信通讯录人员信息集合		
		List<WeixinEmployeeDTO>  employeeList = null;
		if(StringUtils.isEmpty(department)){
		    //获取企业微信通讯录部门下的所有员工信息
            employeeList = this.weixinServiceImpl.findWeixinEmpList("1");
		}else{
		    //部门Id不为空,获取企业微信通信录当前部门下的所有人员信息
		    employeeList =  this.weixinServiceImpl.findWeixinEmpList(department);
		}
        
		//设置页面数据
        model.addAttribute("departmentList", new JSONArray().fromObject(departmentList));
        model.addAttribute("employeeList", new JSONArray().fromObject(employeeList));
        model.addAttribute("department", department);
	
		//返回页面
		return "/weixin/findAddressBookEmpInfo";
	}
	
	/**
     *  查询部门人员信息
     * @param model Model对象用于设置页面数据
     * @param aMap Map 对象页面传入参数集合：
     * <p>
     * <li>key=userid 企业微信用户Id</li>
     * <li>key=departmentID 企业微信部门Id</li>
     * </p>
     * @return String 跳转页面
	 * @throws IOException 
     */
	@SuppressWarnings("static-access")
    @RequestMapping("/findDepEmployee")
	public  void  findDepEmployee(HttpServletRequest request,HttpServletResponse response,@RequestParam  Map<String,String>map) throws IOException {
	    //获取部门人员信息
	    List<WeixinEmployeeDTO>  employeeList  =  this.weixinServiceImpl.findWeixinEmpList(map.get("departmentID"));
	
	    //解决跨域乱码问题
	    WeiXinUtils.setResponseContent(response);
	    
	    //设置页面数据
	    response.getWriter().println(new JSONArray().fromObject(employeeList));
	}
	

 /**
     *  初始化修改企业微信通讯录人员信息页面
     * @param model Model对象用于设置页面数据
     * @param aMap Map 对象页面传入参数集合：
     * <p>
     * <li>key=userid 企业微信用户Id</li>
     * </p>
     * @return String 跳转页面
     * @throws Exception 
     */
	@SuppressWarnings({ "static-access"})
	@RequestMapping("/preModifyWexinEmp")
	public  String preModifyWexinEmp(HttpServletRequest request,Model model,String userid) throws Exception{
	    //获取企业微信通信录人员信息
		WeixinEmployeeDTO  weixinEmpDTO  =  this.weixinServiceImpl.getWeixinEmployee(userid);
		
		//获取部门信息
		List<WeixinDepartmentDTO>  departmentDTOs = this.weixinServiceImpl.findWeixinDepList();
		 
		//设置页面数据
		model.addAttribute("weixinEmpDTO", weixinEmpDTO);
		model.addAttribute("departmentDTOs", new JSONArray().fromObject(departmentDTOs));
		
		//返回页面
		return "/weixin/modifyEmp";
	}



    /**
     *   更新微信通讯录人员信息
     * @param model Model对象用于设置页面数据
     * @param weixinEmployeeDTO 企业微信人员DTO
     * @return String 跳转页面
     * @throws Exception 
     */
	@RequestMapping("/modifyEmp.do")
	public  String   modifyEmp(HttpServletRequest request,HttpServletResponse response,Model model,WeixinEmployeeDTO weixinEmployeeDTO) {
	    //跳转页面
		String  urlPage = "";
		//获取企业微信提示信息
		String   system_operation_info  = "";
	
	    //获取修改企业微信通讯录人员 返回信息
	    String updateStr = this.weixinServiceImpl.modifyWeixinEmployee(weixinEmployeeDTO);
	    
	    if("updated".equals(updateStr)){
	        urlPage =  "/common/doSuccessed";
	        system_operation_info = "更新成功！";
	    }else{
		    urlPage =  "/common/showMessage";
		    system_operation_info = "更新失败！errmsg："+updateStr ;
	    }
	    
	    //设置页面数据
		model.addAttribute("SYSTEM_OPERATION_INFO",system_operation_info);
		
		//返回页面
		return urlPage;
	}
	
	
	/**
	 *  删除人员信息
	 * @param model Model对象用于设置页面数据
	 * @param userid 企业微信用户Id
	 * @return String 跳转页面
	 * @throws Exception 
	 */
	@RequestMapping("/deleteEmp")
	public String  deleteEmp(Model model,String userid) throws Exception{
        //跳转页面
        String  urlPage = "";
        //获取企业微信提示信息
        String   system_operation_info  = "";
      
        //删除企业微信通讯录人员信息
		String deleteStr =  this.weixinServiceImpl.deleteWeixinEmployee(userid);
		if("deleted".equals(deleteStr)){
		    urlPage =  "/common/doSuccessed";
			system_operation_info = "删除成功！";
	    }else{
		    urlPage =  "/common/showMessage";
	        system_operation_info = "删除失败！errmsg："+deleteStr;
	    }
		
		//设置页面数据
	    model.addAttribute("SYSTEM_OPERATION_INFO", system_operation_info);
	    
	    //返回页面
		return urlPage;
	}
	
	
	/**
     *  初始化添加企业微信通讯录人员页面
     * @param model Model对象用于设置页面数据
     * @return String 跳转页面
     * @throws Exception 
     */
	@SuppressWarnings({"static-access" })
	@RequestMapping("/preAddEmp")
	 public String preAddEmp(HttpServletRequest request,Model model){
		//获取部门信息
		List<WeixinDepartmentDTO>  departmentList =  this.weixinServiceImpl.findWeixinDepList();
		
		//设置页面数据
		model.addAttribute("departmentList", new JSONArray().fromObject(departmentList));
		
		//返回页面
		return "/weixin/addEmp";
	 }
	
	
	/**
	 * 添加人员信息
	 * @param model Model对象用于设置页面数据
	 * @param weixinEmployeeDTO 企业微信人员DTO
	 * @return String 跳转页面
	 * @throws ConstantToMapException 
	 */
	@RequestMapping("/addEmp")
	public  String  addEmp(Model model,WeixinEmployeeDTO weixinEmployeeDTO){
        //跳转页面
        String  urlPage = "";
        //获取企业微信提示信息
        String   system_operation_info  = "";
       
        //添加企业微信通讯录人员信息
		String addStr =  this.weixinServiceImpl.addWeixinEmployee(weixinEmployeeDTO);
		if("created".equals(addStr)){
			  urlPage =  "/common/doSuccessed";
			  system_operation_info = "添加成功！";
	    }else{
			  urlPage =  "/common/showMessage";
			  system_operation_info = "添加失败！errmsg："+addStr;
	    }
		
		//设置页面数据
		model.addAttribute("SYSTEM_OPERATION_INFO", system_operation_info);
		
		//返回页面
		return urlPage;
	}
	
	
	/**
	 *  初始化添加部门页面
	 * @param model Model对象用于设置页面数据
	 * @return String 跳转页面
	 * @throws Exception 
	 */
	@RequestMapping("/preAddDep.do")
	public String  preAddDep(HttpServletRequest request,HttpServletResponse response,Model model){
	    //获取微信部门信息集合
		List<WeixinDepartmentDTO>  departmentList =  this.weixinServiceImpl.findWeixinDepList();
		
		//设置页面数据
		model.addAttribute("departmentList", departmentList);
		
		//返回页面
		return "/weixin/addDep";
	}
	
	
	/**
	 *  添加企业微信部门信息
	 * @param model Model对象用于设置页面数据
	 * @param weixinDepartmentDTO 企业微信部门信息
	 * @return String 跳转页面
	 * @throws Exception 
	 */
	@RequestMapping("/addDep")
	public String addDep(HttpServletRequest request,HttpServletResponse response,Model model,WeixinDepartmentDTO weixinDepartmentDTO) {
        //跳转页面
        String  urlPage = "";
        //获取企业微信提示信息
        String   system_operation_info  = "";

        //添加企业微信通讯录部门
		String addStr = this.weixinServiceImpl.addWexinDep(weixinDepartmentDTO);
		if("created".equals(addStr)){
			urlPage =  "/common/doSuccessed";
			system_operation_info = "添加成功！";
	    }else{
	        urlPage =  "/common/showMessage";
	        system_operation_info = "添加失败！errmsg："+addStr;
	    }
		
		//设置页面数据
        model.addAttribute("SYSTEM_OPERATION_INFO", system_operation_info);
        
        //返回页面
        return urlPage;
	}
	
	/**
	 *   删除企业微信部门信息
	 * @param model Model对象用于设置页面数据
	 * @param depID  部门ID
	 * @return String 跳转页面
	 * @throws ConstantToMapException 
	 */
	@RequestMapping("/deleteDep")
	public  String  deleteDep(HttpServletRequest request,HttpServletResponse response,Model model,String depID){
        //跳转页面
        String  urlPage = "";
        //获取企业微信提示信息
        String   system_operation_info  = "";
        
		//删除企业微信通讯录部门
		String deleteStr = this.weixinServiceImpl.deleteWeixinDep(depID);
		if("deleted".equals(deleteStr)){
		    urlPage =  "/common/doSuccessed";
		    system_operation_info = "删除成功！";
	   }else{
			urlPage =  "/common/showMessage";
			system_operation_info = "删除失败！errmsg："+deleteStr;
	    }
         
		//设置页面数据
        model.addAttribute("SYSTEM_OPERATION_INFO", system_operation_info);
        
        //返回页面
        return urlPage;
	}
	
	/**
	 *  修改部门信息
	 * @param model Model对象用于设置页面数据
	 * @param weixinDepartmentDTO 企业微信部门DTO
	 * @return String 跳转页面
	 */
	@RequestMapping("/modifyDep.do")
	public  String  modifyDep(HttpServletRequest request,HttpServletResponse response,Model model,WeixinDepartmentDTO weixinDepartmentDTO) {
        //跳转页面
        String  urlPage = "";
        //获取企业微信提示信息
        String   system_operation_info  = "";
        
        //修改企业微信通讯录部门信息
		String updateStr =   this.weixinServiceImpl.modifyWeixinDep(weixinDepartmentDTO);
		if("updated".equals(updateStr)){
		    urlPage =  "/common/doSuccessed";
		    system_operation_info =  "更新成功！";
		}else{
			urlPage =  "/common/showMessage";
			system_operation_info =  "更新失败！errmsg："+updateStr;
		}
		  
		//设置页面数据
        model.addAttribute("SYSTEM_OPERATION_INFO", system_operation_info);
        
        //返回页面
        return urlPage;
	}

	/**
	 *  获取微信通讯录部门信息集合
	 * @param model Model对象用于设置页面数据
	 * @return String 跳转页面
	 */
	@SuppressWarnings("static-access")
	@RequestMapping("/findAddressBookDepInfo.do")
   public   String   findAddressBookDepInfo(Model model) throws Exception{
	   //获取部门信息
	   List<WeixinDepartmentDTO>  departmentList =  this.weixinServiceImpl.findWeixinDepList();
	   
	   //设置页面数据
	   model.addAttribute("departmentList", new JSONArray().fromObject(departmentList));
	   
	   //返回页面
	   return "/weixin/findAddressBookDepInfo";
   }	
	
	
	/**
	 *  同步企业微信通讯录人员信息
	 * @param attr RedirectAttributes 重定向
	 * @return String 跳转页面
	 */
	@RequestMapping("/synchWeixinEmp")
	public  String  synchWeixinEmp(Model model) {
	    
	    //同步企业微信通讯录人员信息
	  boolean isSynchronized =  this.weixinServiceImpl.synchWeixinEmp();
	    
        return null;
	}
   
}
