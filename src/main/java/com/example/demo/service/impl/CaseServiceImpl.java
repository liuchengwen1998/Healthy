package com.example.demo.service.impl;

import com.example.demo.dao.CaseDao;
import com.example.demo.pojo.Case;
import com.example.demo.service.CaseService;
import net.bytebuddy.asm.Advice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CaseServiceImpl implements CaseService {
    @Autowired
    private CaseDao caseDao;

    @Override
    public boolean saveCase(Case addCase) {
        return caseDao.saveCase(addCase);
    }
}
