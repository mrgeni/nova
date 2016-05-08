package com.nova.service;

import com.nova.mapping.BlogMapper;
import com.nova.model.Blog;
import com.nova.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Go on 2016/1/31.
 */
@Service
public class BlogServiceImpl implements BlogService {
    @Autowired
    private BlogMapper blogMapper;

    public int addBlog(Blog blog) {
        return this.blogMapper.addBlog(blog);
    }

    public int deleteBlogById(int id) {
        return this.blogMapper.deleteBlogById(id);
    }

    public int updateblog(Blog blog) {
        return this.blogMapper.updateblog(blog);
    }

    public List<Blog> getBlogByUser(User user) {
        return this.blogMapper.getBlogByUser(user);
    }

    public List<Blog> getALLBlog() {
        return this.blogMapper.getALLBlog();
    }
}
