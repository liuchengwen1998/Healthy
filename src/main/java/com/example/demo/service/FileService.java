package com.example.demo.service;


import com.example.demo.pojo.File;


public interface FileService {

    boolean addfile(File file);

    File checkIdentity(String identity);

    File checkPhone(String phone);

    boolean editfile(File file);

    File checkidentity(String identity);
}