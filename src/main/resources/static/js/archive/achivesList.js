layui.config({
    base : "/js/"
}).use(['form','layer','jquery','laypage','table','notice'],function(){
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
        , title: "档案表"	//表格标题
        , url: '/archives/archivesList'	//数据接口
        , method: 'post'
        , page: true
        , totalRow: true //开启合计行
        , limits: [10, 20, 50]
        , limit: 10
        , toolbar: '#toolbar0'
        , skin: 'line ' //表格风格 line （行边框风格）row （列边框风格）nob （无边框风格）
        , cols: [
            [
                {type:'checkbox'} //开启多选框
                , {field: 'name', width: '10%', title: '姓名'}
                , {
                field:'sex', width:'10%', title: '性别'
                ,templet: function (s) {
                    return s.sex == 1 ? "男" : "女";
                }
            }
                , {field: 'age', width: '10%', title: '年龄'}
                , {field: 'identity', width: '15%', title: '身份证号'}
                , {field: 'phone', width: '15%', title: '手机'}
                , {field: 'medicalnumber', width: '15%', title: '医保卡号'}
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
        };
    });
    //这里括号里对应table设置的lay-filter属性！！
    table.on('tool(demo)', function (obj) {
        //获取当前行数据
        var data = obj.data;
        //获取event对应的值
        var event = obj.event;
        //获取当前行的dom对象
        var tr = obj.tr;

        if (event === 'edit') {	//如果点击了修改按钮
            location.href = '/page/links/linksAdd?id='+data.id+'&type=edit'
        }else if(event ==='check'){
            location.href = '/page/links/linksAdd?id='+data.id+'&type=check'
        }else if (event === 'check_record'){
            location.href = '/page/archives/visitList?identity='+data.identity+''
            // detailtable(data.identity);
            // console.log(data.identity);
            // opendetail("查看就诊记录");

        }
    });





})
