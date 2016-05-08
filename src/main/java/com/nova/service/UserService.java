package com.nova.service;

import com.nova.model.User;

import java.util.List;

/**
 * Created by Go on 2016/1/29.
 */
public interface UserService {

    int add(User user);
    int deleteById(int id);
    int update(User user);
    User getById(int id);
    List<User> getAll();
}
