package com.example.demo.controller;

import com.example.demo.VO.ResultVO;
import com.example.demo.enums.ResultCode;
import com.example.demo.pojo.*;
import com.example.demo.service.PeisService;
import com.example.demo.utils.ResultVOUtil;
import org.apache.shiro.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequestMapping("/peis")
@RestController
public class PeisController {

    @Autowired
    private PeisService peisService;


    @RequestMapping("/peislist")
    public Map<String,Object> selectAll(Peis peis, @RequestParam(defaultValue="0")int page, @RequestParam(defaultValue="5")int limit, @RequestParam(value = "searchVal",required = false)String searchVal, HttpServletRequest request) {

        int countData=peisService.selectAll(searchVal);		//查询总数
        page=(page-1)*limit;
        List<PeisDTO> data=peisService.selectByPage(page,limit,searchVal);		//分页查询数据

        Map<String,Object> map=new HashMap<>();		//装填回调数据
        map.put("code", 0);
        map.put("msg", "ok");
        map.put("count", countData);		//获得数据的总数
        map.put("data",data);	//本次分页查询的数据
        return map;
    }


    @RequestMapping("/addPeis")
    @ResponseBody
    public ResultVO addPeis(Peis peis, @RequestParam("identity")String identity){
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式
        peis.setCreat_time(df.format(new Date()));
        peis.setIdentity(identity);
        User user = (User) SecurityUtils.getSubject().getPrincipal();
        peis.setCreator_id(user.getId());
        boolean b = peisService.addPeis(peis);

        return b? ResultVOUtil.success() : ResultVOUtil.error(ResultCode.FAIL.code,ResultCode.FAIL.msg);
    }

    @RequestMapping("/allpeis")
    @ResponseBody
    public ResultVO allpeis(@RequestParam(value = "searchVal",required = false)String searchVal){

        int countData=peisService.selectAll(searchVal);		//查询总数

        return ResultVOUtil.success(countData);
    }

    @RequestMapping("/selfPeis")
    @ResponseBody
    public Map<String, Object> selfPeis(Peis peis,
                                        @RequestParam(defaultValue="0")int page,
                                        @RequestParam(defaultValue="5")int limit ){
        User user = (User) SecurityUtils.getSubject().getPrincipal();
        String identity = user.getUsername();
        page=(page-1)*limit;
        List<PeisDTO> data=peisService.selfPeis(page,limit,identity);
        Map<String, Object> map = new HashMap<>();        //装填回调数据
        int countData = peisService.selectAllByIdentity(identity);        //查询总数
        map.put("code", 0);
        map.put("msg", "ok");
        map.put("count",countData );        //获得数据的总数
        map.put("data", data);    //本次分页查询的数据
        return map;
    }

}
