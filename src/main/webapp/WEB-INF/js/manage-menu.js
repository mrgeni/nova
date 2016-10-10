/**
 * Created by Go on 2016/3/20.
 */
(function () {
    var trs;
    var $div = $('#input-width');
    var $modal = $('#modal');
    var disable = {true: '', false: 'disabled'};
    var checked = {true: 'checked', false: ''};
    var editable = true;
    $('nav')
    /*编辑菜品种类按钮*/
        .on('click', '#edit-type', function () {
            if (!$('input[aria-describedby]').length && document.getElementById('delete-dish').className == 'glyphicon glyphicon-minus-sign' && editable) {
                var editor = document.getElementById('navbar-collapse').children[1].children;
                if (this.innerHTML == '菜单') {
                    this.innerHTML = '确认';
                    /*$tr.attr('data-delete', 3);*/
                    $('tr input,tr button').prop('disabled', true);
                } else {
                    this.innerHTML = '菜单';
                    /*$tr.removeAttr('data-delete');*/
                    $('tr[data-onoff=true] input,tr button').prop('disabled', false);
                }
                for (var i = 0; i < editor.length; i++) {
                    editor[i].value = (editor[i].value + 0 + 1) % 2;
                }
            }
        })

        /*添加菜品按钮*/
        .on('click', '#add-dish', function () {
            if (!$('input[aria-describedby]').length && document.getElementById('delete-dish').className == 'glyphicon glyphicon-minus-sign') {
                var active = document.getElementById('navbar-collapse').getElementsByClassName('active')[0];
                if (active) {
                    $.post("/add-dish", {type: active.id}, function (i) {
                        $('tbody').append($("<tr data-id=" + i + " data-onoff='true'><td class='col-xs-6'><span><p></p><input maxlength='20' readonly='true' data-toggle='tooltip' data-placement='auto left' data-title='点击修改' style =' width:" + $div.html('新菜名').outerWidth(true) + "px' value='新菜品'/></span></td><td><span><p></p><input type='number' readonly='true' data-toggle='tooltip' data-placement='auto left' data-title='点击修改' value='0.00'/></span></td><td><input type='checkbox'></td><td><input type='checkbox'></td><td><input type='checkbox'></td><td><a href='#'>无</a></td><td><button class='btn btn-default btn-sm'></button></td></tr>"));
                        $('input').tooltip();
                    });
                }
                else {
                    modal('错误', '必须新建或者选择一个菜类!');
                }
            }
        })

        /*删除菜品按钮*/
        .on('click', '#delete-dish', function () {
            var $tr = $('tr');
            var $button = $('tr button');
            if (this.className == 'glyphicon glyphicon-minus-sign' && !$('input[aria-describedby]').length) {
                this.className = 'glyphicon glyphicon-ok-sign';
                $('input').tooltip('destroy');
                $tr.attr('data-delete', 0);
                $button.addClass('btn-primary');
                editable = false;
            } else {
                this.className = 'glyphicon glyphicon-minus-sign';
                var ids = [];
                $tr.filter('[data-delete=1]').each(function () {
                    ids.push(this.getAttribute('data-id'));
                    this.innerHTML = '';
                });
                if (ids.length) {
                    $.post("/postdelete", {ids: ids.toString()});
                }
                $('input').tooltip();
                $tr.removeAttr('data-delete');
                $button.removeClass('btn-primary');
                editable = true;
            }
        })

        /*切换菜类*/
        .on('click', 'ul:not(.navbar-right) li', function () {
            if (editable) {
                if (this.className) {
                    if (document.getElementById('edit-type').innerHTML == '确认') {
                        var a = this.children[0];
                        if ($div.html(a.innerHTML).outerWidth(true) < 32) {
                            a.innerHTML = "<input maxlength='10' placeholder='必输' style='width:32px' value='" + a.innerHTML + "'/>";
                        } else {
                            a.innerHTML = "<input maxlength='10' placeholder='必输' style='width:" + $div.outerWidth(true) + "px' value='" + a.innerHTML + "'/>";
                        }
                        a.childNodes[0].focus();
                        editable = false;
                    }
                } else {
                    if (!$('input[aria-describedby]').length) {
                        this.parentNode.getElementsByClassName('active')[0].className = '';
                        this.className = 'active';
                        displaytbody(this.id, null, document.getElementById('edit-type').innerHTML);
                    }
                }
            }
        })

        /*添加菜类按钮*/
        .on('click', '#add-type', function () {
            if (editable) {
                var ul = document.getElementById('navbar-collapse').children[0];
                if (ul.children.length < 8) {
                    $.get("/add-type", function (i) {
                        ul.innerHTML += "<li id='" + i + "'><a href='#'>" + '新菜类' + "</a></li>";
                        if (ul.children.length == 1) {
                            ul.children[0].className = 'active';
                        }
                    });
                }
                else {
                    modal('错误', '菜类超过最大数量8种!');
                }
            }
        })

        /*删除菜类按钮*/
        .on('click', '#delete-type', function () {
            if (editable) {
                var active = document.getElementById('navbar-collapse').getElementsByClassName('active')[0];
                modal('警告', '确定删除' + active.children[0].text + '?', delete_type, active);
                /*if (active && confirm('确定删除 ' + active.children[0].text + '?')) {
                 $.post("/postdeletetype", {id: active.id});
                 var ul = active.parentNode;
                 ul.removeChild(active);
                 $('tbody').html('');
                 if (ul.children.length) {
                 ul.children[0].className = 'active';
                 displaytbody(ul.children[0].id);

                 }
                 }*/
            }
        })

        /*菜类名称验证正确后,提交后台,否则显示必输字样*/
        .on({
            'input': function () {

                if ($div.html(this.value).outerWidth(true) >= 32) {
                    this.style.width = $div.html(this.value).outerWidth(true) + 'px';
                }
            }, 'blur': function () {
                if (this.value == '') {
                    this.focus();
                } else {
                    $.post("/postdishtype", {'type': this.value, 'id': this.parentNode.parentNode.id});
                    this.parentNode.innerHTML = this.value;
                    editable = true;
                }
            }
        }, 'input[style]')

        /*菜类名称可拖拽,调整排列顺序*/
        .on({
            'dragstart': function (e) {
                if (this.parentNode.className == 'active' && document.getElementById('edit-type').innerHTML == '确认') {
                    e.originalEvent.dataTransfer.setData('type', this.innerHTML);
                }
                else {
                    return false;
                }
            }, 'dragover': function (e) {
                e.preventDefault();
            }, 'drop': function (e) {
                var transfer = e.originalEvent.dataTransfer;
                var type = transfer.getData('type');
                if (type) {
                    var active = this.parentNode.parentNode.getElementsByClassName('active')[0];
                    if (active.firstChild.textContent) {
                        $.post('/postexchangetype', {
                            id_0: active.id,
                            id_1: this.parentNode.id
                        });
                        active.firstChild.innerHTML = this.innerHTML;
                        active.className = '';
                        this.innerHTML = type;
                        this.parentNode.className = 'active';
                    }
                    transfer.clearData();
                }
            }
        }, ' li[id] a');


    /*通用提示框*/
    function modal(title, body, callback, arg, style) {
        document.getElementById('modallabel').innerHTML = "<strong>" + title + "</strong>";
        document.getElementsByClassName('modal-body')[0].innerHTML = body;
        document.getElementById('modalstyle').className = 'modal-dialog' + (style ? style : ' modal-sm');
        var cancel = document.getElementsByClassName('modal-footer')[0].children[0];
        var $confirm = $('.modal-footer button:last');
        $confirm.off('click');
        if (callback) {
            cancel.style.display = 'inline';
            $confirm.on('click', function () {
                arg ? callback(arg) : callback();
            });
        } else {
            cancel.style.display = 'none';
            arg && $modal.data('arg', arg);
        }
        $modal.modal();
    }

    /*删除菜类核心函数*/
    function delete_type(active) {
        $.post("/postdeletetype", {id: active.id});
        var ul = active.parentNode;
        ul.removeChild(active);
        $('tbody').html('');
        if (ul.children.length) {
            ul.children[0].className = 'active';
            displaytbody(ul.children[0].id);
        }
    }

    /*判断菜品是否下架或者是否处于 添加/删除-菜品 界面*/
    function dishoffordeleting(tr_dataset) {
        return !!(tr_dataset.onoff == 'false' || tr_dataset.delete);
    }

    /*菜单生成通用函数*/
    function displaytbody(type, init, edit_type) {
        $.post("/getmenu", {type: type}, function (Menu) {
            trs = "<tr><th class='col-xs-6'>菜名</th><th class='text-center'>价格</th><th class='text-center RECOM'><small>推荐</small></th><th class='text-center HOT'><small>热卖</small></th><th class='text-center NEW'><small>新品</small></th><th class='text-center'>图片</th><th class='text-center'>状态</th></tr>";
            for (var i in Menu) {
                trs += "<tr data-id=" + Menu[i].id + " data-onoff=" + Menu[i].onoff + "><td class='col-xs-6'><span><p></p><input " + disable[Menu[i].onoff] + " maxlength='20' readonly='true' name='' data-toggle='tooltip' data-placement='auto left' data-title='点击修改' style =' width:" + $div.html(Menu[i].dishname).outerWidth(true) + "px' value='" + Menu[i].dishname + "'/></span></td><td><span><p></p><input type='number' " + disable[Menu[i].onoff] + " readonly='true' name='' data-toggle='tooltip' data-placement='auto left' data-title='点击修改' value='" + Menu[i].price.toFixed(2) + "'/></span></td><td><input type='checkbox' " + disable[Menu[i].onoff] + " " + checked[Menu[i].recom] + "></td><td><input type='checkbox' " + disable[Menu[i].onoff] + " " + checked[Menu[i].hot] + "></td><td><input type='checkbox' " + disable[Menu[i].onoff] + " " + checked[Menu[i].new] + "></td><td><a href='#'>" + Menu[i].img + "</a></td><td><button class='btn btn-default btn-sm'></button></td></tr>";
            }
            $('tbody').html(trs);
            init && init();
            if (edit_type && edit_type == '确认') {
                $('tr input,tr button').prop('disabled', true);
            } else {
                $('input').tooltip();
            }
        });
    }

    /*AJAX异步读取URL:/getdishtype处的后台数据,获取菜品种类*/
    $.get("/getdishtype", function (Type) {
        if (Type.length > 0) {
            var ul = document.getElementById('navbar-collapse').children[0];
            for (var i in Type) {
                ul.innerHTML += "<li id='" + Type[i].id + "'><a href='#'>" + Type[i].type + "</a></li>";
            }
            var active = ul.firstElementChild;
            active.className = 'active';
            /*getmenu(active.id);*/
            displaytbody(active.id, init_display);
        }
    });

    /*初始化菜单页面*/
    function init_display() {
        var $tr;
        var $this;
        var illegal;
        $('tbody')
        /*菜名 价格 点击修改*/
            .on('click', 'tr:not([data-delete]) input', function () {
                /*$tr = $(this);*/
                /*switch (e.target.nodeName) {
                 /!* case 'TD':
                 if (!$tr.find('input:disabled').length) {
                 var $recommend = $tr.find('strong');
                 if ($recommend.text()) {
                 $recommend.text('');
                 } else {
                 $recommend.text('推荐');
                 }
                 /!*同步数据库menu表,recommended字段*!/
                 $.post("/postrecommended", {'recommended': $recommend.text(), 'id': $tr.data('id')});
                 }
                 break;*!/
                 case 'INPUT':*/
                $this = $(this);
                if ($this.prop('readonly') && $this.is(':focus')) {
                    $this.prop('readonly', false);
                    $this.css('background-color', 'azure');
                    /*inputvalue = $this.val();*/
                    $this.prop('name', $this.val());
                    $this.tooltip('destroy');
                }
                /*    break;
                 /!* case 'BUTTON':
                 if (!$('input[aria-describedby]').length) {
                 var arr = this.getElementsByTagName('input');
                 this.dataset.onoff = arr[0].disabled;
                 $.post('/postonoff', {onoff: arr[0].disabled, id: this.dataset.id});
                 for (var i = 0; i < arr.length; i++) {
                 arr[i].disabled = !arr[i].disabled;
                 }
                 /!*  if ($tr.attr('data-onoff') == 'true') {
                 $tr.attr('data-onoff', 'false');
                 $tr.find('input').prop('disabled', true);
                 $.post("/postonoff", {'onoff': 0, 'id': $tr.data('id')});
                 } else {
                 $tr.attr('data-onoff', 'true');
                 $tr.find('input').prop('disabled', false);
                 $.post("/postonoff", {'onoff': 1, 'id': $tr.data('id')});
                 }*!/
                 }
                 break;*!/
                 }*/
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

            /*上架下架 按钮*/
            .on('click', 'tr:not([data-delete]) button', function () {
                var tr = this.parentNode.parentNode;
                if (!$('input[aria-describedby]').length) {
                    var arr = tr.getElementsByTagName('input');
                    tr.dataset.onoff = arr[0].disabled;
                    $.post('/postonoff', {onoff: arr[0].disabled, id: tr.dataset.id});
                    for (var i = 0; i < arr.length; i++) {
                        arr[i].disabled = !arr[i].disabled;
                    }
                }
            })

            /*菜品 设置 推荐/热卖/新品 功能*/
            .on('click', 'input[type=checkbox]', function () {
                var td = this.parentNode;
                var tr = td.parentNode;
                if ($('input[aria-describedby]').length || tr.dataset.delete) {
                    return false;
                } else {
                    var index = {2: 2, 3: 3, 4: 4}[td.cellIndex];
                    $.post('/postTags', {index: index, checked: this.checked, id: tr.dataset.id});
                }
            })

            /*菜品 设置 图片 功能*/
            .on('click', 'a', function () {
                    var tr = this.parentNode.parentNode;
                    if ($('input[aria-describedby]').length || document.getElementById('edit-type').innerHTML == '确认' || dishoffordeleting(tr.dataset)) {
                        return false;
                    } else {
                        var title = tr.getElementsByTagName('input')[0].value;
                        var body = "<div id='dish-img'  class='thumbnail'><img src='/img/" + this.innerHTML + "?" + new Date().getTime() + "'><p class='text-right'><strong></strong></p><p class='text-right'><em>" + this.innerHTML + "</em> <a href='#'>上传</a><input type='file' accept='image/jpeg,image/png,image/gif'> <a href='#'>删除</a>&nbsp;</p></div>";
                        modal(title, body, null, tr, ' ');
                        /*  var title = tr.getElementsByTagName('input')[0].value;
                         var body = "<input id='img' name='img' type='file' class='file-loading'>";
                         var id = tr.dataset.id;
                         modal(title, body, null, null, ' ');*/
                        /*    $('#img').fileinput({
                         language: 'zh',
                         uploadUrl: '/img-upload',
                         uploadAsync: true,
                         showClose: false,
                         autoReplace: true,
                         showUploadedThumbs:false,
                         fileActionSettings: {showZoom: false},
                         allowedFileExtensions: ['jpg', 'png', 'gif'],
                         maxFileSize: 500,
                         minFileCount: 1,
                         maxFileCount: 1,
                         overwriteInitial: true,
                         uploadExtraData: {id: id},
                         initialPreview: ['/img/' + id + '.jpg?t='+ Math.random()],
                         initialPreviewAsData: true,
                         initialPreviewFileType: 'image',
                         initialPreviewConfig: [{
                         caption: title,
                         url: '/img-delete',
                         key: id + '.jpg'
                         }]
                         });*/
                    }
                }
            )

            /*菜品 保留 删除按钮*/
            .on('click', 'tr[data-delete=0] button,tr[data-delete=1] button', function () {
                $tr = $(this.parentNode.parentNode);
                $tr.attr('data-delete', ($tr.attr('data-delete') - 0 + 1) % 2);
                var $p = $tr.find('p');
                $p.each(function () {
                    this.innerHTML = this.nextSibling.value;
                });
                $p.filter(':odd').css('padding-right', '14px').css('padding-left', function () {
                    return (6 - this.innerHTML.length) * 8;
                });

            })

            /*菜名 验证正确后,提交后台,否则弹出tooltip提示条*/
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

            /*价格 验证正确后,提交后台,否则弹出tooltip提示条*/
            .on({
                'input': function () {
                    /* inputvalue = parseFloat(this.value).toFixed(2);*/
                    input(this, this.value, true);
                }
                , 'blur': function () {
                    this.value = parseFloat(this.value).toFixed(2);
                    blur(this, '/postprice')
                }
            }, 'tr:not([data-delete]) input[type=number]');
        /* .on('click', 'a', function () {
         $tr = $('tr');
         var $button = $('button');
         if (this.innerHTML == '管理' && !$("input[aria-describedby]").length) {
         this.innerHTML = '确定';
         $tr.attr('data-delete', 0);
         $button.addClass('btn-primary');
         } else {
         this.innerHTML = '管理';
         var ids = [];
         $tr.filter('[data-delete=1]').each(function () {
         ids.push(this.getAttribute('data-id'));
         this.innerHTML = '';
         });
         if (ids.length) {
         $.post("/postdelete", {ids: ids.toString()});
         }
         $tr.removeAttr('data-delete');
         $button.removeClass('btn-primary');
         }
         });*/

        /*菜品图片 上传/删除/更新 功能*/
        $modal
            .on('click', '#dish-img a:first', function () {
                $(this).next().trigger('click');
            })
            .on('click', '#dish-img a:last', function () {
                var warnings = this.parentNode.previousSibling.firstChild;
                if (this.parentNode.firstChild.innerHTML != '无') {
                    var tr = $modal.data('arg');
                    var id = tr.dataset.id;
                    warnings.innerHTML = '';
                    $.ajax({
                        url: '/img-delete',
                        type: 'POST',
                        context: this,
                        cache: false,
                        data: {id: id}
                    }).done(function () {
                        this.parentNode.previousSibling.previousSibling.src = '/img/无?' + new Date().getTime();
                        this.parentNode.firstChild.innerHTML = '无';
                        tr.getElementsByTagName('a')[0].innerHTML = '无';
                        this.previousSibling.previousSibling.value = '';
                        warnings.innerHTML = '删除成功!';
                    }).fail(function () {
                        warnings.innerHTML = '删除失败,发生错误!';
                    })
                } else {
                    warnings.innerHTML = '菜品没有图片!';
                }
            })
            .on('change', '#dish-img input', function () {
                var img = this.files[0];
                if (img) {
                    var warnings = this.parentNode.previousSibling.firstChild;
                    if (img.type == 'image/jpeg' || img.type == 'image/png' || img.type == 'image/gif') {
                        if (img.size < 512000) {
                            if (img.name.length <= 15) {
                                warnings.innerHTML = '';
                                var tr = $modal.data('arg');
                                var id = tr.dataset.id;
                                var formdata = new FormData();
                                formdata.append('img', img);
                                formdata.append('id', id);
                                $.ajax({
                                    url: '/img-upload',
                                    type: 'POST',
                                    context: this,
                                    cache: false,
                                    data: formdata,
                                    processData: false,
                                    contentType: false
                                }).done(function () {
                                        this.parentNode.previousSibling.previousSibling.src = '/img/' + img.name + "?" + new Date().getTime();
                                        this.previousSibling.previousSibling.previousSibling.innerHTML = img.name;
                                        tr.getElementsByTagName('a')[0].innerHTML = img.name;
                                        warnings.innerHTML = '上传成功!';
                                    }
                                ).fail(function () {
                                    warnings.innerHTML = '上传失败,发生错误!';
                                });
                            } else {
                                warnings.innerHTML = '文件名(包括扩展名)不能超过15个字符!';
                            }
                        } else {
                            warnings.innerHTML = '超过500KB大小限制!';
                        }
                    } else {
                        warnings.innerHTML = '上传图片必须为jpg,png,gif格式!';
                    }
                }
            });

        /*浏览器窗口尺寸缩放时,tooltip提示条保持相对位置不变*/
        $(window).on('resize', function () {
            $("input[aria-describedby]").tooltip('show');
        });

        /*失去焦点通用函数*/
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

        /*验证输入正确性,通用函数*/
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
    }

    /*function getmenu(type) {
     /!*AJAX异步读取URL:/getmenu处的后台数据,获取菜单*!/
     $.post("/getmenu", {type: type}, function (Menu) {
     for (var i in Menu) {
     trs += "<tr data-id=" + Menu[i].id + " data-onoff=" + Menu[i].onoff + " ><td class='col-xs-6'><div class='col-xs-2'></div><span><p></p><input " + disable[Menu[i].onoff] + " maxlength='20' readonly='true' name='' data-toggle='tooltip' data-placement='auto left' data-title='点击修改' style =' width:" + $div.html(Menu[i].dishname).outerWidth(true) + "px' value='" + Menu[i].dishname + "'/><strong class='recommended'>" + Menu[i].recommended + "</strong></span></td><td><span><p></p><input type='number' " + disable[Menu[i].onoff] + " readonly='true' name='' data-toggle='tooltip' data-placement='auto left' data-title='点击修改' value='" + Menu[i].price.toFixed(2) + "'/></span></td><td><button class='btn btn-default btn-sm'></button></td></tr>";
     }
     table.innerHTML = trs;
     $("input").tooltip();
     var $tr;
     var $this;
     var illegal;
     /!*单击设置推荐菜*!/
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
     /!*同步数据库menu表,recommended字段*!/
     $.post("/postrecommended", {'recommended': $recommend.text(), 'id': $tr.data('id')});
     }
     break;
     case 'INPUT':
     $this = $(e.target);
     if ($this.prop('readonly') && $this.is(':focus')) {
     $this.prop('readonly', false);
     $this.css('background-color', 'azure');
     /!*inputvalue = $this.val();*!/
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
     /!*   if (e.target.nodeName != 'INPUT') {
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
     }*!/
     })
     .on('click', 'tr[data-delete=0] button,tr[data-delete=1] button', function () {
     $tr = $(this.parentNode.parentNode);
     $tr.attr('data-delete', ($tr.attr('data-delete') - 0 + 1) % 2);
     var $p = $tr.find('p');
     $p.each(function () {
     this.innerHTML = this.nextSibling.value;
     });
     $p.filter(':odd').css('padding-right', '14px').css('padding-left', function () {
     return (6 - this.innerHTML.length) * 8;
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
     /!* inputvalue = parseFloat(this.value).toFixed(2);*!/
     input(this, this.value, true);
     }
     , 'blur': function () {
     this.value = parseFloat(this.value).toFixed(2);
     blur(this, '/postprice')
     }
     }, 'tr:not([data-delete]) input[type]');
     /!* .on('click', 'a', function () {
     $tr = $('tr');
     var $button = $('button');
     if (this.innerHTML == '管理' && !$("input[aria-describedby]").length) {
     this.innerHTML = '确定';
     $tr.attr('data-delete', 0);
     $button.addClass('btn-primary');
     } else {
     this.innerHTML = '管理';
     var ids = [];
     $tr.filter('[data-delete=1]').each(function () {
     ids.push(this.getAttribute('data-id'));
     this.innerHTML = '';
     });
     if (ids.length) {
     $.post("/postdelete", {ids: ids.toString()});
     }
     $tr.removeAttr('data-delete');
     $button.removeClass('btn-primary');
     }
     });*!/

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
     }*/
}());

