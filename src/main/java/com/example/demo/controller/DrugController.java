package com.example.demo.controller;

import com.alibaba.fastjson.JSONObject;
import com.example.demo.VO.ResultVO;
import com.example.demo.dao.UserDao;
import com.example.demo.enums.ResultCode;
import com.example.demo.pojo.Drug;
import com.example.demo.pojo.User;
import com.example.demo.service.DrugService;
import com.example.demo.service.UserService;
import com.example.demo.utils.ResultVOUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequestMapping("/drug")
@RestController
@Slf4j
public class DrugController{
    @Autowired
    private DrugService drugService;

    @RequestMapping("/druglist")
    public Map<String,Object> selectAll(Drug drug, @RequestParam(defaultValue="0")int page, @RequestParam(defaultValue="5")int limit, @RequestParam(value = "searchVal",required = false)String searchVal, HttpServletRequest request) {

        int countData=drugService.selectAll(searchVal);		//查询总数
        page=(page-1)*limit;
        List<Drug> data=drugService.selectByPage(page,limit,searchVal);		//分页查询数据

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
        int countData=drugService.selectAll("");		//查询总数
        Map<String,Object> map=new HashMap<>();
        map.put("length",countData);
        return map;
    }

    @RequestMapping("/delids")
    @ResponseBody
    public ResultVO delids(@RequestParam("id")String id) {

        //将字符串分割为list集合
        System.out.printf(id);
        ArrayList<Integer> _id = new ArrayList<Integer>();
        String[] ids = id.split(",");

        for (String item:ids){
            _id.add(Integer.parseInt(item));
        }

        boolean b = drugService.delById(_id);

        if (b){
            return  ResultVOUtil.success();
        }else {
            return ResultVOUtil.error(ResultCode.FAIL.code,ResultCode.FAIL.msg);
        }
    }

    @RequestMapping("/adddrug")
    @ResponseBody
    public ResultVO addDrug(Drug drug){

        log.info(String.valueOf(drug));

        log.info(drug.getDescription());
        boolean b = drugService.addDrug(drug);

        return b? ResultVOUtil.success() : ResultVOUtil.error(ResultCode.FAIL.code,ResultCode.FAIL.msg);
    }

    @RequestMapping("/editdrug")
    @ResponseBody
    public ResultVO editDrug(Drug drug){

        boolean b=drugService.editDrug(drug);
        return b? ResultVOUtil.success() : ResultVOUtil.error(ResultCode.FAIL.code,ResultCode.FAIL.msg);
    }

    @RequestMapping("/drug_counts")
    @ResponseBody
    public ResultVO drug_counts(Drug drug){

        List<Drug> data=drugService.drug_counts();

        return ResultVOUtil.success(data);
    }

}
