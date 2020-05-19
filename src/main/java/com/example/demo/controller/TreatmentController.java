package com.example.demo.controller;

import com.example.demo.VO.ResultVO;
import com.example.demo.enums.ResultCode;
import com.example.demo.pojo.Achivest;
import com.example.demo.pojo.File;
import com.example.demo.pojo.Treatment;
import com.example.demo.pojo.User;
import com.example.demo.service.TreatmentService;
import com.example.demo.utils.ResultVOUtil;
import lombok.extern.slf4j.Slf4j;
import org.apache.shiro.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/treatment")
@Slf4j
public class TreatmentController {
    @Autowired
    private TreatmentService treatmentService;

    @RequestMapping("/fileInfo")
    @ResponseBody
    public ResultVO fileInfo(@RequestParam("identity")String identity) {
        File treatment = treatmentService.selectByIdentity(identity);
        if (treatment!=null){
            return  ResultVOUtil.success(treatment);
        }else {
            return ResultVOUtil.error(ResultCode.FAIL.code,ResultCode.FAIL.msg);
        }
    }

    @RequestMapping("/recordInfo")
    @ResponseBody
    public Map<String, Object> selectAll(Treatment treatment,
                                         @RequestParam(defaultValue = "0") int page,
                                         @RequestParam(defaultValue = "5") int limit,
                                         @RequestParam(value = "searchVal", required = false) String searchVal,
                                         @RequestParam(value = "identity", required = false) String identity,
                                         @RequestParam(value = "type", required = false) Integer type,
                                         @RequestParam(value = "check", required = false,defaultValue = "-1") Integer check,
                                         HttpServletRequest request) {


        log.info(identity);
        int countData = treatmentService.selectAll(searchVal,type,identity);        //查询总数
        page=(page-1)*limit;
        List<Treatment> data = treatmentService.selectByPage(page, limit, searchVal,type,check,identity);        //分页查询数据

        Map<String, Object> map = new HashMap<>();        //装填回调数据
        map.put("code", 0);
        map.put("msg", "ok");
        map.put("count", countData);        //获得数据的总数
        map.put("data", data);    //本次分页查询的数据
        return map;
    }

    @RequestMapping("/project_counts")
    @ResponseBody
    public ResultVO project_counts(Treatment treatment){

        List<Treatment> data=treatmentService.project_counts();

        return ResultVOUtil.success(data);
    }
    @RequestMapping("/allInHos")
    @ResponseBody
    public ResultVO allInHos(Treatment treatment){

        int size =treatmentService.selectByIn_hospital();

        return ResultVOUtil.success(size);
    }

    @RequestMapping("/allIncheck")
    @ResponseBody
    public ResultVO allIncheck(Treatment treatment){

        int size =treatmentService.selectByIncheck();

        return ResultVOUtil.success(size);
    }

    @RequestMapping("/editTreatment")
    @ResponseBody
    public ResultVO editTreatment(Treatment treatment){
        boolean b = treatmentService.updateTreatment(treatment);

        if (b){
            return  ResultVOUtil.success();
        }else {
            return ResultVOUtil.error(ResultCode.FAIL.code,ResultCode.FAIL.msg);
        }
    }
    @RequestMapping("/preHistory")
    @ResponseBody
    public Map<String, Object> preHistory(File file,@RequestParam("identity")String identity){
        List<File> data=treatmentService.preHistory(identity);

        Map<String, Object> map = new HashMap<>();        //装填回调数据
        map.put("code", 0);
        map.put("msg", "ok");
        map.put("count", 1);        //获得数据的总数
        map.put("data", data);    //本次分页查询的数据
        return map;
    }

    @RequestMapping("prerecored")
    @ResponseBody
    public Map<String, Object> prerecored(Treatment treatment,
                                          @RequestParam(defaultValue = "0") int page,
                                          @RequestParam(defaultValue = "5") int limit){
        User user = (User) SecurityUtils.getSubject().getPrincipal();
        String identity = user.getUsername();
        page=(page-1)*limit;
        List<Treatment> data=treatmentService.prerecored(page,limit,identity);
        Map<String, Object> map = new HashMap<>();        //装填回调数据
        int countData = treatmentService.selectAllByIdentity(identity);        //查询总数
        map.put("code", 0);
        map.put("msg", "ok");
        map.put("count",countData );        //获得数据的总数
        map.put("data", data);    //本次分页查询的数据
        return map;
    }


}
