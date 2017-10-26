/**
 * Copyright (c) 2017， 西安长城数字软件有限公司[www.e-u.cn]。
 *
 */
package com.application.weixin.service;

import java.util.List;

import com.application.weixin.dto.WeixinDepartmentDTO;
import com.application.weixin.dto.WeixinEmployeeDTO;

/**
 * 微信WeixinService接口
 * 
 * @author $Author: liuyunpeng $
 * @version $Revision: 1.0 $
 */
public interface WeixinService{

    /**
     * 查询企业微信通讯录部门信息集合
     * @return List<WeixinDepartmentDTO> 返回微信通讯录部门信息集合
     */
    List<WeixinDepartmentDTO> findWeixinDepList();

    /**
     * 查询企业微信通讯录人员信息
     * @param userid 员工Id
     * @return List<WeixinDepartmentDTO> 返回微信通讯录人员信息
     */
    WeixinEmployeeDTO getWeixinEmployee(String userid);

    /**
     * 查询企业微信通讯录部门人员信息集合
     * @param depId 企业微信通讯录部门Id
     * @return List<WeixinEmployeeDTO> 返回企业微信通讯录部门人员信息集合
     */
    List<WeixinEmployeeDTO> findWeixinEmpList(String depId);

    /**
     * 修改企业微信通讯录人员信息
     * @param weixinEmployeeDTO 企业微信通讯录人员DTO
     * @return String 返回企业微信修改 返回信息
     */
    String modifyWeixinEmployee(WeixinEmployeeDTO weixinEmployeeDTO);

    /**
     * 删除企业微信通讯录人员信息
     * @param userid 企业微信人员id
     * @return String 返回企业微信删除 返回信息
     */
    String deleteWeixinEmployee(String userid);

    /**
     * 添加企业微信通讯录人员信息
     * @param weixinEmployeeDTO 企业微信通讯录人员DTO
     * @return 添加企业微信通讯录人员 返回信息
     */
    String addWeixinEmployee(WeixinEmployeeDTO weixinEmployeeDTO);

    /**
     * 添加企业微信通讯录部门信息
     * @param weixinDepartmentDTO 企业微信通讯录部门DTO
     * @return 添加企业微信通讯录部门 返回信息
     */
    String addWexinDep(WeixinDepartmentDTO weixinDepartmentDTO);

    /**
     * 删除企业微信通讯录部门
     * @param depId 企业微信通讯录部门Id
     * @return 返回删除企业微信通讯录企业部门 返回信息
     */
    String deleteWeixinDep(String depID);

    /**
     * 修改企业微信通讯录部门信息
     * @param weixinDepartmentDTO 企业微信通讯录部门DTO
     * @return 修改企业微信通讯录部门 返回信息
     */
    String modifyWeixinDep(WeixinDepartmentDTO weixinDepartmentDTO);

    /**
     * 同步企业微信通讯录人员信息
     * @return 返回同步结果
     */
    boolean synchWeixinEmp();

}
