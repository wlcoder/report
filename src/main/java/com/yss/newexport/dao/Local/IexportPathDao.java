package com.yss.newexport.dao.Local;

import com.yss.newexport.Entity.ExportPathVO;

import java.util.List;

public interface IexportPathDao {

    ExportPathVO queryExportPath();

    void updateExportPath(ExportPathVO path);

    void saveExportPath(ExportPathVO path);

    void delExportPath(List<Integer> ids);
}
