/**
 * Created by Go on 2016/3/20.
 */
(function () {
    var table = document.getElementById("table");
    /*设置表的标题栏*/
    var trs = "<tr><th><div class='col-xs-2'></div>菜名</th><th class='text-center'>价格</th><th class='text-center'><a id='delete-edit'>管理</a></th></tr>";
    var $div = $('#input-width');
    var disable = {true: '', false: 'disabled'};
    $('#add-dish').on('click', function () {
        if (document.getElementById('delete-edit').innerHTML == '管理')
            $.get("/add-dish", function (i) {
                $('tbody').append($("<tr data-id=" + i + " data-onoff='true'><td class='col-xs-6'><div class='col-xs-2'></div><span><p></p><input maxlength='20' readonly='true'data-toggle='tooltip' data-placement='auto left' data-title='点击修改' style =' width:" + $div.html('新菜名').outerWidth(true) + "px' value='新菜名'/><strong class='recommended'></strong></span></td><td><span><p></p><input type='number' readonly='true'data-toggle='tooltip' data-placement='auto left' data-title='点击修改' value='0.00'/></span></td><td><button class='btn btn-default btn-sm'></button></td></tr>"));
            })
    });
    /*AJAX异步读取URL:/getmenu处的后台数据*/
    $.get("/getmenu", function (Menu) {
        /*var disable = {true: '', false: 'disabled'};*/
        for (var i in Menu) {
            trs += "<tr data-id=" + Menu[i].id + " data-onoff=" + Menu[i].onoff + " ><td class='col-xs-6'><div class='col-xs-2'></div><span><p></p><input " + disable[Menu[i].onoff] + " maxlength='20' readonly='true' name='' data-toggle='tooltip' data-placement='auto left' data-title='点击修改' style =' width:" + $div.html(Menu[i].dishname).outerWidth(true) + "px' value='" + Menu[i].dishname + "'/><strong class='recommended'>" + Menu[i].recommended + "</strong></span></td><td><span><p></p><input type='number' " + disable[Menu[i].onoff] + " readonly='true' name='' data-toggle='tooltip' data-placement='auto left' data-title='点击修改' value='" + Menu[i].price.toFixed(2) + "'/></span></td><td><button class='btn btn-default btn-sm'></button></td></tr>";
        }
        table.innerHTML = trs;
        $("input").tooltip();
        var $tr;
        var $this;
        /*var inputvalue;*/
        var illegal;
        /*单击设置推荐菜*/
        $('tbody').on('click', 'tr:not([data-delete])', function (e) {
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
                    if ($this.prop('readonly') && $this.is(':focus')) {
                        $this.prop('readonly', false);
                        $this.css('background-color', 'azure');
                        /*inputvalue = $this.val();*/
                        $this.prop('name', $this.val());
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
            .on('click', 'tr[data-delete] button', function () {

                $tr = $(this.parentNode.parentNode);
                $tr.attr('data-delete', ($tr.attr('data-delete') - 0 + 1) % 2);
                var $p = $tr.find('p');
                $p.each(function () {
                    this.innerHTML = this.nextSibling.value;
                });

            })
            .on({
                'input': function () {
                    var inputvalue = this.value;
                    $div.html(inputvalue);
                    this.style.width = $div.outerWidth(true) + 'px';
                    input(this, inputvalue, false);
                }
                , 'blur': function () {
                    blur(this, '/postdishname')
                }
            }, 'tr:not([data-delete]) input[maxlength]')
            .on({
                'input': function () {
                    /* inputvalue = parseFloat(this.value).toFixed(2);*/
                    input(this, this.value, true);
                }
                , 'blur': function () {
                    this.value = parseFloat(this.value).toFixed(2);
                    blur(this, '/postprice')
                }
            }, 'tr:not([data-delete]) input[type]')
            .on('click', 'a', function () {
                $tr = $('tr');
                var $button = $('button');

                if (this.innerHTML == '管理') {
                    this.innerHTML = '确定';
                    $tr.attr('data-delete', 0);
                    $button.addClass('btn-primary');


                } else {
                    this.innerHTML = '管理';
                    var ids=[];
                   $tr.filter('[data-delete=1]').each(function () {ids.push(this.getAttribute('data-id'));this.innerHTML='';});
                    if(ids.length){$.post("/postdelete",{ids:ids.toString()});}
                    $tr.removeAttr('data-delete');
                    $button.removeClass('btn-primary');                   
                    

                }
            });

        $(window).on('resize', function () {
            $("input[aria-describedby]").tooltip('show');
        });
        function blur(el, url) {
            $this = $(el);
            switch (true) {
                case illegal:
                    $this.focus();
                    break;
                case el.value != $this.prop('name'):
                    $this.prop('name', el.value);
                    $tr = $this.parent().parent().parent();
                    $.post(url, {'details': el.value, 'id': $tr.data('id')});
                default:
                    $this.tooltip();
                    $this.css('background-color', 'inherit');
                    $this.prop('readonly', true);
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
                case flag && (isNaN(value) || Math.abs(value) >= 999.995):
                    $this.tooltip({title: '范围:±999.99元', trigger: 'manual'});
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

