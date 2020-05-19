package com.example.demo.dao;

import com.example.demo.pojo.File;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;



@Mapper
@Component
public interface FileDao {
    boolean addFile(@Param("file") File file);

    File checkIdentity(String identity);

    File checkPhone(String phone);

    boolean editfile(@Param("file") File file);

    File checkidentity(@Param("identity") String identity);
}
