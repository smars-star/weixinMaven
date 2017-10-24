/**
 * Copyright (c) 2017， 西安长城数字软件有限公司[www.e-u.cn]。
 * 
 */
package com.application.employee.demo.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.application.employee.demo.dao.impl.EmployeeDaoImpl;
import com.application.employee.demo.dto.EmployeeDTO;
import com.application.employee.demo.service.EmployeeService;

/**
 * 人员查询Service接口实现类。
 * @author $Author: liuyunpneg $
 * @version $Revision: 1.0 $
 */
@Service
public class EmployeeServerImpl implements EmployeeService{

    /**
     * 注入人员查询Dao接口实现类
     */
    @Autowired
    private EmployeeDaoImpl testDaoImpl;

    /**
     * 查询人员
     * @return List<EmployeeDTO> 人员信息集合
     */
    @Override
    public EmployeeDTO findEmployee() {
        return this.testDaoImpl.findEmployee();
    }

    /**
     * 查询人员信息集合
     * @param paramsMap 封装的查询条件
     * <p>
     * <li>key=employeeName 人员名称</li>
     * </p>
     * @return List<EmployeeDTO> 人员信息集合
     */
    @Override
    public List<EmployeeDTO> findEmployeeByParam(Map<String, String> map) {
        return this.testDaoImpl.findEmployeeByParam(map);
    }

}
