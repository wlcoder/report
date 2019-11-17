package com.yss.newexport.Entity;

import java.math.BigDecimal;

public class CourseBalanceVO implements Cloneable{
    private Integer id;

    private String acctingPeroid;

    private String ptfId;

    private String coaId;

    private String ccyCd;

    private BigDecimal initBalOccy;

    private BigDecimal currTermDbOccurncOccy;

    private BigDecimal currTermCrOccurncOccy;

    private BigDecimal aggrDbOccurncOccy;

    private BigDecimal aggrCrOccurncOccy;

    private BigDecimal teminalBalOccy;

    private BigDecimal initQty;

    private BigDecimal currTermDbOccurQty;

    private BigDecimal currTermCrOccurQty;

    private BigDecimal aggrDbOccurQty;

    private BigDecimal aggrCrOccurQty;

    private BigDecimal teminalQty;

    private BigDecimal initBalDccy;

    private BigDecimal currTermDbOccurncDccy;

    private BigDecimal currTermCrOccurncDccy;

    private BigDecimal aggrDbOccurncDccy;

    private BigDecimal aggrCrOccurncDccy;

    private BigDecimal teminalBalDccy;

    private String assistAcctingCd;

    private String nDetail;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getAcctingPeroid() {
        return acctingPeroid;
    }

    public void setAcctingPeroid(String acctingPeroid) {
        this.acctingPeroid = acctingPeroid;
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

    public BigDecimal getInitBalOccy() {
        return initBalOccy;
    }

    public void setInitBalOccy(BigDecimal initBalOccy) {
        this.initBalOccy = initBalOccy;
    }

    public BigDecimal getAggrDbOccurncOccy() {
        return aggrDbOccurncOccy;
    }

    public void setAggrDbOccurncOccy(BigDecimal aggrDbOccurncOccy) {
        this.aggrDbOccurncOccy = aggrDbOccurncOccy;
    }

    public BigDecimal getAggrCrOccurncOccy() {
        return aggrCrOccurncOccy;
    }

    public void setAggrCrOccurncOccy(BigDecimal aggrCrOccurncOccy) {
        this.aggrCrOccurncOccy = aggrCrOccurncOccy;
    }

    public BigDecimal getTeminalBalOccy() {
        return teminalBalOccy;
    }

    public void setTeminalBalOccy(BigDecimal teminalBalOccy) {
        this.teminalBalOccy = teminalBalOccy;
    }

    public BigDecimal getInitQty() {
        return initQty;
    }

    public void setInitQty(BigDecimal initQty) {
        this.initQty = initQty;
    }


    public BigDecimal getAggrDbOccurQty() {
        return aggrDbOccurQty;
    }

    public void setAggrDbOccurQty(BigDecimal aggrDbOccurQty) {
        this.aggrDbOccurQty = aggrDbOccurQty;
    }

    public BigDecimal getAggrCrOccurQty() {
        return aggrCrOccurQty;
    }

    public void setAggrCrOccurQty(BigDecimal aggrCrOccurQty) {
        this.aggrCrOccurQty = aggrCrOccurQty;
    }

    public BigDecimal getTeminalQty() {
        return teminalQty;
    }

    public void setTeminalQty(BigDecimal teminalQty) {
        this.teminalQty = teminalQty;
    }

    public BigDecimal getInitBalDccy() {
        return initBalDccy;
    }

    public void setInitBalDccy(BigDecimal initBalDccy) {
        this.initBalDccy = initBalDccy;
    }


    public BigDecimal getAggrDbOccurncDccy() {
        return aggrDbOccurncDccy;
    }

    public void setAggrDbOccurncDccy(BigDecimal aggrDbOccurncDccy) {
        this.aggrDbOccurncDccy = aggrDbOccurncDccy;
    }

    public BigDecimal getAggrCrOccurncDccy() {
        return aggrCrOccurncDccy;
    }

    public void setAggrCrOccurncDccy(BigDecimal aggrCrOccurncDccy) {
        this.aggrCrOccurncDccy = aggrCrOccurncDccy;
    }

    public BigDecimal getTeminalBalDccy() {
        return teminalBalDccy;
    }

    public void setTeminalBalDccy(BigDecimal teminalBalDccy) {
        this.teminalBalDccy = teminalBalDccy;
    }

    public String getAssistAcctingCd() {
        return assistAcctingCd;
    }

    public void setAssistAcctingCd(String assistAcctingCd) {
        this.assistAcctingCd = assistAcctingCd;
    }

    public BigDecimal getCurrTermDbOccurncOccy() {
        return currTermDbOccurncOccy;
    }

    public void setCurrTermDbOccurncOccy(BigDecimal currTermDbOccurncOccy) {
        this.currTermDbOccurncOccy = currTermDbOccurncOccy;
    }

    public BigDecimal getCurrTermCrOccurncOccy() {
        return currTermCrOccurncOccy;
    }

    public void setCurrTermCrOccurncOccy(BigDecimal currTermCrOccurncOccy) {
        this.currTermCrOccurncOccy = currTermCrOccurncOccy;
    }

    public BigDecimal getCurrTermDbOccurQty() {
        return currTermDbOccurQty;
    }

    public void setCurrTermDbOccurQty(BigDecimal currTermDbOccurQty) {
        this.currTermDbOccurQty = currTermDbOccurQty;
    }

    public BigDecimal getCurrTermCrOccurQty() {
        return currTermCrOccurQty;
    }

    public void setCurrTermCrOccurQty(BigDecimal currTermCrOccurQty) {
        this.currTermCrOccurQty = currTermCrOccurQty;
    }

    public BigDecimal getCurrTermDbOccurncDccy() {
        return currTermDbOccurncDccy;
    }

    public void setCurrTermDbOccurncDccy(BigDecimal currTermDbOccurncDccy) {
        this.currTermDbOccurncDccy = currTermDbOccurncDccy;
    }

    public BigDecimal getCurrTermCrOccurncDccy() {
        return currTermCrOccurncDccy;
    }

    public void setCurrTermCrOccurncDccy(BigDecimal currTermCrOccurncDccy) {
        this.currTermCrOccurncDccy = currTermCrOccurncDccy;
    }

    public String getnDetail() {
        return nDetail;
    }

    public void setnDetail(String nDetail) {
        this.nDetail = nDetail;
    }

    @Override
    public Object clone() throws CloneNotSupportedException {
        CourseBalanceVO cloneeval = null;
        try{
            cloneeval = (CourseBalanceVO)super.clone();
        }catch(CloneNotSupportedException e) {
            e.printStackTrace();
        }
        return cloneeval;
    }
}
