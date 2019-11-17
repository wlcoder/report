package com.yss.newexport.dao.Remote;

import com.yss.newexport.Entity.*;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

@Mapper
public interface IremoteDataPullDao {
    List<BankSecurityReportVO> pullBankSecurity(@Param("pullDate") String pullDate);
    List<BankRepoReportVO> pullBankRepo(@Param("pullDate") String pullDate);
    List<BankDepositReportVO> pullBankDesposit(@Param("pullDate") String pullDate);
    List<FundBusinessReportVO> pullFund(String pullDate);
    List<ExchangeClearReportVO> pullExchange(String pullDate);
    List<InvestReportVO> pullInvest(String pullDate);
    List<VoucherReportVO> pullVoucher(@Param("pullDate") String pullDate);
    List<EvalReportVO> pullEval(@Param("pullDate") String pullDate);
    List<CourseCodeReportVO> pullCourseCode(@Param("pullDate") String pullDate);
    List<CourseBalanceVO> pullCourseBalance(@Param("pullDate") String pullDate);
}
