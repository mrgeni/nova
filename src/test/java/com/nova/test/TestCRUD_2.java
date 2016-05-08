package com.nova.test;

import com.nova.model.Blog;
import com.nova.model.User;
import com.nova.service.BlogService;
import com.nova.service.UserService;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.List;

/**
 * Created by Go on 2016/1/29.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("file:src/main/webapp/WEB-INF/springmvc-servlet.xml")

public class TestCRUD_2 {

    @Autowired
    private UserService userService;
    @Autowired
    private BlogService blogService;

    @Test
    public void getUserTest() {
        User user = userService.getById(1);
        System.out.println(user);
        Assert.assertNotNull(user);
    }

    @Test
    public void getAll() {
        List<User> Users = userService.getAll();
        System.out.println(Users);
        Assert.assertNotNull(Users);
    }

    @Test
    public void addBlog() {
        Blog blog=new Blog() ;

        blog.setTitle("YES");
        blog.setContent("!!!");
        blog.setUserid(3);
        int i=blogService.addBlog(blog);
        System.out.println(i);
        Assert.assertNotNull(i);

    }

    @Test
    public void getBlogByUser()
    {
        User user=userService.getById(1);
        List<Blog> Blogs=blogService.getBlogByUser(user);
        System.out.println(Blogs);
    }
}
