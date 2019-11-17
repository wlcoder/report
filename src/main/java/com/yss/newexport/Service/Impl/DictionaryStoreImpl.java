package com.yss.newexport.Service.Impl;

import com.yss.newexport.Entity.DictionaryStoreVO;
import com.yss.newexport.Service.Inter.IdictionaryStoreService;
import com.yss.newexport.dao.Local.IdictionaryStoreDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DictionaryStoreImpl implements IdictionaryStoreService {
    @Autowired
    private IdictionaryStoreDao dictionaryStoreDao;

    /**
     * 查询数据字典
     *
     * @param flag
     * @param datasource
     */
    @Override
    public List<DictionaryStoreVO> queryDictionaryStore(String flag, String datasource) {
        return dictionaryStoreDao.queryDictionaryStore(flag, datasource);
    }

    /**
     * 查询标识
     */
    @Override
    public List<DictionaryStoreVO> queryFlag() {
        return dictionaryStoreDao.queryFlag();
    }
}
