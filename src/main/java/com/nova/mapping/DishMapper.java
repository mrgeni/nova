package com.nova.mapping;

import com.nova.model.Dish;
import com.nova.model.DishType;
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

    @Select("select * from dish_type")
    @Results({@Result(id=true,column = "id",property = "id"),@Result(column = "type",property = "type"),@Result(column = "id",property = "dishes",many=@Many(select = "com.nova.mapping.DishMapper.getMenu"))})
    List<DishType> getDishesByType();


    @Update("update menu set RECOM =#{0} where id=#{1}")
    int updateRECOM(boolean RECOM, int id);

    @Update("update menu set HOT=#{0} where id=#{1}")
    int updateHOT(boolean HOT, int id);

    @Update("update menu set NEW=#{0} where id=#{1}")
    int updateNEW(boolean NEW, int id);

    @Update("update menu set dishname=#{0} where id=#{1}")
    int updateDishname(String dishname, int id);

    @Update("update menu set price=#{0} where id=#{1}")
    int updatePrice(float price, int id);

    @Update("update menu set img=#{0} where id=#{1}")
    int updateImg(String img, int id);

    @Update("update menu set onoff=#{0} where id=#{1}")
    int updateOnoff(boolean onoff, int id);

//    @Update("update menu as m1 join menu as m2 on (m1.type=#{0} and m2.type=#{1}) set m1.type=m2.type,m2.type=m1.type")
//    int updateExchange(int type_0, int type_1);

    @Insert("insert into menu (type) values (#{type})")
    @Options(useGeneratedKeys = true)
    int insertNewdish(Dish dish);

    @Delete("delete from menu where id in (${value})")
    int deleteDish(String ids);

}
