package com.nova.model;

/**
 * Created by Go on 2016/1/31.
 */
public class Blog {


    private int id;
    private String title;
    private String content;
    private int userid;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public int getUserid() {
        return userid;
    }

    public void setUserid(int userid) {
        this.userid = userid;
    }

    @Override
    public String toString()
    {
      return   "blogid="+id+",title="+title+",content="+content+",userid="+userid;
    }
}
