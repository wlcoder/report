package com.yss.newexport.Service.Impl;

import com.yss.newexport.Entity.CourseRelVO;
import com.yss.newexport.Service.Inter.IhandleDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class HandleDataServiceImpl implements IhandleDataService {
    @Autowired
    private DataPullServiceImpl dataPullService;

    @Autowired
    private CoverDataServicePlanBImp dataCovertService;

    @Override
    public String handleBankSecurityData(String pullDate, Map<String, CourseRelVO> accmap) {
        try {
            dataPullService.pullBankSecurityData(pullDate,accmap);
        } catch (Exception e) {
            System.out.println("采集银行间债券表出错:"+e.getMessage());
            return "采集银行间债券表出错";
        }
        return "采集银行间债券表成功";
    }

    @Override
    public String handleBankRepoData(String pullDate, Map<String, CourseRelVO> accmap) {
        try {
            dataPullService.pullBankRepoData(pullDate,accmap);
        } catch (Exception e) {
            System.out.println("采集银行间回购表出错:"+e.getMessage());
            return "采集银行间回购表出错";
        }
        return "采集银行间回购表成功";
    }

    @Override
    public String handleVocherData(String pullDate, Map<String, CourseRelVO> accmap){
        try {
            dataPullService.pullVocherData(pullDate,accmap);
        } catch (Exception e) {//压制异常
            System.out.println("采集凭证表出错:"+e.getMessage());
            return "采集凭证表出错";
        }
        return "采集凭证表成功";
    }

    @Override
    public String handleEvalData(String pullDate,Map<String,CourseRelVO> accmap){
        try {
            dataPullService.pullEvalData(pullDate,accmap);
        } catch (Exception e) {//压制异常
            System.out.println("采集估值表出错:"+e.getMessage());
            return "采集估值表出错";
        }
        return "采集估值表成功";
    }

    @Override
    public String handleCourseCodeData(String pullDate, Map<String, CourseRelVO> accmap) {
        try {
            dataPullService.pullCourseCodeData(pullDate,accmap);
        } catch (Exception e) {
            System.out.println("采集科目表出错:"+e.getMessage());
            return "采集科目表出错";
        }
        return "采集科目表数据成功";
    }

    @Override
    public String handleCourseBalanceData(String pullDate, Map<String, CourseRelVO> accmap) {
        try {
            dataPullService.pullCourseBalanceData(pullDate,accmap);
        } catch (Exception e) {
            System.out.println("采集余额表数据出错:"+e.getMessage());
            return "采集余额表数据出错";
        }
        return "采集余额表数据成功";
    }

    @Override
    public String handleBankDepositData(String pullDate, Map<String, CourseRelVO> accmap) {
        try {
            dataPullService.pullBankDepositData(pullDate,accmap);
        } catch (Exception e) {
            System.out.println("采集银行存款业务数据出错:"+e.getMessage());
            return "采集银行存款业务数据出错";
        }
        return "采集银行存款业务数据成功";
    }

    @Override
    public String handleFundData(String pullDate, Map<String, CourseRelVO> accmap) {
        try {
            dataPullService.pullFundData(pullDate,accmap);
        } catch (Exception e) {
            System.out.println("采集基金投资业务表数据出错:"+e.getMessage());
            return "采集基金投资业务表数据出错";
        }
        return "采集基金投资业务表数据成功";
    }

    @Override
    public String handleExchangeData(String pullDate, Map<String, CourseRelVO> accmap) {
        try {
            dataPullService.pullExchangeData(pullDate,accmap);
        } catch (Exception e) {
            System.out.println("采集交易所清算表数据出错:"+e.getMessage());
            return "采集交易所清算表数据出错";
        }
        return "采集交易所清算表数据成功";
    }

    @Override
    public String handleInvestData(String pullDate, Map<String, CourseRelVO> accmap) {
        try {
            dataPullService.pullInvestData(pullDate,accmap);
        } catch (Exception e) {
            System.out.println("采集投资组合表数据出错:"+e.getMessage());
            return "采集投资组合表数据出错";
        }
        return "采集投资组合表数据成功";
    }

    @Override
    public String convertBankSecurityData(String pullDate, Map<String, CourseRelVO> accmap,
                                          Map<String, Map<String, String>> directorymap,Map<String, CourseRelVO> taraccmap) {
        try {
            dataCovertService.covertBankSecurityData(pullDate,accmap,directorymap,taraccmap);
        } catch (Exception e) {
            System.out.println("转换银行间债券表出错:"+e.getMessage());
            return "转换银行间债券表出错";
        }
        return "转换银行间债券表成功";
    }

    @Override
    public String convertBankRepoData(String pullDate, Map<String, CourseRelVO> accmap,
                                      Map<String, Map<String, String>> directorymap,Map<String, CourseRelVO> taraccmap) {
        try {
            dataCovertService.covertBankRepoData(pullDate,accmap,directorymap,taraccmap);
        } catch (Exception e) {
            System.out.println("转换银行间回购表出错:"+e.getMessage());
            return "转换银行间回购表出错";
        }
        return "转换银行间回购表成功";
    }

    @Override
    public String convertVocherData(String pullDate, Map<String, CourseRelVO> accmap,
                                    Map<String, Map<String, String>> directorymap,Map<String, CourseRelVO> taraccmap) {
        try {
            dataCovertService.covertVocherData(pullDate,accmap,directorymap,taraccmap);
        } catch (Exception e) {//压制异常
            System.out.println("转换凭证表出错:"+e.getMessage());
            return "转换凭证表出错";
        }
        return "转换凭证表成功";
    }

    @Override
    public String convertEvalData(String pullDate, Map<String, CourseRelVO> accmap,
                                  Map<String, Map<String, String>> directorymap,Map<String, CourseRelVO> taraccmap) {
        try {
            dataCovertService.covertEvalData(pullDate,accmap,directorymap,taraccmap);
        } catch (Exception e) {//压制异常
            System.out.println("转换估值表出错:"+e.getMessage());
            return "转换估值表出错";
        }
        return "转换估值表成功";
    }


    @Override
    public String convertCourseCodeData(String pullDate, Map<String, CourseRelVO> accmap,
                                        Map<String, Map<String, String>> directorymap,Map<String, CourseRelVO> taraccmap) {
        try {
            dataCovertService.covertCourseCodeData(pullDate,accmap,directorymap,taraccmap);
        } catch (Exception e) {
            System.out.println("转换科目表出错:"+e.getMessage());
            return "转换科目表出错";
        }
        return "转换科目表数据成功";
    }


    @Override
    public String convertCourseBalanceData(String pullDate, Map<String, CourseRelVO> accmap,
                                           Map<String, Map<String, String>> directorymap,Map<String, CourseRelVO> taraccmap) {
        try {
            dataCovertService.covertCourseBalanceData(pullDate,accmap,directorymap,taraccmap);
        } catch (Exception e) {
            System.out.println("转换余额表数据出错:"+e.getMessage());
            return "转换余额表数据出错";
        }
        return "转换余额表数据成功";
    }

    @Override
    public String convertBankDepositData(String pullDate, Map<String, CourseRelVO> accmap,
                                         Map<String, Map<String, String>> directorymap,Map<String, CourseRelVO> taraccmap) {
        try {
            dataCovertService.covertBankDepositData(pullDate,accmap,directorymap,taraccmap);
        } catch (Exception e) {
            System.out.println("转换银行存款业务数据出错:"+e.getMessage());
            return "转换银行存款业务数据出错";
        }
        return "转换银行存款业务数据成功";
    }

    @Override
    public String convertFundData(String pullDate, Map<String, CourseRelVO> accmap,
                                  Map<String, Map<String, String>> directorymap,Map<String, CourseRelVO> taraccmap) {
        try {
            dataCovertService.covertFundData(pullDate,accmap,directorymap,taraccmap);
        } catch (Exception e) {
            System.out.println("转换基金投资业务表数据出错:"+e.getMessage());
            return "转换基金投资业务表数据出错";
        }
        return "转换基金投资业务表数据成功";
    }

    @Override
    public String convertExchangeData(String pullDate, Map<String, CourseRelVO> accmap,
                                      Map<String, Map<String, String>> directorymap,Map<String, CourseRelVO> taraccmap) {
        try {
            dataCovertService.covertExchangeData(pullDate,accmap,directorymap,taraccmap);
        } catch (Exception e) {
            System.out.println("转换交易所清算表数据出错:"+e.getMessage());
            return "转换交易所清算表数据出错";
        }
        return "转换交易所清算表数据成功";
    }

    @Override
    public String convertInvestData(String pullDate, Map<String, CourseRelVO> accmap,
                                    Map<String, Map<String, String>> directorymap,Map<String, CourseRelVO> taraccmap) {
        try {
            dataCovertService.covertInvestData(pullDate,accmap,directorymap,taraccmap);
        } catch (Exception e) {
            System.out.println("转换投资组合表数据出错:"+e.getMessage());
            return "转换投资组合表数据出错";
        }
        return "转换投资组合表数据成功";
    }
}
