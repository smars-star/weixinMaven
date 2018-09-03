/**
 * Copyright (c) 2017， 西安长城数字软件有限公司[www.e-u.cn]。 
 * 
 * 
 * 
 */
package com.application.wechatmp.dto;

import java.io.Serializable;
import java.util.List;


/**
 * 手机告警系统。微信公众号人员DTO
 * @author $Author: liuyunpeng $
 * @version $Revision: 1.0 $
 */
public class WeixinPublicEmployeeDTO implements Serializable{

	/**
	 * 生成唯一序列号
	 */
	private static final long serialVersionUID = 4743353684167743200L;

	/** 是否关注：0(未关注时，拉取不到其余信息)、1(关注) */
	private  String subscribe = "";
	
	/** 用户的标识，对当前公众号唯一 */
	private  String openid = "";
	
	/** 用户的昵称 */
	private  String nickname = "";
	
	/** 用户的性别，值为1时是男性，值为2时是女性，值为0时是未知 */
	private  String sex = "";
	
	/** 用户所在城市 */
	private  String city = "";
	
	/** 用户所在国家 */
	private String country = "";
	
	/** 用户所在省份 */
	private String province = "";
	
	/** 用户的语言，简体中文为zh_CN */
	private  String language = "";
	
	/** 用户头像，最后一个数值代表正方形头像大小 */
	private String headimgurl = "";
	
	/** 用户关注时间，为时间戳。如果用户曾多次关注，则取最后关注时间 */
	private String subscribe_time = "";
	
	/** 只有在用户将公众号绑定到微信开放平台帐号后，才会出现该字段。 */
	private String unionid = "";
	
	/** 公众号运营者对粉丝的备注，公众号运营者可在微信公众平台用户管理界面对粉丝添加备注 */
	private String remark = "";
	
	/** 用户所在的分组ID（暂时兼容用户分组旧接口） */
	private  String groupid = "";
	
	/** 用户被打上的标签ID列表  */
	private List<Integer> tagid_list;
	
	/** 返回用户关注的渠道来源，ADD_SCENE_SEARCH 公众号搜索，ADD_SCENE_ACCOUNT_MIGRATION 公众号迁移，ADD_SCENE_PROFILE_CARD 名片分享，ADD_SCENE_QR_CODE 扫描二维码，ADD_SCENEPROFILE LINK 图文页内名称点击，ADD_SCENE_PROFILE_ITEM 图文页右上角菜单，ADD_SCENE_PAID 支付后关注，ADD_SCENE_OTHERS 其他 */
	private String subscribe_scene = "";
	
	/** 二维码扫码场景（开发者自定义）  */
	private String qr_scene = "";
	
	/** 二维码扫码场景描述（开发者自定义） */
	private String qr_scene_str = "";

	public String getSubscribe() {
		return subscribe;
	}

	public void setSubscribe(String subscribe) {
		this.subscribe = subscribe;
	}

	public String getOpenid() {
		return openid;
	}

	public void setOpenid(String openid) {
		this.openid = openid;
	}

	public String getNickname() {
		return nickname;
	}

	public void setNickname(String nickname) {
		this.nickname = nickname;
	}

	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getProvince() {
		return province;
	}

	public void setProvince(String province) {
		this.province = province;
	}

	public String getLanguage() {
		return language;
	}

	public void setLanguage(String language) {
		this.language = language;
	}

	public String getHeadimgurl() {
		return headimgurl;
	}

	public void setHeadimgurl(String headimgurl) {
		this.headimgurl = headimgurl;
	}

	public String getSubscribe_time() {
		return subscribe_time;
	}

	public void setSubscribe_time(String subscribe_time) {
		this.subscribe_time = subscribe_time;
	}

	public String getUnionid() {
		return unionid;
	}

	public void setUnionid(String unionid) {
		this.unionid = unionid;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public String getGroupid() {
		return groupid;
	}

	public void setGroupid(String groupid) {
		this.groupid = groupid;
	}

	public String getSubscribe_scene() {
		return subscribe_scene;
	}

	public void setSubscribe_scene(String subscribe_scene) {
		this.subscribe_scene = subscribe_scene;
	}

	public String getQr_scene() {
		return qr_scene;
	}

	public void setQr_scene(String qr_scene) {
		this.qr_scene = qr_scene;
	}

	public String getQr_scene_str() {
		return qr_scene_str;
	}

	public void setQr_scene_str(String qr_scene_str) {
		this.qr_scene_str = qr_scene_str;
	}

	public List<Integer> getTagid_list() {
		return tagid_list;
	}

	public void setTagid_list(List<Integer> tagid_list) {
		this.tagid_list = tagid_list;
	}

	
}
