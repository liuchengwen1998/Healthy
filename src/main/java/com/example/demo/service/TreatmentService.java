package com.example.demo.service;

import com.example.demo.pojo.Achivest;
import com.example.demo.pojo.File;
import com.example.demo.pojo.Treatment;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface TreatmentService {

    File selectByIdentity(String identity);

    List<Treatment> project_counts();

    int selectAll(String searchVal,Integer type,String identity);

    List<Treatment> selectByPage(int i, int limit, String searchVal,Integer type,Integer check,String identity);

    boolean updateTreatment(Treatment treatment);

    int selectByIn_hospital();

    int selectByIncheck();

    List<File> preHistory(String identity);

    List<Treatment> prerecored(int i, int limit,String identity);

    int selectAllByIdentity(String identity);
}
