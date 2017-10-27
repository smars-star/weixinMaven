/**
 * Copyright (c) 2017， 西安长城数字软件有限公司[www.e-u.cn]。
 * 
 */
package com.application.common.department.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.application.common.department.dao.impl.DepartmentDaoImpl;
import com.application.common.department.dto.DepartmentDTO;
import com.application.common.department.service.DepartmentService;


/**
 *  部门service 实现类
 * @author $Author: liuyunpeng $
 * @version $Revision: 1.0 $
 */
@Service
public class DepartmentServiceImpl implements DepartmentService{

    /**
     *  注入部门dao实现类
     */
   @Autowired
    private  DepartmentDaoImpl  departmentDaoImpl;
    
    /**
     *  查询部门信息集合
     * @param aMap Map 对象页面传入参数集合：
     * <p>
     * <li>key=depID 部门ID</li>
     * </p>
     * @return List<DepartmentDTO> 返回部门信息集合  
     */
    @Override
    public List<DepartmentDTO> findDeployeeeByParam(Map<String, String> map) {
        
        return this.departmentDaoImpl.findDeployeeeByParam(map);
    }
   
    
}
