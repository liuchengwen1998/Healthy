package com.example.demo.service.impl;

import com.example.demo.dao.FileDao;
import com.example.demo.dao.UserDao;
import com.example.demo.pojo.File;
import com.example.demo.pojo.User;
import com.example.demo.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FileServiceImpl implements FileService {

    @Autowired
    private FileDao fileDao;

    @Override
    public boolean addfile(File file) {
        return fileDao.addFile(file);
    }

    @Override
    public File checkIdentity(String identity) {
        return fileDao.checkIdentity(identity);
    }

    @Override
    public File checkPhone(String phone) {
        return fileDao.checkPhone(phone);
    }

    @Override
    public boolean editfile(File file) {
        return fileDao.editfile(file);
    }

    @Override
    public File checkidentity(String identity) {
        return fileDao.checkidentity(identity);
    }
}
