<%--
  Created by IntelliJ IDEA.
  User: Go
  Date: 2016/3/20
  Time: 15:03
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
    <title>管理菜单</title>
    <!-- 新 Bootstrap 核心 CSS 文件 -->
    <link rel="stylesheet" href="//cdn.bootcss.com/bootstrap/3.3.6/css/bootstrap.min.css">
    <link rel="stylesheet" href="../css/recommended-fonts.css">
    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="//cdn.bootcss.com/html5shiv/3.7.3/html5shiv.min.js"></script>
    <script src="//cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>
<body>
<div id="input-width" hidden></div>
<div class="container">
    <h2 class="text-center">
        菜单 <a id="add-dish" style="font-size:20px">
        <small>添加</small>
    </a>
    </h2>
    <table id="table" class="table table-condensed   text-center">
        <%--<tr>
            <td>果汁</td>
            <td>12.00</td>
            <td>
                <button class="btn btn-default btn-sm">下架</button>
            </td>
        </tr>
        <tr>
            <td>猪排面</td>
            <td>10.00</td>
            <td>
                <button class="btn btn-default btn-sm">下架</button>
            </td>
        </tr>
        <tr>
            <td>牛肉炒饭</td>
            <td>9.00</td>
            <td>
                <button class="btn btn-default btn-sm">下架</button>
            </td>
        </tr>
        <tr>
            <td>粥</td>
            <td>1.05</td>
            <td>
                <button class="btn btn-default btn-sm">下架</button>
            </td>
        </tr>--%>
        <%--<c:forEach var="dish" items="${Menu}">
            <tr>
                <td>${dish.dishname}</td>
                <td>${dish.price}</td>
                <td>
                    <button class="btn btn-default btn-sm">下架</button>
                </td>
            </tr>
        </c:forEach>--%>
    </table>

</div>
<!-- jQuery文件。务必在bootstrap.min.js 之前引入 -->
<script src="//cdn.bootcss.com/jquery/2.2.1/jquery.min.js"></script>
<!-- 最新的 Bootstrap 核心 JavaScript 文件 -->
<script src="//cdn.bootcss.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
<script src="../js/manage-menu.js"></script>

</body>
</html>
