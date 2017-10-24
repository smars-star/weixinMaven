
/**
 * Copyright (c) 2017， 西安长城数字软件有限公司[www.e-u.cn]。
 *
 */
package com.application.qrcode.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.application.weixin.util.QRCodeUtils;

/**
 * 生成二维码Controller
 * 
 * @author $Author: liuyunpeng $
 * @version $Revision: 1.0 $
 */
@RequestMapping("/qrcode")
@Controller
public class QRController{

    /**
     * 生成常用网页授权页面（二维码方式展示）
     * @return String 跳转页面
     * @throws Exception
     */
    @RequestMapping("/findAllQRCode.do")
    public String findAllQRCode(Model model) throws Exception {
        Map<String, String> qrCodeImageStrMap = new HashMap<String, String>();

        // 现场更新应用二维码链接
        String weixin_xcgc_app_url = QRCodeUtils.getBASE64AppQRCode("weixin_xcgc_app_url", 500, 500, "png");
        qrCodeImageStrMap.put("现场更新", weixin_xcgc_app_url);

        // 日志管理应用二维码链接
        String weixin_rzgl_app_url = QRCodeUtils.getBASE64AppQRCode("weixin_rzgl_app_url", 500, 500, "png");
        qrCodeImageStrMap.put("日志管理", weixin_rzgl_app_url);

        // 日志查询应用二维码链接
        String weixin_rzch_app_url = QRCodeUtils.getBASE64AppQRCode("weixin_rzch_app_url", 500, 500, "png");
        qrCodeImageStrMap.put("日志查询", weixin_rzch_app_url);

        // 部门通讯录应用二维码链接
        String weixin_bmtxl_app_url = QRCodeUtils.getBASE64AppQRCode("weixin_bmtxl_app_url", 500, 500, "png");
        qrCodeImageStrMap.put("部门通讯录", weixin_bmtxl_app_url);

        // 设置页面数据
        model.addAttribute("qrCodeImageStrMap", qrCodeImageStrMap);

        // 返回页面
        return "/qrcode/findAllQRCode";
    }

    /**
     * 生成二维码
     * @param attr RedirectAttributes 重定向
     * @param model Model对象用于设置页面数据
     * @param aMap Map 对象页面传入参数集合：
     * <p>
     * <li>key=content 生成二维码的内容</li>
     * <li>key=width 二维码宽度</li>
     * <li>key=height 二维码高度</li>
     * <li>key=typeFormat 图片格式</li>
     * </p>
     * @throws Exception
     */
    @RequestMapping("/createBase64QRCode.do")
    public void createBase64QRCode(HttpServletResponse response, Model model, @RequestParam Map<String, String> map)
            throws Exception {
        // 内容
        String content = map.get("content");

        // 宽度
        int width = 500;
        if (map.containsKey("width")) {
            width = Integer.parseInt(map.get("width"));
        }

        // 高度
        int height = 500;
        if (map.containsKey("height")) {
            height = Integer.parseInt(map.get("height"));
        }

        // 图片格式
        String typeFormat = "png";
        if (map.containsKey("typeFormat")) {
            typeFormat = map.get("typeFormat");
        }

        // 获取生成二维码
        String qrBase64Image = QRCodeUtils.getBASE64AppQRCode(content, width, height, typeFormat);

        // 返回页面二维码信息
        response.getWriter().print(qrBase64Image);
    }

}
