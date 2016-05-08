<%--
  Created by IntelliJ IDEA.
  User: Go
  Date: 2016/3/18
  Time: 21:05
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
    <title>管理员登录</title>
    <!-- 新 Bootstrap 核心 CSS 文件 -->
    <link rel="stylesheet" href="//cdn.bootcss.com/bootstrap/3.3.5/css/bootstrap.min.css">
    <style type="text/css">
        form {
            position: relative;
            margin-top: 10%;
            width: 250px;
            margin-left: auto;
            margin-right: auto;
        }
    </style>
    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="//cdn.bootcss.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="//cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>
<body>
<div class="container ">
    <form action="/submit" method="post" commandName="Manager" role="form">
        <h3 class="text-center"><strong>登录</strong></h3>
        <h5 class="text-center"><strong>${error}</strong></h5>

        <div class="form-group">
            <label for="username" class="sr-only">用户名:</label>
            <input type="text" class="form-control " id="username" name="username" placeholder="用户名:" required
                   autofocus/>
        </div>
        <div class="form-group">
            <label for="password" class="sr-only">密码:</label>
            <input type="password" class="form-control " placeholder="密码:" required/>
        </div>
        <div>
            <input type="password" class="sr-only" id="password" name="password"/>
        </div>
        <div class="form-group text-right ">
            <button class="btn btn-default  " type="submit">登录</button>
        </div>
    </form>
</div>
<!-- jQuery文件。务必在bootstrap.min.js 之前引入 -->
<script src="//cdn.bootcss.com/jquery/1.11.3/jquery.min.js"></script>
<!-- 最新的 Bootstrap 核心 JavaScript 文件 -->
<script src="//cdn.bootcss.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
<script src="../js/MD5.js"></script>
<script src="../js/on-submit.js"></script>
</body>
</html>
