/**
 * Copyright (c) 2017， 西安长城数字软件有限公司[www.e-u.cn]。
 * 
 */
package com.application.common.employee.controller;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.application.common.employee.dto.EmployeeDTO;
import com.application.common.employee.service.EmployeeService;
import com.application.weixin.util.WeiXinUtils;

import net.sf.json.JSONArray;

/**
 * 人员信息Controller
 * 
 * @author $Author: liuyunpeng $
 * @version $Revision: 1.0 $
 */
@RequestMapping("/test")
@Controller
public class EmployoeeController{

    /**
     * 注入人员查询service
     */
    @Autowired
    private EmployeeService testServiceImpl;

    // @Autowired
    // private ProcessEngineConfiguration processEngineConfiguration;

    /**
     * 查询人员信息
     * @param model Model对象用于设置页面数据
     * @return String 跳转页面
     */
    @RequestMapping("/findEmployee")
    public String findEmployee(Model model, @RequestParam Map<String, String> map) {

        // 当第一次查询时，设置显示行数
        if (!map.containsKey("showDataLineCount")) {
            map.put("showDataLineCount", "0");
        }

        // 获取人员信息
        List<EmployeeDTO> employeeList = this.testServiceImpl.findEmployeeByParam(map);
        // 设置数据显示行数
        map.put("showDataLineCount", employeeList.size() + "");

        // 设置页面数据
        model.addAttribute("employeeList", employeeList);
        model.addAttribute("map", map);

        // 返回页面
        return "/employee/findEmployee";
    }

    /**
     * 使用Ajax 查询当前数据
     * @param model Model对象用于设置页面数据
     * @param response HttpServletResponse 对象用于往前台传送数据
     * @return String 跳转页面
     * @throws IOException
     */
    @RequestMapping("/findAjaxEmployee")
    public void findAjaxEmployee(HttpServletResponse response, Model model, @RequestParam Map<String, String> map)
            throws IOException {
        // 获取人员信息
        List<EmployeeDTO> employeeList = this.testServiceImpl.findEmployeeByParam(map);

        // 设置页面数据
        WeiXinUtils.setResponseContent(response);
        response.getWriter().write(JSONArray.fromObject(employeeList).toString());

    }

}
