package com.nova.service;

import com.nova.mapping.DishTypeMapper;
import com.nova.model.DishType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Go on 2016/8/21.
 */
@Service
public class DishTypeServiceImpl implements DishTypeService {
    @Autowired
    private DishTypeMapper dishTypeMapper;

    public List<DishType> getDishtype() {
        return this.dishTypeMapper.getDishtype();
    }

    public int updateDishtype(String type, int id) {
        return this.dishTypeMapper.updateDishtype(type, id);
    }

    public int updateExchangetype(int id_0, int id_1) {
        return this.dishTypeMapper.updateExchangetype(id_0, id_1);
    }

    public int insertNewtype(DishType dishType) {
        this.dishTypeMapper.insertNewtype(dishType);
        return dishType.getId();
    }

    public int deleteDishtype(int id) {
        return this.dishTypeMapper.deleteDishtype(id);
    }
}
