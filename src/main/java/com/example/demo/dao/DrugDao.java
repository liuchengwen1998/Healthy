package com.example.demo.dao;

import com.example.demo.pojo.Drug;
import com.example.demo.pojo.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.List;

@Repository
@Mapper
public interface DrugDao {

    int selectAll(@Param("searchVal") String searchVal);

    List<Drug> selectByPage(@Param("i") int i, @Param("limit") int limit, @Param("searchVal") String searchVal);

    boolean delById(List<Integer> id);

    User selectedByPhone(@Param("phone") String phone);

    boolean addDrug(@Param("drug") Drug drug);

    boolean editDrug(@Param("drug") Drug drug);

    List<Drug> drug_counts();
}
