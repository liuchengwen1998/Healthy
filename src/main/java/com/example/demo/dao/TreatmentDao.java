package com.example.demo.dao;

import com.example.demo.pojo.Achivest;
import com.example.demo.pojo.File;
import com.example.demo.pojo.Treatment;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

import java.util.List;

@Mapper
@Component
public interface TreatmentDao {
    File selectByIdentity(@Param("identity") String identity);

    List<Treatment> project_counts();

    int selectAll(@Param("searchVal") String searchVal,@Param("type") Integer type,@Param("identity")String identity);

    List<Treatment> selectByPage(@Param("i") int i,
                                 @Param("limit") int limit,
                                 @Param("searchVal") String searchVal,
                                 @Param("type")Integer type,
                                 @Param("check")Integer check,
                                 @Param("identity")String identity);

    boolean updateTreatment(@Param("treatment") Treatment treatment);

    int selectByIn_hospital();

    int selectByIncheck();

    List<File> preHistory(@Param("identity")String identity);

    List<Treatment> prerecored(@Param("i") int i, @Param("limit") int limit,@Param("identity")String identity);

    int selectAllByIdentity(@Param("identity")String identity);
}
