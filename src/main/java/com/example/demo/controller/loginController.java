package com.example.demo.controller;

import com.alibaba.fastjson.JSONObject;
import com.example.demo.VO.ResultVO;
import com.example.demo.entity.LcwMenu;
import com.example.demo.enums.ResultCode;
import com.example.demo.pojo.User;
import com.example.demo.service.UserService;
import com.example.demo.utils.MD5Utils;
import com.example.demo.utils.ResultVOUtil;
import com.example.demo.utils.TreeUtil;
import lombok.extern.slf4j.Slf4j;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.*;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/checklogin")
@Slf4j
public class loginController {

    @Autowired
    private UserService userService;

    @RequestMapping("/login")
    @ResponseBody
    public ResultVO login(User user,HttpSession httpSession){
        Map<String,String> map = new HashMap<>();
        String username = user.getUsername();
        String password = user.getPassword();
        //添加用户认证信息
        Subject subject = SecurityUtils.getSubject();
        UsernamePasswordToken usernamePasswordToken = new UsernamePasswordToken(
                user.getUsername(),
                MD5Utils.string2MD5(user.getPassword())
        );
        String passwd = MD5Utils.string2MD5(user.getPassword());
        log.info(passwd);
        User _user = userService.selectByname(user.getUsername());
        if(_user!=null) {
            if (_user.getStatus() == 0) {
                try {
                    //这里直接使用shiro的登录方法
                    subject.login(usernamePasswordToken);
                    boolean a = userService.editFail_count(0, username);
                    httpSession.setAttribute("userInfo", user);
                    return ResultVOUtil.success();
                    //登录失败时，会catch到你的异常，异常通过全局处理
                } catch (UnknownAccountException e) {
                    //账号不存在
                    return ResultVOUtil.error(ResultCode.LOGIN_EOORO.code, ResultCode.LOGIN_EOORO.msg);
                } catch (IncorrectCredentialsException e) {
                    //密码错误
                    return ResultVOUtil.error(ResultCode.LOGIN_EOORO1.code, ResultCode.LOGIN_EOORO1.msg);
                } catch (LockedAccountException e) {
                    return ResultVOUtil.error(ResultCode.LOGIN_EOORO2.code, ResultCode.LOGIN_EOORO2.msg);
                } catch (Exception e) {
                    return ResultVOUtil.error(ResultCode.LOGIN_EOORO3.code, ResultCode.LOGIN_EOORO3.msg);
                }
            } else {

                return ResultVOUtil.error(ResultCode.LOGIN_EOORO2.code, ResultCode.LOGIN_EOORO2.msg);
            }
        }else{
            return ResultVOUtil.error(ResultCode.LOGIN_EOORO.code,ResultCode.LOGIN_EOORO.msg);
        }

    }

    @RequestMapping("/login_phone")
    @ResponseBody
    public ResultVO login_phone(@RequestParam("phone")String phone, @RequestParam("code")String code, HttpServletRequest request, HttpServletResponse response, HttpSession httpSession){

        System.out.println(phone);
        System.out.println(code);
        User user  = userService.selectedByPhone(phone);
        JSONObject json = (JSONObject) request.getSession().getAttribute("code");
        if (user!=null && json!=null){
            String msg_code = json.getString("code");
            Long time = json.getLong("createTime");
            if (code.equals(msg_code) && System.currentTimeMillis()-time<60000){
                //添加用户认证信息
                Subject subject = SecurityUtils.getSubject();
                UsernamePasswordToken usernamePasswordToken = new UsernamePasswordToken(
                        user.getUsername(),
                        user.getPassword()
                );
                subject.login(usernamePasswordToken);
                httpSession.setAttribute("userInfo",user);
                return ResultVOUtil.success();
            }else {
                return ResultVOUtil.error(ResultCode.LOGIN_EOORO4.code,ResultCode.LOGIN_EOORO4.msg);
            }
        }else {
            if (json!=null){
                return ResultVOUtil.error(ResultCode.LOGIN_EOORO5.code,ResultCode.LOGIN_EOORO5.msg);
            }else {
                return ResultVOUtil.error(ResultCode.LOGIN_EOORO.code,ResultCode.LOGIN_EOORO.msg);
            }
        }
    }

    @RequestMapping("/getRole")
    @ResponseBody
    public ArrayList<LcwMenu> getRole(){
        User user = (User) SecurityUtils.getSubject().getPrincipal();
        int role = user.getRoleid();
        ArrayList<Integer> menus_id = userService.selectMenus(role);

        ArrayList<LcwMenu> menus = (ArrayList<LcwMenu>) TreeUtil.rebuildList2Tree(userService.selectRoleMenu(menus_id));

        return menus;

    }

    @RequestMapping("/index")
    @ResponseBody
    public Map<String,Object> index(){
        User user = (User) SecurityUtils.getSubject().getPrincipal();
        Map<String,Object> map=new HashMap<>();		//装填回调数据
        int role = user.getRoleid();
        if (role==1){
            map.put("url", "page/main?type=0");
            map.put("name", "首页");
        }else if (role==4){
            map.put("url", "page/user/selfArchives");
            map.put("name", "个人档案");
        }else if (role==2){
            map.put("url", "page/visitmanager/search");
            map.put("name", "查询信息");
        }else {
            map.put("url", "page/links/linksAdd");
            map.put("name", "个人建档");
        }
        return map;

    }
    @RequestMapping("/loginout")
    public String loginout(){
        //获取当前用户
        Subject subject = SecurityUtils.getSubject();
        subject.logout();
        return "login";
    }
}
