package com.yss.newexport.Controller;

import com.sun.net.httpserver.Authenticator;
import com.yss.newexport.Entity.DatabaseVO;
import com.yss.newexport.Service.Inter.IdatabaseService;
import com.yss.newexport.Util.BusinessException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("database")
public class DatabaseController {
    @Autowired
    private IdatabaseService databaseService;

    /**
     * 查询数据源
     */
    @RequestMapping("queryDatabase")
    public List<DatabaseVO> queryDatabase() throws Exception {
        List<DatabaseVO> list = databaseService.queryDatabase();
        return list;
    }

    /**
     * 保存数据源
     *
     * @param database
     */
    @RequestMapping("saveDatabase")
    public String saveDatabase(@RequestBody DatabaseVO database) {
        try {
            List<DatabaseVO> list = databaseService.queryDatabase();
            if (null != list && list.size() > 0) {
                throw new BusinessException("只能配置单个数据源！");
            } else {
                databaseService.saveDatabase(database);
            }
        } catch (BusinessException e) {
            e.printStackTrace();
            System.out.println("异常：" + e.getMessage());
            return e.getMessage();
        }
        return "success";
    }

    @RequestMapping("updateDatabase")
    public List<DatabaseVO> updateDatabase(@RequestBody DatabaseVO database) throws Exception {
        databaseService.updateDatabase(database);
        List<DatabaseVO> list = databaseService.queryDatabase();
        return list;
    }

    @RequestMapping("delDatabase")
    public List<DatabaseVO> delDatabase(String ids) {
        try {
            String[] arr = ids.split(",");
            Integer array[] = new Integer[arr.length];
            for (int i = 0; i < arr.length; i++) {
                array[i] = Integer.parseInt(arr[i]);
            }
            List<Integer> idsList = Arrays.asList(array);
            databaseService.delDatabase(idsList);
        } catch (Exception e) {
            e.printStackTrace();
        }
        List<DatabaseVO> list = databaseService.queryDatabase();
        return list;
    }


}
