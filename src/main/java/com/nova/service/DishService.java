package com.nova.service;

import com.nova.model.Dish;

import java.util.List;

/**
 * Created by Go on 2016/3/20.
 */
public interface DishService {

    List<Dish> getMenu(int type);

    int updateRecommended(String recommended, int id);

    int updateDishname(String dishname, int id);

    int updatePrice(float price, int id);

    int updateImg(String img,int id);

    int updateOnoff(int onoff, int id);

    int insertNewdish(Dish dish);

    int deleteDish(String ids);
}
