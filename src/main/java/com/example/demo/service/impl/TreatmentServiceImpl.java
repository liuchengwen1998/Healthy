package com.example.demo.service.impl;

import com.example.demo.dao.TreatmentDao;
import com.example.demo.pojo.Achivest;
import com.example.demo.pojo.File;
import com.example.demo.pojo.Treatment;
import com.example.demo.service.TreatmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Service
public class TreatmentServiceImpl implements TreatmentService {
    @Autowired
    private TreatmentDao treatmentDao;
    @Override
    public File selectByIdentity(String identity) { return treatmentDao.selectByIdentity(identity); }

    @Override
    public List<Treatment> project_counts() { return treatmentDao.project_counts(); }

    @Override
    public int selectAll(String searchVal,Integer type,String identity) { return treatmentDao.selectAll(searchVal,type,identity); }


    public List<Treatment> selectByPage(int i, int limit, String searchVal,Integer type,Integer check,String identity) {
        return treatmentDao.selectByPage(i,limit,searchVal,type,check,identity);
    }

    @Override
    public boolean updateTreatment(Treatment treatment) {
        return treatmentDao.updateTreatment(treatment);
    }

    @Override
    public int selectByIn_hospital() {
        return treatmentDao.selectByIn_hospital();
    }

    @Override
    public int selectByIncheck() {
        return treatmentDao.selectByIncheck();
    }

    @Override
    public List<File> preHistory(String identity) {
        return treatmentDao.preHistory(identity);
    }

    @Override
    public List<Treatment> prerecored(int i, int limit,String identity) {
        return treatmentDao.prerecored(i,limit,identity);
    }

    @Override
    public int selectAllByIdentity(String identity) {
        return treatmentDao.selectAllByIdentity(identity);
    }
}
