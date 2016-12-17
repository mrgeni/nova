package com.nova.service;

import com.nova.mapping.DishMapper;
import com.nova.model.Dish;
import com.nova.model.DishType;
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

    public List<Dish> getMenu(int type) {
        return this.dishMapper.getMenu(type);
    }

    public List<DishType> getDishesByType() {
        return this.dishMapper.getDishesByType();
    }

    public int updateRECOM(boolean RECOM, int id) {
        return this.dishMapper.updateRECOM(RECOM, id);
    }

    public int updateHOT(boolean HOT, int id) {
        return this.dishMapper.updateHOT(HOT, id);
    }

    public int updateNEW(boolean NEW, int id) {
        return this.dishMapper.updateNEW(NEW, id);
    }

    public int updateDishname(String dishname, int id) {
        return this.dishMapper.updateDishname(dishname, id);
    }

    public int updatePrice(float price, int id) {
        return this.dishMapper.updatePrice(price, id);
    }

    public int updateImg(String img, int id) {
        return this.dishMapper.updateImg(img, id);
    }

    public int updateOnoff(boolean onoff, int id) {
        return this.dishMapper.updateOnoff(onoff, id);
    }

//    public int updateExchange(int type_0, int type_1) {
//        return this.dishMapper.updateExchange(type_0, type_1);
//    }

    public int insertNewdish(Dish dish) {
        this.dishMapper.insertNewdish(dish);
        return dish.getId();
    }

    public int deleteDish(String ids) {
        return this.dishMapper.deleteDish(ids);
    }
}
