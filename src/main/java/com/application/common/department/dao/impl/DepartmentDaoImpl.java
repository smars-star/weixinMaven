/**
 * Copyright (c) 2017， 西安长城数字软件有限公司[www.e-u.cn]。
 * 
 */
package com.application.common.department.dao.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.application.common.department.dto.DepartmentDTO;
import com.application.framework.base.dao.BaseDao;

/**
 *  部门dao实现类
 * @author $Author: liuyunpeng $
 * @version $Revision: 1.0 $
 */
@Repository
public class DepartmentDaoImpl extends BaseDao{

    /**
     *  查询部门信息集合
     * @param aMap Map 对象页面传入参数集合：
     * <p>
     * <li>key=depID 部门ID</li>
     * </p>
     * @return List<DepartmentDTO> 返回部门信息集合  
     */
    public List<DepartmentDTO> findDepartmentByParam(Map<String, String> map) {
        return this.sqlSessionTemplate.selectList("department.findDepartmentByParam", map);
    }
   
   
}
