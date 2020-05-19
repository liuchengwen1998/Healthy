package com.example.demo.controller;

import com.example.demo.VO.ResultVO;
import com.example.demo.enums.ResultCode;
import com.example.demo.pojo.Treatment;
import com.example.demo.utils.ResultVOUtil;
import org.apache.ibatis.annotations.Param;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/notice")
public class noticeController {

    @RequestMapping("/noticeCheck")
    public ResultVO allInHos(@Param("phone")String phone,@Param("name")String name){

        boolean b = CodeController.sendMsg(phone, name);

        return b?ResultVOUtil.success():ResultVOUtil.error(ResultCode.ERROR_MSG.code,ResultCode.ERROR_MSG.msg);
    }
}
