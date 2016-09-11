package com.nova.mapping;

import com.nova.model.Dish;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Created by Go on 2016/3/20.
 */
@Repository
public interface DishMapper {

    @Select("select * from menu where type=#{0}")
    List<Dish> getMenu(int type);

    @Update("update menu set recommended =#{0} where id=#{1}")
    int updateRecommended(String recommended, int id);

    @Update("update menu set dishname=#{0} where id=#{1}")
    int updateDishname(String dishname, int id);

    @Update("update menu set price=#{0} where id=#{1}")
    int updatePrice(float price, int id);

    @Update("update menu set onoff=#{0} where id=#{1}")
    int updateOnoff(int onoff, int id);

    @Insert("insert into menu (type) values (#{type})")
    @Options(useGeneratedKeys = true)
    int insertNewdish(Dish dish);

    @Delete("delete from menu where id in (${value})")
    int deleteDish(String ids);
}
