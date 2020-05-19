package com.example.demo.service.impl;

import com.example.demo.dao.UserDao;
import com.example.demo.entity.LcwMenu;
import com.example.demo.pojo.Drug;
import com.example.demo.pojo.User;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserDao userDao;

    @Override
    public User selectByname(String username) {
        return userDao.selectByName(username);
    }

    //修改状态
    @Override
    public boolean editFail_count(int i,String username) {
        return userDao.editFail_count(i,username);
    }

    @Override
    public int selectAll(String search) {
        return userDao.selectAll(search);
    }

    @Override
    public List<User> selectByPage(int page, int limit,String search) {
        return userDao.selectByPage(page,limit,search);
    }

    @Override
    public boolean delById(List<Integer> id) {
        return userDao.delById(id);
    }

    @Override
    public User selectedByPhone(String phone) {
        return userDao.selectedByPhone(phone);
    }

    @Override
    public boolean updateStatus(String id, int i) {
        return userDao.updateStatus(id,i);
    }

    @Override
    public boolean adduser(User user) {return userDao.addUser(user);}


    @Override
    public boolean updateUser(User user) {return userDao.updateUser(user);}

    @Override
    public User checkUsername(String username) {
        return userDao.checkUsername(username);
    }

    @Override
    public boolean edituser(User user) {
        return userDao.updateUser(user);
    }

    @Override
    public ArrayList<Integer> selectMenus(int role) {
        return userDao.selectMenus(role);
    }

    @Override
    public ArrayList<LcwMenu> selectRoleMenu(ArrayList<Integer> menus_id) {
        return  userDao.selectRoleMenu(menus_id);
    }
}
