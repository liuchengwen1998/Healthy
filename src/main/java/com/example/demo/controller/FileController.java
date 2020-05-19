package com.example.demo.controller;

import com.example.demo.VO.ResultVO;
import com.example.demo.enums.ResultCode;
import com.example.demo.pojo.File;
import com.example.demo.pojo.Role;
import com.example.demo.pojo.User;
import com.example.demo.service.FileService;
import com.example.demo.service.RoleService;
import com.example.demo.service.UserService;
import com.example.demo.utils.MD5Utils;
import com.example.demo.utils.ResultVOUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;


@Controller
@RequestMapping("/file")
@Slf4j
public class FileController {

    @Autowired
    private FileService fileService;
    @Autowired
    private UserService userService;
    @Autowired
    private RoleService roleService;

    @RequestMapping("/addfile")
    @ResponseBody
    public ResultVO addfile(File file){
        User user=new User();
        user.setUsername(file.getIdentity());
        user.setRealname(file.getName());
        user.setRoleid(4);
        Role role = roleService.selectById(4);
        user.setRolename(role.getRolename());
        user.setPhone(file.getPhone());
        user.setEmail(file.getEmail());
        user.setStatus(0);
        user.setFail_count(0);
        user.setPassword(MD5Utils.string2MD5("123456"));
        String identity=file.getIdentity();
        File file1 = fileService.checkIdentity(identity);
        String phone=file.getPhone();
        File file2=fileService.checkPhone(phone);
        if(file1!=null){
            return ResultVOUtil.error(ResultCode.LOGIN_EOORO7.code,ResultCode.LOGIN_EOORO7.msg);
        }else if (file2!=null){
            return ResultVOUtil.error(ResultCode.LOGIN_EOORO8.code,ResultCode.LOGIN_EOORO8.msg);
        }else{
            boolean u = userService.adduser(user);
            boolean b = fileService.addfile(file);
            return b == u ? ResultVOUtil.success() : ResultVOUtil.error(ResultCode.FAIL.code,ResultCode.FAIL.msg);
        }
    }

    @RequestMapping("/editfile")
    @ResponseBody
    public ResultVO editfile(File file){
        User user=new User();
        user.setUsername(file.getIdentity());
        user.setRealname(file.getName());
        user.setPhone(file.getPhone());
        user.setEmail(file.getEmail());
        String phone=file.getPhone();
        File file2=fileService.checkPhone(phone);
        if (file2!=null && !file.getId().equals(file2.getId())){
            return ResultVOUtil.error(ResultCode.LOGIN_EOORO8.code,ResultCode.LOGIN_EOORO8.msg);
        }else{
            boolean u = userService.edituser(user);
            boolean b = fileService.editfile(file);
            return b ? ResultVOUtil.success() : ResultVOUtil.error(ResultCode.FAIL.code,ResultCode.FAIL.msg);
        }
    }

    @RequestMapping("/checkidentity")
    @ResponseBody
    public ResultVO checkidentity(@RequestParam("identity")String identity){
        File file=fileService.checkidentity(identity);
        if (file!=null){
            return ResultVOUtil.success();
        }else {
            return ResultVOUtil.error(ResultCode.NOTNULL_ID.code,ResultCode.NOTNULL_ID.msg);
        }
    }
}
