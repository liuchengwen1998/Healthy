package com.example.demo.service;

import com.example.demo.pojo.Drug;
import com.example.demo.pojo.Peis;
import com.example.demo.pojo.PeisDTO;

import java.util.List;

public interface PeisService {
    boolean addPeis(Peis peis);

    int selectAll(String searchVal);

    List<PeisDTO> selectByPage(int i, int limit, String searchVal);

    List<PeisDTO> selfPeis(int i, int limit, String identity);

    int selectAllByIdentity(String identity);
}
