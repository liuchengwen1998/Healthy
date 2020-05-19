package com.example.demo.service;

import com.example.demo.pojo.Achivest;

import java.util.List;

public interface AchivestService {
    int selectAll(String searchVal);

    List<Achivest> selectByPage(int i, int limit, String searchVal);

    Achivest selectById(Integer id);

    Achivest selectByType(String type);

    Achivest self_archives(String identity);

}
