package com.yss.newexport.Service.Inter;

import com.yss.newexport.Entity.AccountVO;
import com.yss.newexport.Entity.CourseCodeReportVO;
import com.yss.newexport.Entity.CourseRelVO;
import com.yss.newexport.Entity.KmVO;

import java.util.List;

public interface IaccountRelService {
    List<CourseRelVO> queryAccountRel(String fundCode);

    List<KmVO> queryKm();

    List<CourseCodeReportVO> queryCourseCode();

    List<CourseRelVO> queryKmMapping(String flag);

    void updateKmMapping(CourseRelVO kmMapping);

    void saveKmMapping(CourseRelVO kmMapping);

    void delKmMapping(List<Integer> ids);

    List<AccountVO> queryAccount();

    CourseRelVO findCourseRelById (int id);
}
