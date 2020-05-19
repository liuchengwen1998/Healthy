layui.config({
    base : "/js/"
}).use(['form','layer','jquery','laypage','table','notice'],function() {
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : parent.layer,
        laypage = layui.laypage,
        $ = layui.jquery,
        table = layui.table;
    var notice = layui.notice;


    notice.options = {
        closeButton: true,//显示关闭按钮
        debug: false,//启用debug
        positionClass: "toast-top-right",//弹出的位置,
        showDuration: "300",//显示的时间
        hideDuration: "1000",//消失的时间
        timeOut: "2000",//停留的时间
        extendedTimeOut: "1000",//控制时间
        showEasing: "swing",//显示时的动画缓冲方式
        hideEasing: "linear",//消失时的动画缓冲方式
        iconClass: 'toast-info', // 自定义图标，有内置，如不需要则传空 支持layui内置图标/自定义iconfont类名
        onclick: null, // 点击关闭回调
    };
    table.render({
        elem: '#test' //指定原始表格元素选择器（推荐id选择器）
        , title: ""	//表格标题
        , url: '/treatment/recordInfo'	//数据接口
        , method: 'post'
        , page: true
        , totalRow: true //开启合计行
        , limits: [10, 20, 50]
        , limit: 10
        , toolbar: '#toolbar0'
        , skin: 'line ' //表格风格 line （行边框风格）row （列边框风格）nob （无边框风格）
        , cols: [
            [
                {type: 'checkbox'} //开启多选框
                , {field: 'name', width: '5%', title: '姓名'}
                , {
                field: 'sex', width: '5%', title: '性别'
                , templet: function (s) {
                    return s.sex == 1 ? "男" : "女";
                }
            }
                , {field: 'identity', width: '15%', title: '身份证号'}
                , {field: 'medicalnumber', width: '12%', title: '医保卡号'}
                , {
                field: 'further_visit', width: '8%', title: '复诊'
                , templet: function (f) {
                    return f.further_visit == 0 ? "需复诊" : "无需复诊";
                }
            }
                , {field: 'symptom', width: '15%', title: '主要症状'}
                , {field: 'realname', width: '5%', title: '创建者'}
                , {field: 'create_time', width: '15%', title: '创建时间'}
                , {fixed: 'right', title: '操作', align: 'left', toolbar: '#barDemo'} 	//添加工具条
            ]
        ]
        , id: 'testReload'

    });
    var $ = layui.$, active = {
        reload: function () {
            var search_input = $('#search_input');
            //执行重载
            table.reload('testReload', {
                page: {
                    curr: 1 //重新从第 1 页开始
                }
                , where: {
                    searchVal: search_input.val()
                }
            }, 'data');
        }
    };
    $('#search_btn').click(function () {
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    })

    //为工具条添加监听
    //监听头工具栏事件
    table.on('toolbar(demo)', function (obj) {
        var checkStatus = table.checkStatus(obj.config.id)
            , data = checkStatus.data; //获取选中的数据
        switch (obj.event) {
            case 'reload':
                layer.msg('刷新');
                table.reload('testReload', {
                    page: {
                        curr: 1 //重新从第 1 页开始
                    }
                    , where: {
                        searchVal: ""
                    }
                }, 'data');
                $('#search_input').val('');
                break;
        }
        ;
    });

    //这里括号里对应table设置的lay-filter属性！！
    table.on('tool(demo)', function (obj) {
        //获取当前行数据
        var data = obj.data;
        //获取event对应的值
        var event = obj.event;
        //获取当前行的dom对象
        var tr = obj.tr;
        if (event === 'check') {
            openUser('查看详情')
            $('#identity').attr("disabled", true);
            $('#name').val(data.name);
            $('#identity').val(data.identity);
            $("input[name=further_visit][value='0']").attr("checked", data.further_visit == '需要' ? true : false);
            $("input[name=further_visit][value='1']").attr("checked", data.further_visit == '不需要' ? true : false);
            $("input[name=in_hospital][value='0']").attr("checked", data.in_hospital == '需要' ? true : false);
            $("input[name=in_hospital][value='1']").attr("checked", data.in_hospital == '不需要' ? true : false);
            $('#symptom').val(data.symptom);
            $('#doctors_advice').val(data.doctors_advice);
            $('#id').val(data.id);
        }
    });

    form.on('submit(treatmentSubmit)', function(data){
        // TODO 校验
        //调用下面所写的提交函数
        formSubmit(data);
        return false;
    });
})
layui.use(['form','layer','jquery','laypage','table','laytpl'], function() {
    laypage = layui.laypage;
    $ = layui.jquery;
    table = layui.table;
    laytpl = layui.laytpl;

    //新建表单的提交函数
    window.formSubmit = function (obj){
        if ($('#id').val()!=""){
            url = "/treatment/editTreatment";
        }
        var index = layer.msg('提交中，请稍候',{icon: 16,time:false,shade:0.8});
        $.ajax({
            url : "/treatment/editTreatment",
            type: "POST",
            data: obj.field, //序列化表单参数
            success: function (data) {
                if (data.code == 200){
                    layer.close(index);
                    layer.closeAll('page'); //关闭所有页面层
                    parent.layer.msg('成功！', {icon: 1,time:2000,shade:0.2});
                    load();
                }else {
                    layer.close(index);
                    parent.layer.msg('失败！', {icon: 2,time:2000,shade:0.2});
                }

            }
        });
    }


    window.openUser = function (title) {
        layer.open({
            type: 1,
            title: ['' + title + '', 'font-size:18px'],
            fixed: false,
            resize: false,
            shadeClose: false,
            area: ['600px', '400px'],
            content: $('#check'),
        });
    }

    window.load = function () {
        table.reload('testReload', {
            page: {
                curr: 1 //重新从第 1 页开始
            }
            , where: {
                searchVal: ""
            }
        }, 'data');
    }
});


