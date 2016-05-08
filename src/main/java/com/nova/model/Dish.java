package com.nova.model;

/**
 * Created by Go on 2016/3/20.
 */
public class Dish {
    private int id;
    private String dishname;
    private float price;
    private String recommended;
    private int sales;
    private String release;
    private boolean onoff;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDishname() {
        return dishname;
    }

    public void setDishname(String dishname) {
        this.dishname = dishname;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }


    public String getRecommended() {
        return recommended;
    }

    public void setRecommended(String recommended) {
        this.recommended = recommended;
    }

    public int getSales() {
        return sales;
    }

    public void setSales(int sales) {
        this.sales = sales;
    }

    public String getRelease() {
        return release;
    }

    public void setRelease(String release) {
        this.release = release;
    }

    public boolean isOnoff() {
        return onoff;
    }

    public void setOnoff(boolean onoff) {
        this.onoff = onoff;
    }
}
