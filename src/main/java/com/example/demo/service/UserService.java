package com.example.demo.service;

import com.example.demo.entity.LcwMenu;
import com.example.demo.pojo.User;

import java.util.ArrayList;
import java.util.List;

public interface UserService {

    User selectByname(String username);

    boolean editFail_count(int i,String username);

    int selectAll(String search);

    List<User> selectByPage(int page, int limit,String search);

    boolean delById(List<Integer> id);

    User selectedByPhone(String phone);

    boolean updateStatus(String id, int i);

    boolean adduser(User user);

    boolean updateUser(User user);

    User checkUsername(String username);

    boolean edituser(User user);

    ArrayList<Integer> selectMenus(int role);

    ArrayList<LcwMenu> selectRoleMenu(ArrayList<Integer> menus_id);
}
