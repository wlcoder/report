package com.yss.newexport.Entity;

import java.io.Serializable;
import java.math.BigDecimal;

public class EvalReportVO implements Cloneable {
    private Integer id;

    private String evlDt;

    private String ptfId;

    private String coaId;

    private String ccyCd;

    private String coaName;

    private String secuCd;

    private String exchangeCd;

    private BigDecimal secuQty;

    private BigDecimal unitBuyCost;

    private BigDecimal costOccy;

    private BigDecimal costDccy;

    private BigDecimal costNavRatioOccy;

    private BigDecimal costNavRatioDccy;

    private BigDecimal evlPrc;

    private String mktEvlMethodCd;

    private BigDecimal mktValOccy;

    private BigDecimal mktValDccy;

    private BigDecimal mktNavRatioOccy;

    private BigDecimal mktNavRatioDccy;

    private BigDecimal evlAprctOccy;

    private BigDecimal evlAprctDccy;

    private BigDecimal evlAprctNavRatioOccy;

    private String evlAprctCoaId;

    private BigDecimal baseExRate;

    private BigDecimal ptfExRate;

    private BigDecimal convertProfitLoss;

    private String rightsInfo;

    private String mktDesc;

    private String originSecuCd;

    private String isSumUnit;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getEvlDt() {
        return evlDt;
    }

    public void setEvlDt(String evlDt) {
        this.evlDt = evlDt;
    }

    public String getPtfId() {
        return ptfId;
    }

    public void setPtfId(String ptfId) {
        this.ptfId = ptfId;
    }

    public String getCoaId() {
        return coaId;
    }

    public void setCoaId(String coaId) {
        this.coaId = coaId;
    }

    public String getCcyCd() {
        return ccyCd;
    }

    public void setCcyCd(String ccyCd) {
        this.ccyCd = ccyCd;
    }

    public String getCoaName() {
        return coaName;
    }

    public void setCoaName(String coaName) {
        this.coaName = coaName;
    }

    public String getSecuCd() {
        return secuCd;
    }

    public void setSecuCd(String secuCd) {
        this.secuCd = secuCd;
    }

    public String getExchangeCd() {
        return exchangeCd;
    }

    public void setExchangeCd(String exchangeCd) {
        this.exchangeCd = exchangeCd;
    }

    public BigDecimal getSecuQty() {
        return secuQty;
    }

    public void setSecuQty(BigDecimal secuQty) {
        this.secuQty = secuQty;
    }

    public BigDecimal getUnitBuyCost() {
        return unitBuyCost;
    }

    public void setUnitBuyCost(BigDecimal unitBuyCost) {
        this.unitBuyCost = unitBuyCost;
    }

    public BigDecimal getCostOccy() {
        return costOccy;
    }

    public void setCostOccy(BigDecimal costOccy) {
        this.costOccy = costOccy;
    }

    public BigDecimal getCostDccy() {
        return costDccy;
    }

    public void setCostDccy(BigDecimal costDccy) {
        this.costDccy = costDccy;
    }

    public BigDecimal getCostNavRatioOccy() {
        return costNavRatioOccy;
    }

    public void setCostNavRatioOccy(BigDecimal costNavRatioOccy) {
        this.costNavRatioOccy = costNavRatioOccy;
    }

    public BigDecimal getCostNavRatioDccy() {
        return costNavRatioDccy;
    }

    public void setCostNavRatioDccy(BigDecimal costNavRatioDccy) {
        this.costNavRatioDccy = costNavRatioDccy;
    }

    public BigDecimal getEvlPrc() {
        return evlPrc;
    }

    public void setEvlPrc(BigDecimal evlPrc) {
        this.evlPrc = evlPrc;
    }

    public String getMktEvlMethodCd() {
        return mktEvlMethodCd;
    }

    public void setMktEvlMethodCd(String mktEvlMethodCd) {
        this.mktEvlMethodCd = mktEvlMethodCd;
    }

    public BigDecimal getMktValOccy() {
        return mktValOccy;
    }

    public void setMktValOccy(BigDecimal mktValOccy) {
        this.mktValOccy = mktValOccy;
    }

    public BigDecimal getMktValDccy() {
        return mktValDccy;
    }

    public void setMktValDccy(BigDecimal mktValDccy) {
        this.mktValDccy = mktValDccy;
    }

    public BigDecimal getMktNavRatioOccy() {
        return mktNavRatioOccy;
    }

    public void setMktNavRatioOccy(BigDecimal mktNavRatioOccy) {
        this.mktNavRatioOccy = mktNavRatioOccy;
    }

    public BigDecimal getMktNavRatioDccy() {
        return mktNavRatioDccy;
    }

    public void setMktNavRatioDccy(BigDecimal mktNavRatioDccy) {
        this.mktNavRatioDccy = mktNavRatioDccy;
    }

    public BigDecimal getEvlAprctOccy() {
        return evlAprctOccy;
    }

    public void setEvlAprctOccy(BigDecimal evlAprctOccy) {
        this.evlAprctOccy = evlAprctOccy;
    }

    public BigDecimal getEvlAprctDccy() {
        return evlAprctDccy;
    }

    public void setEvlAprctDccy(BigDecimal evlAprctDccy) {
        this.evlAprctDccy = evlAprctDccy;
    }

    public BigDecimal getEvlAprctNavRatioOccy() {
        return evlAprctNavRatioOccy;
    }

    public void setEvlAprctNavRatioOccy(BigDecimal evlAprctNavRatioOccy) {
        this.evlAprctNavRatioOccy = evlAprctNavRatioOccy;
    }

    public String getEvlAprctCoaId() {
        return evlAprctCoaId;
    }

    public void setEvlAprctCoaId(String evlAprctCoaId) {
        this.evlAprctCoaId = evlAprctCoaId;
    }

    public BigDecimal getBaseExRate() {
        return baseExRate;
    }

    public void setBaseExRate(BigDecimal baseExRate) {
        this.baseExRate = baseExRate;
    }

    public BigDecimal getPtfExRate() {
        return ptfExRate;
    }

    public void setPtfExRate(BigDecimal ptfExRate) {
        this.ptfExRate = ptfExRate;
    }

    public BigDecimal getConvertProfitLoss() {
        return convertProfitLoss;
    }

    public void setConvertProfitLoss(BigDecimal convertProfitLoss) {
        this.convertProfitLoss = convertProfitLoss;
    }

    public String getRightsInfo() {
        return rightsInfo;
    }

    public void setRightsInfo(String rightsInfo) {
        this.rightsInfo = rightsInfo;
    }

    public String getMktDesc() {
        return mktDesc;
    }

    public void setMktDesc(String mktDesc) {
        this.mktDesc = mktDesc;
    }

    public String getIsSumUnit() {
        return isSumUnit;
    }

    public void setIsSumUnit(String isSumUnit) {
        this.isSumUnit = isSumUnit;
    }

    public String getOriginSecuCd() {
        return originSecuCd;
    }

    public void setOriginSecuCd(String originSecuCd) {
        this.originSecuCd = originSecuCd;
    }

    @Override
    public Object clone() throws CloneNotSupportedException {
        EvalReportVO cloneeval = null;
        try{
            cloneeval = (EvalReportVO)super.clone();
        }catch(CloneNotSupportedException e) {
            e.printStackTrace();
        }
        return cloneeval;
    }
}
