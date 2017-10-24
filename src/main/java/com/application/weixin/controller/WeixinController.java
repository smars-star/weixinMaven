 /**
 * Copyright (c)  2017， 西安长城数字软件有限公司[www.e-u.cn]。
 *
 */
package com.application.weixin.controller;

import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.application.framework.util.AppSettingFactory;
import com.application.weixin.dto.WeixinDepartmentDTO;
import com.application.weixin.dto.WeixinEmployeeDTO;
import com.application.weixin.util.WeiXinAccessToken;
import com.application.weixin.util.WeiXinUtils;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;


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
     * 查询企业微信上所有的部门信息
     * @param attr RedirectAttributes 重定向
     * @param model Model对象用于设置页面数据
     * @return String 跳转页面
     * @throws Exception 
     */
	@SuppressWarnings({ "static-access", "unused" })
    @RequestMapping("/findAddressBookEmpInfo.do")
	public  String  findAddressBookEmpInfo(HttpServletRequest request,Model model) throws Exception{
		
        //初始化appSetting.properties  配置文件
		AppSettingFactory  appSettingFactory = AppSettingFactory.getInstance();
		
		//获取企业微信部门信息
		List<WeixinDepartmentDTO>  departmentList = this.findWeixinDepList(request);
		List<WeixinEmployeeDTO>  employeeList = null;
		
		//获取部门信息
		String department_id = request.getParameter("department");
		//判断当前部门是否为空
		if(!StringUtils.isEmpty(department_id)){
		    //部门Id不为空,则获取该部门的所有人员信息
	        employeeList = this.findWeixinEmpList(department_id, request);
		}else{
	        //获取部门下的所有员工信息
		    employeeList = this.findWeixinEmpList("1", request);
		}
        
		//设置页面数据
        model.addAttribute("departmentList", new JSONArray().fromObject(departmentList));
        model.addAttribute("employeeList", new JSONArray().fromObject(employeeList));
        model.addAttribute("department", department_id);
	
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
     * @throws Exception 
     */
	@SuppressWarnings({ "static-access"})
	@RequestMapping("/findDepEmployee")
	public  void  findDepEmployee(HttpServletRequest request,HttpServletResponse response,Model model,@RequestParam  Map<String,String>map) throws Exception{
			
		try {
			//获取部门ID
			String department_id = map.get("departmentID");
			//获取部门人员信息
			List<WeixinEmployeeDTO>  employeeList  = this.findWeixinEmpList(department_id,request);
			
			//解决跨域乱码问题
			WeiXinUtils.setResponseContent(response);
			response.getWriter().println(new JSONArray().fromObject(employeeList));
			
		} catch (Exception e) { 
			e.printStackTrace();
		}
		
	}
	

 /**
     *  初始化人员信息
     * @param model Model对象用于设置页面数据
     * @param aMap Map 对象页面传入参数集合：
     * <p>
     * <li>key=userid 企业微信用户Id</li>
     * </p>
     * @return String 跳转页面
     * @throws Exception 
     */
	@SuppressWarnings({ "static-access"})
	@RequestMapping("/modifyInitEmp.do")
	public  String modifyInitEmp(HttpServletRequest request,Model model,String userid) throws Exception{
		//初始化appSetting
		AppSettingFactory  appSettingFactory = AppSettingFactory.getInstance();
		
		//获部门员工详细信息
		String employee_all_infoUrl  =  appSettingFactory.getAppSetting("employee_get_infoUrl");
		String url = employee_all_infoUrl+WeiXinAccessToken.access_token +"&userid="+userid;
		String  weixinEmp = WeiXinUtils.getWeiXinInfo(url, "");
		JSONObject jsonObject = JSONObject.fromObject(weixinEmp);
		WeixinEmployeeDTO  weixinEmpDTO  =  (WeixinEmployeeDTO) jsonObject.toBean(jsonObject, WeixinEmployeeDTO.class);
		
		//获取部门信息
		List<WeixinDepartmentDTO>  departmentDTOs = this.findWeixinDepList(request);
		//判断部门集合是否为空
		if(departmentDTOs != null && !departmentDTOs.isEmpty()){
	        for(WeixinDepartmentDTO weixinDepartmentDTO :departmentDTOs){
		        //如果找到相对应的部门id
				if(weixinDepartmentDTO.getId() == weixinEmpDTO.getDepartment().get(0)){
			        weixinEmpDTO.setDepName(weixinDepartmentDTO.getName());
				}
		    }
		}
		 
		// 设置页面数据
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
	public  String   modifyEmp(HttpServletRequest request,HttpServletResponse response,Model model,WeixinEmployeeDTO weixinEmployeeDTO) throws Exception{
	    //初始化appSetting.properties
	    AppSettingFactory appSettingFactory = AppSettingFactory.getInstance();
	   
	    //跳转页面
		String  urlPage = "";
		//获取企业微信提示信息
		String   system_operation_info  = "";
	
        //获取企业微信人员信息
	    String employee_update_infoUr = appSettingFactory.getAppSetting("employee_update_infoUr");
	    String url =  employee_update_infoUr + WeiXinAccessToken.access_token;
	    String updateStr = 	WeiXinUtils.sendHttpWeixinBodyByPost(url,weixinEmployeeDTO,"errmsg");
	    if("updated".equals(updateStr)){
	        urlPage =  "/common/doSuccessed";
	        system_operation_info = "更新成功！";
	    }else{
		    urlPage =  "/common/showMessage";
		    system_operation_info = "更新失败！errmsg："+updateStr ;
	    }
	    
	    // 设置页面数据
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
	    //初始化appSetting.properties
        AppSettingFactory appSettingFactory = AppSettingFactory.getInstance();
       
        //跳转页面
        String  urlPage = "";
        //获取企业微信提示信息
        String   system_operation_info  = "";
        
        //删除企业微信人员
		String employee_delete_infoUr = appSettingFactory.getAppSetting("employee_delete_infoUr");
		String url = employee_delete_infoUr +WeiXinAccessToken.access_token+"&userid="+userid;
		String deleteStr = WeiXinUtils.sendHttpWeixinBodyByGet(url, "", "errmsg");
		if("deleted".equals(deleteStr)){
		    urlPage =  "/common/doSuccessed";
			system_operation_info = "删除成功！";
	    }else{
		    urlPage =  "/common/showMessage";
	        system_operation_info = "删除失败！errmsg："+deleteStr;
	    }
		
		// 设置页面数据
	    model.addAttribute("SYSTEM_OPERATION_INFO", system_operation_info);
	    
	    //返回页面
		return urlPage;
	}
	
	
	/**
     *  新增人员信息
     * @param model Model对象用于设置页面数据
     * @return String 跳转页面
     * @throws Exception 
     */
	@SuppressWarnings({"static-access" })
	@RequestMapping("/preAddEmp")
	 public String preAddEmp(HttpServletRequest request,Model model) throws Exception{
		//获取部门信息
		List<WeixinDepartmentDTO>  departmentList = this.findWeixinDepList(request);
		
		// 设置页面数据
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
	public  String  addEmp(Model model,WeixinEmployeeDTO weixinEmployeeDTO) throws Exception{
	    //初始化appSetting.properties
        AppSettingFactory appSettingFactory = AppSettingFactory.getInstance();
        
        //跳转页面
        String  urlPage = "";
        //获取企业微信提示信息
        String   system_operation_info  = "";
		
        //添加要增加的企业微信人员信息
		String employee_add_infoUr = appSettingFactory.getAppSetting("employee_add_infoUr");
		String url = employee_add_infoUr +WeiXinAccessToken.access_token;
		String addStr = WeiXinUtils.sendHttpWeixinBodyByPost(url, weixinEmployeeDTO, "errmsg");
		if("created".equals(addStr)){
			  urlPage =  "/common/doSuccessed";
			  system_operation_info = "添加成功！";
	    }else{
			  urlPage =  "/common/showMessage";
			  system_operation_info = "添加失败！errmsg："+addStr;
	    }
		
		// 设置页面数据
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
	public String  preAddDep(HttpServletRequest request,HttpServletResponse response,Model model) throws Exception{
	    //获取微信部门信息集合
		List<WeixinDepartmentDTO>  departmentList = this.findWeixinDepList(request);
		
		// 设置页面数据
		model.addAttribute("departmentList", departmentList);
		
		//返回页面
		return "/weixin/addDep";
	}
	
	
	/**
	 *  添加部门信息
	 * @param model Model对象用于设置页面数据
	 * @param weixinDepartmentDTO 企业微信部门信息
	 * @return String 跳转页面
	 * @throws Exception 
	 */
	@RequestMapping("/addDep")
	public String addDep(HttpServletRequest request,HttpServletResponse response,Model model,WeixinDepartmentDTO weixinDepartmentDTO) throws Exception{
	    //初始化appSetting.properties
        AppSettingFactory appSettingFactory = AppSettingFactory.getInstance();
        
        //跳转页面
        String  urlPage = "";
        //获取企业微信提示信息
        String   system_operation_info  = "";
		
        //添加企业微信部门
		String department_add_infoUrl = appSettingFactory.getAppSetting("department_add_infoUrl");
		String url = department_add_infoUrl +WeiXinAccessToken.access_token;
		String addStr = WeiXinUtils.sendHttpWeixinBodyByPost(url, weixinDepartmentDTO, "errmsg");
		if("created".equals(addStr)){
			urlPage =  "/common/doSuccessed";
			system_operation_info = "添加成功！";
	    }else{
	        urlPage =  "/common/showMessage";
	        system_operation_info = "添加失败！errmsg："+addStr;
	    }
		
		// 设置页面数据
        model.addAttribute("SYSTEM_OPERATION_INFO", system_operation_info);
        
        //返回页面
        return urlPage;
		
	}
	
	/**
	 *   删除部门信息
	 * @param model Model对象用于设置页面数据
	 * @param depID  部门ID
	 * @return String 跳转页面
	 * @throws ConstantToMapException 
	 */
	@RequestMapping("/deleteDep")
	public  String  deleteDep(HttpServletRequest request,HttpServletResponse response,Model model,String depID) throws Exception{
	    //初始化appSetting.properties
        AppSettingFactory appSettingFactory = AppSettingFactory.getInstance();
        
        //跳转页面
        String  urlPage = "";
        //获取企业微信提示信息
        String   system_operation_info  = "";
        
        //删除企业微信部门
		String department_delete_infoUrl = appSettingFactory.getAppSetting("department_delete_infoUrl");
		String url = department_delete_infoUrl +WeiXinAccessToken.access_token+"&id="+depID;
		String deleteStr = WeiXinUtils.sendHttpWeixinBodyByGet(url, "", "errmsg");
		if("deleted".equals(deleteStr)){
		    urlPage =  "/common/doSuccessed";
		    system_operation_info = "删除成功！";
	   }else{
			urlPage =  "/common/showMessage";
			system_operation_info = "删除失败！errmsg："+deleteStr;
	    }
         
		// 设置页面数据
        model.addAttribute("SYSTEM_OPERATION_INFO", system_operation_info);
        
        //返回页面
        return urlPage;
	}
	
	/**
	 *  修改部门信息
	 * @param model Model对象用于设置页面数据
	 * @param weixinDepartmentDTO 企业微信部门DTO
	 * @return String 跳转页面
	 * @throws Exception 
	 */
	@RequestMapping("/modifyDep.do")
	public  String  modifyDep(HttpServletRequest request,HttpServletResponse response,Model model,WeixinDepartmentDTO weixinDepartmentDTO) throws Exception{
	    //初始化appSetting.properties
        AppSettingFactory appSettingFactory = AppSettingFactory.getInstance();
        
        //跳转页面
        String  urlPage = "";
        //获取企业微信提示信息
        String   system_operation_info  = "";
        
         //修改企业微信部门信息
		String department_update_infoUrl = appSettingFactory.getAppSetting("department_update_infoUrl");
		String url =  department_update_infoUrl + WeiXinAccessToken.access_token;
		String updateStr = 	WeiXinUtils.sendHttpWeixinBodyByPost(url,weixinDepartmentDTO,"errmsg");
		if("updated".equals(updateStr)){
		    urlPage =  "/common/doSuccessed";
		    system_operation_info =  "更新成功！";
		}else{
			urlPage =  "/common/showMessage";
			system_operation_info =  "更新失败！errmsg："+updateStr;
		}
		  
		// 设置页面数据
        model.addAttribute("SYSTEM_OPERATION_INFO", system_operation_info);
        
        //返回页面
        return urlPage;
	}

	/**
	 *  获取微信通讯录部门信息集合
	 * @param model Model对象用于设置页面数据
	 * @return String 跳转页面
	 * @throws ConstantToMapException 
	 */
	@SuppressWarnings("static-access")
	@RequestMapping("/findAddressBookDepInfo.do")
   public   String   findAddressBookDepInfo(HttpServletRequest request,Model model) throws Exception{
	   //获取部门信息
	   List<WeixinDepartmentDTO>  departmentList = this.findWeixinDepList(request);
	   
	   //设置页面数据
	   model.addAttribute("departmentList", new JSONArray().fromObject(departmentList));
	   
	   //返回页面
	   return "/weixin/findAddressBookDepInfo";
   }	
   
    /**
     * 获取微信通讯录部门信息集合
     * @return List<WeixinDepartmentDTO> 返回企业微信部门信息集合
     * @throws Exception
     */
    @SuppressWarnings({ "static-access", "unchecked" })
    public List<WeixinDepartmentDTO> findWeixinDepList(HttpServletRequest request) throws Exception {
        // 初始化appSetting.properties 配置文件
        AppSettingFactory appSettingFactory = AppSettingFactory.getInstance();

        // 获取企业微信部门信息
        // 封装获取企业微信部门URL链接
        String department_infoUrl = appSettingFactory.getAppSetting("department_all_infoUrl")
                + WeiXinAccessToken.access_token;
        // 根据RUL获取企业微信部门信息
        String department = WeiXinUtils.getWeiXinInfo(department_infoUrl, "department");
        JSONArray jsonDepArray = new JSONArray().fromObject(department);
        // 对获取的企业微信部门信息进行排序
        List<WeixinDepartmentDTO> departmentList = (List<WeixinDepartmentDTO>) jsonDepArray.toCollection(jsonDepArray,
                WeixinDepartmentDTO.class);
        departmentList = sortDepList(departmentList);

        // 返回企业微信部门信息集合
        return departmentList;
    }
   
    /**
     * 获取部门人员信息
     * @param model Model对象用于设置页面数据
     * @param department_id 部门ID
     * @return List<WeixinEmployeeDTO> 返回部门信息集合
     * @throws Exception
     */
    @SuppressWarnings({ "unchecked", "static-access" })
    public List<WeixinEmployeeDTO> findWeixinEmpList(String department_id, HttpServletRequest request)
            throws Exception {
        // 初始化appSetting.properties
        AppSettingFactory appSettingFactory = AppSettingFactory.getInstance();

        // 获部门员工链接
        String department_employee_infoUrl = appSettingFactory.getAppSetting("department_employee_allList_infoUrl");
        String url = department_employee_infoUrl + WeiXinAccessToken.access_token + "&department_id=" + department_id
                + "&fetch_child=1&status=1";

        String depEmpList = WeiXinUtils.getWeiXinInfo(url, "userlist");
        JSONArray jsonEmpArray = new JSONArray().fromObject(depEmpList);
        List<WeixinEmployeeDTO> employeeList = (List<WeixinEmployeeDTO>) jsonEmpArray.toCollection(jsonEmpArray,
                WeixinEmployeeDTO.class);

        // 获取企业微信部门信息
        List<WeixinDepartmentDTO> depList = this.findWeixinDepList(request);
        Map<Integer, String> departmentMap = new HashMap<Integer, String>();
        for (WeixinDepartmentDTO weixinDepartment : depList) {
            //如果不包含部门id
            if (!departmentMap.containsKey(weixinDepartment.getId())) {
                departmentMap.put(weixinDepartment.getId(), weixinDepartment.getName());
            }
        }
        // 对人员部门进行封装
        for (WeixinEmployeeDTO weixinEmployeeDTO : employeeList) {
            weixinEmployeeDTO.setDepName(departmentMap.get(weixinEmployeeDTO.getDepartment().get(0)));
        }

        // 返回部门信息集合
        return employeeList;
    }
    

  /**
    *  对企业微信部门list集合排序
    * @param model Model对象用于设置页面数据
    * @param departmentList  企业微信部门信息集合
    * @return List<WeixinDepartmentDTO>   返回排序后的企业微信信息
    */
    private   List<WeixinDepartmentDTO>  sortDepList(List<WeixinDepartmentDTO> departmentList){
        //对企业微信部门进行排序
        Collections.sort(departmentList, new  Comparator<WeixinDepartmentDTO> (){

             @Override
            public int compare(WeixinDepartmentDTO arg0, WeixinDepartmentDTO arg1) {
                 int hits0 = arg0.getOrder();
                 int hits1 = arg1.getOrder();  
                 if (hits1 > hits0) {  
                     return 1;  
                 } else if (hits1 == hits0) {  
                     return 0;  
                 } else {  
                     return -1;  
                 }  
            }
             
        });
     
        //返回排序后的企业微信部门信息集合
        return departmentList;      
    }
	
}
