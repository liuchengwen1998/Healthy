package com.example.demo.service.impl;

import com.example.demo.dao.LoginDao;
import com.example.demo.pojo.User;
import com.example.demo.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoginServiceImpl implements LoginService {
    @Autowired
    private LoginDao loginDao;
    @Override
    public User getUserByName(String name) {
        return loginDao.getUserByName(name);
    }
}
