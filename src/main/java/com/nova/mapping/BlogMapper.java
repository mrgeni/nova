package com.nova.mapping;

import com.nova.model.Blog;
import com.nova.model.User;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by Go on 2016/1/31.
 *
 */
@Repository
public interface BlogMapper {
    @Insert("insert into blog(title,content,userid) values( #{title},#{content},#{userid})")
    int addBlog(Blog blog);

    @Delete("delete from blog where id=#{id}")
    int deleteBlogById(int id);

    @Update("update blog set title=#{title},content=#{content} where id=#{id}")
    int updateblog(Blog blog);

    @Select("select * from blog where userid=#{id} ")
    List<Blog> getBlogByUser(User user);

    @Select("select * from blog")
    List<Blog> getALLBlog();
}
