package com.example.demo.service;

import com.example.demo.pojo.Drug;
import com.example.demo.pojo.User;

import java.util.List;

public interface DrugService {
    int selectAll(String searchVal);

    List<Drug> selectByPage(int i, int limit, String searchVal);

    boolean delById(List<Integer> id);

    User selectedByPhone(String phone);

    boolean addDrug(Drug drug);

    boolean editDrug(Drug drug);

    List<Drug> drug_counts();
}
