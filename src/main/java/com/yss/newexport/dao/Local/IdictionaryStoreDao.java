package com.yss.newexport.dao.Local;

import com.yss.newexport.Entity.DictionaryStoreVO;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface IdictionaryStoreDao {
    List<DictionaryStoreVO> queryDictionaryStore(@Param("flag") String flag, @Param("datasource") String datasource);

    List<DictionaryStoreVO> queryFlag();

    String queryFlagName(String flag);

}
