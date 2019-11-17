package com.yss.newexport.Service.Inter;

import com.yss.newexport.Entity.DictionaryMappingVO;

import java.util.List;

public interface IdictionaryMapingService {
    List<DictionaryMappingVO> queryDictionaryMapping();

    void updateDictionaryMapping(DictionaryMappingVO dictionaryMapping);

    void saveDictionaryMapping(DictionaryMappingVO dictionaryMapping);

    void delDictionaryMapping(List<Integer> ids);
}
