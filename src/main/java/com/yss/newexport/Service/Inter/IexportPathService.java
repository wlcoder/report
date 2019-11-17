package com.yss.newexport.Service.Inter;

import com.yss.newexport.Entity.ExportPathVO;

import java.util.List;

public interface IexportPathService {
    ExportPathVO queryExportPath();

    void updateExportPath(ExportPathVO path);

    void saveExportPath(ExportPathVO path);

    void delExportPath(List<Integer> ids);
}
