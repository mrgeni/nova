package com.nova.service;

import com.nova.model.Dish;
import com.nova.model.DishType;

import java.util.List;

/**
 * Created by Go on 2016/3/20.
 */
public interface DishService {

    List<Dish> getMenu(int type);

    List<DishType> getDishesByType();

    int updateRECOM(boolean RECOM, int id);

    int updateHOT(boolean HOT, int id);

    int updateNEW(boolean NEW, int id);

    int updateDishname(String dishname, int id);

    int updatePrice(float price, int id);

    int updateImg(String img, int id);

    int updateOnoff(boolean onoff, int id);

//    int updateExchange(int type_0, int type_1);

    int insertNewdish(Dish dish);

    int deleteDish(String ids);
}
