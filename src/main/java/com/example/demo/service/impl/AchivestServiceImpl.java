package com.example.demo.service.impl;

import com.example.demo.dao.AchivestDao;
import com.example.demo.pojo.Achivest;
import com.example.demo.pojo.User;
import com.example.demo.service.AchivestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AchivestServiceImpl implements AchivestService {

    @Autowired
    private AchivestDao achivestDao;

    @Override
    public int selectAll(String search) {
        return achivestDao.selectAll(search);
    }

    @Override
    public List<Achivest> selectByPage(int page, int limit, String search) {
        return achivestDao.selectByPage(page,limit,search);
    }

    @Override
    public Achivest selectByType(String type) { return achivestDao.selectByType(type); }

    @Override
    public Achivest selectById(Integer id) {
        return achivestDao.selectById(id);
    }

    @Override
    public Achivest self_archives(String identity) { return achivestDao.self_archives(identity); }

}
