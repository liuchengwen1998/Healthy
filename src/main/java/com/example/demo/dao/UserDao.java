package com.example.demo.dao;

import com.example.demo.entity.LcwMenu;
import com.example.demo.pojo.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Mapper
@Component
public interface UserDao {

    @Select("select * from lcw_user where username=#{name}")
    public User selectByName(String name);

    boolean editFail_count(@Param("i") int i, @Param("username") String username);

    int selectAll(@Param("search")String search);

    List<User> selectByPage(@Param("page") int page,@Param("limit")int limit,@Param("search")String search);

    boolean delById(List<Integer> id);

    User selectedByPhone(@Param("phone") String phone);

    boolean updateStatus(@Param("id") String id,@Param("i") int i);

    boolean updateUser(@Param("user") User user);

    boolean addUser(@Param("user") User user);

    User checkUsername(@Param("username")String username);

    ArrayList<Integer> selectMenus(int role);

    ArrayList<LcwMenu> selectRoleMenu(ArrayList<Integer> menus_id);
}
