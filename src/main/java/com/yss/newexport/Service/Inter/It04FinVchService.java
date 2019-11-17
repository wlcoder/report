package com.yss.newexport.Service.Inter;

import com.yss.newexport.Entity.T04FinVchVO;

import java.util.List;

public interface It04FinVchService {
    List<T04FinVchVO> queryT04FinVch(String billDt);

    void updateT04FinVch(List<T04FinVchVO> t04FinVchVO);

    void delT04FinVch(List<Integer> ids);
}
