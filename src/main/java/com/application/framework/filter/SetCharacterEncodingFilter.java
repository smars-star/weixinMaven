/**
 * Copyright (c) 2017， 西安长城数字软件有限公司[www.e-u.cn]。
 *
 */
package com.application.framework.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;

/**
 * 字符集过滤器，默认走UTF-8格式
 * 
 * @author $Author: liuyunpeng $
 * @version $Revision: 1.0 $
 */
public class SetCharacterEncodingFilter implements Filter{

    protected String encoding = null;

    protected FilterConfig filterConfig = null;

    public void destroy() {
        this.encoding = null;
        this.filterConfig = null;
    }

    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException,
            ServletException {

        String encoding = selectEncoding(request);
        if (encoding != null) {
            request.setCharacterEncoding(encoding);
        }
        chain.doFilter(request, response);
    }

    public void init(FilterConfig filterConfig) throws ServletException {
        this.filterConfig = filterConfig;
        encoding = filterConfig.getInitParameter("encoding");
    }

    /**
     * 获取 encoding
     */
    protected String selectEncoding(ServletRequest request) {
        return this.encoding;
    }

}
