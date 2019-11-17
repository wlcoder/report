package com.yss.newexport.Controller;

import com.yss.newexport.Entity.ProcessDataVO;
import com.yss.newexport.Service.Inter.IprocessDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("processData")
public class ProcessDataController {
    @Autowired
    private IprocessDataService processDataService;

    /**
     * 查询
     */
    @RequestMapping("queryProcessData")
    public List<?> queryProcessData(@RequestBody ProcessDataVO pd) throws Exception {
        String fileType = pd.getFileType();
        if (StringUtils.isEmpty(fileType)) {
            throw new Exception("请指定报表类型");
        } else {
            List<?> list = processDataService.queryEvalReport(pd);
            return list;
        }
    }

    /**
     * 修改
     **/
    @RequestMapping("updateProcessData")
    public void updateProcessData(@RequestBody ProcessDataVO pd) throws Exception {
        String fileType = pd.getFileType();
        if (StringUtils.isEmpty(fileType)) {
            throw new Exception("请指定报表类型");
        } else {
            processDataService.updateEvalReport(pd);
        }
    }

    /**
     * 删除
     **/
    @RequestMapping("deleteProcessData")
    public void deleteProcessData(@RequestBody ProcessDataVO pd) throws Exception {
        String fileType = pd.getFileType();
        if (StringUtils.isEmpty(fileType)) {
            throw new Exception("请指定报表类型");
        } else {
            processDataService.deleteEvalReport(pd);
        }
    }

}
