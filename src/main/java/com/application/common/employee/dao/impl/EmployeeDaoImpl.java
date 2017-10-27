/**
 * Copyright (c) 2017， 西安长城数字软件有限公司[www.e-u.cn]。
 * 
 */
package com.application.common.employee.dao.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.application.common.employee.dto.EmployeeDTO;
import com.application.framework.base.dao.BaseDao;

/**
 *  人员Dao实现类
 * @author $Author: liuyunpeng $
 * @version $Revision: 1.0 $
 */
@Repository
public class EmployeeDaoImpl  extends BaseDao{

	
	/**
	 * 查询人员信息集合
	 * @param aMap 封装的查询条件
	 * <p>
	 * <li>key=employeeName 人员姓名</li>
	 * </p>
	 * @return List<EmployeeDTO> 人员信息集合
	 */
	public List<EmployeeDTO> findEmployeeByParam(Map<String, String> map) {
		return this.sqlSessionTemplate.selectList("employee.findEmployeeByParam",map);
	}

	/**
	 * 查询人员信息
	 * @return EmployeeDTO  人员信息DTO
	 */
	public EmployeeDTO getEmployee() {
		return (EmployeeDTO)this.sqlSessionTemplate.selectOne("employee.getEmployee");
	}

}
