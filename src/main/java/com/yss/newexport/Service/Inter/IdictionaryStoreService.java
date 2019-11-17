package com.yss.newexport.Service.Inter;

import com.yss.newexport.Entity.DictionaryStoreVO;

import java.util.List;

public interface IdictionaryStoreService {
    List<DictionaryStoreVO> queryDictionaryStore(String flag, String datasource);

    List<DictionaryStoreVO> queryFlag();
}
