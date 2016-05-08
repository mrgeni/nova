package com.nova.mapping;

import com.nova.model.User;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by Go on 2016/1/28.
 *
 */
@Repository
public interface UserMapper {

    @Insert("insert into user(username,password,name,nic,sex,age,email,phone,selfshow,auth) values( #{username},#{password},#{name},#{nic},#{sex},#{age},#{email},#{phone},#{selfshow},#{auth})")
    int add(User user);

    @Delete("delete from user where id=#{id}")
    int deleteById(int id);

    @Update("update user set username=#{username},password=#{password},name=#{name},nic=#{nic},sex=#{sex},auth=#{auth} where id=#{id}")
    int update(User user);

    @Select("select * from user where id=#{id}")
    User getById(int id);

    @Select("select * from user")
    List<User> getAll();
}
