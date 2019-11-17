package com.yss.newexport.DataSource;

import javax.sql.DataSource;

import com.yss.newexport.Entity.DatabaseVO;
import com.yss.newexport.Util.SpringContextUtils;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.SqlSessionTemplate;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;



@Configuration
@MapperScan(basePackages = "com.yss.newexport.dao.Remote", sqlSessionTemplateRef  = "remoteSqlSessionTemplate")
public class RemoteDataSourceConfig {

    @Autowired
    private DataConfigInfo dinfo;


    @Bean(name = "remoteDataSource")
    public DataSource remoteDataSource() {
        DatabaseVO nvo = dinfo.bean();
        String tarurl = "jdbc:oracle:thin:@"+nvo.getIp()+":"+nvo.getPort()+"/"+nvo.getInstanceName();
        DataSourceBuilder build =  DataSourceBuilder.create();
        build.url(tarurl);
        build.username(nvo.getUserName());
        build.password(nvo.getPassWord());
        return build.build();
    }
	

    @Bean(name = "remoteSqlSessionFactory")
    public SqlSessionFactory remoteSqlSessionFactory(@Qualifier("remoteDataSource") DataSource dataSource) throws Exception {
        SqlSessionFactoryBean bean = new SqlSessionFactoryBean();
        bean.setDataSource(dataSource);
        bean.setMapperLocations(new PathMatchingResourcePatternResolver().getResources("classpath:mapper/*.xml"));
        return bean.getObject();
    }
    

    @Bean(name = "remoteTransactionManager")
    public DataSourceTransactionManager remoteTransactionManager(@Qualifier("remoteDataSource") DataSource dataSource) {
        return new DataSourceTransactionManager(dataSource);
    }

    @Bean(name = "remoteSqlSessionTemplate")
    public SqlSessionTemplate remoteSqlSessionTemplate(@Qualifier("remoteSqlSessionFactory") SqlSessionFactory sqlSessionFactory){
        return new SqlSessionTemplate(sqlSessionFactory);
    }
}
