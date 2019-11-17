package com.yss.newexport.Service.Impl;

import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.yss.newexport.Entity.*;
import com.yss.newexport.Service.Inter.IprocessDataService;
import com.yss.newexport.dao.Local.IprocessDataDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.Arrays;
import java.util.List;

@Service
public class ProcessDataServiceImpl implements IprocessDataService {
    @Autowired
    private IprocessDataDao processDataDao;

    /**
     * 查询报表
     *
     * @param pd
     */
    @Override
    public List<?> queryEvalReport(ProcessDataVO pd) throws Exception {
        String fileType = pd.getFileType();
        if (StringUtils.isEmpty(fileType)) {
            throw new Exception("请指定文件类型");
        } else if (fileType.equals("T04_FIN_EVL")) {//估值表
            List<EvalReportVO> list = processDataDao.queryEvalReport(pd.getEvalReport());
            return list;
        } else if (fileType.equals("T04_COA")) {//科目表
            List<CourseCodeReportVO> list = processDataDao.queryCourseCode(pd.getCourseCodeReport());
            return list;
        } else if (fileType.equals("T04_COA_GL_BAL")) {//科目余额表
            List<CourseBalanceVO> list = processDataDao.queryCourseBalance(pd.getCourseBalance());
            return list;
        } else if (fileType.equals("T05_BANK_DEP_TXN")) {//银行存款业务表
            List<BankDepositReportVO> list = processDataDao.queryBankDeposit(pd.getBankDepositReport());
            return list;
        } else if (fileType.equals("EVLJJ")) {//基金业务表
            List<FundBusinessReportVO> list = processDataDao.queryFundBusiness(pd.getFundBusinessReport());
            return list;
        } else if (fileType.equals("YHJHG")) {//银行间回购信息
            List<BankRepoReportVO> list = processDataDao.queryBankRepo(pd.getBankRepoReport());
            return list;
        } else if (fileType.equals("YHJZQ")) {//银行间债券
            List<BankSecurityReportVO> list = processDataDao.queryBankSecurity(pd.getBankSecurityReport());
            return list;
        } else if (fileType.equals("JYSQS")) {//交易所清算
            List<ExchangeClearReportVO> list = processDataDao.queryExchangeClear(pd.getExchangeClearReport());
            return list;
        } else {//投资组合信息
            List<InvestReportVO> list = processDataDao.queryInvestReport(pd.getInvestReportVO());
            return list;
        }
    }

    /**
     * 修改报表
     *
     * @param pd
     */
    @Override
    public void updateEvalReport(ProcessDataVO pd) throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        String fileType = pd.getFileType();
        String editDetails = pd.getEditDetails();
        if (StringUtils.isEmpty(fileType)) {
            throw new Exception("请指定文件类型");
        } else if (StringUtils.isEmpty(editDetails)) {
            throw new Exception("修改内容为空");
        } else if (fileType.equals("T04_FIN_EVL")) {//估值表
            JavaType javaType = objectMapper.getTypeFactory().constructParametricType(List.class, EvalReportVO.class);
            List<EvalReportVO> list = objectMapper.readValue(editDetails, javaType);
            processDataDao.updateEvalReport(list);
        } else if (fileType.equals("T04_COA")) {//科目表
            JavaType javaType = objectMapper.getTypeFactory().constructParametricType(List.class, CourseCodeReportVO.class);
            List<CourseCodeReportVO> list = objectMapper.readValue(editDetails, javaType);
            processDataDao.updateCourseCode(list);
        } else if (fileType.equals("T04_COA_GL_BAL")) {//科目余额表
            JavaType javaType = objectMapper.getTypeFactory().constructParametricType(List.class, CourseBalanceVO.class);
            List<CourseBalanceVO> list = objectMapper.readValue(editDetails, javaType);
            processDataDao.updateCourseBalance(list);
        } else if (fileType.equals("T05_BANK_DEP_TXN")) {//银行存款业务表
            JavaType javaType = objectMapper.getTypeFactory().constructParametricType(List.class, BankDepositReportVO.class);
            List<BankDepositReportVO> list = objectMapper.readValue(editDetails, javaType);
            processDataDao.updateBankDeposit(list);
        } else if (fileType.equals("EVLJJ")) {//基金业务表
            JavaType javaType = objectMapper.getTypeFactory().constructParametricType(List.class, FundBusinessReportVO.class);
            List<FundBusinessReportVO> list = objectMapper.readValue(editDetails, javaType);
            processDataDao.updateFundBusiness(list);
        } else if (fileType.equals("YHJHG")) {//银行间回购信息
            JavaType javaType = objectMapper.getTypeFactory().constructParametricType(List.class, BankRepoReportVO.class);
            List<BankRepoReportVO> list = objectMapper.readValue(editDetails, javaType);
            processDataDao.updateBankRepo(list);
        } else if (fileType.equals("YHJZQ")) {//银行间债券
            JavaType javaType = objectMapper.getTypeFactory().constructParametricType(List.class, BankSecurityReportVO.class);
            List<BankSecurityReportVO> list = objectMapper.readValue(editDetails, javaType);
            processDataDao.updateBankSecurity(list);
        } else if (fileType.equals("JYSQS")) {//交易所清算
            JavaType javaType = objectMapper.getTypeFactory().constructParametricType(List.class, ExchangeClearReportVO.class);
            List<ExchangeClearReportVO> list = objectMapper.readValue(editDetails, javaType);
            processDataDao.updateExchangeClear(list);
        } else {//投资组合信息
            JavaType javaType = objectMapper.getTypeFactory().constructParametricType(List.class, InvestReportVO.class);
            List<InvestReportVO> list = objectMapper.readValue(editDetails, javaType);
            processDataDao.updateInvestReport(list);
        }

    }

    /**
     * 删除报表
     *
     * @param pd
     */
    @Override
    public void deleteEvalReport(ProcessDataVO pd) throws Exception {
        String fileType = pd.getFileType();
        String ids = pd.getIds();
        String[] arr = ids.split(",");
        Integer array[] = new Integer[arr.length];
        for (int i = 0; i < arr.length; i++) {
            array[i] = Integer.parseInt(arr[i]);
        }
        List<Integer> idsList = Arrays.asList(array);
        if (StringUtils.isEmpty(fileType)) {
            throw new Exception("请指定文件类型");
        } else if (null == idsList || idsList.isEmpty()) {
            throw new Exception("删除内容为空");
        } else if (fileType.equals("T04_FIN_EVL")) {//估值表
            processDataDao.deleteEvalReport(idsList);
        } else if (fileType.equals("T04_COA")) {//科目表
            processDataDao.deleteCourseCode(idsList);
        } else if (fileType.equals("T04_COA_GL_BAL")) {//科目余额表
            processDataDao.deleteCourseBalance(idsList);
        } else if (fileType.equals("T05_BANK_DEP_TXN")) {//银行存款业务表
            processDataDao.deleteBankDeposit(idsList);
        } else if (fileType.equals("EVLJJ")) {//基金业务表
            processDataDao.deleteFundBusiness(idsList);
        } else if (fileType.equals("YHJHG")) {//银行间回购信息
            processDataDao.deleteBankRepo(idsList);
        } else if (fileType.equals("YHJZQ")) {//银行间债券
            processDataDao.deleteBankSecurity(idsList);
        } else if (fileType.equals("JYSQS")) {//交易所清算
            processDataDao.deleteExchangeClear(idsList);
        } else {//投资组合信息
            processDataDao.deleteInvestReport(idsList);
        }
    }
}
