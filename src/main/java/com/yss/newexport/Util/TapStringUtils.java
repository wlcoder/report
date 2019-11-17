package com.yss.newexport.Util;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Collection;
import java.util.Date;
import java.util.GregorianCalendar;

public class TapStringUtils {

    private TapStringUtils(){};

    public static String formatDate(Date dDate) {
        return (new SimpleDateFormat(YssCons.YSS_DATEFORMAT)).format(dDate);
    }

    public static String  formatStrToNumStringDateformat( String sDate) throws Exception {
        String sRetu;
        String sErr = "日期字符格式不正确！";
        if (sDate.length() != 8) {
            throw new Exception(sErr);
        }
        sRetu = TapStringUtils.left(sDate,4) + "-" + TapStringUtils.mid(sDate , 4, 2) + "-" + TapStringUtils.right(sDate , 2) ;
        if (! isDate(sRetu)){
            throw new Exception(sErr);
        }
        return sRetu;
    }

    //字符串类函数********************************************************************
    /**java可以实现left,right,mid，可是如果超过长度，会报错，这里提供容错版本*/
    public static final String left(String sSrc,int iLen) {
        if (iLen>=sSrc.length())
            return sSrc;
        return sSrc.substring(0,iLen);
    }
    public static final String right(String sSrc,int iLen) {
        if (iLen>=sSrc.length())
            return sSrc;
        return sSrc.substring(sSrc.length()-iLen);
    }
    public static final String mid(String sSrc,int iStart,int iLen) {
        if (iStart+iLen>=sSrc.length() )
            return sSrc.substring(iStart);
        return sSrc.substring(iStart,iStart+iLen);
    }
    public static final String mid(String sSrc,int iStart) {
        return sSrc.substring(iStart);
    }


    /**是否可以转换成日期，仅解析用/-.间隔的日期
     * dDate用于返回日期，改写dDate中已经存在的日期
     */
    public static boolean isDate(String sDate, Date dDate) {
        long ltmp;
        try {
            ltmp = toDate(sDate).getTime();

            if (dDate != null)
                dDate.setTime(ltmp);
            return true;
        }
        catch (Exception ye) {
            return false;
        }
    }

    public static final boolean isDate(String sDate) {
        return isDate(sDate, null);
    }


    /**类似vb的CDate函数，自动分析sDate，如格式正常，返回日期，否则报错。
     * 注意这里只能处理单纯日期，不处理时间，年份正常范围在0-99和1000－9999
     *仅解析用/-.间隔的日期
     */
    public static Date toDate(String sDate) throws Exception {
        int jj;
        char ss, cc;
        String[] sss = {
                "-", "/", "."};
        String[] result;
        int kk, mm;
        final String emsg = "非法日期格式！";

        GregorianCalendar cl = null;

        //检查分隔符
        for (jj = 0; jj < sss.length; jj++) {
            if (sDate.indexOf(sss[jj]) >= 0)
                break;
        }
        if (jj >= sss.length)
            throw new Exception(emsg + ";jj:" + jj + "sss.length:"+ sss.length);

        ss = sss[jj].charAt(0);
        //检查数字有效性即除了数字和分隔符，不应该再包括其它字符
        for (int i = 0; i < sDate.length(); i++) {
            cc = sDate.charAt(i);
            if (cc != ss && (cc < '0' || cc > '9'))
                throw new Exception(emsg + sDate + "cc:" + cc + ";ss:" + ss);
        }

        //劈开，获取3个数字
        result = sDate.split(sss[jj], -1); //检查全部，包括空的元素，用0会忽略空
        if (result.length != 3)
            throw new Exception(emsg + "sDate:" + sDate + ";result.length:" + result.length);
        jj = Integer.parseInt(result[0]);
        kk = Integer.parseInt(result[1]);
        mm = Integer.parseInt(result[2]);

        //判断是否符合一种日期格式
        //1、y/M/d格式
        if (isValidDate(jj, kk, mm))
            cl = new GregorianCalendar(jj < 30 ? jj + 2000 :
                    (jj <= 99 ? jj + 1900 : jj), kk - 1, mm);
        else {
            if (mm < 30)
                mm += 2000;
            else if (mm <= 99)
                mm += 1900;
            //2、M/d/y格式
            if (isValidDate(mm, jj, kk))
                cl = new GregorianCalendar(mm, jj - 1, kk);
                //3、d/M/y格式
            else if (isValidDate(mm, kk, jj))
                cl = new GregorianCalendar(mm, kk - 1, jj);
            else
                throw new Exception(emsg + ";" + sDate + ";" + mm + ";" + jj + ";" + kk);
        }
        return cl.getTime();
    }

    /**判断年月日是否在正常范围
     * 年份正常范围在0-99和1000－9999
     */
    public static boolean isValidDate(int year, int month, int day) {
        GregorianCalendar cl;

        if (year < 0 || (year > 99 && (year < 1000 || year > 9999)))
            return false;
        if (year < 30)
            year += 2000;
        else if (year <= 99)
            year += 1900;

        if (month < 1 || month > 12)
            return false;

        cl = new GregorianCalendar(year, month - 1, 1); //参数月份从0开始所以减一
        if (day < cl.getActualMinimum(Calendar.DAY_OF_MONTH) ||
                day > cl.getActualMaximum(Calendar.DAY_OF_MONTH))
            return false;

        return true;
    }



    public static String getTargetObjectMethod(String headName){
        String str="";
        StringBuffer strBuf = new StringBuffer();
        String[] sourcearr = headName.split("_");
        strBuf.append("get");
        for (String string : sourcearr) {
            String upperStr = string.substring(0, 1).toUpperCase() + string.substring(1).toLowerCase();
            strBuf.append(upperStr);
        }
        str = new String(strBuf);
        return str;
    }

    public static BigDecimal addNumber(BigDecimal num1, BigDecimal num2) {
        BigDecimal num;
        if (null != num1 || null != num2) {
            num = num1.add(num2);
        } else {
            num = null;
        }
        return num;
    }


    /**
     * 精确计算BigDecimal除法
     * @param v1
     * @param v2
     * @param scale
     * @return
     * */
    public static final BigDecimal div(BigDecimal v1, BigDecimal v2, int scale) {
        if (scale < 0) {
            scale = 0;
        }
        if (v1 == null || v2 == null || v2.compareTo(new BigDecimal("0")) == 0) {
            return new BigDecimal((Double.toString(0)));
        }
        return v1.divide(v2, scale, BigDecimal.ROUND_HALF_UP);
    }


    public static boolean oneOf(String str, String arys){
        return oneOf(str, arys.split(","));
    }


    public static boolean oneOf(String str, String[] ary){
        if (str==null) return false;
        for (int i = 0; i < ary.length; i++){
            if (str.indexOf(ary[i]) > -1)
                return true;
        }
        return false;
    }

    public static boolean isEmpty(Object obj){
        if(obj==null){
            return true;
        }else if(obj instanceof String && ((String)obj).trim().length()==0){
            return true;
        }else if(obj instanceof Collection<?> && ((((Collection<?>)obj).size() == 1 &&
                ((Collection<?>)obj).contains(null)) || ((Collection<?>)obj).size() ==0)){
            return true;
        }else {
            return false;
        }

    }

}
