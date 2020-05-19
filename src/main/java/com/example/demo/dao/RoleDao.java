package com.example.demo.dao;

import com.example.demo.pojo.Role;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

@Repository
@Mapper
public interface RoleDao {
    Role selectById(@Param("roleid") int roleid);
}
