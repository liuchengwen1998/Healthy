package com.example.demo.controller;

import com.alibaba.fastjson.JSONObject;
import com.example.demo.VO.ResultVO;
import com.example.demo.enums.ResultCode;
import com.example.demo.pojo.Drug;
import com.example.demo.pojo.Role;
import com.example.demo.pojo.User;
import com.example.demo.service.RoleService;
import com.example.demo.service.UserService;
import com.example.demo.utils.MD5Utils;
import com.example.demo.utils.ResultVOUtil;
import org.apache.ibatis.annotations.Param;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.stereotype.Controller;
import org.springframework.util.DigestUtils;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.nio.charset.StandardCharsets;
import java.util.*;

@Controller
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private RoleService roleService;

    @RequestMapping("/userlist")
    @ResponseBody
    public Map<String,Object> selectAll(User user, @RequestParam(defaultValue="0")int page, @RequestParam(defaultValue="5")int limit,@RequestParam(value = "searchVal",required = false)String searchVal, HttpServletRequest request) {

        int countData=userService.selectAll(searchVal);		//查询总数
        page=(page-1)*limit;
        List<User> data=userService.selectByPage(page,limit,searchVal);		//分页查询数据

        Map<String,Object> map=new HashMap<>();		//装填回调数据
        map.put("code", 0);
        map.put("msg", "ok");
        map.put("count", countData);		//获得数据的总数
        map.put("data",data);	//本次分页查询的数据
        return map;
    }

    @RequestMapping("/counts")
    @ResponseBody
    public Map<String,Object> counts() {
        int countData=userService.selectAll("");		//查询总数
        Map<String,Object> map=new HashMap<>();
        map.put("length",countData);
        return map;
    }

    @RequestMapping("/delids")                                //批量删除
    @ResponseBody
    public ResultVO delids(@RequestParam("id")String id) {

        //将字符串分割为list集合
        System.out.printf(id);
        ArrayList<Integer> _id = new ArrayList<Integer>();
        String[] ids = id.split(",");

        for (String item:ids){
            _id.add(Integer.parseInt(item));
        }
        boolean b = userService.delById(_id);

        if (b){
            return  ResultVOUtil.success();
        }else {
            return ResultVOUtil.error(ResultCode.FAIL.code,ResultCode.FAIL.msg);
        }
    }

    @RequestMapping("/editstatus")
    @ResponseBody
    public ResultVO editstatus(@RequestParam("id")String id,@RequestParam("status")Integer status) {

        boolean b = true;
        if (status==0){
            b = userService.updateStatus(id,1);
        }else {
            b = userService.updateStatus(id,0);
        }

        return b ? ResultVOUtil.success(): ResultVOUtil.error(ResultCode.FAIL.code,ResultCode.FAIL.msg);

    }

    @RequestMapping("/userInfo")
    @ResponseBody
    public ResultVO userInfo(@RequestParam("username")String username) {

        User user = userService.selectByname(username);

        if (user!=null){
            return  ResultVOUtil.success(user);
        }else {
            return ResultVOUtil.error(ResultCode.FAIL.code,ResultCode.FAIL.msg);
        }
    }

    @RequestMapping("/adduser")
    @ResponseBody
    public ResultVO adduser(User user){

        String username=user.getUsername();
        User user1 = userService.checkUsername(username);
        if(user1!=null){
            return ResultVOUtil.error(ResultCode.LOGIN_EOORO7.code,ResultCode.LOGIN_EOORO7.msg);
        }else{
            user.setStatus(0);
            user.setFail_count(0);
            int roleid = user.getRoleid();
            Role role = roleService.selectById(roleid);
            user.setRolename(role.getRolename());
            user.setPassword(MD5Utils.string2MD5(user.getPassword()));
            boolean b = userService.adduser(user);
            return b? ResultVOUtil.success() : ResultVOUtil.error(ResultCode.FAIL.code,ResultCode.FAIL.msg);
        }
    }

    @RequestMapping("/editUser")
    @ResponseBody
    public ResultVO edituser(User user) {

        boolean b = userService.updateUser(user);

        if (b){
            return  ResultVOUtil.success();
        }else {
            return ResultVOUtil.error(ResultCode.FAIL.code,ResultCode.FAIL.msg);
        }
    }

    @RequestMapping("/lockscreen")
    @ResponseBody
    public ResultVO lockscreen(@RequestParam("name")String name,@RequestParam("pwd")String pwd){
        User user = userService.selectByname(name);
        if(MD5Utils.string2MD5(pwd).equals(user.getPassword()))
            return ResultVOUtil.success();
        else
            return ResultVOUtil.error(ResultCode.FAIL.code,ResultCode.FAIL.msg);

    }

    @RequestMapping("/resetpassword")
    @ResponseBody
    public ResultVO resetpassword(User pas,@RequestParam("NewPassword")String NewPassword,
                                  @RequestParam("ReNewPassword")String ReNewPassword,
                                  @RequestParam("rolepassword")String rolepassword){
        User user = (User) SecurityUtils.getSubject().getPrincipal();
        User _user = userService.selectByname(user.getUsername());
        if(MD5Utils.string2MD5(rolepassword).equals(user.getPassword())&&
                NewPassword.equals(ReNewPassword)){
            pas.setPassword(MD5Utils.string2MD5(NewPassword));
            boolean b = userService.updateUser(pas);
            return ResultVOUtil.success();
        }
        else if (!MD5Utils.string2MD5(rolepassword).equals(user.getPassword()))
            return ResultVOUtil.error(ResultCode.ERROR_PAS.code,ResultCode.ERROR_PAS.msg);
        else if (!NewPassword.equals(ReNewPassword))
            return ResultVOUtil.error(ResultCode.ERROR_PAS1.code,ResultCode.ERROR_PAS1.msg);
        else
            return ResultVOUtil.error(ResultCode.FAIL.code,ResultCode.FAIL.msg);

    }


    @RequestMapping("/editPwd")
    @ResponseBody
    public ResultVO editPwd(@RequestParam("oldpwd")String oldpwd,@RequestParam("newpwd")String newpwd,
                            @RequestParam("code")String code,@RequestParam("username")String username,
                            @RequestParam("phone")String phone ,HttpServletRequest request) {
        User user = userService.selectByname(username);
        JSONObject json = (JSONObject) request.getSession().getAttribute("code");
        if (json==null){
            return ResultVOUtil.error(400,"请发送验证码");
        }else {
            String msg_code = json.getString("code");
            Long time = json.getLong("createTime");
            if (!user.getPassword().equals(oldpwd)){
                return ResultVOUtil.error(400,"原密码不正确");
            }else {
                if (oldpwd.equals(newpwd)){
                    return ResultVOUtil.error(400,"旧密码和新密码一致");
                }else {
                    if (user.getPhone().equals(phone)){
                        if (code.equals(msg_code) && System.currentTimeMillis()-time<60000){
                            user.setPassword(newpwd);
                            boolean b = userService.updateUser(user);
                            return b?ResultVOUtil.success():ResultVOUtil.error(ResultCode.FAIL.code,ResultCode.FAIL.msg);
                        }else {
                            return ResultVOUtil.error(ResultCode.LOGIN_EOORO4.code,ResultCode.LOGIN_EOORO4.msg);
                        }
                    }else {
                        return ResultVOUtil.error(ResultCode.LOGIN_EOORO6.code,ResultCode.LOGIN_EOORO6.msg);
                    }
                }
            }
        }


    }

}
