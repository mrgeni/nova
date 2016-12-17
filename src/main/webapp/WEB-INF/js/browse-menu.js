/**
 * Created by Go on 2016/11/20.
 */
(function () {
    var sidebar = document.getElementById('sidebar');
    var offsets = [];
    var targets = [];
    var selected = false;
    /*点击左部,选择菜类*/
    $(sidebar).on('click', 'ul li ', function () {
        selected = true;
        sidebar.getElementsByClassName('active')[0].className = '';
        this.className = 'active';
    });

    /*滚动浏览右部菜品,自动识别相应菜类(左部)*/
    $('#mainbar').on('scroll', function () {
        if (selected) {
            selected = false;
        } else {
            var scrolltop = this.scrollTop;
            var maxscroll = this.scrollHeight - this.clientHeight;
            var i;
            if (scrolltop >= maxscroll) {
                active(targets[targets.length - 1]);
            }
            for (i = offsets.length; i--;) {
                scrolltop >= offsets[i] && (offsets[i + 1] === undefined || scrolltop < offsets[i + 1]) && active(targets[i]);
            }
        }
    });

    /*选中菜类,并将其滚动到可视范围内*/
    function active(target) {
        var $target = $(target);
        /* alert($target.text());*/
        var $left = $target.parents('.left');
        var top = $target.parent().position().top;
        sidebar.getElementsByClassName('active')[0].className = '';
        $target.parent().addClass('active');
        if (top >= $left.height() || top < 0) {
            $left.scrollTop(top + $left.scrollTop());
        }
    }

    /*AJAX异步读取URL:/browse/getdishes处的后台数据,获取菜单*/
    $.get("/browse/getdishes", function (Type) {
        if (Type.length > 0) {
            var ul = sidebar.children[0];
            var mainbar = document.getElementById('mainbar');
            var id, type;
            var l = 0, n = 0;
            for (var i in Type) {
                id = Type[i].id;
                type = Type[i].type;
                ul.innerHTML += "<li><a href='#" + id + "'>" + type + "</a></li>";
                mainbar.innerHTML += "<h1 id='" + id + "' class='page-header'>" + type + "</h1>";
                Type[i].dishes.forEach(function (e) {
                    mainbar.innerHTML += "<div class='thumbnail'><img src='/img/" + e.img + "' alt='...'><div class='caption'><h3>" + e.dishname + "<strong class='RECOM'>&nbsp;荐</strong></h3><p>价格:" + e.price.toFixed(2) + "元&nbsp;&nbsp;&nbsp;&nbsp;数量&nbsp;&nbsp;个</p><p><a href='#' class='btn btn-primary' role='button'>点餐</a><a href='#' class='btn btn-default' role='button'>待定</a></p></div></div>";
                    n += 1;
                });
                offsets.push('#' + id);
                targets.push('a[href="#' + id + '"]');
            }
            var active = ul.firstElementChild;
            active.className = 'active';
            $('img').on('load', function () {
                l += 1;
                if (l == n) {
                    offsets = offsets.map(function (item) {
                        return $(item).position().top;
                    })
                }
            });
        }
    });
    /*AJAX异步读取URL:/getdishtype处的后台数据,获取菜品种类*/
    /*$.get("/getdishtype", function (Type) {
     if (Type.length > 0) {
     var ul = sidebar.children[0];
     for (var i in Type) {
     ul.innerHTML += "<li><a href='#" + Type[i].id + "'>" + Type[i].type + "</a></li>";
     }
     var active = ul.firstElementChild;
     active.className = 'active';
     }
     });*/
}());
