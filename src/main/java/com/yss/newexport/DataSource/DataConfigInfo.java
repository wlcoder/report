package com.yss.newexport.DataSource;

import com.yss.newexport.Entity.DatabaseVO;
import com.yss.newexport.Service.Inter.IdatabaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.annotation.PostConstruct;
import java.util.List;

@Configuration
public class DataConfigInfo {

    @Autowired
    private IdatabaseService datab;
    private DatabaseVO dbvo = new DatabaseVO();

    @PostConstruct
    public void init() {
        List<DatabaseVO> dblist = datab.queryDatabase();
        for(DatabaseVO vo : dblist){
            dbvo.setInstanceName(vo.getInstanceName());
            dbvo.setIp(vo.getIp());
            dbvo.setPort(vo.getPort());
            dbvo.setUserName(vo.getUserName());
            dbvo.setPassWord(vo.getPassWord());
        }
    }

    @Bean(name = "buildBean")
    public DatabaseVO bean() {
        return dbvo;
    }

}
