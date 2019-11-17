package com.yss.newexport.Service.Inter;

import com.yss.newexport.Entity.*;

import java.util.List;

public interface IprocessDataService {

    List<?> queryEvalReport(ProcessDataVO pd) throws Exception;

    void updateEvalReport(ProcessDataVO pd) throws Exception;

    void deleteEvalReport(ProcessDataVO pd) throws Exception;

}
