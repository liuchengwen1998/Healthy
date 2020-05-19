package com.example.demo.service.impl;

import com.example.demo.dao.DrugDao;
import com.example.demo.pojo.Drug;
import com.example.demo.pojo.User;
import com.example.demo.service.DrugService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DrugServiceImpl implements DrugService {

    @Autowired
    private DrugDao drugDao;

    @Override
    public int selectAll(String searchVal) {
        return drugDao.selectAll(searchVal);
    }

    @Override
    public List<Drug> selectByPage(int i, int limit, String searchVal) {
        return drugDao.selectByPage( i,  limit, searchVal);
    }

    @Override
    public boolean delById(List<Integer> id) {
        return drugDao.delById(id);
    }

    @Override
    public User selectedByPhone(String phone) {
        return drugDao.selectedByPhone(phone);
    }

    @Override
    public boolean addDrug(Drug drug) {
        return drugDao.addDrug(drug);
    }

    @Override
    public boolean editDrug(Drug drug) {
        return drugDao.editDrug(drug);
    }

    @Override
    public List<Drug> drug_counts() { return drugDao.drug_counts(); }
}
