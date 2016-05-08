package com.nova.mapping;

import com.nova.model.Manager;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

/**
 * Created by Go on 2016/3/23.
 */
@Repository
public interface ManagerMapper {

    @Select("select count(*) from manager where username=#{username} and password=#{password} limit 1")
   int hasManager(Manager manager);
}
