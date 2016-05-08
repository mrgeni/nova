/**
 * Created by Go on 2016/3/20.
 */
(function () {
    var table = document.getElementById("table");
    /*设置表的标题栏*/
    var trs = "<tr><th><div class='col-xs-2'></div>菜名</th><th class='text-center'>价格</th><th class='text-center'><a href='#'>管理</a></th></tr>";
    var $div = $('#input-width');
    /*AJAX异步读取URL:/getmenu处的后台数据*/
    $.get("/getmenu", function (Menu) {
        var disable={true:'',false:'disabled'};
        for (var i in Menu) {
            trs += "<tr data-id=" + Menu[i].id + " data-onoff=" + Menu[i].onoff + "><td class='col-xs-6'><div class='col-xs-2'></div><input "+ disable[Menu[i].onoff] +" maxlength='20' readonly='true'data-toggle='tooltip' data-placement='auto left' data-title='点击修改' style =' width:" + $div.html(Menu[i].dishname).outerWidth(true) + "px' value='" + Menu[i].dishname + "'/><span class='recommended'><strong>" + Menu[i].recommended + "</strong></span></td><td><input type='number' "+ disable[Menu[i].onoff] +" readonly='true'data-toggle='tooltip' data-placement='auto left' data-title='点击修改' value='" + Menu[i].price.toFixed(2) + "'/></td><td><button class='btn btn-default btn-sm'></button></td></tr>";
        }
        table.innerHTML = trs;
        $("input").tooltip();
        var $tr;
        var $this;
        var inputvalue;
        var illegal;
        /*单击设置推荐菜*/
        $('tr').on('click', function (e) {
                $tr = $(this);
                switch (e.target.nodeName) {
                    case 'TD':
                        if (!$tr.find('input:disabled').length) {
                            var $recommend = $tr.find('strong');
                            if ($recommend.text()) {
                                $recommend.text('');
                            } else {
                                $recommend.text('推荐');
                            }
                            /*同步数据库menu表,recommended字段*/
                            $.post("/postrecommended", {'recommended': $recommend.text(), 'id': $tr.data('id')});
                        }
                        break;
                    case 'INPUT':
                        $this = $(e.target);
                        if ($this.attr('readonly') && $this.is(':focus')) {
                            $this.attr('readonly', false);
                            $this.css('background-color', 'azure');
                            inputvalue = $this.val();
                            $this.attr('name', inputvalue);
                            $this.tooltip('destroy');
                        }
                        break;
                    case 'BUTTON':

                        if (!$("input[aria-describedby]").length) {
                            if ($tr.attr('data-onoff') == 'true') {
                                $tr.attr('data-onoff', 'false');
                                $tr.find('input').prop('disabled', true);
                                $.post("/postonoff", {'onoff': 0, 'id': $tr.data('id')});
                            } else {
                                $tr.attr('data-onoff', 'true');
                                $tr.find('input').prop('disabled', false);
                                $.post("/postonoff", {'onoff': 1, 'id': $tr.data('id')});
                            }
                        }
                        break;
                }
                /*   if (e.target.nodeName != 'INPUT') {
                 $tr = $(this);
                 var $recommend = $tr.find('strong');
                 if ($recommend.text()) {
                 $recommend.text('');
                 } else {
                 $recommend.text('推荐');
                 }
                 /!*同步数据库menu表,recommended字段*!/
                 $.post("/postrecommended", {'recommended': $recommend.text(), 'id': $tr.data('id')});

                 } else {
                 $this = $(e.target);
                 if ($this.attr('readonly') && $this.is(':focus')) {
                 $this.attr('readonly', false);
                 $this.css('background-color', 'azure');
                 inputvalue = $this.val();
                 $this.attr('name', inputvalue);
                 $this.tooltip('destroy');
                 }
                 }*/
            })
            .on({
                'input': function () {
                    inputvalue = this.value;
                    $div.html(inputvalue);
                    this.style.width = $div.outerWidth(true) + 'px';
                    input(this, inputvalue, false);
                }
                , 'blur': function () {
                    blur(this, '/postdishname')
                }
            }, 'input[maxlength]')
            .on({
                'input': function () {
                    inputvalue = parseFloat(this.value).toFixed(2);
                    input(this, inputvalue, true);
                }
                , 'blur': function () {
                    this.value = inputvalue;
                    blur(this, '/postprice')
                }
            }, 'input[type]');

        $(window).on('resize', function () {
            $("input[aria-describedby]").tooltip('show');
        });
        function blur(el, url) {
            $this = $(el);
            switch (true) {
                case illegal:
                    $this.focus();
                    break;
                case inputvalue != el.name:
                    el.name = inputvalue;
                    $tr = $this.parent().parent();
                    $.post(url, {'details': inputvalue, 'id': $tr.data('id')});
                default:
                    $this.tooltip();
                    $this.css('background-color', 'inherit');
                    $this.attr('readonly', true);
                    break;
            }
        }

        function input(el, value, flag) {
            $this = $(el);
            switch (true) {
                case value == '':
                    $this.tooltip({title: '必输项', trigger: 'manual'});
                    $this.tooltip('show');
                    illegal = true;
                    break;
                case flag && (isNaN(value) || Math.abs(value) >= 1000):
                    $this.tooltip({title: '范围:±1000元', trigger: 'manual'});
                    $this.tooltip('show');
                    illegal = true;
                    break;
                default:
                    $this.tooltip('destroy');
                    illegal = false;
                    break;
            }
        }
    });
}());

