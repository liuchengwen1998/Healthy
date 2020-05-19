package com.example.demo.service.impl;

import com.example.demo.dao.RoleDao;
import com.example.demo.pojo.Role;
import com.example.demo.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleServiceImpl implements RoleService {
    @Autowired
    private RoleDao roleDao;

    @Override
    public Role selectById(int roleid) {
        return roleDao.selectById(roleid);
    }
}
