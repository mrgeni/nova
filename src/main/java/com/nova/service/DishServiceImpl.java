package com.nova.service;

import com.nova.mapping.DishMapper;
import com.nova.model.Dish;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Go on 2016/3/20.
 */

@Service
public class DishServiceImpl implements DishService {
    @Autowired
    private DishMapper dishMapper;

    public List<Dish> getMenu() {
        return this.dishMapper.getMenu();
    }

    public int updateRecommended(String recommended, int id) {
        return this.dishMapper.updateRecommended(recommended, id);
    }

    public int updateDishname(String dishname, int id) {
        return this.dishMapper.updateDishname(dishname, id);
    }

    public int updatePrice(float price, int id) {
        return this.dishMapper.updatePrice(price, id);
    }

    public int updateOnoff(int onoff, int id) {
        return this.dishMapper.updateOnoff(onoff, id);
    }

    public int insertNewdish(Dish dish) {
        this.dishMapper.insertNewdish(dish);
        return dish.getId();
    }

    public int deleteDish(String ids){ return this.dishMapper.deleteDish(ids);}
}
