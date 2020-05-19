package com.example.demo.dao;

import com.example.demo.entity.LcwTreatment;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * (LcwTreatment)表数据库访问层
 *
 * @author makejava
 * @since 2020-04-27 21:47:20
 */
@Mapper
@Component
public interface LcwTreatmentDao {

    /**
     * 通过ID查询单条数据
     *
     * @param id 主键
     * @return 实例对象
     */
    LcwTreatment queryById(Integer id);

    /**
     * 查询指定行数据
     *
     * @param offset 查询起始位置
     * @param limit 查询条数
     * @return 对象列表
     */
    List<LcwTreatment> queryAllByLimit(@Param("offset") int offset, @Param("limit") int limit);


    /**
     * 通过实体作为筛选条件查询
     *
     * @param lcwTreatment 实例对象
     * @return 对象列表
     */
    List<LcwTreatment> queryAll(LcwTreatment lcwTreatment);

    /**
     * 新增数据
     *
     * @param lcwTreatment 实例对象
     * @return 影响行数
     */
    int insert(LcwTreatment lcwTreatment);

    /**
     * 修改数据
     *
     * @param lcwTreatment 实例对象
     * @return 影响行数
     */
    int update(LcwTreatment lcwTreatment);

    /**
     * 通过主键删除数据
     *
     * @param id 主键
     * @return 影响行数
     */
    int deleteById(Integer id);

}