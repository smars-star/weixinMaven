/**
 * Copyright (c)  2017， 西安长城数字软件有限公司[www.e-u.cn]。
 *
 */
package com.application.weixin.dto;

import java.io.Serializable;
import java.util.Map;

import lombok.Getter;
import lombok.Setter;

/** 
 *  微信消息DTO(微信消息推送类) 
 * 
 * @author $Author: liuyunpeng $
 * @version $Revision: 1.0 $
 */
@Getter
@Setter
public class WeixinMessageDTO implements Serializable {

    /**
     * 生成唯一序列号
     */
    private static final long serialVersionUID = 8377785685672613380L;

    /** 企业号内的成员id */
    private String touser = "";

    /** 整型，需要发送红包的应用ID，若只是使用微信支付和企业转账，则无需该参数 */
    private int agentid = 0;

    /** 消息类型，此时固定为：text */
    private String msgtype = "text";

    /** 消息内容 :content(消息内容，最长不超过2048个字节) */
    private Map<String, String> text = null;

    /** 是否是保密消息，0表示否，1表示是，默认0 */
    private int safe = 0;
		
}
