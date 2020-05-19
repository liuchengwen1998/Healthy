package com.example.demo.dao;

import com.example.demo.pojo.Achivest;
import com.example.demo.pojo.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Component;

import java.util.List;

@Mapper
@Component
public interface AchivestDao {

    @Select("select * from lcw_file where identity=#{identity}")
    public Achivest selectByIdentity(String identity);

    int selectAll(@Param("search")String search);

    List<Achivest> selectByPage(@Param("page") int page, @Param("limit")int limit, @Param("search")String search);


    Achivest selectById(Integer id);

    Achivest selectByType(String type);

    Achivest self_archives(@Param("identity") String identity);

}
