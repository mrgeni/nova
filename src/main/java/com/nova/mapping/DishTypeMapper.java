package com.nova.mapping;

import com.nova.model.DishType;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by Go on 2016/8/21.
 */
@Repository
public interface DishTypeMapper {
    @Select("select * from dish_type")
    List<DishType> getDishtype();

    @Update("update dish_type set type =#{0} where id=#{1}")
    int updateDishtype(String type, int id);

    @Insert("insert into dish_type values()")
    @Options(useGeneratedKeys = true)
    int insertNewtype(DishType dishType);

    @Delete("delete from dish_type where id=#{0}")
    int deleteDishtype(int id);
}
