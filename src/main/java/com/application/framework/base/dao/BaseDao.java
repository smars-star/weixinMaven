/**
 * Copyright (c) 2017， 西安长城数字软件有限公司[www.e-u.cn]。
 *
 */
package com.application.framework.base.dao;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * 数据库链接sqlTemplate模板
 * 
 * @author $Author: liuyunpeng $
 * @version $Revision: 1.0 $
 */
public class BaseDao{

    /**
     * 注入Mybatis 查询模版
     */
    @Autowired
    public SqlSessionTemplate sqlSessionTemplate;

}
