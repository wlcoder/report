package com.yss.newexport.Controller;

import com.yss.newexport.Entity.CourseRelVO;
import com.yss.newexport.Entity.DictionaryMappingVO;
import com.yss.newexport.Entity.ExceptionVO;
import com.yss.newexport.Service.Inter.IaccountRelService;
import com.yss.newexport.Service.Inter.IdictionaryMapingService;
import com.yss.newexport.Service.Inter.IhandleDataService;
import com.yss.newexport.Util.TapStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("queryData")
public class DataPullController {

    @Autowired
    private IhandleDataService dataPullService;

    @Autowired
    private IaccountRelService accountRelService;

    @Autowired
    private IdictionaryMapingService dictioaryMapService;

    @RequestMapping(value = "datapull")
    public List<ExceptionVO> dataCollection(String ywdate)throws Exception{
          Map<String,CourseRelVO> srcaccountmap = new HashMap<>();
          Map<String,CourseRelVO> taraccountmap = new HashMap<>();
          String showpagemessage = "";
          String fundCode = "Z00295";
          List<ExceptionVO> elist = new ArrayList<>();
          List<CourseRelVO> list = accountRelService.queryAccountRel(fundCode);
          for(CourseRelVO vo : list){
              String srcaccount = vo.getSrcCourseCode();
              srcaccountmap.put(srcaccount,vo);

              String tarcoursecode = vo.getTargetCourseCode();
              String taraccountcode = vo.getTargetCourseAccountCode();
              if(!TapStringUtils.isEmpty(taraccountcode)){//因为按照陈一波的新逻辑
                  taraccountmap.put(taraccountcode,vo);
                  taraccountmap.put(tarcoursecode,vo);
              }else{
                  taraccountmap.put(tarcoursecode,vo);
              }
          }

          Map<String,Map<String,String>> directorymap = new HashMap<>();
          List<DictionaryMappingVO> maplist  = dictioaryMapService.queryDictionaryMapping();
          for(DictionaryMappingVO vo:maplist){
              if(directorymap.containsKey(vo.getFlag())){
                  Map<String,String> valuemap  = directorymap.get(vo.getFlag());
                  valuemap.put(vo.getSourceId(),vo.getTargetId());
                  directorymap.put(vo.getFlag(),valuemap);
              }else{
                  Map<String,String> valuemap = new HashMap<>();
                  valuemap.put(vo.getSourceId(),vo.getTargetId());
                  directorymap.put(vo.getFlag(),valuemap);
              }
          }

          Class class1 = dataPullService.getClass();//这里的类应该是代理类信息
          Method[] ms = class1.getMethods();
          for(int i=0;i<ms.length;i++){//采集数据进入系统临时表，先保存一份数据
            if (ms[i].getName().startsWith("handle")){
                String msg = (String) ms[i].invoke(dataPullService,ywdate,srcaccountmap);
                //showpagemessage = showpagemessage+" \r\n "+msg;
                ExceptionVO exception = new ExceptionVO();
                exception.setMsg(msg);
                elist.add(exception);
            }
            //这个地方可以考虑做一个进度展示，以及报错信息的保存便于查询问题，暂时先不做
          }

         for(int i=0;i<ms.length;i++){//从系统临时表查询数据，进行转换，进入正式表
            if (ms[i].getName().startsWith("convert")){
                String msg = (String) ms[i].invoke(dataPullService,ywdate,srcaccountmap,directorymap,taraccountmap);
                //showpagemessage = showpagemessage+" \r\n "+msg;
                ExceptionVO exception = new ExceptionVO();
                exception.setMsg(msg);
                elist.add(exception);
            }
            //这个地方可以考虑做一个进度展示，以及报错信息的保存便于查询问题，暂时先不做
         }
         return elist;
    }
}
