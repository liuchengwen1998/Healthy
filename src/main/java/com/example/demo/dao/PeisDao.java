package com.example.demo.dao;

import com.example.demo.pojo.Drug;
import com.example.demo.pojo.Peis;
import com.example.demo.pojo.PeisDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface PeisDao {
    boolean addPeis(Peis peis);

    int selectAll(String searchVal);

    List<PeisDTO> selectByPage(int i, int limit, String searchVal);

    List<PeisDTO> selfPeis(@Param("i") int i, @Param("limit")int limit, @Param("identity")String identity);

    int selectAllByIdentity(@Param("identity")String identity);
}
