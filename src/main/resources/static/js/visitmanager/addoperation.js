var areaData = address;
var $form;
var form;
var $;
layui.config({
    base : "js/"
}).use(['form','layer','jquery','formSelects','layedit','laydate','upload'],function() {
    var formSelects = layui.formSelects;
    form = layui.form;
    var layer = parent.layer === undefined ? layui.layer : parent.layer;
    $ = layui.jquery;
    $form = $('form');
    laypage = layui.laypage;
    layedit = layui.layedit;
    upload = layui.upload;
    var laydate = layui.laydate;

    loadProvince(); //加载省信息

    $('#search_btn').click(function () {
        $.ajax({
            type:"POST",
            url: '/treatment/fileInfo',
            data:{
                "identity":$("#search_input").val()
            },
            success:function (data) {
                if(data.code==200){
                    $("#msg").hide();
                    $("#form_div").show();
                    $('#name').val(data.data.name);
                    $('#sex').val(data.data.sex);

                    $('#age').val(data.data.age);
                    $('#verifyDate').val(data.data.birth);
                    $('#identity').val(data.data.identity);
                    $('#phone').val(data.data.phone);
                    $('#medicalnumber').val(data.data.medicalnumber);
                    $('#province').val(data.data.province);
                    $('#city').val(data.data.city);
                    $('#area').val(data.data.area);
                    form.render();
                }else{
                    parent.layer.msg('查询失败！', {icon: 2,time:3000,shade:0.2});
                }
            }
        })
    })

    $(function(){
        $("#msg").html()

        $.ajax({
            type:"POST",
            url: '/drug/drug_counts',
            data:{
            },
            success:function (data) {
                data = data.data;
                var option = "";
                console.log(data)
                for (var i=0;i<data.length;i++){
                    option+='<option value="' + data[i].id + '">' + data[i].name + '</option>';
                }
                $('#medicine').append(option);
                formSelects.render('select');
            }
        })

        $.ajax({
            type:"POST",
            url: '/treatment/project_counts',
            success:function (data) {
                var data = data.data;
                var option = "";
                console.log(data)
                for (var i=0;i<data.length;i++){
                    option+='<option value="' + data[i].id + '">' + data[i].projects_name + '</option>';
                }
                $('#projects').append(option);
                formSelects.render('select');
            }
        })

    })

    //参数提交
    form.on("submit(save_file)",function(data){
        var index = layer.msg('提交中，请稍候',{icon: 16,time:false,shade:0.8});
        console.log(data.field);
        url = '/lcwTreatment/addTreatment';
        $.ajax(
            {
                url : url,
                type : 'post',
                async : false,
                dataType:'json',
                data : data.field,
                success : function (data)
                {
                    if (data.code===200){
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

    //自定义格式
    laydate.render({
        elem: '#verifyDate'
        ,format: 'yyyy年MM月dd日'
    });

})



//加载省数据
function loadProvince() {
    var proHtml = '';
    for (var i = 0; i < areaData.length; i++) {
        proHtml += '<option value="' + areaData[i].provinceCode + '_' + areaData[i].mallCityList.length + '_' + i + '">' + areaData[i].provinceName + '</option>';
    }
    //初始化省数据
    $form.find('select[name=province]').append(proHtml);
    form.render();
    form.on('select(province)', function(data) {
        $form.find('select[name=area]').html('<option value="">请选择县/区</option>');
        var value = data.value;
        var d = value.split('_');
        var code = d[0];
        var count = d[1];
        var index = d[2];
        if (count > 0) {
            loadCity(areaData[index].mallCityList);
        } else {
            $form.find('select[name=city]').attr("disabled","disabled");
        }
    });
}
//加载市数据
function loadCity(citys) {
    var cityHtml = '<option value="">请选择市</option>';
    for (var i = 0; i < citys.length; i++) {
        cityHtml += '<option value="' + citys[i].cityCode + '_' + citys[i].mallAreaList.length + '_' + i + '">' + citys[i].cityName + '</option>';
    }
    $form.find('select[name=city]').html(cityHtml).removeAttr("disabled");
    form.render();
    form.on('select(city)', function(data) {
        var value = data.value;
        var d = value.split('_');
        var code = d[0];
        var count = d[1];
        var index = d[2];
        if (count > 0) {
            loadArea(citys[index].mallAreaList);
        } else {
            $form.find('select[name=area]').attr("disabled","disabled");
        }
    });
}
//加载县/区数据
function loadArea(areas) {
    var areaHtml = '<option value="">请选择县/区</option>';
    for (var i = 0; i < areas.length; i++) {
        areaHtml += '<option value="' + areas[i].areaCode + '">' + areas[i].areaName + '</option>';
    }
    $form.find('select[name=area]').html(areaHtml).removeAttr("disabled");
    form.render();
    form.on('select(area)', function(data) {});
}

function getUrlParams(name) { // 不传name返回所有值，否则返回对应值
    var url = window.location.search;
    if (url.indexOf('?') == 1) { return false; }
    url = url.substr(1);
    url = url.split('&');
    var name = name || '';
    var nameres;
    // 获取全部参数及其值
    for(var i=0;i<url.length;i++) {
        var info = url[i].split('=');
        var obj = {};
        obj[info[0]] = decodeURI(info[1]);
        url[i] = obj;
    }
    // 如果传入一个参数名称，就匹配其值
    if (name) {
        for(var i=0;i<url.length;i++) {
            for (const key in url[i]) {
                if (key == name) {
                    nameres = url[i][key];
                }
            }
        }
    } else {
        nameres = url;
    }
    // 返回结果
    return nameres;
}
