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
    <nav class="navbar navbar-default navbar-fixed-top">
        <div class="container">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                        data-target="#navbar-collapse" aria-expanded="false">
                    <span class="sr-only"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a id="edit-type" class="navbar-brand" href="#">菜单</a>
            </div>

            <div class="collapse navbar-collapse" id="navbar-collapse">
                <ul class="nav navbar-nav margin-vertical-zero">
                    <%--<li class="active"><a href="#">肉类</a></li>
                    <li><a href="#">蔬菜</a></li>
                    <li><a href="#">汤类</a></li>
                    <li><a href="#">点心 饮料</a></li>
                    <li><a href="#"><input/></a></li>--%>
                </ul>
                <ul class="nav navbar-nav navbar-right margin-vertical-zero">
                    <li value="0"><a href="#" title="添加菜品"><span id="add-dish" class="glyphicon glyphicon-plus-sign"
                                                                 aria-hidden="true"></span></a>
                    </li>
                    <li value="0"><a href="#" title="删除菜品"><span id="delete-dish" class="glyphicon glyphicon-minus-sign"
                                                                 aria-hidden="true"></span></a></li>
                    <li value="1"><a href="#" title="添加种类"><span id="add-type" class="glyphicon glyphicon-plus"
                                                                 aria-hidden="true"></span></a>
                    </li>
                    <li value="1"><a href="#" title="删除种类"><span id="delete-type"
                                                                 class="glyphicon glyphicon glyphicon-minus"
                                                                 aria-hidden="true"></span></a></li>

                </ul>
            </div>
        </div>
    </nav>

    <table class="table table-condensed   text-center">
        <tbody></tbody>
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
<div class="modal fade" id="modal" tabindex="-1" role="dialog" aria-labelledby="modallabel" aria-hidden="true">
    <div class="modal-dialog" id="modalstyle">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                        class="sr-only">Close</span></button>
                <h2 class="modal-title" id="modallabel"></h2>
            </div>
            <div class="modal-body">
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default btn-sm" style="display: none" data-dismiss="modal">取消
                </button>
                <button type="button" class="btn btn-primary btn-sm" data-dismiss="modal">确定</button>
            </div>
        </div>
    </div>
</div>
<!-- jQuery文件。务必在bootstrap.min.js 之前引入 -->
<script src="//cdn.bootcss.com/jquery/2.2.1/jquery.min.js"></script>
<!-- 最新的 Bootstrap 核心 JavaScript 文件 -->
<script src="//cdn.bootcss.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
<script src="../js/manage-menu.js"></script>
</body>
</html>
