package com.nova.service;

import com.nova.model.DishType;

import java.util.List;

/**
 * Created by Go on 2016/8/21.
 */
public interface DishTypeService {
    List<DishType> getDishtype();

    int updateDishtype(String type, int id);

    int insertNewtype(DishType dishType);

    int deleteDishtype(int id);

}
