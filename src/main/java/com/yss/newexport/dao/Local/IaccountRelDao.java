package com.yss.newexport.dao.Local;

import com.yss.newexport.Entity.AccountVO;
import com.yss.newexport.Entity.CourseCodeReportVO;
import com.yss.newexport.Entity.CourseRelVO;
import com.yss.newexport.Entity.KmVO;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/*
 * 查询科目对照信息
 **/

public interface IaccountRelDao {
    List<CourseRelVO> queryAccountRel(String fundCode);

    List<KmVO> queryKm();

    List<CourseCodeReportVO> queryCourseCode();

    List<CourseRelVO> queryKmMapping(@Param("flag") String flag);

    void updateKmMapping(CourseRelVO kmMapping);

    void saveKmMapping(CourseRelVO kmMapping);

    void delKmMapping(List<Integer> ids);

    List<AccountVO> queryAccount();

    CourseRelVO findCourseRelById(int id);
}
