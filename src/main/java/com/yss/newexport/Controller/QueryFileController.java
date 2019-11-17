package com.yss.newexport.Controller;


import com.yss.newexport.Entity.ExceptionVO;
import com.yss.newexport.Entity.ExportPathVO;
import com.yss.newexport.Entity.QueryConVO;
import com.yss.newexport.Service.Inter.IexportPathService;
import com.yss.newexport.Service.Inter.IqueryFileService;
import com.yss.newexport.Util.YssCons;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("queryData")
public class QueryFileController {

    @Autowired
    public IqueryFileService queryFilService;

    @Autowired
    public IexportPathService exportPathService;

    @RequestMapping(value = "query",produces = "application/json")
    public List<?> queryFileContent(@RequestBody QueryConVO con) throws Exception{
        String fileType = con.getFileType();
        if(fileType==null){
           throw new Exception("请指定报表类型");
        }else{
           List<?> lite = queryFilService.queryContent(con);
           return lite;
        }
    }


    @RequestMapping(value = "makeReport", produces = "application/json")
    public List<ExceptionVO> exportFile(@RequestBody QueryConVO con) throws Exception {
        String fileType = con.getFileType();
        String ywdate = con.getQueryDate();
        ExportPathVO path = exportPathService.queryExportPath();
        List<ExceptionVO> elist = new ArrayList<>();
        if (null != path) {
            String filepath = path.getPath();
            if (fileType == null) {
                for (int i = 0; i < YssCons.YSS_REPORTKINDS.length; i++) {
                    con.setFileType(YssCons.YSS_REPORTKINDS[i]);
                    List<?> datalist = queryFilService.queryContent(con);
                    List<String> headInfo = queryFilService.findFieldInfo(YssCons.YSS_REPORTKINDS[i]);
                    String msg = queryFilService.makeFileToTargetPath(headInfo, filepath, datalist, YssCons.YSS_REPORTKINDS[i], ywdate);
                    System.out.println("导出信息："+msg);
                    ExceptionVO exception = new ExceptionVO();
                    exception.setMsg(msg);
                    elist.add(exception);
                }
                return elist;
            } else {
                List<?> datalist = queryFilService.queryContent(con);
                List<String> headInfo = queryFilService.findFieldInfo(fileType);
                //exportPathService.queryExportPath();
                queryFilService.makeFileToTargetPath(headInfo, filepath, datalist, fileType, ywdate);
                // return "文件导出成功";
                return elist;
            }
        } else {
            throw new Exception("请指定导出路径");
        }
    }
}
