package com.yss.newexport.Entity;

/**
 * @author
 */
public class ProcessDataVO {
    private String fileType;
    private String ids;
    private String editDetails;
    private EvalReportVO evalReport;
    private CourseCodeReportVO courseCodeReport;
    private CourseBalanceVO courseBalance;
    private BankDepositReportVO bankDepositReport;
    private FundBusinessReportVO fundBusinessReport;
    private BankRepoReportVO bankRepoReport;
    private BankSecurityReportVO bankSecurityReport;
    private ExchangeClearReportVO exchangeClearReport;
    private InvestReportVO investReportVO;

    public String getFileType() {
        return fileType;
    }

    public void setFileType(String fileType) {
        this.fileType = fileType;
    }

    public String getIds() {
        return ids;
    }

    public void setIds(String ids) {
        this.ids = ids;
    }

    public String getEditDetails() {
        return editDetails;
    }

    public void setEditDetails(String editDetails) {
        this.editDetails = editDetails;
    }

    public EvalReportVO getEvalReport() {
        return evalReport;
    }

    public void setEvalReport(EvalReportVO evalReport) {
        this.evalReport = evalReport;
    }

    public CourseCodeReportVO getCourseCodeReport() {
        return courseCodeReport;
    }

    public void setCourseCodeReport(CourseCodeReportVO courseCodeReport) {
        this.courseCodeReport = courseCodeReport;
    }

    public CourseBalanceVO getCourseBalance() {
        return courseBalance;
    }

    public void setCourseBalance(CourseBalanceVO courseBalance) {
        this.courseBalance = courseBalance;
    }

    public BankDepositReportVO getBankDepositReport() {
        return bankDepositReport;
    }

    public void setBankDepositReport(BankDepositReportVO bankDepositReport) {
        this.bankDepositReport = bankDepositReport;
    }

    public FundBusinessReportVO getFundBusinessReport() {
        return fundBusinessReport;
    }

    public void setFundBusinessReport(FundBusinessReportVO fundBusinessReport) {
        this.fundBusinessReport = fundBusinessReport;
    }

    public BankRepoReportVO getBankRepoReport() {
        return bankRepoReport;
    }

    public void setBankRepoReport(BankRepoReportVO bankRepoReport) {
        this.bankRepoReport = bankRepoReport;
    }

    public BankSecurityReportVO getBankSecurityReport() {
        return bankSecurityReport;
    }

    public void setBankSecurityReport(BankSecurityReportVO bankSecurityReport) {
        this.bankSecurityReport = bankSecurityReport;
    }

    public ExchangeClearReportVO getExchangeClearReport() {
        return exchangeClearReport;
    }

    public void setExchangeClearReport(ExchangeClearReportVO exchangeClearReport) {
        this.exchangeClearReport = exchangeClearReport;
    }

    public InvestReportVO getInvestReportVO() {
        return investReportVO;
    }

    public void setInvestReportVO(InvestReportVO investReportVO) {
        this.investReportVO = investReportVO;
    }
}