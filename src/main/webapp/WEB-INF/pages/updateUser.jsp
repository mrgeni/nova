<%--
  Created by IntelliJ IDEA.
  User: Go
  Date: 2016/1/31
  Time: 23:25
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="mvc" uri="http://www.springframework.org/tags/form" %>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- 上述3个meta标签*必须*放在最前面，任何其他内容都*必须*跟随其后！ -->
    <title>修改用户信息</title>

    <!-- 新 Bootstrap 核心 CSS 文件 -->
    <link rel="stylesheet" href="//cdn.bootcss.com/bootstrap/3.3.5/css/bootstrap.min.css">

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="//cdn.bootcss.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="//cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>
<body>
<div class="container">
    <h1>修改用户信息</h1>
    <hr/>

    <mvc:form action="/updateUserPost" method="post" commandName="user" role="form">
        <div class="form-group">
            <label for="username">用户名:</label>
            <input type="text" class="form-control" id="username" name="username" placeholder="请输入用户名:"
                   value="${user.username}"/>
        </div>

        <div class="form-group">
            <label for="password">密码:</label>
            <input type="text" class="form-control" id="password" name="password" placeholder="请输入密码:"
                   value="${user.password}"/>
        </div>

        <div class="form-group">
            <label for="name">姓名:</label>
            <input type="text" class="form-control" id="name" name="name" placeholder="请输入姓名:"
                   value="${user.name}"/>
        </div>
        <div class="form-group">
            <label for="nic">昵称:</label>
            <input type="text" class="form-control" id="nic" name="nic" placeholder="请输入昵称:"
                   value="${user.nic}"/>
        </div>
        <div class="form-group">
            <label for="sex">性别:</label>
            <input type="text" class="form-control" id="sex" name="sex" placeholder="请输入性别:"
                   value="${user.sex}"/>
        </div>
        <div class="form-group">
            <label for="age">年龄:</label>
            <input type="text" class="form-control" id="age" name="age" placeholder="请输入年龄:"
                   value="${user.age}"/>
        </div>
        <div class="form-group">
            <label for="email">电子邮箱:</label>
            <input type="text" class="form-control" id="email" name="email" placeholder="请输入电子邮箱:"
                   value="${user.email}"/>
        </div>
        <div class="form-group">
            <label for="phone">手机号码:</label>
            <input type="text" class="form-control" id="phone" name="phone" placeholder="请输入手机号码:"
                   value="${user.phone}"/>
        </div>
        <div class="form-group">
            <label for="selfshow">自我介绍:</label>
            <input type="text" class="form-control" id="selfshow" name="selfshow" placeholder="请输入自我介绍:"
                   value="${user.selfshow}"/>
        </div>
        <div class="form-group">
            <label for="auth">权限:</label>
            <input type="text" class="form-control" id="auth" name="auth" placeholder="请设置权限:"
                   value="${user.auth}"/>
        </div>

        <!-- 把 id 一并写入 user 中 -->
        <input type="hidden" id="id" name="id" value="${user.id}"/>

        <div class="form-group">
            <button type="submit" class="btn btn-sm btn-success">修改</button>
        </div>
    </mvc:form>
</div>


<!-- jQuery文件。务必在bootstrap.min.js 之前引入 -->
<script src="//cdn.bootcss.com/jquery/1.11.3/jquery.min.js"></script>

<!-- 最新的 Bootstrap 核心 JavaScript 文件 -->
<script src="//cdn.bootcss.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
</body>
</html>