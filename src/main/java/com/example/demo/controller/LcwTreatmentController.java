package com.example.demo.controller;

import com.example.demo.VO.ResultVO;
import com.example.demo.entity.LcwTreatment;
import com.example.demo.pojo.User;
import com.example.demo.service.LcwTreatmentService;
import com.example.demo.utils.ResultVOUtil;
import org.apache.shiro.SecurityUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * (LcwTreatment)表控制层
 *
 * @author makejava
 * @since 2020-04-27 21:47:20
 */
@RestController
@RequestMapping("lcwTreatment")
public class LcwTreatmentController {
    /**
     * 服务对象
     */
    @Resource
    private LcwTreatmentService lcwTreatmentService;

    /**
     * 通过主键查询单条数据
     *
     * @param id 主键
     * @return 单条数据
     */
    @GetMapping("selectOne")
    public LcwTreatment selectOne(Integer id) {
        return this.lcwTreatmentService.queryById(id);
    }

    @RequestMapping("addTreatment")
    public ResultVO addTreatment(LcwTreatment lcwTreatment){
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式
        lcwTreatment.setCreateTime(df.format(new Date()));
        User user = (User) SecurityUtils.getSubject().getPrincipal();
        lcwTreatment.setCreatorId(user.getId());
        LcwTreatment insert = lcwTreatmentService.insert(lcwTreatment);
        return ResultVOUtil.success();
    }

}