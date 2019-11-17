package com.yss.newexport.Service.Impl;

import com.yss.newexport.Entity.AccountVO;
import com.yss.newexport.Entity.CourseCodeReportVO;
import com.yss.newexport.Entity.CourseRelVO;
import com.yss.newexport.Entity.KmVO;
import com.yss.newexport.Service.Inter.IaccountRelService;
import com.yss.newexport.dao.Local.IaccountRelDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccountRelServiceImpl implements IaccountRelService {

    @Autowired
    private IaccountRelDao accountRelDao;

    @Override
    public List<CourseRelVO> queryAccountRel(String fundCode) {
        return accountRelDao.queryAccountRel(fundCode);
    }
    @Override
    public List<KmVO> queryKm() {
        return accountRelDao.queryKm();
    }

    @Override
    public List<CourseCodeReportVO> queryCourseCode() {
        return accountRelDao.queryCourseCode();
    }

    @Override
    public List<CourseRelVO> queryKmMapping(String flag) {
        return accountRelDao.queryKmMapping(flag);
    }

    @Override
    public void updateKmMapping(CourseRelVO kmMapping) {
        accountRelDao.updateKmMapping(kmMapping);
    }

    @Override
    public void saveKmMapping(CourseRelVO kmMapping) {
        accountRelDao.saveKmMapping(kmMapping);
    }

    @Override
    public void delKmMapping(List<Integer> ids) {
        accountRelDao.delKmMapping(ids);
    }

    @Override
    public List<AccountVO> queryAccount() {
        return accountRelDao.queryAccount();
    }

    @Override
    public CourseRelVO findCourseRelById(int id) {
        return accountRelDao.findCourseRelById(id);
    }
}
