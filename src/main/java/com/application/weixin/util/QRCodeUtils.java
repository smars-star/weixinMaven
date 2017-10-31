/**
 * Copyright (c)  2017， 西安长城数字软件有限公司[www.e-u.cn]。
 *
 */
package com.application.weixin.util;

import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.util.Hashtable;

import javax.imageio.ImageIO;

import com.application.framework.util.AppSettingFactory;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.EncodeHintType;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;

import sun.misc.BASE64Encoder;


/** 
 *  二维码QRCodeUtils工具类
 * 
 * @author $Author: liuyunpeng $
 * @version $Revision: 1.0 $
 */
@SuppressWarnings("restriction")
public class QRCodeUtils {

    /**
     *  生成 BATE64 图片
     * @param content String对象用于生成二维码内容
     * @param width     String对象用于生成二维码的宽度
     * @param width     String对象用于生成二维码的高度
     * @param format   String对象用于生成二维码的图片格式
     * @return String    返回64bit图片格式
     * @throws Exception 
     */
    @SuppressWarnings({ "unchecked", "rawtypes"})
    public  static  String   getBASE64AppQRCode(String content,int width,int height,String format) throws Exception{
        //初始化appSetting
        AppSettingFactory appSettingFactory = AppSettingFactory.getInstance();

        //获取企业微信应用URL链接
        String weixin_app_url_temp =  appSettingFactory.getAppSetting(content);
        //设置图片格式
        Hashtable hints= new Hashtable();   
        hints.put(EncodeHintType.CHARACTER_SET, "utf-8");   
        BitMatrix bitMatrix = new MultiFormatWriter().encode(weixin_app_url_temp, BarcodeFormat.QR_CODE, width, height,hints);   

        //MatrixToImageWriter.writeToFile(bitMatrix, format, outputFile);//生成二维码图片

        //生成bufferimage 图片
        BufferedImage bufferImage =   MatrixToImageWriter.toBufferedImage(bitMatrix);

        //把图片转换成 byte数组
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ImageIO.write(bufferImage, format, baos);
        byte[] bytes = baos.toByteArray();
        
        //再把数组转换成BASE64字符串， 在加上图片的格式
        BASE64Encoder  base64Encoder = new BASE64Encoder();
        String  base64Str = base64Encoder.encode(bytes);

        //返回64bit图片格式
        return  "data:image/"+format+";base64,"+base64Str;
    }

}
