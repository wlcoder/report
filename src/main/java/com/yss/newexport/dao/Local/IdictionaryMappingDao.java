package com.yss.newexport.dao.Local;

import com.yss.newexport.Entity.DictionaryMappingVO;

import java.util.List;

public interface IdictionaryMappingDao {
    List<DictionaryMappingVO> queryDictionaryMapping();

    void updateDictionaryMapping(DictionaryMappingVO dictionaryMapping);

    void saveDictionaryMapping(DictionaryMappingVO dictionaryMapping);

    void delDictionaryMapping(List<Integer> ids);
}
