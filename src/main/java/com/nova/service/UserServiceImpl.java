package com.nova.service;

import com.nova.mapping.UserMapper;
import com.nova.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Go on 2016/1/29.
 */
@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserMapper userMapper;

    public int add(User user) {
        return this.userMapper.add(user);
    }

    public int deleteById(int id) {
        return this.userMapper.deleteById(id);
    }

    public int update(User user) {
        return this.userMapper.update(user);
    }

    public User getById(int id) {
        return this.userMapper.getById(id);
    }

    public List<User> getAll() {
        return this.userMapper.getAll();
    }


}
