package com.example.demo.config;

import com.example.demo.pojo.User;
import lombok.extern.log4j.Log4j;
import lombok.extern.slf4j.Slf4j;
import org.apache.shiro.SecurityUtils;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * 定义拦截器
 */
@Component
@Slf4j
public class ConfigInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        User user = (User) SecurityUtils.getSubject().getPrincipal();

        // session过期
        if(user == null){
            log.info(">>>session过期, 跳至登录页");
            response.sendRedirect("/tologin"); // 通过接口跳转登录页面, 注:重定向后下边的代码还会执行 ; /outToLogin是跳至登录页的后台接口
            return false;
        }else{
            return true;
        }
    }
}