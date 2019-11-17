package com.yss.newexport.Service.Inter;

import com.yss.newexport.Entity.CourseRelVO;

import java.util.Map;

public interface IcovertDataService {
    String covertBankSecurityData(String pullDate, Map<String, CourseRelVO> accmap,Map<String, CourseRelVO> taraccmap);
    String covertBankRepoData(String pullDate, Map<String, CourseRelVO> accmap,Map<String, CourseRelVO> taraccmap);
    String covertVocherData(String pullDate, Map<String, CourseRelVO> accmap,Map<String, CourseRelVO> taraccmap);
    String covertEvalData(String pullDate, Map<String, CourseRelVO> accmap,Map<String, CourseRelVO> taraccmap);
    String covertCourseCodeData(String pullDate, Map<String, CourseRelVO> accmap,Map<String, CourseRelVO> taraccmap);
    String covertCourseBalanceData(String pullDate, Map<String, CourseRelVO> accmap,Map<String, CourseRelVO> taraccmap);
    String covertBankDepositData(String pullDate, Map<String, CourseRelVO> accmap,Map<String, CourseRelVO> taraccmap);
    String covertFundData(String pullDate, Map<String, CourseRelVO> accmap,Map<String, CourseRelVO> taraccmap);
    String covertExchangeData(String pullDate, Map<String, CourseRelVO> accmap,Map<String, CourseRelVO> taraccmap);
    String covertInvestData(String pullDate, Map<String, CourseRelVO> accmap,Map<String, CourseRelVO> taraccmap);
}
