/**
 * Copyright (c) 2017， 西安长城数字软件有限公司[www.e-u.cn]。
 * 
 */
package com.application.common.department.service;

import java.util.List;
import java.util.Map;

import com.application.common.department.dto.DepartmentDTO;

/**
 * 部门service接口
 * @author $Author: liuyunpeng $
 * @version $Revision: 1.0 $
 */
public interface DepartmentService{

    /**
     * 查询部门信息集合
     * @param aMap Map 对象页面传入参数集合：
     * <p>
     * <li>key=depID 部门ID</li>
     * </p>
     * @return List<DepartmentDTO> 返回部门信息集合
     */
    List<DepartmentDTO> findDeployeeeByParam(Map<String, String> map);

}
