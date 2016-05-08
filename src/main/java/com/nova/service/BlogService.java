package com.nova.service;

import com.nova.model.Blog;
import com.nova.model.User;

import java.util.List;

/**
 * Created by Go on 2016/1/31.
 */
public interface BlogService {
    int addBlog(Blog blog);
    int deleteBlogById(int id);
    int updateblog(Blog blog);
    List<Blog> getBlogByUser(User user);
    List<Blog> getALLBlog();
}
