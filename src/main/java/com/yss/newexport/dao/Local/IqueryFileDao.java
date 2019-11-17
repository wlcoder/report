package com.yss.newexport.dao.Local;



import com.yss.newexport.Entity.*;

import java.util.List;


public interface IqueryFileDao {
    List<BankSecurityReportVO> queryBankSecurityByCon(QueryConVO con);
    List<BankRepoReportVO> queryBankRepoByCon(QueryConVO con);
    List<BankDepositReportVO> queryBankDepositByCon(QueryConVO con);
    List<ExchangeClearReportVO> queryExchangeClearByCon(QueryConVO con);
    List<InvestReportVO> queryInvestInfoByCon(QueryConVO con);
    List<CourseCodeReportVO> queryCourseCodeByCon(QueryConVO con);
    List<CourseBalanceVO> queryCourseBalanceByCon(QueryConVO con);
    List<VoucherReportVO> queryVoucherInfoByCon(QueryConVO con);
    List<EvalReportVO> queryEvalInfoByCon(QueryConVO con);
    List<FundBusinessReportVO> queryFundBusinessByCon(QueryConVO con);
    List<String>findFieldByTableName(String tableName);
}
