package com.yss.newexport.Controller;

import com.yss.newexport.Entity.DictionaryMappingVO;
import com.yss.newexport.Entity.DictionaryStoreVO;
import com.yss.newexport.Service.Inter.IdictionaryMapingService;
import com.yss.newexport.Service.Inter.IdictionaryStoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("dictionaryMapping")
public class DictionaryMappingController {
    @Autowired
    private IdictionaryMapingService dictionaryMapingService;

    @Autowired
    private IdictionaryStoreService dictionaryStoreService;


    /**
     * 查询数据字典映射
     */
    @RequestMapping("queryDictionaryMapping")
    public List<DictionaryMappingVO> queryDictionaryMapping() throws Exception {
        List<DictionaryMappingVO> list = dictionaryMapingService.queryDictionaryMapping();
        return list;
    }

    /**
     * 查询数据字典
     *
     * @param flag
     * @param datasource
     */
    @RequestMapping("queryDictionarystore")
    public List<DictionaryStoreVO> queryDictionarystore(String flag, String datasource) throws Exception {
        System.out.println("flag:" + flag + "---- datasource:" + datasource);
        List<DictionaryStoreVO> list = dictionaryStoreService.queryDictionaryStore(flag, datasource);
        for (DictionaryStoreVO dm : list) {
            String dict = dm.getDictId() + "-" + dm.getDictVal();
            dm.setDict(dict);
        }
        return list;
    }

    /**
     * 查询标识
     */
    @RequestMapping("queryFlag")
    public List<DictionaryStoreVO> queryFlag() throws Exception {
        List<DictionaryStoreVO> flagList = dictionaryStoreService.queryFlag();
        return flagList;
    }

    /**
     * 保存数据字典映射
     *
     * @param dictionaryMapping
     */
    @RequestMapping("saveDictionaryMapping")
    public List<DictionaryMappingVO> saveDictionaryMapping(@RequestBody DictionaryMappingVO dictionaryMapping) throws Exception {
        String[] source = dictionaryMapping.getSource().split("-");
        String[] target = dictionaryMapping.getTarget().split("-");
        dictionaryMapping.setSourceId(source[0]);
        dictionaryMapping.setSourceVal(source[1]);
        dictionaryMapping.setTargetId(target[0]);
        dictionaryMapping.setTargetVal(target[1]);
        dictionaryMapingService.saveDictionaryMapping(dictionaryMapping);
        List<DictionaryMappingVO> list = dictionaryMapingService.queryDictionaryMapping();
        return list;
    }

    /**
     * 修改数据字典映射
     *
     * @param dictionaryMapping
     */
    @RequestMapping("updateDictionaryMapping")
    public List<DictionaryMappingVO> updateDictionaryMapping(@RequestBody DictionaryMappingVO dictionaryMapping) throws Exception {
        String[] source = dictionaryMapping.getSource().split("-");
        String[] target = dictionaryMapping.getTarget().split("-");
        dictionaryMapping.setSourceId(source[0]);
        dictionaryMapping.setSourceVal(source[1]);
        dictionaryMapping.setTargetId(target[0]);
        dictionaryMapping.setTargetVal(target[1]);
        dictionaryMapingService.updateDictionaryMapping(dictionaryMapping);
        List<DictionaryMappingVO> list = dictionaryMapingService.queryDictionaryMapping();
        return list;
    }

    /**
     * 删除数据字典映射
     *
     * @param ids
     */

    @RequestMapping("delDictionaryMapping")
    public List<DictionaryMappingVO> delDictionaryMapping(String ids) {
        try {
            String[] arr = ids.split(",");
            Integer array[] = new Integer[arr.length];
            for (int i = 0; i < arr.length; i++) {
                array[i] = Integer.parseInt(arr[i]);
            }
            List<Integer> idsList = Arrays.asList(array);
            dictionaryMapingService.delDictionaryMapping(idsList);
        } catch (Exception e) {
            e.printStackTrace();
        }
        List<DictionaryMappingVO> list = dictionaryMapingService.queryDictionaryMapping();
        return list;
    }


}
