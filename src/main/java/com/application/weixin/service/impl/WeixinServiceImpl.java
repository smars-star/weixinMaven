/**
 * Copyright (c)  2017， 西安长城数字软件有限公司[www.e-u.cn]。
 *
 */
package com.application.weixin.service.impl;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.application.common.department.dto.DepartmentDTO;
import com.application.common.department.service.DepartmentService;
import com.application.common.employee.dto.EmployeeDTO;
import com.application.common.employee.service.EmployeeService;
import com.application.framework.util.AppSettingFactory;
import com.application.weixin.dao.impl.WeixinDaoImpl;
import com.application.weixin.dto.WeixinDepartmentDTO;
import com.application.weixin.dto.WeixinEmployeeDTO;
import com.application.weixin.listener.WeiXinAccessTokenListener;
import com.application.weixin.service.WeixinService;
import com.application.weixin.util.WeiXinUtils;



/** 
 * 微信WeixinService接口实现类  
 * 
 * @author $Author: liuyunpeng $
 * @version $Revision: 1.0 $
 */
@Service
public class WeixinServiceImpl implements WeixinService{

	/**
	 *  注入微信DAO 接口
	  */
    @Autowired
	private  WeixinDaoImpl weixinDaoImpl;
	
	/**
	 * 注入人员service实现类
	 */
    @Autowired
    private  EmployeeService  employeeServiceImpl;
    
    /**
     *  注入部门service实现类
     */
    @Autowired
	private  DepartmentService  departmentServiceImpl;
	

	 /**
     *  查询企业微信通讯录部门信息集合
     * @return List<WeixinDepartmentDTO> 返回微信通讯录部门信息集合
	 * @throws Exception 
     */
    @Cacheable(value="cacheTest",key="#param")
    @SuppressWarnings({ "static-access", "unchecked" })
    @Override
    public List<WeixinDepartmentDTO> findWeixinDepList(){
        // 初始化appSetting.properties 配置文件
        AppSettingFactory appSettingFactory = AppSettingFactory.getInstance();

        // 获取企业微信部门信息
        // 封装获取企业微信部门URL链接
        String department_infoUrl = appSettingFactory.getAppSetting("department_all_infoUrl")
                + WeiXinAccessTokenListener.access_token;
        // 根据RUL获取企业微信部门信息
        String  department = WeiXinUtils.getWeiXinInfo(department_infoUrl, "department");
        
        JSONArray jsonDepArray = new JSONArray().fromObject(department);
        // 对获取的企业微信部门信息进行排序
        List<WeixinDepartmentDTO> departmentList = (List<WeixinDepartmentDTO>) jsonDepArray.toCollection(jsonDepArray,
                WeixinDepartmentDTO.class);
        departmentList = sortDepList(departmentList);

        // 返回企业微信部门信息集合
        return departmentList;
    }
    

     /**
      *  查询企业微信通讯录人员信息
      * @param userid  员工Id
      * @return List<WeixinDepartmentDTO> 返回微信通讯录人员信息
      */
    @Cacheable(value="cacheTest",key="#userid")
    @SuppressWarnings("static-access")
    @Override
    public WeixinEmployeeDTO getWeixinEmployee(String userid) {
        //初始化appSetting
        AppSettingFactory  appSettingFactory = AppSettingFactory.getInstance();
        
        //获部门员工详细信息
        String employee_all_infoUrl  =  appSettingFactory.getAppSetting("employee_get_infoUrl");
        String url = employee_all_infoUrl+WeiXinAccessTokenListener.access_token +"&userid="+userid;
        String  weixinEmp = WeiXinUtils.getWeiXinInfo(url, "");
        JSONObject jsonObject = JSONObject.fromObject(weixinEmp);
        WeixinEmployeeDTO  weixinEmpDTO  =  (WeixinEmployeeDTO) jsonObject.toBean(jsonObject, WeixinEmployeeDTO.class);
 
        //获取企业微信通讯录所有部门信息集合
        List<WeixinDepartmentDTO>  weixinDepList = this.findWeixinDepList();
        
        //设置当前企业微信部门信息
        setWerxinEmpDep(weixinEmpDTO,weixinDepList);
        
        //返回企业微信人员信息
        return weixinEmpDTO;
    }
    
    
    /**
     *  修改企业微信通讯录人员信息
     * @param weixinEmployeeDTO 企业微信通讯录人员DTO
     * @return String 跳转页面
     */
   @Override
   public String modifyWeixinEmployee(WeixinEmployeeDTO weixinEmployeeDTO) {
       //初始化appSetting.properties
       AppSettingFactory appSettingFactory = AppSettingFactory.getInstance();
   
       //获取企业微信人员信息
       String employee_update_infoUr = appSettingFactory.getAppSetting("employee_update_infoUr");
       String url =  employee_update_infoUr + WeiXinAccessTokenListener.access_token;
       String updateStr =  WeiXinUtils.sendHttpWeixinBodyByPost(url,weixinEmployeeDTO,"errmsg");
       return updateStr;
   }
   

   /**
     *  查询企业微信通讯录部门人员信息集合
     * @param depId 企业微信通讯录部门Id
     * @return List<WeixinEmployeeDTO> 返回企业微信通讯录部门人员信息集合
     */
    @SuppressWarnings({ "static-access", "unchecked" })
    @Override
    public List<WeixinEmployeeDTO> findWeixinEmpList(String depId) {
        // 初始化appSetting.properties
        AppSettingFactory appSettingFactory = AppSettingFactory.getInstance();

        // 获部门员工链接
        String department_employee_infoUrl = appSettingFactory.getAppSetting("department_employee_allList_infoUrl");
        String url = department_employee_infoUrl + WeiXinAccessTokenListener.access_token + "&department_id=" + depId
                + "&fetch_child=1&status=1";

        //获取企业微信通讯录所有人员信息集合
        String depEmpList = WeiXinUtils.getWeiXinInfo(url, "userlist");
        JSONArray jsonEmpArray = new JSONArray().fromObject(depEmpList);
        List<WeixinEmployeeDTO> employeeList = (List<WeixinEmployeeDTO>) jsonEmpArray.toCollection(jsonEmpArray,
                WeixinEmployeeDTO.class);

        // 获取企业微信部门信息
        List<WeixinDepartmentDTO> depList =  this.findWeixinDepList();
        Map<Integer, String> departmentMap = new HashMap<Integer, String>();
        for (WeixinDepartmentDTO weixinDepartment : depList) {
            //如果不包含部门id
            if (!departmentMap.containsKey(weixinDepartment.getId())) {
                departmentMap.put(weixinDepartment.getId(), weixinDepartment.getName());
            }
        }
        //设置企业微信通讯录人员部门
        for (WeixinEmployeeDTO weixinEmployeeDTO : employeeList) {
            weixinEmployeeDTO.setDepName(departmentMap.get(weixinEmployeeDTO.getDepartment().get(0)));
        }

        // 返回部门信息集合
        return employeeList;
    }


    /**      
     * 删除企业微信通讯录人员信息
     * @param userid  企业微信人员id
     * @return  String  返回企业微信删除 返回信息
    */
    @Override
    public String deleteWeixinEmployee(String userid) {
        //初始化appSetting.properties
        AppSettingFactory appSettingFactory = AppSettingFactory.getInstance();
        
        //删除企业微信人员
        String employee_delete_infoUr = appSettingFactory.getAppSetting("employee_delete_infoUr");
        String url = employee_delete_infoUr +WeiXinAccessTokenListener.access_token+"&userid="+userid;
        String deleteStr = WeiXinUtils.sendHttpWeixinBodyByGet(url, "", "errmsg");
        
        //返回删除企业微信通信录人员信息 返回信息
        return deleteStr;
    }
    

    /**      
     * 添加企业微信通讯录人员信息
     * @param weixinEmployeeDTO 企业微信通讯录人员DTO 
     * @return  添加企业微信通讯录人员 返回信息
    */
    @Override
    public String addWeixinEmployee(WeixinEmployeeDTO weixinEmployeeDTO) {
        //初始化appSetting.properties
        AppSettingFactory appSettingFactory = AppSettingFactory.getInstance();
        
        //添加要增加的企业微信人员信息
        String employee_add_infoUr = appSettingFactory.getAppSetting("employee_add_infoUr");
        String url = employee_add_infoUr +WeiXinAccessTokenListener.access_token;
        String addStr = WeiXinUtils.sendHttpWeixinBodyByPost(url, weixinEmployeeDTO, "errmsg");
      
      //返回添加企业微信通信录人员信息 返回信息
        return addStr;
    }

    
    /**      
     * 添加企业微信通讯录部门信息
     * @param weixinDepartmentDTO 企业微信通讯录部门DTO 
     * @return  添加企业微信通讯录部门 返回信息
    */
    @Override
    public String addWexinDep(WeixinDepartmentDTO weixinDepartmentDTO) {
        //初始化appSetting.properties
        AppSettingFactory appSettingFactory = AppSettingFactory.getInstance();
        
        //添加企业微信部门
        String department_add_infoUrl = appSettingFactory.getAppSetting("department_add_infoUrl");
        String url = department_add_infoUrl +WeiXinAccessTokenListener.access_token;
        String addStr = WeiXinUtils.sendHttpWeixinBodyByPost(url, weixinDepartmentDTO, "errmsg");
       
        //返回添加企业微信部门 返回信息
        return addStr;
    }

    
    /**      
     * 删除企业微信通讯录部门     
     * @param depId  企业微信通讯录部门Id
     * @return  返回删除企业微信通讯录企业部门 返回信息
    */
    @Override
    public String deleteWeixinDep(String depID) {
        //初始化appSetting.properties
        AppSettingFactory appSettingFactory = AppSettingFactory.getInstance();
        
        //删除企业微信部门
        String department_delete_infoUrl = appSettingFactory.getAppSetting("department_delete_infoUrl");
        String url = department_delete_infoUrl +WeiXinAccessTokenListener.access_token+"&id="+depID;
        String deleteStr = WeiXinUtils.sendHttpWeixinBodyByGet(url, "", "errmsg");
        
        //返回删除企业微信通讯录企业部门 返回信息
        return deleteStr;
    }

    
    /**      
     * 修改企业微信通讯录部门信息     
     * @param weixinDepartmentDTO 企业微信通讯录部门DTO
     * @return 修改企业微信通讯录部门 返回信息     
    */
    @Override
    public String modifyWeixinDep(WeixinDepartmentDTO weixinDepartmentDTO) {
        //初始化appSetting.properties
        AppSettingFactory appSettingFactory = AppSettingFactory.getInstance();
        
        //修改企业微信部门信息
        String department_update_infoUrl = appSettingFactory.getAppSetting("department_update_infoUrl");
        String url =  department_update_infoUrl + WeiXinAccessTokenListener.access_token;
        String updateStr =  WeiXinUtils.sendHttpWeixinBodyByPost(url,weixinDepartmentDTO,"errmsg");
        
        //返回修改企业微信通讯录企业部门 返回信息
        return updateStr;
    }
 
    
    /**
     * 设置企业微信通讯录人员部门信息
     * @param weixinEmpDTO 企业微信通讯录人员DTO
     * @param departmentDTOs 企业微信通讯录部门信息集合
     */
    private void setWerxinEmpDep(WeixinEmployeeDTO weixinEmpDTO, List<WeixinDepartmentDTO> departmentDTOs) {
        // 判断部门集合是否为空
        if (departmentDTOs != null && !departmentDTOs.isEmpty()) {
            for (WeixinDepartmentDTO weixinDepartmentDTO : departmentDTOs) {
                // 如果找到相对应的部门id
                if (weixinDepartmentDTO.getId() == weixinEmpDTO.getDepartment().get(0)) {
                    weixinEmpDTO.setDepName(weixinDepartmentDTO.getName());
                }
            }
        }
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

     
    /**      
     * 同步企业微信通讯录人员信息
     * @return     返回同步结果
    */
    @Override
    public boolean isSynchWeixinEmp() {
        
        //同步企业微信通讯录部门信息
        synchWeixinDep();
        //同步企业微信通讯录人员信息
        synchWeixinEmp();
        
        return true;
    }
    
    
    /**
     *   同步企业微信通讯录部门信息
     */
    private  void  synchWeixinDep() {
        //查询条件集合
        Map<String,String> map = new HashMap<>();
        
        /********************************  同步部门  *******************************************/
        //获取微信通讯录部门信息集合
        List<WeixinDepartmentDTO> weixinDepartmentDTOs = this.findWeixinDepList();
        //获取部门信息集合
        List<DepartmentDTO> departmentDTOs = this.departmentServiceImpl.findDepartmentByParam(map);
         
        //比较查询新增加的部门
        Map<String,WeixinDepartmentDTO> weixinDepartmentMap  = new HashMap<>();
        for(WeixinDepartmentDTO weixinDepartment : weixinDepartmentDTOs) {
            weixinDepartmentMap.put(weixinDepartment.getName(), weixinDepartment);
        }
        
        //封装新增加的微信通讯录部门信息
        List<WeixinDepartmentDTO> weixinDepartmentList = new ArrayList<>();
        for(DepartmentDTO  department : departmentDTOs) {
              if(!weixinDepartmentMap.containsKey(department.getDepName())) {
                  //获取企业微信通讯录中没有添加的部门
                  WeixinDepartmentDTO  tempWeixinDepartmentDTO = new WeixinDepartmentDTO();
                  tempWeixinDepartmentDTO.setName(department.getDepName());
                  tempWeixinDepartmentDTO.setParentid(Integer.parseInt(department.getParentDepId()));
                  weixinDepartmentList.add(tempWeixinDepartmentDTO);
              }
        }
        
        //添加微信通信录部门
        for(WeixinDepartmentDTO  weixinDepartmentDTO : weixinDepartmentList) {
            //this.addWexinDep(weixinDepartmentDTO);
            System.out.println(weixinDepartmentDTO.getName());
        }
        
    }
    
    
    /**
     *   同步企业微信通讯录人员信息
     */
    private  void  synchWeixinEmp() {
        //查询条件集合
        Map<String,String> map = new HashMap<>();
        
        /********************************  同步人员  *******************************************/
        //获取企业微信通讯录所有人员信息集合 1：最高部门Id
        List<WeixinEmployeeDTO>  weixinEmployeeList = this.findWeixinEmpList("1");
        
        //获取人员信息集合
        List<EmployeeDTO>  employeeList = this.employeeServiceImpl.findEmployeeByParam(map);
        
        //比较企业通讯录中  没有同步的人员信息
        Map<String,WeixinEmployeeDTO> employeeMap = new HashMap<>();
        for(WeixinEmployeeDTO weixinEmployee : weixinEmployeeList) {
            employeeMap.put(weixinEmployee.getUserid(), weixinEmployee);
        }
        List<WeixinEmployeeDTO> newWeixinEmployeeList  = new ArrayList<>();
        for(EmployeeDTO  employee : employeeList) {
            if(!employeeMap.containsKey(employee.getEmployeeNo())) {
                //获取在微信通讯录中没有的人员
                WeixinEmployeeDTO tempWeixinEmployee = new WeixinEmployeeDTO();
                tempWeixinEmployee.setUserid(employee.getEmployeeNo());
                tempWeixinEmployee.setName(employee.getEmployeeName());
                tempWeixinEmployee.setGender(employee.getGenderCode()+"");
                List<Integer>  department = new ArrayList<>();
                tempWeixinEmployee.setDepartment(department);
                newWeixinEmployeeList.add(tempWeixinEmployee);
            }
        }
        
        //添加新的人员信息
        for(WeixinEmployeeDTO weixinEmployeeDTO : newWeixinEmployeeList) {
            System.out.println(weixinEmployeeDTO.getName() +":"+newWeixinEmployeeList.size());
            //this.addWeixinEmployee(weixinEmployeeDTO);
        }
    }

	
}
