package com.yss.newexport.Service.Impl;

import com.yss.newexport.Entity.*;
import com.yss.newexport.Util.TapStringUtils;
import com.yss.newexport.dao.Local.IgetLocalDataDao;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CoverDataServicePlanBImp {

    @Autowired
    private IgetLocalDataDao covertdatalocalDao;
    private static final Logger logger = LoggerFactory.getLogger(CoverDataServiceImpl.class);

    public void covertBankSecurityData(String pullDate, Map<String, CourseRelVO> accmap,
                                       Map<String,Map<String,String>> directorymap,Map<String, CourseRelVO> taraccmap) throws Exception{
        try{
            System.out.println("开始转换银行间债券表");
            List <BankSecurityReportVO> banksecuritylist = covertdatalocalDao.queryTempBankSecurity(pullDate);
            System.out.println("银行间债券查询临时表数据成功");
            List <BankSecurityReportVO> commitlist = new ArrayList<>();
            int count = 0;
            covertdatalocalDao.deleteBankSecurity(pullDate);//先删除当日数据
            for(BankSecurityReportVO vo:banksecuritylist){
                count++;
                String value = "";
                Map valueMap = null;
                valueMap = directorymap.get("Setl_Org");
                if(valueMap!=null){
                    value = (String)valueMap.get(vo.getYzjsjg());
                    vo.setYzjsjg(value);
                }

                valueMap = directorymap.get("Bs_Flg");
                if(valueMap!=null){
                    value = (String)valueMap.get(vo.getYzjylx());
                    vo.setYzjylx(value);
                }

                valueMap = directorymap.get("Bond_Catg");
                if(valueMap!=null){
                    value = (String)valueMap.get(vo.getYzzqlb());
                    vo.setYzzqlb(value);
                }

                valueMap = directorymap.get("Inrt_Type");
                if(valueMap!=null){
                    value = (String)valueMap.get(vo.getYzlvlx());
                    vo.setYzlvlx(value);
                }

                commitlist.add(vo);
                if(count >= 1500){//防止数据过多，造成数据库事务日志满，或者SQL过长报错。
                    covertdatalocalDao.saveBankSecurity(commitlist);
                    commitlist.clear();
                    count = 0;
                }
            }

            if(commitlist.size() > 0){
                covertdatalocalDao.saveBankSecurity(commitlist);//最后不足1500条的再执行一次
                System.out.println("银行间债券表数据转换成功");
            }
        }catch (Exception e){
            throw new Exception("转换银行间债券表数据出错:"+e.getMessage());
        }
    }

    @Transactional(rollbackFor = Exception.class,transactionManager = "localTransactionManager")
    public void covertBankRepoData(String pullDate, Map<String, CourseRelVO> accmap,
                                   Map<String,Map<String,String>> directorymap,Map<String, CourseRelVO> taraccmap) throws Exception{
        try{
            System.out.println("开始转换银行间债券表");
            List <BankRepoReportVO> bankrepolist = covertdatalocalDao.queryTempBankRepo(pullDate);
            System.out.println("银行间回购查询临时表数据成功");
            List <BankRepoReportVO> commitlist = new ArrayList<>();
            int count = 0;
            covertdatalocalDao.deleteBankRepo(pullDate);//先删除当日数据
            for(BankRepoReportVO vo:bankrepolist){
                count++;
                String value = "";
                Map valueMap = null;
                valueMap = directorymap.get("Setl_Org");
                if(valueMap!=null){
                    value = (String)valueMap.get(vo.getHgjsjg());
                    vo.setHgjsjg(value);
                }

                valueMap = directorymap.get("Bybk_Mod");
                if(valueMap != null){
                    value = (String)valueMap.get(vo.getHghgfs());
                    vo.setHghgfs(value);
                }

                valueMap = directorymap.get("Bybk_Dir");
                if(valueMap != null){
                    value = (String)valueMap.get(vo.getHghgfx());
                    vo.setHghgfx(value);
                }

                commitlist.add(vo);
                if(count >= 1500){//防止数据过多，造成数据事务日志满，或者SQL过长报错。
                    covertdatalocalDao.saveBankRepo(commitlist);
                    commitlist.clear();
                    count = 0;
                }
            }

            if(commitlist.size() > 0){//最后不足1500条的再执行一次
                covertdatalocalDao.saveBankRepo(commitlist);
                System.out.println("银行间回购表数据转换成功");
            }
        }catch (Exception e){
            throw new Exception("转换银行间回购表数据出错"+e.getMessage());
        }
    }

    @Transactional(rollbackFor = Exception.class,transactionManager = "localTransactionManager")
    public void covertVocherData(String pullDate, Map<String, CourseRelVO> accmap,Map<String,
            Map<String,String>> directorymap,Map<String, CourseRelVO> taraccmap) throws Exception{
        try {
            System.out.println("开始转换凭证表数据");
            List <VoucherReportVO> vochlist = covertdatalocalDao.queryTempVoucherByCon(pullDate);
            System.out.println("凭证表查询临时表数据成功");
            List <VoucherReportVO> commitlist = new ArrayList<>();
            int count = 0;
            covertdatalocalDao.deleteVoucherByCon(pullDate);//先删除当日数据
            for(VoucherReportVO vo:vochlist){
                count++;
                String vchkm = vo.getCoaId();
                String zqcode = "";
                String value = "";

                Map valueMap = null;
                valueMap = directorymap.get("Ccy");
                if(valueMap!=null){
                    value = (String)valueMap.get(vo.getCcyCd().toString());
                    vo.setCcyCd(value==null?"CNY":value);
                }

                valueMap = directorymap.get("Dbt_Cr");
                if(valueMap!=null){
                    value = (String)valueMap.get(vo.getDbCrInd().toString());
                    vo.setDbCrInd(value);
                }
                BigDecimal unitPrc = TapStringUtils.div(vo.getTxnAmtDccy(),vo.getTxnQty(),16);
                vo.setUnitPrc(unitPrc);

                //转换凭证来源
                vo.setVchSrcCd(turnVoucherSrcCd(vo));

                if(vchkm!=null && accmap.containsKey(vchkm)){//存在科目对照关系
                    CourseRelVO rel =  accmap.get(vchkm);
                    vo.setCoaId(rel.getTargetCourseCode());
                    commitlist.add(vo);
                }else if(!accmap.containsKey(vchkm) && vchkm.lastIndexOf(".") >=10 ){
                    //明细科目，去掉明细券再次查找对应科目
                    String parentkm = vchkm.substring(0,vchkm.lastIndexOf("."));
                    String incode = vchkm.substring(vchkm.lastIndexOf(".")+1);
                    if(incode.lastIndexOf(" ") > -1){
                        zqcode = incode.substring(0,incode.lastIndexOf(" "));
                    }else{
                        zqcode = incode;
                    }

                    if(accmap.containsKey(parentkm)){
                        CourseRelVO rel =  accmap.get(parentkm);
                        vo.setCoaId(rel.getTargetCourseCode()+zqcode);
                        commitlist.add(vo);
                    }else{
                        vo.setCoaId(parentkm+zqcode);
                        commitlist.add(vo);
                    }
                }else{//非明细科目，但是找不到对应关系，直接原样展示
                    commitlist.add(vo);
                }

                if(count >= 1500){//防止数据过多，造成数据事务日志满，或者SQL过长报错。
                    covertdatalocalDao.saveLocalVoucher(commitlist);
                    commitlist.clear();
                    count = 0;
                }
            }

            if(commitlist.size() > 0){
                covertdatalocalDao.saveLocalVoucher(commitlist);//最后不足1500条的再执行一次
                System.out.println("凭证表完成数据转换入库成功");
            }
        }catch (Exception e){
            throw new Exception("凭证表数据转换出错"+e.getMessage());
        }
    }

    @Transactional(rollbackFor = Exception.class,transactionManager = "localTransactionManager")
    public void covertEvalData(String pullDate, Map<String, CourseRelVO> accmap,Map<String,
            Map<String,String>> directorymap,Map<String, CourseRelVO> taraccmap) throws Exception{
        try{
            System.out.println("开始转换估值表数据");
            List <EvalReportVO> evallist = covertdatalocalDao.queryTempEvalByCon(pullDate);
            System.out.println("估值表查询临时表数据成功");
            System.out.println("估值表查询临时表中当日基金净值");
            EvalReportVO fundInvest = covertdatalocalDao.queryFundInvest(pullDate);
            System.out.println("当日基金净值"+fundInvest);
            if(fundInvest==null || fundInvest.equals(new BigDecimal(0))){
                throw new Exception("当日基金净值为空或者为0");
            }
            List <EvalReportVO> commitlist = new ArrayList<>();
            Map <String,EvalReportVO> tempmap = new HashMap<>();
            covertdatalocalDao.deleteEvalByCon(pullDate);//先删除当日数据
            for(EvalReportVO vo:evallist){//假设我拿到的全是明细科目，以及指标项的合计
                Map valueMap = null;
                String value = "";
                valueMap = directorymap.get("Ccy");
                if(valueMap!=null){
                    value = (String)valueMap.get(vo.getCcyCd());
                    vo.setCcyCd(value==null ? "CNY":value);
                }

                valueMap = directorymap.get("Txn_Plc");
                if(valueMap!=null){
                    value = (String)valueMap.get(vo.getExchangeCd());
                    vo.setExchangeCd(value);
                }

                valueMap = directorymap.get("Evl_Mth");
                if(valueMap!=null){
                    value = (String)valueMap.get(vo.getMktEvlMethodCd());
                    vo.setMktEvlMethodCd(value);
                }


                if("1".equals(vo.getIsSumUnit())){//合计项,替换合计项编码
                    valueMap = directorymap.get("Evl_Idx");
                    if(valueMap!=null){
                        value = (String)valueMap.get(vo.getCoaId());
                        vo.setCoaId(value);
                    }
                    commitlist.add(vo);
                    continue;
                }


                String evalkm = vo.getCoaId();
                String zqcode = "";
                if(!accmap.containsKey(evalkm) && evalkm.lastIndexOf(".") >= 10){
                    //明细科目，去掉明细券再次查找对应科目
                    String parentkm = evalkm.substring(0,evalkm.lastIndexOf("."));
                    String incode = evalkm.substring(evalkm.lastIndexOf(".")+1);
                    String zhkm = parentkm;
                    if(incode.lastIndexOf(" ") > -1){
                        zqcode = incode.substring(0,incode.lastIndexOf(" "));
                    }else{
                        zqcode = incode;
                    }
                    vo.setSecuCd(zqcode);

                    //因为测试数据单位净值只有本币，所以这里，原币本币都除以本币
                    vo.setCostNavRatioOccy(TapStringUtils.div(vo.getCostOccy(),fundInvest.getCostDccy(),8));
                    vo.setCostNavRatioDccy(TapStringUtils.div(vo.getCostDccy(),fundInvest.getCostDccy(),8));
                    vo.setMktNavRatioOccy(TapStringUtils.div(vo.getMktValOccy(),fundInvest.getMktValDccy(),8));
                    vo.setMktNavRatioDccy(TapStringUtils.div(vo.getMktValDccy(),fundInvest.getMktValDccy(),8));
                    vo.setEvlAprctNavRatioOccy(TapStringUtils.div(vo.getEvlAprctOccy(),fundInvest.getEvlAprctDccy(),8));


                    if(accmap.containsKey(parentkm)){
                        CourseRelVO rel =  accmap.get(parentkm);
                        if(!TapStringUtils.isEmpty(rel.getTargetCourseCode())){
                            zhkm = rel.getTargetCourseCode();
                        }
                        vo.setCoaId(zhkm+zqcode);

                        parentkm = zhkm;
                        if(evalkm.startsWith("1") && parentkm.endsWith("01")){//拼接估值增值科目
                            String gzkm = parentkm.substring(0,parentkm.length()-2)+"99"+zqcode;
                            vo.setEvlAprctCoaId(gzkm);
                        }
                        commitlist.add(vo);
                    }else{
                        vo.setCoaId(parentkm+zqcode);
                        commitlist.add(vo);
                    }

                    EvalReportVO tempvo = (EvalReportVO)vo.clone();//完成转换后克隆一个新的类
                    dealEvalDetailSubject(parentkm,tempvo,tempmap,taraccmap,fundInvest,0);
                }else if(accmap.containsKey(evalkm)){
                    String zhkm = evalkm;
                    EvalReportVO tempvo = (EvalReportVO)vo.clone();//完成转换后克隆一个新的类
                    CourseRelVO rel =  accmap.get(evalkm);
                    if(!TapStringUtils.isEmpty(rel.getTargetCourseAccountCode())){
                        zhkm = rel.getTargetCourseAccountCode();
                        tempvo.setCoaId(zhkm);//转换成招行科目
                        tempvo.setCoaName(rel.getTargetCourseAccountCodeName());
                    }else{
                        if(!TapStringUtils.isEmpty(rel.getTargetCourseCode())){
                            zhkm = rel.getTargetCourseCode();
                        }
                        tempvo.setCoaId(zhkm);//转换成招行科目
                    }
                    dealEvalDetailSubject(null,tempvo,tempmap,taraccmap,fundInvest,0);
                }else{
                    commitlist.add(vo);
                }
            }

            for (Map.Entry ent:tempmap.entrySet()){
                EvalReportVO tm = (EvalReportVO)ent.getValue();
                commitlist.add((EvalReportVO) ent.getValue());
            }

            if(commitlist.size() > 0){
                covertdatalocalDao.saveLocalEval(commitlist);//最后不足1500条的再执行一次
                System.out.println("估值表数据转换成功");
            }
        }catch(Exception e){
            throw new Exception("转换估值表出错"+e.getMessage());
        }
    }

    @Transactional(rollbackFor = Exception.class,transactionManager = "localTransactionManager")
    public void covertCourseCodeData(String pullDate, Map<String, CourseRelVO> accmap,
                                     Map<String,Map<String,String>> directorymap,Map<String, CourseRelVO> taraccmap) throws Exception{
        try{
            System.out.println("开始转换科目表数据");
            List <CourseCodeReportVO> courselist = covertdatalocalDao.queryTempCourseCode(pullDate);
            System.out.println("科目表查询临时表数据成功");
            List <CourseCodeReportVO> commitlist = new ArrayList<>();
            Map<String,Object> recodemap = new HashMap();
            int count = 0;
            covertdatalocalDao.deleteCourseCode(pullDate);//先删除数据,科目表应该是全量
            for(CourseCodeReportVO vo:courselist){
                count++;
                String value = "";
                Map valueMap = null;
                valueMap = directorymap.get("Sbj_Lvl");
                if(valueMap!=null){
                    value = (String)valueMap.get(vo.getCoaLvl().toString());
                    vo.setCoaLvl(Integer.valueOf(value));
                }

                valueMap = directorymap.get("Dtl_Sjb_Flg");
                if(valueMap!=null){
                    value = (String)valueMap.get(vo.getDtlCoaInd());
                    vo.setCoaLvl(Integer.valueOf(value));
                }

                valueMap = directorymap.get("Sbj_Typ");
                if(valueMap!=null){
                    value = (String)valueMap.get(vo.getCoaCatgCd());
                    vo.setCoaCatgCd(value);
                }

                valueMap = directorymap.get("Sbj_Dir");
                if(valueMap!=null){
                    value = (String)valueMap.get(vo.getCoaDirCd());
                    vo.setCoaLvl(Integer.valueOf(value));
                }

                valueMap = directorymap.get("Ldgr_Num_Flg");
                if(valueMap!=null){
                    value = (String)valueMap.get(vo.getAcctingQtyInd());
                    vo.setCoaLvl(Integer.valueOf(value));
                }

                String vchkm = vo.getCoaId();

                if(vchkm.contains("<")){
                     continue;
                }

                if(vchkm!=null && accmap.containsKey(vchkm)){//存在科目对照关系
                    CourseRelVO rel =  (CourseRelVO)accmap.get(vchkm);
                    vo.setCoaId(rel.getTargetCourseCode());
                    vo.setSuperCoaId(rel.getTargetParentCode());
                    vo.setCoaName(rel.getTargetCourseCodeName());
                    if(recodemap.containsKey(rel.getTargetCourseCode())){
                         continue;
                    }else{
                        recodemap.put(rel.getTargetCourseCode(),vo);
                        commitlist.add(vo);
                    }
                }else if(!accmap.containsKey(vchkm) && vchkm.lastIndexOf(".")>= 10 ){
                    String parentkm = vchkm.substring(0,vchkm.lastIndexOf("."));
                    if(accmap.containsKey(parentkm)){
                        CourseRelVO temp = accmap.get(parentkm);
                        String temptarget = temp.getTargetCourseCode();
                        String tempname = temp.getTargetCourseCodeName();
                        String temptargetparent = temp.getTargetCourseCode();
                        vo.setCoaId(parentkm);
                        vo.setSuperCoaId(temptargetparent);
                        vo.setCoaName(tempname);
                    }else{
                       //不存在科目对照直接丢掉
                    }
                }else{
                    //非明细科目，但是找不到对应关系，直接丢

                }

                if(count >= 1500){//防止数据过多，造成数据事务日志满，或者SQL过长报错。
                    covertdatalocalDao.saveCourseCode(commitlist);
                    commitlist.clear();
                    count = 0;
                }
            }

            if(commitlist.size() > 0){
                covertdatalocalDao.saveCourseCode(commitlist);//最后不足1500条的再执行一次
                System.out.println("科目表数据转换成功");
            }
        }catch(Exception e){
            throw new Exception("转换科目表数据出错"+ e.getMessage());
        }
    }

    @Transactional(rollbackFor = Exception.class,transactionManager = "localTransactionManager")
    public void covertCourseBalanceData(String pullDate, Map<String, CourseRelVO> accmap,
                                        Map<String,Map<String,String>> directorymap,Map<String, CourseRelVO> taraccmap)throws Exception {
        try{
            logger.info("开始转换余额表数据");
            List <CourseBalanceVO> balancelist = covertdatalocalDao.queryTempCourseBalance(pullDate);
            logger.info("余额表查询临时表数据成功");
            List <CourseBalanceVO> commitlist = new ArrayList<>();
            int count = 0;
            Map <String,CourseBalanceVO> tempmap = new HashMap<>();
            covertdatalocalDao.deleteCourseBalance(pullDate);//先删除余额表数据。
            for(CourseBalanceVO vo:balancelist){
                count++;
                String value = "";
                Map valueMap = null;
                valueMap = directorymap.get("Ccy");
                if(valueMap!=null){
                    value = (String)valueMap.get(vo.getCcyCd());
                    vo.setCcyCd(value==null ? "CNY":value);
                }
                String balancekm = vo.getCoaId();
                String zqcode = "";

                if(!accmap.containsKey(balancekm) && balancekm.lastIndexOf(".") >= 10){
                    //明细科目，去掉明细券再次查找对应科目
                    String parentkm = balancekm.substring(0,balancekm.lastIndexOf("."));
                    String incode = balancekm.substring(balancekm.lastIndexOf(".")+1);
                    String zhkm = parentkm;
                    if(incode.lastIndexOf(" ") > -1){
                        zqcode = incode.substring(0,incode.lastIndexOf(" "));
                    }else{
                        zqcode = incode;
                    }

                    if(accmap.containsKey(parentkm)){
                        CourseRelVO rel =  accmap.get(parentkm);
                        if(!TapStringUtils.isEmpty(rel.getTargetCourseCode())){
                            zhkm = rel.getTargetCourseCode();
                        }
                        vo.setCoaId(zhkm+zqcode);
                        parentkm = zhkm;
                        commitlist.add(vo);
                    }else{
                        vo.setCoaId(parentkm+zqcode);
                        commitlist.add(vo);
                    }
                    CourseBalanceVO tempvo = (CourseBalanceVO)vo.clone();//完成转换后克隆一个新的类
                    dealBalanceDetailSubject(parentkm,tempvo,tempmap,taraccmap,0);
                }else if(accmap.containsKey(balancekm)){
                    CourseBalanceVO tempvo = (CourseBalanceVO)vo.clone();
                    CourseRelVO rel =  accmap.get(balancekm);
                    String zhkm = balancekm;
                    if(!TapStringUtils.isEmpty(rel.getTargetCourseAccountCode())){
                        zhkm = rel.getTargetCourseAccountCode();
                        tempvo.setCoaId(zhkm);//转换成招行科目
                    }else{
                        if(!TapStringUtils.isEmpty(rel.getTargetCourseCode())){
                            zhkm = rel.getTargetCourseCode();
                        }
                        tempvo.setCoaId(zhkm);//转换成招行科目
                    }
                    dealBalanceDetailSubject(null,tempvo,tempmap,taraccmap,0);
                }else{
                    commitlist.add(vo);
                }
            }

            for (Map.Entry ent:tempmap.entrySet()){
                CourseBalanceVO tm = (CourseBalanceVO)ent.getValue();
                commitlist.add((CourseBalanceVO) ent.getValue());
            }

            if(commitlist.size() > 0){
                covertdatalocalDao.saveCourseBalance(commitlist);//最后不足1500条的再执行一次
                System.out.println("余额表数据转换成功");
            }
        }catch(Exception e){
            throw new Exception("转换余额表数据出错"+e.getMessage());
        }
    }

    @Transactional(rollbackFor = Exception.class,transactionManager = "localTransactionManager")
    public void covertBankDepositData(String pullDate, Map<String, CourseRelVO> accmap,
                                      Map<String,Map<String,String>> directorymap,Map<String, CourseRelVO> taraccmap) throws Exception{
        try{
            System.out.println("开始转换银行存款业务表数据");
            List <BankDepositReportVO> depositlist = covertdatalocalDao.queryTempBankDeposit(pullDate);
            System.out.println("银行存款业务表查询临时表数据成功");
            List <BankDepositReportVO> commitlist = new ArrayList<>();
            int count = 0;
            covertdatalocalDao.deleteBankDeposit(pullDate);//先删除当日数据
            for(BankDepositReportVO vo:depositlist){
                count++;
                String value = "";
                Map valueMap = null;
                valueMap = directorymap.get("Dep_Typ");
                if(valueMap!=null){
                    value = (String)valueMap.get(vo.getDepTypeCd());
                    vo.setDepTypeCd(value);
                }

                commitlist.add(vo);
                if(count >= 1500){//防止数据过多，造成数据事务日志满，或者SQL过长报错。
                    covertdatalocalDao.saveBankDeposit(commitlist);
                    commitlist.clear();
                    count = 0;
                }
            }
            if(commitlist.size() > 0){//最后不足1500条的再执行一次
                covertdatalocalDao.saveBankDeposit(commitlist);
                System.out.println("银行存款业务表数据转换成功");
            }
        }catch(Exception e){
            throw new Exception("转换银行存款业务表数据出错"+e.getMessage());
        }
    }

    @Transactional(rollbackFor = Exception.class,transactionManager = "localTransactionManager")
    public void covertFundData(String pullDate, Map<String, CourseRelVO> accmap,
                               Map<String,Map<String,String>> directorymap,Map<String, CourseRelVO> taraccmap) throws Exception{
        try{
            System.out.println("开始转换基金业务表数据");
            List <FundBusinessReportVO> fundlist = covertdatalocalDao.queryTempFund(pullDate);
            System.out.println("基金业务表查询临时表数据成功");
            List <FundBusinessReportVO> commitlist = new ArrayList<>();
            int count = 0;
            covertdatalocalDao.deleteFund(pullDate);//先删除当日数据
            for(FundBusinessReportVO vo:fundlist){
                count++;
                String zqdm = vo.getJjjjdm();
                String value = "";
                Map valueMap = null;

                valueMap = directorymap.get("Biz_catg");
                if(valueMap!=null){
                    value = (String)valueMap.get(vo.getJjywlb());
                    vo.setJjywlb(value);
                }

                if(zqdm !=null && zqdm.lastIndexOf(" ") > -1){
                    String fzqdm = zqdm.substring(0,zqdm.lastIndexOf(" "));
                    vo.setJjjjdm(fzqdm);
                }

                commitlist.add(vo);
                if(count >= 1500){//防止数据过多，造成数据事务日志满，或者SQL过长报错。
                    covertdatalocalDao.saveFund(commitlist);
                    commitlist.clear();
                    count = 0;
                }
            }

            if(commitlist.size() > 0){
                covertdatalocalDao.saveFund(commitlist);//最后不足1500条的再执行一次
                System.out.println("基金业务表数据转换成功");
            }
        }catch (Exception e){
            throw new Exception("转换基金业务表数据出错"+e.getMessage());
        }
    }

    @Transactional(rollbackFor = Exception.class,transactionManager = "localTransactionManager")
    public void covertExchangeData(String pullDate, Map<String, CourseRelVO> accmap,
                                   Map<String,Map<String,String>> directorymap,Map<String, CourseRelVO> taraccmap) throws Exception{
        try{
            System.out.println("开始转换交易所清算数据");
            List <ExchangeClearReportVO> exchangelist = covertdatalocalDao.queryTempExchange(pullDate);
            System.out.println("交易所清算表查询临时表成功"+exchangelist.size());
            List <ExchangeClearReportVO> commitlist = new ArrayList<>();
            int count = 0;
            covertdatalocalDao.deleteExchange(pullDate);//先删除数据,全量同步数据
            for(ExchangeClearReportVO vo:exchangelist){
                count++;
                String value = "";
                Map valueMap = null;

                //转换业务标识
                vo.setQsywbz(turnBinessType(vo));

                valueMap = directorymap.get("Txn_Mod");
                if(valueMap!=null){
                    value = (String)valueMap.get(vo.getQsjyfs());
                    vo.setQsjyfs(value);
                }

                valueMap = directorymap.get("Bs_Flg");
                if(valueMap !=null ){
                    value = valueMap.get(vo.getQsmmbz())==null ? vo.getQsmmbz() : (String)valueMap.get(vo.getQsmmbz());
                    vo.setQsmmbz(value);
                }

                valueMap = directorymap.get("Txn_Plc");
                if(valueMap!=null){
                    value = (String)valueMap.get(vo.getQsmket());
                    vo.setQsmket(value);
                }

                String zqdm = vo.getQsgqdm();
                if(zqdm !=null && zqdm.lastIndexOf(" ") > -1){
                    String fzqdm = zqdm.substring(0,zqdm.lastIndexOf(" "));
                    vo.setQsgqdm(fzqdm);
                }



                commitlist.add(vo);
                if(count >= 1500){//防止数据过多，造成数据事务日志满，或者SQL过长报错。
                    covertdatalocalDao.saveExchange(commitlist);
                    commitlist.clear();
                    count = 0;
                }
            }

            if(commitlist.size() > 0){//最后不足1500条的再执行一次
                covertdatalocalDao.saveExchange(commitlist);
                logger.info("转换交易所清算表数据成功");
            }
        }catch(Exception e){
            logger.info("转换交易所清算表数据出错"+e.getMessage());
            throw new Exception("转换交易所清算表数据出错:"+e.getMessage());
        }
    }

    @Transactional(rollbackFor = Exception.class,transactionManager = "localTransactionManager")
    public void covertInvestData(String pullDate, Map<String, CourseRelVO> accmap,
                                 Map<String,Map<String,String>> directorymap,Map<String, CourseRelVO> taraccmap) throws Exception{
        try{
            System.out.println("开始转换投资组合表数据");
            List <InvestReportVO> investlist = covertdatalocalDao.queryTempInvest(pullDate);
            System.out.println("查询临时投资组合表数据成功");
            List <InvestReportVO> commitlist = new ArrayList<>();
            int count = 0;
            covertdatalocalDao.deleteInvest(pullDate);//先删除数据,全量同步数据
            for(InvestReportVO vo:investlist){
                count++;
                commitlist.add(vo);
                if(count >= 1500){//防止数据过多，造成数据事务日志满，或者SQL过长报错。
                    covertdatalocalDao.saveInvest(commitlist);
                    commitlist.clear();
                    count = 0;
                }
            }

            if(commitlist.size() > 0){
                covertdatalocalDao.saveInvest(commitlist);//最后不足1500条的再执行一次
                System.out.println("投资组合表数据转换成功");
            }
        }catch (Exception e){
            throw new Exception("转换投资组合表数据出错:"+e.getMessage());
        }
    }

    //递归调用，处理估值表明细科目
    public void dealEvalDetailSubject(String lasttargetkm,EvalReportVO vo,Map<String,EvalReportVO> tmpmap,
                                      Map<String, CourseRelVO> accmap,EvalReportVO fundInvest,int startstep)throws Exception{
        String evalkm = vo.getCoaId();
        BigDecimal costInvest = fundInvest.getCostDccy();
        BigDecimal marketInvest = fundInvest.getMktValDccy();
        BigDecimal apriInvest = fundInvest.getEvlAprctDccy();
        logger.info("向上汇总科目"+evalkm);
        String dealKM  = "";//上级科目
        String srcKM = "";
        if(lasttargetkm != null){
            //该科目为明细到券的科目,取上级科目作为处理科目
            dealKM = lasttargetkm;
        }else if(accmap.containsKey(evalkm)){
            //该科目为非券科目，可以直接找到科目对照,同样取本方上级科目为处理科目
            CourseRelVO tempvo = accmap.get(evalkm);

            if(!TapStringUtils.isEmpty(tempvo.getTargetCourseAccountCode())){
                dealKM = tempvo.getTargetParentCode();//本级科目的上级科目对照
                srcKM = evalkm;
            }else{
                srcKM = tempvo.getTargetCourseCode();//本级对照科目
                dealKM = tempvo.getTargetParentCode();//本级科目的上级科目对照
            }

            if(lasttargetkm==null && startstep==0){//处理本级科目
                if(tmpmap.containsKey(srcKM)){
                    EvalReportVO srcvo = tmpmap.get(srcKM);
                    BigDecimal secuQty = TapStringUtils.addNumber(srcvo.getSecuQty(),vo.getSecuQty());
                    srcvo.setSecuQty(secuQty);

                    BigDecimal costOccy = TapStringUtils.addNumber(srcvo.getCostOccy(),vo.getCostOccy());
                    BigDecimal costDccy = TapStringUtils.addNumber(srcvo.getCostDccy(),vo.getCostDccy());
                    BigDecimal costNavRatioOccy = TapStringUtils.div(costOccy,costInvest,8);
                    BigDecimal costNavRatioDccy = TapStringUtils.div(costDccy,costInvest,8);
                    srcvo.setCostOccy(costOccy);
                    srcvo.setCostDccy(costDccy);
                    srcvo.setCostNavRatioOccy(costNavRatioOccy);
                    srcvo.setCostNavRatioDccy(costNavRatioDccy);

                    BigDecimal mktValOccy = TapStringUtils.addNumber(srcvo.getMktValOccy(),vo.getMktValOccy());
                    BigDecimal mktValDccy = TapStringUtils.addNumber(srcvo.getMktValDccy(),vo.getMktValDccy());
                    BigDecimal mktNavRatioOccy = TapStringUtils.div(mktValOccy,marketInvest,8);
                    BigDecimal mktNavRatioDccy = TapStringUtils.div(mktValDccy,marketInvest,8);
                    srcvo.setMktValOccy(mktValOccy);
                    srcvo.setMktValDccy(mktValDccy);
                    srcvo.setMktNavRatioOccy(mktNavRatioOccy);
                    srcvo.setMktNavRatioDccy(mktNavRatioDccy);

                    BigDecimal evlAprctOccy = TapStringUtils.addNumber(srcvo.getEvlAprctOccy(),vo.getEvlAprctOccy());
                    BigDecimal evlAprctDccy = TapStringUtils.addNumber(srcvo.getEvlAprctDccy(),vo.getEvlAprctDccy());
                    BigDecimal evlAprctNavRatioOccy = TapStringUtils.div(evlAprctOccy,apriInvest,8);
                    srcvo.setEvlAprctOccy(evlAprctOccy);
                    srcvo.setEvlAprctDccy(evlAprctDccy);
                    srcvo.setEvlAprctNavRatioOccy(evlAprctNavRatioOccy);
                    tmpmap.put(srcKM,srcvo);
                }else{
                    EvalReportVO valuevo = (EvalReportVO)vo.clone();
                    valuevo.setCoaId(srcKM);
                    valuevo.setCoaName(tempvo.getTargetCourseCodeName());
                    tmpmap.put(srcKM,valuevo);
                }
            }
            if(TapStringUtils.isEmpty(dealKM)) return;
        }else{
            //没有科目对照的科目对照
            tmpmap.put(evalkm,vo);
            System.out.println("没有科目对照的科目"+evalkm);
            return;
        }
        logger.info("处理的上级科目"+dealKM);

        if(accmap.containsKey(dealKM)){//上级科目可以找到对照关系
            CourseRelVO tempvo = accmap.get(dealKM);
            String dealKMName = tempvo.getTargetCourseCodeName();//科目对照关系名称
            logger.info(evalkm+"汇总科目为"+dealKM);

            if(tmpmap.containsKey(dealKM)){
                EvalReportVO parentvo = tmpmap.get(dealKM);
                BigDecimal secuQty = TapStringUtils.addNumber(parentvo.getSecuQty(),vo.getSecuQty());
                parentvo.setSecuQty(secuQty);

                BigDecimal costOccy = TapStringUtils.addNumber(parentvo.getCostOccy(),vo.getCostOccy());
                BigDecimal costDccy = TapStringUtils.addNumber(parentvo.getCostDccy(),vo.getCostDccy());
                BigDecimal costNavRatioOccy = TapStringUtils.div(costOccy,costInvest,8);
                BigDecimal costNavRatioDccy = TapStringUtils.div(costDccy,costInvest,8);
                parentvo.setCostOccy(costOccy);
                parentvo.setCostDccy(costDccy);
                parentvo.setCostNavRatioOccy(costNavRatioOccy);
                parentvo.setCostNavRatioDccy(costNavRatioDccy);

                BigDecimal mktValOccy = TapStringUtils.addNumber(parentvo.getMktValOccy(),vo.getMktValOccy());
                BigDecimal mktValDccy = TapStringUtils.addNumber(parentvo.getMktValDccy(),vo.getMktValDccy());
                BigDecimal mktNavRatioOccy = TapStringUtils.div(mktValOccy,marketInvest,8);
                BigDecimal mktNavRatioDccy = TapStringUtils.div(mktValDccy,marketInvest,8);
                parentvo.setMktValOccy(mktValOccy);
                parentvo.setMktValDccy(mktValDccy);
                parentvo.setMktNavRatioOccy(mktNavRatioOccy);
                parentvo.setMktNavRatioDccy(mktNavRatioDccy);

                BigDecimal evlAprctOccy = TapStringUtils.addNumber(parentvo.getEvlAprctOccy(),vo.getEvlAprctOccy());
                BigDecimal evlAprctDccy = TapStringUtils.addNumber(parentvo.getEvlAprctDccy(),vo.getEvlAprctDccy());
                BigDecimal evlAprctNavRatioOccy = TapStringUtils.div(evlAprctOccy,apriInvest,8);
                parentvo.setEvlAprctOccy(evlAprctOccy);
                parentvo.setEvlAprctDccy(evlAprctDccy);
                parentvo.setEvlAprctNavRatioOccy(evlAprctNavRatioOccy);
                tmpmap.put(dealKM,parentvo);
            }else{
                vo.setCoaName(dealKMName);
                vo.setCoaId(dealKM);
                vo.setEvlPrc(null);
                vo.setSecuCd(null);
                vo.setUnitBuyCost(null);
                vo.setExchangeCd(null);
                vo.setEvlAprctCoaId(null);
                logger.info("第一次汇总的上级科目"+dealKM);
                tmpmap.put(dealKM,vo);
            }

            EvalReportVO evo = (EvalReportVO)vo.clone();
            evo.setCoaId(dealKM);
            int step = 1;
            dealEvalDetailSubject(null,evo,tmpmap,accmap,fundInvest,step);//递归调用，直到一级科目退出递归
        }else{
            logger.info("找不到对照科目"+dealKM);
        }
    }


    //递归调用，处理余额表明细科目
    public void dealBalanceDetailSubject(String lasttargetkm ,CourseBalanceVO vo,Map<String,CourseBalanceVO> tmpmap,
                                         Map<String, CourseRelVO> accmap,int startstep)throws Exception{
        String balancekm = vo.getCoaId();
        logger.info("向上汇总余额科目"+balancekm);
        String dealKM  = "";
        String srcKM = "";
        if(lasttargetkm != null){
            //该科目为明细到券的科目,取上级科目作为处理科目
            dealKM = lasttargetkm;
        }else if(accmap.containsKey(balancekm)){
            //该科目为非券科目，可以直接找到科目对照,同样取本方上级科目为处理科目
            CourseRelVO tempvo = accmap.get(balancekm);
            if(!TapStringUtils.isEmpty(tempvo.getTargetCourseAccountCode())){
                dealKM = tempvo.getTargetParentCode();//本级科目的上级科目对照
                srcKM = balancekm;
            }else{
                srcKM = tempvo.getTargetCourseCode();//本级对照科目
                dealKM = tempvo.getTargetParentCode();//本级科目的上级科目对照
            }

            if(lasttargetkm==null && startstep ==0){//处理本级科目
                if(tmpmap.containsKey(srcKM)){
                    CourseBalanceVO srcvo = tmpmap.get(srcKM);
                    logger.info(srcKM+"现在的期初余额原币"+srcvo.getInitBalOccy());
                    BigDecimal initBalOccy = TapStringUtils.addNumber(srcvo.getInitBalOccy(),vo.getInitBalOccy());
                    BigDecimal initBalDccy = TapStringUtils.addNumber(srcvo.getInitBalDccy(),vo.getInitBalDccy());
                    srcvo.setInitBalOccy(initBalOccy);
                    srcvo.setInitBalDccy(initBalDccy);
                    logger.info(srcKM+"叠加后的期初余额原币"+srcvo.getInitBalOccy());

                    logger.info(srcKM+"本期借方发生额原币"+srcvo.getCurrTermDbOccurncOccy());
                    BigDecimal currTermDbOccurncOccy = TapStringUtils.addNumber(srcvo.getCurrTermDbOccurncOccy(),vo.getCurrTermDbOccurncOccy());
                    BigDecimal currTermCrOccurncOccy = TapStringUtils.addNumber(srcvo.getCurrTermCrOccurncOccy(),vo.getCurrTermCrOccurncOccy());
                    BigDecimal currTermDbOccurncDccy = TapStringUtils.addNumber(srcvo.getCurrTermDbOccurncDccy(),vo.getCurrTermDbOccurncDccy());
                    BigDecimal currTermCrOccurncDccy = TapStringUtils.addNumber(srcvo.getCurrTermCrOccurncDccy(),vo.getCurrTermCrOccurncDccy());
                    srcvo.setCurrTermDbOccurncOccy(currTermDbOccurncOccy);
                    srcvo.setCurrTermCrOccurncOccy(currTermCrOccurncOccy);
                    srcvo.setCurrTermDbOccurncDccy(currTermDbOccurncDccy);
                    srcvo.setCurrTermCrOccurncDccy(currTermCrOccurncDccy);
                    logger.info(srcKM+"叠加后的借方发生额原币"+srcvo.getCurrTermDbOccurncOccy());

                    logger.info(srcKM+"累计借方发生额原币"+srcvo.getAggrDbOccurncOccy());
                    BigDecimal aggrDbOccurncOccy = TapStringUtils.addNumber(srcvo.getAggrDbOccurncOccy(),vo.getAggrDbOccurncOccy());
                    BigDecimal aggrCrOccurncOccy = TapStringUtils.addNumber(srcvo.getAggrCrOccurncOccy(),vo.getAggrCrOccurncOccy());
                    BigDecimal aggrDbOccurncDccy = TapStringUtils.addNumber(srcvo.getAggrDbOccurncDccy(),vo.getAggrDbOccurncDccy());
                    BigDecimal aggrCrOccurncDccy = TapStringUtils.addNumber(srcvo.getAggrCrOccurncDccy(),vo.getAggrCrOccurncDccy());
                    srcvo.setAggrDbOccurncOccy(aggrDbOccurncOccy);
                    srcvo.setAggrCrOccurncOccy(aggrCrOccurncOccy);
                    srcvo.setAggrDbOccurncDccy(aggrDbOccurncDccy);
                    srcvo.setAggrCrOccurncDccy(aggrCrOccurncDccy);
                    logger.info(srcKM+"叠加后的累计借方发生额原币"+srcvo.getAggrDbOccurncOccy());

                    logger.info(srcKM+"现在的期末余额原币"+srcvo.getTeminalBalOccy());
                    BigDecimal teminalBalOccy = TapStringUtils.addNumber(srcvo.getTeminalBalOccy(),vo.getTeminalBalOccy());
                    BigDecimal teminalBalDccy =  TapStringUtils.addNumber(srcvo.getTeminalBalDccy(),vo.getTeminalBalDccy());
                    srcvo.setTeminalBalOccy(teminalBalOccy);
                    srcvo.setTeminalBalDccy(teminalBalDccy);
                    logger.info(srcKM+"叠加后的期末余额原币"+srcvo.getInitBalOccy());


                    logger.info(srcKM+"现在的期初数量"+srcvo.getInitQty());
                    BigDecimal initQty = TapStringUtils.addNumber(srcvo.getInitQty(),vo.getInitQty());
                    BigDecimal teminalQty = TapStringUtils.addNumber(srcvo.getTeminalQty(),vo.getTeminalQty());
                    srcvo.setInitQty(initQty);
                    srcvo.setTeminalQty(teminalQty);
                    logger.info(srcKM+"叠加后的期初数量"+srcvo.getInitQty());

                    logger.info(srcKM+"本期借方发生数量"+srcvo.getCurrTermDbOccurQty());
                    BigDecimal currTermDbOccurQty = TapStringUtils.addNumber(srcvo.getCurrTermDbOccurQty(),vo.getCurrTermDbOccurQty());
                    BigDecimal currTermCrOccurQty = TapStringUtils.addNumber(srcvo.getCurrTermCrOccurQty(),vo.getCurrTermCrOccurQty());
                    srcvo.setCurrTermDbOccurQty(currTermDbOccurQty);
                    srcvo.setCurrTermCrOccurQty(currTermCrOccurQty);
                    logger.info(srcKM+"叠加后的本期借方发生数量"+srcvo.getCurrTermDbOccurQty());

                    logger.info(srcKM+"累计借方发生数量"+srcvo.getAggrDbOccurQty());
                    BigDecimal aggrDbOccurQty = TapStringUtils.addNumber(srcvo.getAggrDbOccurQty(),vo.getAggrDbOccurQty());
                    BigDecimal aggrCrOccurQty = TapStringUtils.addNumber(srcvo.getAggrCrOccurQty(),vo.getAggrCrOccurQty());
                    srcvo.setAggrDbOccurncOccy(aggrDbOccurQty);
                    srcvo.setAggrCrOccurncOccy(aggrCrOccurQty);
                    logger.info(srcKM+"叠加后的累计借方发生数量"+srcvo.getAggrDbOccurQty());
                    tmpmap.put(srcKM,srcvo);
                }else{
                    CourseBalanceVO valuevo = (CourseBalanceVO)vo.clone();
                    valuevo.setCoaId(srcKM);
                    tmpmap.put(srcKM,valuevo);
                }
            }
            if(TapStringUtils.isEmpty(dealKM)) return;
        }else{
            //没有科目对照的科目对照
            tmpmap.put(balancekm,vo);
            logger.info("没有余额表科目对照的科目"+balancekm);
            return;
        }
        logger.info("处理余额的上级科目"+dealKM);

        if(accmap.containsKey(dealKM)){//上级科目可以找到对照关系
            CourseRelVO tempvo = accmap.get(dealKM);
            String dealKMName = tempvo.getTargetCourseCodeName();//科目对照关系名称
            logger.info(balancekm+"汇总科目为"+dealKM);


            if(tmpmap.containsKey(dealKM)){
                CourseBalanceVO parentvo = tmpmap.get(dealKM);
                logger.info(dealKM+"现在的期初余额原币"+parentvo.getInitBalOccy());
                BigDecimal initBalOccy = TapStringUtils.addNumber(parentvo.getInitBalOccy(),vo.getInitBalOccy());
                BigDecimal initBalDccy = TapStringUtils.addNumber(parentvo.getInitBalDccy(),vo.getInitBalDccy());
                parentvo.setInitBalOccy(initBalOccy);
                parentvo.setInitBalDccy(initBalDccy);
                logger.info(dealKM+"叠加后的期初余额原币"+parentvo.getInitBalOccy());

                logger.info(dealKM+"本期借方发生额原币"+parentvo.getCurrTermDbOccurncOccy());
                BigDecimal currTermDbOccurncOccy = TapStringUtils.addNumber(parentvo.getCurrTermDbOccurncOccy(),vo.getCurrTermDbOccurncOccy());
                BigDecimal currTermCrOccurncOccy = TapStringUtils.addNumber(parentvo.getCurrTermCrOccurncOccy(),vo.getCurrTermCrOccurncOccy());
                BigDecimal currTermDbOccurncDccy = TapStringUtils.addNumber(parentvo.getCurrTermDbOccurncDccy(),vo.getCurrTermDbOccurncDccy());
                BigDecimal currTermCrOccurncDccy = TapStringUtils.addNumber(parentvo.getCurrTermCrOccurncDccy(),vo.getCurrTermCrOccurncDccy());
                parentvo.setCurrTermDbOccurncOccy(currTermDbOccurncOccy);
                parentvo.setCurrTermCrOccurncOccy(currTermCrOccurncOccy);
                parentvo.setCurrTermDbOccurncDccy(currTermDbOccurncDccy);
                parentvo.setCurrTermCrOccurncDccy(currTermCrOccurncDccy);
                logger.info(dealKM+"叠加后的借方发生额原币"+parentvo.getCurrTermDbOccurncOccy());

                logger.info(dealKM+"累计借方发生额原币"+parentvo.getAggrDbOccurncOccy());
                BigDecimal aggrDbOccurncOccy = TapStringUtils.addNumber(parentvo.getAggrDbOccurncOccy(),vo.getAggrDbOccurncOccy());
                BigDecimal aggrCrOccurncOccy = TapStringUtils.addNumber(parentvo.getAggrCrOccurncOccy(),vo.getAggrCrOccurncOccy());
                BigDecimal aggrDbOccurncDccy = TapStringUtils.addNumber(parentvo.getAggrDbOccurncDccy(),vo.getAggrDbOccurncDccy());
                BigDecimal aggrCrOccurncDccy = TapStringUtils.addNumber(parentvo.getAggrCrOccurncDccy(),vo.getAggrCrOccurncDccy());
                parentvo.setAggrDbOccurncOccy(aggrDbOccurncOccy);
                parentvo.setAggrCrOccurncOccy(aggrCrOccurncOccy);
                parentvo.setAggrDbOccurncDccy(aggrDbOccurncDccy);
                parentvo.setAggrCrOccurncDccy(aggrCrOccurncDccy);
                logger.info(dealKM+"叠加后的累计借方发生额原币"+parentvo.getAggrDbOccurncOccy());

                logger.info(dealKM+"现在的期末余额原币"+parentvo.getTeminalBalOccy());
                BigDecimal teminalBalOccy = TapStringUtils.addNumber(parentvo.getTeminalBalOccy(),vo.getTeminalBalOccy());
                BigDecimal teminalBalDccy =  TapStringUtils.addNumber(parentvo.getTeminalBalDccy(),vo.getTeminalBalDccy());
                parentvo.setTeminalBalOccy(teminalBalOccy);
                parentvo.setTeminalBalDccy(teminalBalDccy);
                logger.info(dealKM+"叠加后的期末余额原币"+parentvo.getTeminalBalOccy());


                logger.info(dealKM+"现在的期初数量"+parentvo.getInitQty());
                BigDecimal initQty = TapStringUtils.addNumber(parentvo.getInitQty(),vo.getInitQty());
                BigDecimal teminalQty = TapStringUtils.addNumber(parentvo.getTeminalQty(),vo.getTeminalQty());
                parentvo.setInitQty(initQty);
                parentvo.setTeminalQty(teminalQty);
                logger.info(dealKM+"叠加后的期初数量"+parentvo.getInitQty());

                logger.info(dealKM+"本期借方发生数量"+parentvo.getCurrTermDbOccurQty());
                BigDecimal currTermDbOccurQty = TapStringUtils.addNumber(parentvo.getCurrTermDbOccurQty(),vo.getCurrTermDbOccurQty());
                BigDecimal currTermCrOccurQty = TapStringUtils.addNumber(parentvo.getCurrTermCrOccurQty(),vo.getCurrTermCrOccurQty());
                parentvo.setCurrTermDbOccurQty(currTermDbOccurQty);
                parentvo.setCurrTermCrOccurQty(currTermCrOccurQty);
                logger.info(dealKM+"叠加后的本期借方发生数量"+parentvo.getCurrTermDbOccurQty());

                logger.info(dealKM+"累计借方发生数量"+parentvo.getAggrDbOccurQty());
                BigDecimal aggrDbOccurQty = TapStringUtils.addNumber(parentvo.getAggrDbOccurQty(),vo.getAggrDbOccurQty());
                BigDecimal aggrCrOccurQty = TapStringUtils.addNumber(parentvo.getAggrCrOccurQty(),vo.getAggrCrOccurQty());
                parentvo.setAggrDbOccurncOccy(aggrDbOccurQty);
                parentvo.setAggrCrOccurncOccy(aggrCrOccurQty);
                logger.info(dealKM+"叠加后的累计借方发生数量"+parentvo.getAggrDbOccurQty());
                tmpmap.put(dealKM,parentvo);
            }else{
                vo.setCoaId(dealKM);
                logger.info("第一次汇总的余额上级科目"+dealKM);
                tmpmap.put(dealKM,vo);
            }

            CourseBalanceVO evo = (CourseBalanceVO)vo.clone();
            evo.setCoaId(dealKM);
            int step = 1;
            dealBalanceDetailSubject(null,evo,tmpmap,accmap,step);//递归调用，直到一级科目退出递归
        }else{
            logger.info("找不到余额对照科目"+dealKM);
        }
    }

    //转换凭证来源
    public String turnVoucherSrcCd(VoucherReportVO vo)throws Exception{
        String returnstr = "";
        String srccd = vo.getVchSrcCd();
        String fzqlb = vo.getSecurityType()==null?"":vo.getSecurityType();
        String vmone = vo.getVchMemo()==null ? "": vo.getVchMemo();
        String mktCode = vo.getMarketCode();

        if(srccd==null){
            returnstr = "00";
        }else if(srccd.equals("DJPX_FHPX") && fzqlb.contains("GP")){
            returnstr = "AGPX";
        }else if(srccd.equals("ZJHH_HB") && vmone.contains("保证金调整")){
            returnstr = "BZJTZ";
        }else if(srccd.equals("RCJT_ZHLX")){
            returnstr = "CKJX";
        }else if(TapStringUtils.oneOf(srccd,"CKTZ_SQ,CKTZ_DQ,CKTZ_ZQ")&& "CK_DQ".equals(fzqlb)){
            returnstr = "DQCK";
        }else if(TapStringUtils.oneOf(srccd,"HGJY_NHG_DQ,HGJY_ZHG_DQ") && fzqlb.contains("HG_ZYS")){
            returnstr = "FBDQ";
        }else if(srccd.equals("JYJS_ZQJS") && fzqlb.contains("LC")){
            returnstr = "FHDZPZ";
        }else if(srccd.equals("RCJT_HGSY")){
            returnstr = "HGJX";
        }else if(srccd.equals("RCJT_ZQLX")){
            returnstr = "HSZQJX";
        }
        else if(srccd.equals("DJPX_FHPX") && fzqlb.contains("JJ")){
            returnstr = "JJPX";
        }else if(TapStringUtils.oneOf(srccd,"HGJY_NHG_DQ,HGJY_ZHG_DQ") && fzqlb.contains("HG_MDS")){
            returnstr = "KFDQ";
        }else if(srccd.equals("ZQZH_ZZG") && TapStringUtils.oneOf(fzqlb,"ZQ_KJHZ,ZQ_SMZQ_KJH")){
            returnstr ="KJHG";
        }else if(srccd.equals("JYJS_ZQJS") && fzqlb.contains("LC")){
            returnstr ="LCFHDZ";
        }else if(srccd.equals("JYJS_ZQJS")){
            returnstr ="XJQS";
        }
        else if(TapStringUtils.oneOf(srccd,"HGJY_NHG_SQ,HGJY_NHG_DQ,HGJY_ZHG_SQ,HGJY_ZHG_DQ")
                && "XCFE".equals(mktCode)){
            returnstr = "YJHG";
        }else if(TapStringUtils.oneOf(srccd,"ZQJY_BUY,ZQJY_SELL,ZQJY_FX,ZQJY_DF")
                && "XCFE".equals(mktCode)){
            returnstr = "YJZQ";
        }else if(srccd.equals("RCJT_YTDT")){
            returnstr = "YTDT";
        }else if(srccd.equals("ZQJY_DF")){
            returnstr = "ZQDF";
        }else if(srccd.equals("RCJT_YTDT")){
            returnstr = "ZQJX";
        }else if(srccd.equals("DJPX_FHPX") && fzqlb.contains("ZQ")){
            returnstr = "ZQPX";
        }else if(srccd.equals("ZQJY_DF")){
            returnstr = "ZQTQDF";
        }else{
            returnstr = "00";
        }
        return returnstr;
    }


    //转换业务类别
    public String turnBinessType(ExchangeClearReportVO vo)throws Exception{
        String returnstr = "";
        String cDtCode = vo.getQsmmbz();
        String cDvTypeSub = vo.getcDvTypeSub();
        String cSecVarMx = vo.getcSecVarMx();
        if("GPJY_BUY".equals(cDtCode) || "GPJY_SELL".equals(cDtCode)){
            returnstr = "AGBS";
        }else if("ZQSP_PG".equals(cDtCode)){
            returnstr = "AGPQ";
        }else if("JJ_KFS_HBX".equals(cSecVarMx) && TapStringUtils.oneOf(cDtCode,"CNSS_SG,CNSS_SH")){
            returnstr = "CNJJ";
        }else if("JJ_KFS_ETF".equals(cSecVarMx) && TapStringUtils.oneOf(cDtCode,"CNSS_SG,CNSS_SH")){
            returnstr = "EFJJ";
        }else if("JJ_KFS_ETF".equals(cSecVarMx) && "CNSS_SGTD".equals(cDtCode)){
            returnstr = "EFTD";
        }else if("HGJY_NHG".equals(cDtCode) && "HG_ZYS".equals(cSecVarMx)){
            if("HGJY_SQ".equals(cDvTypeSub)){
                returnstr = "FBSQ";
            }else if("HGJY_DQ".equals(cDvTypeSub)){
                returnstr = "FBDQ";
            }else{
                returnstr = "00";
            }
        }else if("HGJY_ZHG".equals(cDtCode) && "HG_ZYS".equals(cSecVarMx)){
            if("HGJY_SQ".equals(cDvTypeSub)){
                returnstr = "FBSQ";
            }else if("HGJY_DQ".equals(cDvTypeSub)){
                returnstr = "FBDQ";
            }else{
                returnstr = "00";
            }
        }else if("ZQ_GZXQ".equals(cSecVarMx) && TapStringUtils.oneOf(cDtCode,"ZQJY_BUY,ZQJY_SELL,ZQJY_DF")){
            returnstr = "GZBS";
        }else if("JJ".contains(cSecVarMx) && TapStringUtils.oneOf(cDtCode,"JJJY_BUY,JJJY_SELL")){
            returnstr = "JJBS";
        }else if("ZQZH_ZZG".equals(cDtCode) && TapStringUtils.oneOf(cSecVarMx,"ZQ_KJHZ,ZQ_SMZQ_KJH")){
            returnstr = "KJHG";
        }else if("ZQ_KZZ".equals(cSecVarMx) && TapStringUtils.oneOf(cDtCode,"ZQJY_BUY,ZQJY_SELL,ZQJY_DF")){
            returnstr = "KZBS";
        }else if("ZQZH_ZZG".equals(cDtCode)){
            returnstr = "KZZG";
        }else if("ZQ_QYZ".equals(cSecVarMx) && TapStringUtils.oneOf(cDtCode,"ZQJY_BUY,ZQJY_SELL,ZQJY_DF")){
            returnstr = "QZBS";
        }else if("ZQ_ZCZQH".equals(cSecVarMx)){
            returnstr = "ZZBS";
        }else{
            returnstr = "00";
        }
        return returnstr;
    }
}
