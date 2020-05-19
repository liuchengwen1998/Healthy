package com.example.demo.dao;

import com.example.demo.pojo.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class UserDaoTest {

    @Autowired
    private UserDao userDao;
    @Test
    void selectByName() {
        String name = "admin";
//        User user = userDao.selectByName(name);
//        System.out.println(user);
    }
}