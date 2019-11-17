package com.yss.newexport.Service.Inter;

import com.yss.newexport.Entity.QueryConVO;
import java.util.List;

public interface IqueryFileService {
    List<?> queryContent(QueryConVO vo)throws Exception;
    List<String> findFieldInfo(String tableName)throws Exception;
    String makeFileToTargetPath(List<String> headarray, String filepath,
                                List<?> datalist, String fileType, String fileDate)throws Exception;
}