package com.yss.newexport.Service.Inter;
import com.yss.newexport.Entity.CourseRelVO;

import java.util.Map;

public interface IhandleDataService {
    String handleBankSecurityData(String pullDate, Map<String, CourseRelVO> accmap);
    String handleBankRepoData(String pullDate, Map<String, CourseRelVO> accmap);
    String handleVocherData(String pullDate, Map<String, CourseRelVO> accmap);
    String handleEvalData(String pullDate, Map<String, CourseRelVO> accmap);
    String handleCourseCodeData(String pullDate, Map<String, CourseRelVO> accmap);
    String handleCourseBalanceData(String pullDate, Map<String, CourseRelVO> accmap);
    String handleBankDepositData(String pullDate, Map<String, CourseRelVO> accmap);
    String handleFundData(String pullDate, Map<String, CourseRelVO> accmap);
    String handleExchangeData(String pullDate, Map<String, CourseRelVO> accmap);
    String handleInvestData(String pullDate, Map<String, CourseRelVO> accmap);

    String convertBankSecurityData(String pullDate, Map<String, CourseRelVO> accmap, Map<String, Map<String, String>> directorymap,Map<String, CourseRelVO> taraccmap);
    String convertBankRepoData(String pullDate, Map<String, CourseRelVO> accmap, Map<String, Map<String, String>> directorymap,Map<String, CourseRelVO> taraccmap);
    String convertVocherData(String pullDate, Map<String, CourseRelVO> accmap, Map<String, Map<String, String>> directorymap,Map<String, CourseRelVO> taraccmap);
    String convertEvalData(String pullDate, Map<String, CourseRelVO> accmap, Map<String, Map<String, String>> directorymap,Map<String, CourseRelVO> taraccmap);
    String convertCourseCodeData(String pullDate, Map<String, CourseRelVO> accmap, Map<String, Map<String, String>> directorymap,Map<String, CourseRelVO> taraccmap);
    String convertCourseBalanceData(String pullDate, Map<String, CourseRelVO> accmap, Map<String, Map<String, String>> directorymap,Map<String, CourseRelVO> taraccmap);
    String convertBankDepositData(String pullDate, Map<String, CourseRelVO> accmap, Map<String, Map<String, String>> directorymap,Map<String, CourseRelVO> taraccmap);
    String convertFundData(String pullDate, Map<String, CourseRelVO> accmap, Map<String, Map<String, String>> directorymap,Map<String, CourseRelVO> taraccmap);
    String convertExchangeData(String pullDate, Map<String, CourseRelVO> accmap, Map<String, Map<String, String>> directorymap,Map<String, CourseRelVO> taraccmap);
    String convertInvestData(String pullDate, Map<String, CourseRelVO> accmap, Map<String, Map<String, String>> directorymap,Map<String, CourseRelVO> taraccmap);
}
