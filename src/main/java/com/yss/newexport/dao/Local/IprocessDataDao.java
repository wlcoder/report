package com.yss.newexport.dao.Local;

import com.yss.newexport.Entity.*;

import java.util.List;

public interface IprocessDataDao {
    /*****估值表******/
    List<EvalReportVO> queryEvalReport(EvalReportVO eval);

    void updateEvalReport(List<EvalReportVO> evalList);

    void deleteEvalReport(List<Integer> ids);

    /*****科目表******/
    List<CourseCodeReportVO> queryCourseCode(CourseCodeReportVO evl);

    void updateCourseCode(List<CourseCodeReportVO> courseList);

    void deleteCourseCode(List<Integer> ids);

    /*****科目余额表******/
    List<CourseBalanceVO> queryCourseBalance(CourseBalanceVO evl);

    void updateCourseBalance(List<CourseBalanceVO> CourseBalanceList);

    void deleteCourseBalance(List<Integer> ids);


    /*****银行存款业务表******/
    List<BankDepositReportVO> queryBankDeposit(BankDepositReportVO evl);

    void updateBankDeposit(List<BankDepositReportVO> bankDepositList);

    void deleteBankDeposit(List<Integer> ids);

    /*****基金业务表******/
    List<FundBusinessReportVO> queryFundBusiness(FundBusinessReportVO evl);

    void updateFundBusiness(List<FundBusinessReportVO> fundBusinessList);

    void deleteFundBusiness(List<Integer> ids);

    /*****银行间回购信息表******/
    List<BankRepoReportVO> queryBankRepo(BankRepoReportVO evl);

    void updateBankRepo(List<BankRepoReportVO> bankRepoList);

    void deleteBankRepo(List<Integer> ids);

    /*****银行间债券信息表******/
    List<BankSecurityReportVO> queryBankSecurity(BankSecurityReportVO evl);

    void updateBankSecurity(List<BankSecurityReportVO> bankSecurityList);

    void deleteBankSecurity(List<Integer> ids);

    /*****交易所清算表******/
    List<ExchangeClearReportVO> queryExchangeClear(ExchangeClearReportVO evl);

    void updateExchangeClear(List<ExchangeClearReportVO> exchangeClearList);

    void deleteExchangeClear(List<Integer> ids);

    /*****投资组合信息表******/
    List<InvestReportVO> queryInvestReport(InvestReportVO evl);

    void updateInvestReport(List<InvestReportVO> investList);

    void deleteInvestReport(List<Integer> ids);

}
