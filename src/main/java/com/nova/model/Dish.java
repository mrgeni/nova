package com.nova.model;

/**
 * Created by Go on 2016/3/20.
 */
public class Dish {
    private int id;
    private String dishname;
    private int type;
    private float price;
    private boolean RECOM;
    private boolean HOT;
    private boolean NEW;
    private String img;
    private int sales;
    private String release;
    private boolean onoff;

    public Dish() {
    }

    public Dish(int type) {
        this.type = type;
    }

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

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public boolean isRECOM() {
        return RECOM;
    }

    public void setRECOM(boolean RECOM) {
        this.RECOM = RECOM;
    }

    public boolean isHOT() {
        return HOT;
    }

    public void setHOT(boolean HOT) {
        this.HOT = HOT;
    }

    public boolean isNEW() {
        return NEW;
    }

    public void setNEW(boolean NEW) {
        this.NEW = NEW;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
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
