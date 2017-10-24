/**
 * Copyright (c) 2017， 西安长城数字软件有限公司[www.e-u.cn]。
 * 
 */
package com.application.employee.demo.service;

import java.util.List;
import java.util.Map;

import com.application.employee.demo.dto.EmployeeDTO;

/**
 * 人员查询Service接口。
 * 
 * @author $Author: liuyunpneg $
 * @version $Revision: 1.0 $
 */
public interface EmployeeService{

    /**
     * 查询人员信息集合
     * @param paramsMap 封装的查询条件
     * <p>
     * <li>key=employeeName 人员名称</li>
     * </p>
     * @return List<EmployeeDTO> 人员信息集合
     */
    List<EmployeeDTO> findEmployeeByParam(Map<String, String> map);

    /**
     * 查询人员
     * @return List<EmployeeDTO> 人员信息集合
     */
    EmployeeDTO findEmployee();

}
