package com.example.demo.controller;


import com.example.demo.VO.ResultVO;
import com.example.demo.enums.ResultCode;
import com.example.demo.pojo.Case;
import com.example.demo.service.CaseService;
import com.example.demo.utils.ResultVOUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * 病例的controller
 */

@RequestMapping("/case")
@Controller
public class CaseController {

    @Autowired
    private CaseService caseService;

    @RequestMapping("/saveCase")
    @ResponseBody
    public ResultVO saveCase(Case addCase){

        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式
        addCase.setCreatetime(df.format(new Date()));
        boolean b = caseService.saveCase(addCase);

        return b ? ResultVOUtil.success() : ResultVOUtil.error(ResultCode.FAIL.code,ResultCode.FAIL.msg);
    }

}
