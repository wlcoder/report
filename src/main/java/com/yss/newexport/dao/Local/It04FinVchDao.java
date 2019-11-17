package com.yss.newexport.dao.Local;

import com.yss.newexport.Entity.T04FinVchVO;

import java.util.List;

public interface It04FinVchDao {
    List<T04FinVchVO> queryT04FinVch(String billDt);

    void updateT04FinVch(List<T04FinVchVO> t04FinVchVO);

    void delT04FinVch(List<Integer> ids);
}
