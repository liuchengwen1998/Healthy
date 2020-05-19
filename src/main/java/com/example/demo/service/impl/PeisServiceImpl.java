package com.example.demo.service.impl;

import com.example.demo.dao.PeisDao;
import com.example.demo.pojo.Drug;
import com.example.demo.pojo.Peis;
import com.example.demo.pojo.PeisDTO;
import com.example.demo.service.PeisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PeisServiceImpl implements PeisService {

    @Autowired
    private PeisDao peisDao;

    @Override
    public boolean addPeis(Peis peis) {
        return peisDao.addPeis(peis);
    }

    @Override
    public int selectAll(String searchVal) {
        return peisDao.selectAll(searchVal);
    }

    @Override
    public List<PeisDTO> selfPeis(int i, int limit, String identity) {
        return peisDao.selfPeis(i,limit,identity);
    }

    @Override
    public int selectAllByIdentity(String identity) {
        return peisDao.selectAllByIdentity(identity);
    }

    @Override
    public List<PeisDTO> selectByPage(int i, int limit, String searchVal) {
        return peisDao.selectByPage(i,limit,searchVal);



    }
}
