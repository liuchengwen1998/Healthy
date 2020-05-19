package com.example.demo.config;

import at.pollux.thymeleaf.shiro.dialect.ShiroDialect;
import org.apache.shiro.spring.security.interceptor.AuthorizationAttributeSourceAdvisor;
import org.apache.shiro.spring.web.ShiroFilterFactoryBean;
import org.apache.shiro.web.mgt.DefaultWebSecurityManager;
import org.apache.shiro.web.session.mgt.DefaultWebSessionManager;
import org.springframework.aop.framework.autoproxy.DefaultAdvisorAutoProxyCreator;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

@Configuration
public class ShiroConfig {
    //ShiroFilterFactoryBean:3
    @Bean
    public ShiroFilterFactoryBean shiroFilterFactoryBean(
            @Qualifier("securityManager")DefaultWebSecurityManager defaultWebSecurityManager ){
        ShiroFilterFactoryBean bean = new ShiroFilterFactoryBean();
        //设置安全管理器
        bean.setSecurityManager(defaultWebSecurityManager);
        Map<String, String> filtermap = new LinkedHashMap();
        filtermap.put("/login","anon");
        filtermap.put("/checklogin","anon");
        filtermap.put("/tologin","anon");
        filtermap.put("/*","authc");
        filtermap.put("/page/*","authc");
        bean.setFilterChainDefinitionMap(filtermap);
        //设置登陆的请求
        bean.setLoginUrl("/tologin");
        return bean;
    }
    //DafaultWebSecurityManager:2
    @Bean(name = "securityManager")
    public DefaultWebSecurityManager defaultWebSecurityManager(@Qualifier("loginRealm") LoginRealm loginRealm){
        DefaultWebSecurityManager securityManager = new DefaultWebSecurityManager();
        securityManager.setRealm(loginRealm);
        securityManager.setSessionManager(sessionManager());
        return securityManager;
    }
    @Bean(name = "sessionManager")
    public DefaultWebSessionManager sessionManager() {
        DefaultWebSessionManager sessionManager = new DefaultWebSessionManager();
        // 设置session过期时间3600s
        sessionManager.setGlobalSessionTimeout(1800000);
        return sessionManager;
    }
    //创建realm对象，需要自定义:1
    @Bean
    public LoginRealm loginRealm(){
        return new LoginRealm();
    }

    @Bean(name = "shiroDialect")
    public ShiroDialect shiroDialect(){
        return new ShiroDialect();
    }

}
