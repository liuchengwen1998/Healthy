package com.example.demo.dao;


import com.example.demo.pojo.Case;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Repository
@Mapper
public interface CaseDao {
    boolean saveCase(Case addCase);
}
