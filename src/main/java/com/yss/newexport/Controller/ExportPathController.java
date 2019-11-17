package com.yss.newexport.Controller;

import com.yss.newexport.Entity.ExportPathVO;
import com.yss.newexport.Service.Inter.IexportPathService;
import com.yss.newexport.Util.BusinessException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("exportPath")
public class ExportPathController {
    @Autowired
    private IexportPathService exportPathService;

    /**
     * 查询导出路径
     */
    @RequestMapping("queryPath")
    public ExportPathVO queryPath() throws Exception {
        ExportPathVO path = exportPathService.queryExportPath();
        return path;
    }

    /**
     * 保存导出路径
     *
     * @param path
     */
    @RequestMapping("savePath")
    public String savePath(@RequestBody ExportPathVO path) throws Exception {
        try {
            ExportPathVO exportPath = exportPathService.queryExportPath();
            if (null != exportPath) {
                throw new BusinessException("导出路径已存在！");
            } else {
                exportPathService.saveExportPath(path);
            }
        } catch (BusinessException e) {
            e.printStackTrace();
            return e.getMessage();
        }
        return "success";
    }

    @RequestMapping("updatePath")
    public void updatePath(@RequestBody ExportPathVO path) throws Exception {
        exportPathService.updateExportPath(path);
    }

    @RequestMapping("delPath")
    public void delPath(String ids) {
        try {
            String[] arr = ids.split(",");
            Integer array[] = new Integer[arr.length];
            for (int i = 0; i < arr.length; i++) {
                array[i] = Integer.parseInt(arr[i]);
            }
            List<Integer> idsList = Arrays.asList(array);
            exportPathService.delExportPath(idsList);
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

}
