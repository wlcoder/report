package com.yss.newexport.Controller;

import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.yss.newexport.Entity.T04FinVchVO;
import com.yss.newexport.Service.Inter.It04FinVchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("t04FinVch")
public class T04FinVchController {
    @Autowired
    private It04FinVchService t04FinVchService;

    /**
     * 查询凭证表
     */
    @RequestMapping("queryT04FinVch")
    public List<T04FinVchVO> queryT04FinVch(String billDt) throws Exception {
        List<T04FinVchVO> list = t04FinVchService.queryT04FinVch(billDt);
        return list;
    }

    @RequestMapping("updateT04FinVch")
    public void updateT04FinVch(@RequestBody String t04FinVchVO) throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        JavaType javaType = objectMapper.getTypeFactory().constructParametricType(List.class, T04FinVchVO.class);
        List<T04FinVchVO> list = objectMapper.readValue(t04FinVchVO, javaType);
        t04FinVchService.updateT04FinVch(list);
    }

    @RequestMapping("delT04FinVch")
    public void delT04FinVch(String ids) {
        try {
            String[] arr = ids.split(",");
            Integer array[] = new Integer[arr.length];
            for (int i = 0; i < arr.length; i++) {
                array[i] = Integer.parseInt(arr[i]);
            }
            List<Integer> idsList = Arrays.asList(array);
            t04FinVchService.delT04FinVch(idsList);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


}
