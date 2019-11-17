package com.yss.newexport.Service.Impl;

import com.yss.newexport.Entity.DatabaseVO;
import com.yss.newexport.Service.Inter.IdatabaseService;
import com.yss.newexport.Util.BusinessException;
import com.yss.newexport.dao.Local.IdatabaseDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DatabaseServiceImpl implements IdatabaseService {
    @Autowired
    private IdatabaseDao databaseDao;


    @Override
    public List<DatabaseVO> queryDatabase() {
        return databaseDao.queryDatabase();
    }

    @Override
    public void updateDatabase(DatabaseVO database) {
        databaseDao.updateDatabase(database);
    }

    @Override
    public void saveDatabase(DatabaseVO database) {
        databaseDao.saveDatabase(database);
    }

    @Override
    public void delDatabase(List<Integer> ids) {
        databaseDao.delDatabase(ids);
    }
}
