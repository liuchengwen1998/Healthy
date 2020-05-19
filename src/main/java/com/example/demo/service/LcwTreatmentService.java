package com.example.demo.service;

import com.example.demo.entity.LcwTreatment;
import java.util.List;

/**
 * (LcwTreatment)表服务接口
 *
 * @author makejava
 * @since 2020-04-27 21:48:09
 */
public interface LcwTreatmentService {

    /**
     * 通过ID查询单条数据
     *
     * @param id 主键
     * @return 实例对象
     */
    LcwTreatment queryById(Integer id);

    /**
     * 查询多条数据
     *
     * @param offset 查询起始位置
     * @param limit 查询条数
     * @return 对象列表
     */
    List<LcwTreatment> queryAllByLimit(int offset, int limit);

    /**
     * 新增数据
     *
     * @param lcwTreatment 实例对象
     * @return 实例对象
     */
    LcwTreatment insert(LcwTreatment lcwTreatment);

    /**
     * 修改数据
     *
     * @param lcwTreatment 实例对象
     * @return 实例对象
     */
    LcwTreatment update(LcwTreatment lcwTreatment);

    /**
     * 通过主键删除数据
     *
     * @param id 主键
     * @return 是否成功
     */
    boolean deleteById(Integer id);
}