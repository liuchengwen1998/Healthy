layui.use(['form','layer','jquery','laypage','table','element'], function(){
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : parent.layer,
        laypage = layui.laypage,
        $ = layui.jquery,
        table = layui.table,
        element = layui.element;


    function result(identity){
        table.render({
            elem: '#test' //指定原始表格元素选择器（推荐id选择器）
            , title: ""	//表格标题
            , url: '/treatment/preHistory'	//数据接口
            , method: 'post'
            , page: true
            , totalRow: true //开启合计行
            , limits: [10, 20, 50]
            , limit: 10
            ,where:{
                identity:identity,
            }
            , toolbar: '#toolbar0'
            , skin: 'line ' //表格风格 line （行边框风格）row （列边框风格）nob （无边框风格）
            , cols: [
                [
                    {type: 'checkbox'} //开启多选框
                    , {field: 'name', width: '10%', title: '姓名'}
                    , {
                    field: 'sex', width: '10%', title: '性别'
                    , templet: function (s) {
                        return s.sex === 1 ? "男" : "女";
                    }
                }
                    , {field: 'identity', width: '15%', title: '身份证号'}
                    , {field: 'pre_history', width: '15%', title: '既往病史'}
                    , {field: 'drug_history', width: '15%', title: '药物过敏'}
                    , {field: 'family_history', width: '15%', title: '家族遗传史'}
                ]
            ]
            , id: 'testReload'
        });

        table.render({
            elem: '#test1' //指定原始表格元素选择器（推荐id选择器）
            , title: ""	//表格标题
            , url: '/treatment/prerecored'	//数据接口
            , method: 'post'
            , page: true
            , totalRow: true //开启合计行
            , limits: [10, 20, 50]
            , limit: 10
            , toolbar: '#toolbar0'
            , skin: 'line ' //表格风格 line （行边框风格）row （列边框风格）nob （无边框风格）
            ,where: {
                identity: identity,
            }
            , cols: [
                [
                    {type: 'checkbox'} //开启多选框
                    , {field: 'name', width: '5%', title: '姓名'}
                    , {
                    field: 'sex', width: '5%', title: '性别'
                    , templet: function (s) {
                        return s.sex === 1 ? "男" : "女";
                    }
                }
                    , {field: 'identity', width: '15%', title: '身份证号'}
                    , {field: 'medicalnumber', width: '12%', title: '医保卡号'}
                    , {
                    field: 'further_visit', width: '8%', title: '复诊'
                    , templet: function (f) {
                        return f.further_visit === 0 ? "需复诊" : "无需复诊";
                    }
                },{
                    field: 'in_hospital', width: '8%', title: '住院'
                    , templet: function (f) {
                        return f.in_hospital === 0 ? "是" : "否";
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

    }

    $('#search_btn').click(function () {
        var identity=$("#search_input").val();
        $.ajax({
            type:"POST",
            url:"/file/checkidentity",
            data:{
                identity:identity,
            },
            success:function (data) {
                if(data.code==200){
                    result(identity);
                    $('#msg1').hide();
                    $('#msg2').hide();
                    $('#history').show();
                    $('#record').show();
                }else{
                    parent.layer.msg('身份证号码不存在！', {icon: 2,time:3000,shade:0.2});
                }
            }
        })

        // $('#la1').html($('#history').html());
        // $('#la2').html($('#record').html());
        return false;
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
    table.on('tool(demo1)', function (obj) {
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
        }
    });

});

layui.use(['form','layer','jquery','laypage','table','laytpl'], function() {
    laypage = layui.laypage;
    $ = layui.jquery;
    table = layui.table;
    laytpl = layui.laytpl;


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
    window.Urladd = function(variable){
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i=0;i<vars.length;i++) {
            var pair = vars[i].split("=");
            if(pair[0] == variable){return pair[1];}
        }
        return(false);
    }

});


