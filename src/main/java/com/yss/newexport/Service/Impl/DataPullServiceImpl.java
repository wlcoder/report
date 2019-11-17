package com.yss.newexport.Service.Impl;

import com.yss.newexport.Entity.*;
import com.yss.newexport.dao.Local.IgetLocalDataDao;
import com.yss.newexport.dao.Remote.IremoteDataPullDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class DataPullServiceImpl  {

    @Autowired
    private IremoteDataPullDao dataPullDao;

    @Autowired
    private IgetLocalDataDao datalocalDao;


    @Transactional(rollbackFor = Exception.class,transactionManager = "localTransactionManager")
    public void pullBankRepoData(String pullDate,Map<String,CourseRelVO> accmap) throws Exception{
        try{
            List <BankRepoReportVO> bankrepolist = dataPullDao.pullBankRepo(pullDate);
            System.out.println("银行间回购表拉取数据成功");
            List <BankRepoReportVO> commitlist = new ArrayList<>();
            int count = 0;
            datalocalDao.deleteTempBankRepo(pullDate);//先删除当日数据
            for(BankRepoReportVO vo:bankrepolist){
                count++;
                commitlist.add(vo);
                if(count >= 1500){//防止数据过多，造成数据事务日志满，或者SQL过长报错。
                    datalocalDao.saveTempBankRepo(commitlist);
                    commitlist.clear();
                    count = 0;
                }
            }
            if(commitlist.size() > 0){
                datalocalDao.saveTempBankRepo(commitlist);//最后不足1500条的再执行一次
                System.out.println("银行间回购表数据入库成功");
            }
        }catch (Exception e){
            throw new Exception("采集银行间回购表数据出错"+e.getMessage());
        }
    }


    @Transactional(rollbackFor = Exception.class,transactionManager = "localTransactionManager")
    public void pullVocherData(String pullDate, Map<String, CourseRelVO> accmap) throws Exception{
        try {
               System.out.println("开始拉取凭证表数据");
               List <VoucherReportVO> vochlist = dataPullDao.pullVoucher(pullDate);
               System.out.println("凭证表拉取数据成功");
               List <VoucherReportVO> commitlist = new ArrayList<>();
               int count = 0;
               datalocalDao.deleteTempVoucherByCon(pullDate);//先删除当日数据
               for(VoucherReportVO vo:vochlist){
                     count++;
                     commitlist.add(vo);
                     if(count >= 1500){//防止数据过多，造成数据事务日志满，或者SQL过长报错。
                        datalocalDao.saveTempLocalVoucher(commitlist);
                        commitlist.clear();
                        count = 0;
                     }
               }

               if(commitlist.size() > 0){
                    datalocalDao.saveTempLocalVoucher(commitlist);//最后不足1500条的再执行一次
                    System.out.println("凭证表数据入库成功");
               }
           }catch (Exception e){
                throw new Exception("采集凭证表出错"+e.getMessage());
           }
    }


    @Transactional(rollbackFor = Exception.class,transactionManager = "localTransactionManager")
    public void pullEvalData(String pullDate, Map<String, CourseRelVO> accmap) throws Exception{
        try{
              System.out.println("开始估值表拉取数据"+pullDate);
              List <EvalReportVO> evallist = dataPullDao.pullEval(pullDate);
              System.out.println("估值表拉取数据成功"+evallist.size());
              List <EvalReportVO> commitlist = new ArrayList<>();
              int count = 0;
              datalocalDao.deleteTempEvalByCon(pullDate);//先删除当日数据
              for(EvalReportVO vo:evallist){
                  count++;
                  commitlist.add(vo);
                  if(count >= 1500){//防止数据过多，造成数据事务日志满，或者SQL过长报错。
                      datalocalDao.saveTempLocalEval(commitlist);
                      commitlist.clear();
                      count = 0;
                  }
              }

              if(commitlist.size() > 0){
                  datalocalDao.saveTempLocalEval(commitlist);//最后不足1500条的再执行一次
                  System.out.println("估值表数据采集成功"+count);
              }
           }catch(Exception e){
                System.out.println("估值表数据采集出错"+e.getMessage());
                throw new Exception("采集估值表出错"+e.getMessage());
           }
    }


    @Transactional(rollbackFor = Exception.class,transactionManager = "localTransactionManager")
    public void pullCourseCodeData(String pullDate, Map<String, CourseRelVO> accmap)throws Exception{
        try{
            System.out.println("开始科目表拉取数据");
            List <CourseCodeReportVO> courselist = dataPullDao.pullCourseCode(pullDate);
            System.out.println("科目表拉取数据成功");
            List <CourseCodeReportVO> commitlist = new ArrayList<>();
            int count = 0;
            datalocalDao.deleteTempCourseCode(pullDate);//先删除数据,科目表应该是全量
            for(CourseCodeReportVO vo:courselist){
                count++;
                commitlist.add(vo);
                if(count >= 1500){//防止数据过多，造成数据事务日志满，或者SQL过长报错。
                    datalocalDao.saveTempCourseCode(commitlist);
                    commitlist.clear();
                    count = 0;
                }
            }

            if(commitlist.size() > 0){
                datalocalDao.saveTempCourseCode(commitlist);//最后不足1500条的再执行一次
                System.out.println("科目表数据采集成功");
            }
        }catch(Exception e){
            throw new Exception("采集科目表数据出错"+ e.getMessage());
        }
    }

    @Transactional(rollbackFor = Exception.class,transactionManager = "localTransactionManager")
    public void pullCourseBalanceData(String pullDate, Map<String, CourseRelVO> accmap)throws Exception{
        try{
            System.out.println("开始余额表拉取数据");
            List <CourseBalanceVO> balancelist = dataPullDao.pullCourseBalance(pullDate);
            System.out.println("余额表拉取数据成功");
            List <CourseBalanceVO> commitlist = new ArrayList<>();
            int count = 0;
            datalocalDao.deleteTempCourseBalance(pullDate);//先删除余额表数据。
            for(CourseBalanceVO vo:balancelist){
                count++;
                commitlist.add(vo);
                if(count >= 1500){//防止数据过多，造成数据事务日志满，或者SQL过长报错。
                    datalocalDao.saveTempCourseBalance(commitlist);
                    commitlist.clear();
                    count = 0;
                }
            }

            if(commitlist.size() > 0){
              datalocalDao.saveTempCourseBalance(commitlist);//最后不足1500条的再执行一次
              System.out.println("余额表数据采集成功");
            }
        }catch(Exception e){
            throw new Exception("采集余额表数据出错"+e.getMessage());
        }
    }


    @Transactional(rollbackFor = Exception.class,transactionManager = "localTransactionManager")
    public void pullBankDepositData(String pullDate, Map<String, CourseRelVO> accmap)throws Exception{
        try{
            List <BankDepositReportVO> depositlist = dataPullDao.pullBankDesposit(pullDate);
            System.out.println("银行存款业务表拉取数据成功");
            List <BankDepositReportVO> commitlist = new ArrayList<>();
            int count = 0;
            datalocalDao.deleteTempBankDeposit(pullDate);//先删除当日数据
            for(BankDepositReportVO vo:depositlist){
                count++;
                commitlist.add(vo);
                if(count >= 1500){//防止数据过多，造成数据事务日志满，或者SQL过长报错。
                    datalocalDao.saveTempBankDeposit(commitlist);
                    commitlist.clear();
                    count = 0;
                }
            }
            if(commitlist.size() > 0){//最后不足1500条的再执行一次
                datalocalDao.saveTempBankDeposit(commitlist);
                System.out.println("银行存款业务表数据入库成功");
            }
        }catch(Exception e){
            throw new Exception("银行存款业务表数据出错"+e.getMessage());
        }
    }

    @Transactional(rollbackFor = Exception.class,transactionManager = "localTransactionManager")
    public void pullFundData(String pullDate, Map<String, CourseRelVO> accmap)throws Exception{
        try{
            List <FundBusinessReportVO> fundlist = dataPullDao.pullFund(pullDate);
            System.out.println("基金业务表拉取数据成功");
            List <FundBusinessReportVO> commitlist = new ArrayList<>();
            int count = 0;
            datalocalDao.deleteTempFund(pullDate);//先删除当日数据
            for(FundBusinessReportVO vo:fundlist){
                count++;
                commitlist.add(vo);
                if(count >= 1500){//防止数据过多，造成数据事务日志满，或者SQL过长报错。
                    datalocalDao.saveTempFund(commitlist);
                    commitlist.clear();
                    count = 0;
                }
            }

            if(commitlist.size() > 0){//最后不足1500条的再执行一次
                datalocalDao.saveTempFund(commitlist);
                System.out.println("基金业务表数据入库成功");
            }
        }catch (Exception e){
            throw new Exception("采集基金业务表数据出错"+e.getMessage());
        }
    }

    @Transactional(rollbackFor = Exception.class,transactionManager = "localTransactionManager")
    public void pullExchangeData(String pullDate, Map<String, CourseRelVO> accmap)throws Exception{
        try{
            System.out.println("开始交易所清算表拉取数据"+pullDate);
            List <ExchangeClearReportVO> exchangelist = dataPullDao.pullExchange(pullDate);
            System.out.println("交易所清算表拉取数据成功"+exchangelist.size());
            List <ExchangeClearReportVO> commitlist = new ArrayList<>();
            int count = 0;
            datalocalDao.deleteTempExchange(pullDate);//先删除数据,全量同步数据
            for(ExchangeClearReportVO vo:exchangelist){
                count++;
                commitlist.add(vo);
                if(count >= 1500){//防止数据过多，造成数据事务日志满，或者SQL过长报错。
                    datalocalDao.saveTempExchange(commitlist);
                    commitlist.clear();
                    count = 0;
                }
            }

            if(commitlist.size() > 0){
                datalocalDao.saveTempExchange(commitlist);//最后不足1500条的再执行一次
                System.out.println("交易所清算表数据采集成功"+count);
            }
        }catch(Exception e){
            System.out.println("采集交易所清算表数据出错:"+e.getMessage());
            throw new Exception("采集交易所清算表数据出错:"+e.getMessage());
        }

    }


    @Transactional(rollbackFor = Exception.class,transactionManager = "localTransactionManager")
    public void pullInvestData(String pullDate, Map<String, CourseRelVO> accmap) throws Exception{
        try{
            List <InvestReportVO> investlist = dataPullDao.pullInvest(pullDate);
            System.out.println("投资组合表拉取数据成功");
            List <InvestReportVO> commitlist = new ArrayList<>();
            int count = 0;
            datalocalDao.deleteTempInvest(pullDate);//先删除数据,全量同步数据
            for(InvestReportVO vo:investlist){
                count++;
                commitlist.add(vo);
                if(count >= 1500){//防止数据过多，造成数据事务日志满，或者SQL过长报错。
                    datalocalDao.saveTempInvest(commitlist);
                    commitlist.clear();
                    count = 0;
                }
            }

            if(commitlist.size() > 0){
                datalocalDao.saveTempInvest(commitlist);//最后不足1500条的再执行一次
                System.out.println("投资组合表数据采集成功");
            }
        }catch (Exception e){
            throw new Exception("采集投资组合表数据出错:"+e.getMessage());
        }
    }

    @Transactional(rollbackFor = Exception.class,transactionManager = "localTransactionManager")
    public void pullBankSecurityData(String pullDate,Map<String,CourseRelVO> accmap)throws Exception{
        try{
            List <BankSecurityReportVO> banksecuritylist = dataPullDao.pullBankSecurity(pullDate);
            System.out.println("银行间债券表拉取数据成功");
            List <BankSecurityReportVO> commitlist = new ArrayList<>();
            int count = 0;
            datalocalDao.deleteTempBankSecurity(pullDate);//先删除当日数据
            for(BankSecurityReportVO vo:banksecuritylist){
                count++;
                commitlist.add(vo);
                if(count >= 1500){//防止数据过多，造成数据库事务日志满，或者SQL过长报错。
                    datalocalDao.saveTempBankSecurity(commitlist);
                    commitlist.clear();
                    count = 0;
                }
            }
            if(commitlist.size() > 0){
                datalocalDao.saveTempBankSecurity(commitlist);//最后不足1500条的再执行一次
                System.out.println("银行间债券表数据入库成功");
            }
        }catch (Exception e){
            throw new Exception("采集银行间债券表数据出错:"+e.getMessage());
        }
    }
}