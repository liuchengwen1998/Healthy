package com.example.demo.controller;

import com.example.demo.VO.ResultVO;
import com.example.demo.enums.ResultCode;
import com.example.demo.pojo.Achivest;
import com.example.demo.pojo.Treatment;
import com.example.demo.pojo.User;
import com.example.demo.service.AchivestService;
import com.example.demo.utils.ResultVOUtil;
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
@RequestMapping("/archives")
public class AchivestController {

    @Autowired
    private AchivestService achivestService;

    @RequestMapping("/archivesList")
    @ResponseBody
    public Map<String, Object> selectAll(Achivest achivest, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "5") int limit, @RequestParam(value = "searchVal", required = false) String searchVal, HttpServletRequest request) {

        int countData = achivestService.selectAll(searchVal);        //查询总数
        page=(page-1)*limit;
        List<Achivest> data = achivestService.selectByPage(page, limit, searchVal);        //分页查询数据

        Map<String, Object> map = new HashMap<>();        //装填回调数据
        map.put("code", 0);
        map.put("msg", "ok");
        map.put("count", countData);        //获得数据的总数
        map.put("data", data);    //本次分页查询的数据
        return map;
    }

    @RequestMapping("/counts")
    @ResponseBody
    public Map<String, Object> counts() {
        int countData = achivestService.selectAll("");        //查询总数
        Map<String, Object> map = new HashMap<>();
        map.put("length", countData);
        return map;
    }

    @RequestMapping("/archivesById")
    @ResponseBody
    public ResultVO archivesById(@RequestParam("id")Integer id) {

        Achivest achivest =  achivestService.selectById(id);
        if (achivest!=null){
            return ResultVOUtil.success(achivest);
        }else {
            return ResultVOUtil.error(ResultCode.ACHIVEST_ERROR.code,ResultCode.ACHIVEST_ERROR.msg);
        }
    }

    @RequestMapping("/archivesByType")
    @ResponseBody
    public ResultVO archivesByType(@RequestParam("type")String type) {

        Achivest achivest =  achivestService.selectByType(type);
        if (achivest!=null){
            return ResultVOUtil.success(achivest);
        }else {
            return ResultVOUtil.error(ResultCode.ACHIVEST_ERROR.code,ResultCode.ACHIVEST_ERROR.msg);
        }
    }

    @RequestMapping("/self_achives")
    @ResponseBody
    public Map<String, Object> self_archives(){
        User user = (User) SecurityUtils.getSubject().getPrincipal();
        String identity = user.getUsername();
        Achivest data= (Achivest) achivestService.self_archives(identity);
        Map<String, Object> map = new HashMap<>();        //装填回调数据
        //int countData = achivestService.selectAllByIdentity(identity);        //查询总数
        map.put("code", 0);
        map.put("msg", "ok");
        //map.put("count",countData );        //获得数据的总数
        map.put("data", data);    //本次分页查询的数据
        return map;
    }


}
