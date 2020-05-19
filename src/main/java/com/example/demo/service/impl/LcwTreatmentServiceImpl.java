package com.example.demo.service.impl;

import com.example.demo.entity.LcwTreatment;
import com.example.demo.dao.LcwTreatmentDao;
import com.example.demo.service.LcwTreatmentService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * (LcwTreatment)表服务实现类
 *
 * @author makejava
 * @since 2020-04-27 21:48:09
 */
@Service("lcwTreatmentService")
public class LcwTreatmentServiceImpl implements LcwTreatmentService {
    @Resource
    private LcwTreatmentDao lcwTreatmentDao;

    /**
     * 通过ID查询单条数据
     *
     * @param id 主键
     * @return 实例对象
     */
    @Override
    public LcwTreatment queryById(Integer id) {
        return this.lcwTreatmentDao.queryById(id);
    }

    /**
     * 查询多条数据
     *
     * @param offset 查询起始位置
     * @param limit 查询条数
     * @return 对象列表
     */
    @Override
    public List<LcwTreatment> queryAllByLimit(int offset, int limit) {
        return this.lcwTreatmentDao.queryAllByLimit(offset, limit);
    }

    /**
     * 新增数据
     *
     * @param lcwTreatment 实例对象
     * @return 实例对象
     */
    @Override
    public LcwTreatment insert(LcwTreatment lcwTreatment) {
        this.lcwTreatmentDao.insert(lcwTreatment);
        return lcwTreatment;
    }

    /**
     * 修改数据
     *
     * @param lcwTreatment 实例对象
     * @return 实例对象
     */
    @Override
    public LcwTreatment update(LcwTreatment lcwTreatment) {
        this.lcwTreatmentDao.update(lcwTreatment);
        return this.queryById(lcwTreatment.getId());
    }

    /**
     * 通过主键删除数据
     *
     * @param id 主键
     * @return 是否成功
     */
    @Override
    public boolean deleteById(Integer id) {
        return this.lcwTreatmentDao.deleteById(id) > 0;
    }


}