package com.yss.newexport.Service.Impl;

import com.yss.newexport.Entity.ExceptionVO;
import com.yss.newexport.Entity.ExportPathVO;
import com.yss.newexport.Service.Inter.IexportPathService;
import com.yss.newexport.dao.Local.IexportPathDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExportPathImpl implements IexportPathService {
    @Autowired
    private IexportPathDao exportPathDao;


    @Override
    public ExportPathVO queryExportPath() {
        return exportPathDao.queryExportPath();
    }

    @Override
    public void updateExportPath(ExportPathVO path) {
        exportPathDao.updateExportPath(path);
    }

    @Override
    public void saveExportPath(ExportPathVO path) {
        try{
            ExportPathVO epath = exportPathDao.queryExportPath();
            if (null !=epath){
                throw new Exception("只能设置单条路径");
            }
            exportPathDao.saveExportPath(path);
        }catch (Exception e){
            e.printStackTrace();
        }
    }

    @Override
    public void delExportPath(List<Integer> ids) {
        exportPathDao.delExportPath(ids);
    }
}
