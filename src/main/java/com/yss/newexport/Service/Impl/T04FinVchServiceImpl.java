package com.yss.newexport.Service.Impl;

import com.yss.newexport.Entity.T04FinVchVO;
import com.yss.newexport.Service.Inter.It04FinVchService;
import com.yss.newexport.dao.Local.It04FinVchDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class T04FinVchServiceImpl implements It04FinVchService {
    @Autowired
    private It04FinVchDao t04FinVchDao;

    @Override
    public List<T04FinVchVO> queryT04FinVch(String billDt) {
        return t04FinVchDao.queryT04FinVch(billDt);
    }

    @Override
    public void updateT04FinVch(List<T04FinVchVO> t04FinVchVO) {
        t04FinVchDao.updateT04FinVch(t04FinVchVO);
    }

    @Override
    public void delT04FinVch(List<Integer> ids) {
        t04FinVchDao.delT04FinVch(ids);

    }
}
