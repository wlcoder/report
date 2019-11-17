package com.yss.newexport.dao.Local;

import com.yss.newexport.Entity.*;
import org.apache.ibatis.annotations.Param;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

public interface IgetLocalDataDao {
     void deleteTempVoucherByCon(String ywdate);
     List<VoucherReportVO> queryTempVoucherByCon(String ywdate);
     void saveTempLocalVoucher(@Param("tempvochlist") List<VoucherReportVO> tempvochlist);

     void deleteTempEvalByCon(String ywdate);
     EvalReportVO queryFundInvest(String ywdate);
     List<EvalReportVO> queryTempEvalByCon(String ywdate);
     void saveTempLocalEval(@Param("tempevallist") List<EvalReportVO> tempevallist);

     void deleteTempCourseCode(String ywdate);
     List<CourseCodeReportVO> queryTempCourseCode(String ywdate);
     void saveTempCourseCode(@Param("tempcourselist") List<CourseCodeReportVO> tempcourselist);

     void deleteTempCourseBalance(String ywdate);
     List<CourseBalanceVO> queryTempCourseBalance(String ywdate);
     void saveTempCourseBalance(@Param("tempbalancelist") List<CourseBalanceVO> tempbalancelist);

     void deleteTempBankSecurity(String ywdate);
     List<BankSecurityReportVO> queryTempBankSecurity(String ywdate);
     void saveTempBankSecurity(@Param("tempbanksecuritylist") List<BankSecurityReportVO> tempbanksecuritylist);

     void deleteTempBankRepo(String ywdate);
     List<BankRepoReportVO> queryTempBankRepo(String ywdate);
     void saveTempBankRepo(@Param("tempbankrepolist") List<BankRepoReportVO> tempbankrepolist);

     void deleteTempBankDeposit(String ywdate);
     List<BankDepositReportVO>  queryTempBankDeposit(String ywdate);
     void saveTempBankDeposit(@Param("tempbankdeposlist") List<BankDepositReportVO> tempbankdeposlist);

     void deleteTempFund(String ywdate);
     List<FundBusinessReportVO> queryTempFund(String ywdate);
     void saveTempFund(@Param("tempfundlist") List<FundBusinessReportVO> tempfundlist);

     void deleteTempExchange(String ywdate);
     List<ExchangeClearReportVO> queryTempExchange(String ywdate);
     void saveTempExchange(@Param("tempexchangelist") List<ExchangeClearReportVO> tempexchangelist);

     void deleteTempInvest(String ywdate);
     List<InvestReportVO> queryTempInvest(String ywdate);
     void saveTempInvest(@Param("tempinvestlist") List<InvestReportVO> tempinvestlist);

     void deleteVoucherByCon(String ywdate);
     void saveLocalVoucher(@Param("vochlist") List<VoucherReportVO> vochlist);
     void deleteEvalByCon(String ywdate);
     void saveLocalEval(@Param("evallist") List<EvalReportVO> evallist);
     void deleteCourseCode(String ywdate);
     void saveCourseCode(@Param("courselist") List<CourseCodeReportVO> courselist);
     void deleteCourseBalance(String ywdate);
     void saveCourseBalance(@Param("balancelist") List<CourseBalanceVO> balancelist);
     void deleteBankSecurity(String ywdate);
     void saveBankSecurity(@Param("banksecuritylist") List<BankSecurityReportVO> banksecuritylist);
     void deleteBankRepo(String ywdate);
     void saveBankRepo(@Param("bankrepolist") List<BankRepoReportVO> bankrepolist);
     void deleteBankDeposit(String ywdate);
     void saveBankDeposit(@Param("bankdeposlist") List<BankDepositReportVO> bankdeposlist);
     void deleteFund(String ywdate);
     void saveFund(@Param("fundlist") List<FundBusinessReportVO> fundlist);
     void deleteExchange(String ywdate);
     void saveExchange(@Param("exchangelist") List<ExchangeClearReportVO> exchangelist);
     void deleteInvest(String ywdate);
     void saveInvest(@Param("investlist") List<InvestReportVO> investlist);
}
