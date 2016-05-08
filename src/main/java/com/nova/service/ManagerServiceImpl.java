package com.nova.service;

import com.nova.mapping.ManagerMapper;
import com.nova.model.Manager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by Go on 2016/3/24.
 */
@Service
public class ManagerServiceImpl implements ManagerService{
    @Autowired
    private ManagerMapper managerMapper;

    public int hasManager(Manager manager) {
        return this.managerMapper.hasManager(manager);
    }


}
