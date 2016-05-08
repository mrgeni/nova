<%--
  Created by IntelliJ IDEA.
  User: Go
  Date: 2016/1/31
  Time: 22:59
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- 上述3个meta标签*必须*放在最前面，任何其他内容都*必须*跟随其后！ -->
    <title>用户详情</title>

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
    <h1>用户详情</h1>
    <hr/>

    <table class="table table-bordered table-striped">
        <tr>
            <th>ID</th>
            <td>${user.id}</td>
        </tr>
        <tr>
            <th>用户名</th>
            <td>${user.username}</td>
        </tr>
        <tr>
            <th>密码</th>
            <td>${user.password}</td>
        </tr>
        <tr>
            <th>姓名</th>
            <td>${user.name}</td>
        </tr>
        <tr>
            <th>昵称</th>
            <td>${user.nic}</td>
        </tr>
        <tr>
            <th>性别</th>
            <td>${user.sex}</td>
        </tr>
        <tr>
            <th>年龄</th>
            <td>${user.age}</td>
        </tr>
        <tr>
            <th>电子邮箱</th>
            <td>${user.email}</td>
        </tr>
        <tr>
            <th>手机号码</th>
            <td>${user.phone}</td>
        </tr>
        <tr>
            <th>自我介绍</th>
            <td>${user.selfshow}</td>
        </tr>
        <tr>
            <th>权限</th>
            <td>${user.auth}</td>
        </tr>
    </table>
</div>

<!-- jQuery文件。务必在bootstrap.min.js 之前引入 -->
<script src="//cdn.bootcss.com/jquery/1.11.3/jquery.min.js"></script>

<!-- 最新的 Bootstrap 核心 JavaScript 文件 -->
<script src="//cdn.bootcss.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
</body>
</html>
