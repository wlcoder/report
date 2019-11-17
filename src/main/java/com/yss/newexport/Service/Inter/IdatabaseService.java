package com.yss.newexport.Service.Inter;

import com.yss.newexport.Entity.DatabaseVO;

import java.util.List;

public interface IdatabaseService {
    List<DatabaseVO> queryDatabase();

    void updateDatabase(DatabaseVO database);

    void saveDatabase(DatabaseVO database);

    void delDatabase(List<Integer> ids);
}
