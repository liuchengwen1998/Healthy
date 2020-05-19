layui.config({
    base : "js/"
}).use(['form','layer','jquery','laypage','table','laytpl'],function(){
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : parent.layer,
        laypage = layui.laypage,
        $ = layui.jquery,
        table = layui.table;
        laytpl = layui.laytpl;


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
        ,title:"药品列表"	//表格标题
        ,url:'/drug/druglist'	//数据接口
        ,method:'post'
        ,page:true
        ,totalRow: true //开启合计行
        ,limits: [10,20,50]
        ,limit:10
        ,toolbar: "#toolbar0"
        ,skin: 'line ' //表格风格 line （行边框风格）row （列边框风格）nob （无边框风格）
        ,cols: [
            [
                {type:'checkbox'} //开启多选框
                ,{field:'number', width:'10%', title: '编号'}
                ,{field:'name', width:'10%', title: '药品名称'}
                ,{field:'count', width:'10%', title: '库存量'}
                ,{field:'price', width:'15%', title: '价格'}
                ,{
                field:'type', width:'10%', title: '类型'
                ,templet: function (d) {
                    return d.type == 0 ? "中药":"西药";
                }
                }
                ,{field:'description',  title: '描述'}
                ,{fixed: 'right', title: '操作', align:'left', toolbar: '#barDemo'} 	//添加工具条
            ]
        ]
        ,id: 'testReload'

    });
//多选删除
    table.on('toolbar(demo)', function(obj){
        var checkStatus = table.checkStatus(obj.config.id)
            ,data = checkStatus.data; //获取选中的数据
        switch(obj.event){
            case 'reload':
                layer.msg('刷新');
                table.reload('testReload', {
                    page: {
                        curr: 1 //重新从第 1 页开始
                    }
                    ,where: {
                        searchVal: ""
                    }
                }, 'data');
                $('#search_input').val('');
                break;
            case 'delAll':
                if(data.length === 0){
                    layer.msg('请选择删除行');
                } else {
                    del_ALl();
                }
                break;
        };
    });
//这里括号里对应table设置的lay-filter属性！！
    table.on('tool(demo)', function(obj) {
        //获取当前行数据
        var data = obj.data;
        //获取event对应的值
        var event = obj.event;
        //获取当前行的dom对象
        var tr = obj.tr;
        if (event === 'del') {	//如果点击了删除按钮
            //执行异步删除方法
            var codeId= "";
            codeId = data.id+","
            layer.confirm("您确定要删除吗",function(){
                $.ajax({
                    type:"POST",
                    url: '/drug/delids',
                    data:{"id":codeId},
                    success:function (data) {
                        if(data.code==200){
                            parent.layer.msg('删除成功！', {icon: 1,time:2000,shade:0.2});
                            location.reload(true);
                        }else{
                            parent.layer.msg('删除失败！', {icon: 2,time:3000,shade:0.2});
                        }
                    }
                })
            })

        }

        if (event === 'edit'){

            openUser('编辑');
            $('#number').attr("disabled",true);
            $('#id').val(data.id);
            $('#number').val(data.number);
            $('#name').val(data.name);
            $('#type').val(data.type);
            $('#count').val(data.count);
            $('#description').val(data.description);
            $('#price').val(data.price);
        }
    });

    $ = layui.$;
    var active = {
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

    var del_ALl = function(){
        var checkStatus = table.checkStatus('testReload');// table.checkStatus是Layui中自带，id: 'testReload'可自定义
        if(checkStatus.data.length==0){
            parent.layer.msg('请先选择要删除的数据行！', {icon: 2});
            return ;
        }
        var codeId= "";
        for(var i=0;i<checkStatus.data.length;i++){
            codeId += checkStatus.data[i].id+",";
        }
        parent.layer.msg('删除中...', {icon: 16,shade: 0.3,time:5000});
//    注释：把删除接口替换成url,http:///www.baidu.com只是案例地址
        layer.confirm("您确定要删除吗",function(){
            $.ajax({
                type:"POST",
                url: '/drug/delids',
                data:{"id":codeId},
                success:function (data) {
                    if(data.code==200){
                        parent.layer.msg('删除成功！', {icon: 1,time:2000,shade:0.2});
                        location.reload(true);
                    }else{
                        parent.layer.msg('删除失败！', {icon: 2,time:3000,shade:0.2});
                    }
                }


            })
        })
    };
    //新增drug里面的按钮提交事件
    form.on('submit(drugSubmit)', function(data){
        // TODO 校验
        //调用下面所写的提交函数
        formSubmit(data);
        return false;
    });

 });

layui.use(['form','layer','jquery','laypage','table','laytpl'], function(){
    laypage = layui.laypage;
        $ = layui.jquery;
        table = layui.table;
    laytpl = layui.laytpl;


    //新建表单的提交函数
    window.formSubmit = function (obj){
        var url = "";
        if ($('#id').val()==""){
            url = "/drug/adddrug";
        }else {
            url = "/drug/editdrug";
        }
        var index = layer.msg('提交中，请稍候',{icon: 16,time:false,shade:0.8});
        $.ajax({

            type: "POST",
            data: obj.field, //序列化表单参数
            url: url,
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

//弹出编辑框
    window.adddrug = function (){
        openUser("新建");
        $('#number').attr("disabled",false);
        $('#id').val("");
        $('#number').val("");
        $('#name').val("");
        $('#type').val("");
        $('#count').val("");
        $('#description').val("");
        $('#price').val("");
    }
    window.openUser = function(title){
        layer.open({
            type:1,
            title: [''+title+'','font-size:18px'],
            fixed:false,
            resize :false,
            shadeClose: false,
            area: ['600px','400px'],
            content:$('#edit'),
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


})

