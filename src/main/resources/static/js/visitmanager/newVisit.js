var $form;
var form;
var $;
layui.config({
    base : "js/"
}).use(['form','layer','jquery','layedit','laydate'],function() {
    form = layui.form;
    var layer = parent.layer === undefined ? layui.layer : parent.layer;
    $ = layui.jquery;
    $form = $('form');
    laypage = layui.laypage;
    layedit = layui.layedit;

    var laydate = layui.laydate;



    var sex = ["男","女"];
    var option_sex = "";
    for (var i = 0; i < sex.length; i++){
        option_sex += '<option value="' + (i + 1) + '">' + sex[i] + '</option>';
    }
    $('#sex').append(option_sex);
    form.render('select');

    //参数提交
    form.on("submit(demo1)",function(data){
        var index = layer.msg('提交中，请稍候',{icon: 16,time:false,shade:0.8});
        data.field.creator = $('#creator').text();
        console.log(data.field);
        $.ajax(
            {
                url : '/case/saveCase',
                type : 'post',
                async : false,
                dataType:'json',
                data : data.field,
                success : function (data)
                {
                    if (data.code==200){
                        setTimeout(function(){
                            layer.close(index);
                            layer.msg("提交成功！");
                        },2000);
                    }else {
                        setTimeout(function(){
                            layer.close(index);
                            layer.msg("提交失败！");
                        },2000);
                    }
                }
            }
        );
        return false;
    })

})