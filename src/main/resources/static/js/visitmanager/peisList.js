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
        closeButton:true,//显示关闭按钮
        debug:false,//启用debug
        positionClass:"toast-top-right",//弹出的位置,
        showDuration:"300",//显示的时间
        hideDuration:"1000",//消失的时间
        timeOut:"2000",//停留的时间
        extendedTimeOut:"1000",//控制时间
        showEasing:"swing",//显示时的动画缓冲方式
        hideEasing:"linear",//消失时的动画缓冲方式
        iconClass: 'toast-info', // 自定义图标，有内置，如不需要则传空 支持layui内置图标/自定义iconfont类名
        onclick: null, // 点击关闭回调
    };

    //全选
    form.on('checkbox(allChoose)', function(data){
        var child = $(data.elem).parents('table').find('tbody input[type="checkbox"]:not([name="show"])');
        child.each(function(index, item){
            item.checked = data.elem.checked;
        });
        form.render('checkbox');
    });

    //通过判断文章是否全部选中来确定全选按钮是否选中
    form.on("checkbox(choose)",function(data){
        var child = $(data.elem).parents('table').find('tbody input[type="checkbox"]:not([name="show"])');
        var childChecked = $(data.elem).parents('table').find('tbody input[type="checkbox"]:not([name="show"]):checked')
        data.elem.checked;
        if(childChecked.length == child.length){
            $(data.elem).parents('table').find('thead input#allChoose').get(0).checked = true;
        }else{
            $(data.elem).parents('table').find('thead input#allChoose').get(0).checked = false;
        }
        form.render('checkbox');
    })



    table.render({
        elem: '#test' //指定原始表格元素选择器（推荐id选择器）
        ,title:"用户表"	//表格标题
        ,url:'/peis/peislist'	//数据接口
        ,method:'post'
        ,page:true
        ,totalRow: true //开启合计行
        ,limits: [10,20,50]
        ,limit:10
        ,toolbar: '#toolbar0'
        ,skin: 'line ' //表格风格 line （行边框风格）row （列边框风格）nob （无边框风格）
        ,cols: [
            [
                {type:'checkbox'} //开启多选框
                ,{field:'name', width:'10%', title: '姓名'}
                ,{field:'identity', width:'15%', title: '身份证号码'}
                ,{field:'phone', width:'15%', title: '手机号码'}
                ,{field:'result', width:'15%', title: '体检结果'}
                ,{field:'checkUser', width:'15%', title: '体检者'}
                ,{field:'creat_time', width:'15%', title: '体检时间'}
                ,{fixed: 'right', title: '操作', align:'left', toolbar: '#barDemo'} 	//添加工具条
            ]
        ]
        ,id: 'testReload'

    });

    //这里括号里对应table设置的lay-filter属性！！
    table.on('tool(demo)', function(obj) {
        //获取当前行数据
        var data = obj.data;
        //获取event对应的值
        var event = obj.event;
        //获取当前行的dom对象
        var tr = obj.tr;
        if (event === 'detail') {	//如果点击了编辑按钮
            //执行修改方法
            openUser('查看详情')
            $('#id').val(data.id);
            $('#length').attr("disabled",true);
            $('#length').val(data.length);
            $('#weight').val(data.weight);
            $('#left_eye').val(data.left_eye);
            $('#right_eye').val(data.right_eye);
            $('#heart').val(data.heart);
            $("input[name=m_voice][value='0']").attr("checked", data.m_voice == 0 ? true : false);
            $("input[name=m_voice][value='1']").attr("checked", data.m_voice == 1 ? true : false);
            $("input[name=tong_a][value='0']").attr("checked", data.tong_a == 0 ? true : false);
            $("input[name=tong_a][value='1']").attr("checked", data.tong_a == 1 ? true : false);
            $("input[name=voice_a][value='0']").attr("checked", data.voice_a == 0 ? true : false);
            $("input[name=voice_a][value='1']").attr("checked", data.voice_a == 1 ? true : false);
            $("input[name=voice_b][value='0']").attr("checked", data.voice_b == 0 ? true : false);
            $("input[name=voice_b][value='1']").attr("checked", data.voice_b == 1 ? true : false);
            $("input[name=voice_b][value='2']").attr("checked", data.voice_b == 2 ? true : false);
            $("input[name=voice_b][value='3']").attr("checked", data.voice_b == 3 ? true : false);
            $('#result').val(data.result);
        }
    });

})

layui.use(['form','layer','jquery','laypage','table','laytpl'], function(){
    laypage = layui.laypage;
    $ = layui.jquery;
    table = layui.table;
    laytpl = layui.laytpl;

    //新建表单的提交函数
    // window.formSubmit = function (obj){
    //     url = "/peis/editpeis";
    //     var index = layer.msg('提交中，请稍候',{icon: 16,time:false,shade:0.8});
    //     $.ajax({
    //         type: "POST",
    //         data: obj.field, //序列化表单参数
    //         url: url,
    //         success: function (data) {
    //             if (data.code == 200){
    //                 layer.close(index);
    //                 layer.closeAll('page'); //关闭所有页面层
    //                 parent.layer.msg('成功！', {icon: 1,time:2000,shade:0.2});
    //                 load();
    //             }else if (data.code == 7){
    //                 layer.close(index);
    //                 parent.layer.msg(''+data.msg+'', {icon: 2,time:2000,shade:0.2});
    //             }else {
    //                 layer.close(index);
    //                 parent.layer.msg('失败！', {icon: 2,time:2000,shade:0.2});
    //             }
    //
    //         }
    //     });
    // }

    //弹出编辑框
    // window.adduser = function (){
    //     openUser("新建");
    //     $('#id').val("");
    //     $('#username').val("");
    //     $('#password').val("");
    //     $('#phone').val("");
    //     $('#realname').val("");
    //     $('#email').val("");
    //     $('#rolename').val("");
    // }
    window.openUser = function(title){
        layer.open({
            type:1,
            title: [''+title+'','font-size:18px'],
            fixed:false,
            resize :false,
            shadeClose: false,
            area: ['620px','420px'],
            offset: '100px',
            content:$('#detail'),
        });
    }
    window.load = function () {
        table.reload('testReload', {
            page: {
                curr: 1 //重新从第 1 页开始
            }
            ,where: {
                searchVal: ""
            }
        }, 'data');
    }


});