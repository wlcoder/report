package com.yss.newexport.dao.Local;

import com.yss.newexport.Entity.DatabaseVO;

import java.util.List;

public interface IdatabaseDao {
    List<DatabaseVO> queryDatabase();

    void updateDatabase(DatabaseVO database);

    void saveDatabase(DatabaseVO database);

    void delDatabase(List<Integer> ids);
}
