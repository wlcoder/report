package com.yss.newexport.Service.Impl;

import com.yss.newexport.Entity.*;
import com.yss.newexport.Service.Inter.IqueryFileService;
import com.yss.newexport.Util.TapStringUtils;
import com.yss.newexport.dao.Local.IqueryFileDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.*;
import java.lang.reflect.Method;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class QueryFileServiceImpl implements IqueryFileService {

    @Autowired
    private IqueryFileDao fileDao;


    @Override
    public List<String> findFieldInfo(String tableName) throws Exception {
        return fileDao.findFieldByTableName(tableName);
    }


    @Override
    public List<?> queryContent(QueryConVO con) throws Exception{
        String fileType = con.getFileType();
        if(fileType==null){
            throw new Exception("导出单个文件，请指定文件类型");
        }else if(fileType.equals("T04_FIN_VCH")){
            List<VoucherReportVO> litlist =  fileDao.queryVoucherInfoByCon(con);
            return litlist;
        }else if(fileType.equals("T04_FIN_EVL")){
            List<EvalReportVO> litlist =  fileDao.queryEvalInfoByCon(con);
            return litlist;
        }else if(fileType.equals("T04_COA")){
            List<CourseCodeReportVO> litlist = fileDao.queryCourseCodeByCon(con);
            return litlist;
        }else if(fileType.equals("T04_COA_GL_BAL")){
            List<CourseBalanceVO> litlist = fileDao.queryCourseBalanceByCon(con);
            return litlist;
        }else if(fileType.equals("T05_BANK_DEP_TXN")){
            List<BankDepositReportVO> litlist = fileDao.queryBankDepositByCon(con);
            return litlist;
        }else if(fileType.equals("EVLJJ")){
            List<FundBusinessReportVO> litlist = fileDao.queryFundBusinessByCon(con);
            return litlist;
        }else if(fileType.equals("YHJHG")){
            List<BankRepoReportVO> litlist = fileDao.queryBankRepoByCon(con);
            return litlist;
        }else if (fileType.equals("YHJZQ")){
            List<BankSecurityReportVO> litlist = fileDao.queryBankSecurityByCon(con);
            return litlist;
        }else if(fileType.equals("JYSQS")){
            List<ExchangeClearReportVO> litlist = fileDao.queryExchangeClearByCon(con);
            return litlist;
        }else{
            List<InvestReportVO> litlist = fileDao.queryInvestInfoByCon(con);
            return litlist;
        }
    }




    //导出.csv文件
    public String makeFileToTargetPath(List<String> headlist,String filepath,
                                     List<?> datalist,String fileType,String fileDate)throws Exception{
        BufferedWriter csvWtriter = null;
        String fileName = fileType+".csv";
        List<List<Object>> fileDataList = new ArrayList<>();//最终文件数据
        List<Object> rowList = null;//拼装每一行数据
        List<Object> headlistInfo = new ArrayList<>();
        try{
               String targetfiledate = TapStringUtils.left(fileDate,4) + TapStringUtils.mid(fileDate , 5, 2) + TapStringUtils.right(fileDate , 2) ;
               String filetargetpath = filepath+File.separator+targetfiledate;
               File dirpath = new File(filetargetpath);
               if(!dirpath.exists()){//拼上日期文件夹路径，是否存在，不存在则创建
                   dirpath.mkdirs();
               }

               //报表头除去一些信息
               for(String str:headlist){
                   if(str.toUpperCase().equals("ID") ||
                           str.toUpperCase().equals("IS_SUM_UNIT")){
                       continue;
                   }else{
                       headlistInfo.add(str);
                   }
               }

               File csvFile = new File(filetargetpath+File.separator+fileName);
               csvFile.createNewFile();//创建一个文件
               csvWtriter  = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(csvFile), "UTF-8"), 1024);
               for(Object obj : datalist){
                   rowList = new ArrayList<>();
                   Class tarclass = obj.getClass();
                   Method[] ms = tarclass.getMethods();
                   for(Object headname:headlistInfo){
                       String methodname = TapStringUtils.getTargetObjectMethod(headname.toString());
                       for(int i=0;i<ms.length;i++){
                           if (ms[i].getName().equals(methodname) && ! ms[i].getName().equals("getId")){
                               Object con = new BigDecimal(0).equals(ms[i].invoke(obj)) ? null : ms[i].invoke(obj);
                               if(con==null){
                                   con = " ";
                               }
                               rowList.add(con);
                           }
                       }
                   }
                   fileDataList.add(rowList);
               }
               //写入头部文件
               writeRow(headlistInfo,csvWtriter);

               //写入文件内容
               for(List<Object> row :fileDataList){
                   writeRow(row, csvWtriter);
               }
               csvWtriter.flush();
               return fileType+"文件生成成功";
          }catch(Exception e){
             throw new Exception("生成文件出错:"+e.getMessage());
          }finally {
               csvWtriter.close();
          }
    }

    private static void writeRow(List<Object> row, BufferedWriter csvWriter) throws IOException {
        for (int i=0;i< row.size();i++) {
            StringBuffer sb = new StringBuffer();
            String rowStr = "";
            if(i == row.size()-1){
                rowStr = sb.append("\"").append(row.get(i)).append("\"").toString();
            }else{
                rowStr = sb.append("\"").append(row.get(i)).append("\",").toString();
            }
            csvWriter.write(rowStr);
        }
        csvWriter.newLine();
    }
}
