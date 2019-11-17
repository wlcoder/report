package com.yss.newexport.Service.Impl;

import com.yss.newexport.Entity.DictionaryMappingVO;
import com.yss.newexport.Service.Inter.IdictionaryMapingService;
import com.yss.newexport.dao.Local.IdictionaryMappingDao;
import com.yss.newexport.dao.Local.IdictionaryStoreDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class DictionaryMappingImpl implements IdictionaryMapingService {
    @Autowired
    private IdictionaryMappingDao dictionaryMappingDao;
    @Autowired
    private IdictionaryStoreDao dictionaryStoreDao;

    /**
     * 查询字典映射
     */
    @Override
    public List<DictionaryMappingVO> queryDictionaryMapping() {
        List<DictionaryMappingVO> list = dictionaryMappingDao.queryDictionaryMapping();
        List<DictionaryMappingVO> dmList = new ArrayList<>();
        for (DictionaryMappingVO dm : list) {
            String flagName = dictionaryStoreDao.queryFlagName(dm.getFlag());
            dm.setFlagName(flagName);
            dmList.add(dm);
        }
        return dmList;
    }

    /**
     * 修改字典映射
     *
     * @param dictionaryMapping
     */
    @Override
    public void updateDictionaryMapping(DictionaryMappingVO dictionaryMapping) {
        dictionaryMappingDao.updateDictionaryMapping(dictionaryMapping);
    }

    /**
     * 保存字典映射
     *
     * @param dictionaryMapping
     */
    @Override
    public void saveDictionaryMapping(DictionaryMappingVO dictionaryMapping) {
        dictionaryMappingDao.saveDictionaryMapping(dictionaryMapping);
    }

    /**
     * 删除字典映射
     *
     * @param ids
     */

    @Override
    public void delDictionaryMapping(List<Integer> ids) {
        dictionaryMappingDao.delDictionaryMapping(ids);
    }
}
