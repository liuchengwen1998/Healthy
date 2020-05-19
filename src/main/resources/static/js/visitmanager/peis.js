var areaData = address;
var $form;
var form;
var $;
layui.config({
    base : "js/"
}).use(['form','layer','jquery','layedit','laydate','upload'],function() {
    form = layui.form;
    var layer = parent.layer === undefined ? layui.layer : parent.layer;
    $ = layui.jquery;
    $form = $('form');
    laypage = layui.laypage;
    layedit = layui.layedit;
    upload = layui.upload;

    var laydate = layui.laydate;

    loadProvince(); //加载省信息


    //自定义格式
    laydate.render({
        elem: '#verifyDate'
        ,format: 'yyyy年MM月dd日'
    });

    //绘制下拉框   民族 、 教育程度 、婚姻状况
    var nations = ["汉族", "蒙古族", "回族", "藏族", "维吾尔族", "苗族", "彝族", "壮族", "布依族", "朝鲜族", "满族", "侗族", "瑶族", "白族",
        "土家族", "哈尼族", "哈萨克族", "傣族", "黎族", "傈僳族", "佤族", "畲族", "高山族", "拉祜族", "水族", "东乡族", "纳西族", "景颇族", "柯尔克孜族", "土族",
        "达斡尔族", "仫佬族", "羌族", "布朗族", "撒拉族", "毛南族", "仡佬族", "锡伯族", "阿昌族", "普米族", "塔吉克族", "怒族", "乌孜别克族", "俄罗斯族", "鄂温克族",
        "德昂族", "保安族", "裕固族", "京族", "塔塔尔族", "独龙族", "鄂伦春族", "赫哲族", "门巴族", "珞巴族", "基诺族"];
    var option = "";
    for(var i = 0; i <
    nations.length; i++) {
        option += '<option value="' + (i + 1) + '">' + nations[i] + '</option>';
    }
    $('#nation').append(option);
    var edu = ["文盲","小学","初中","高中","专科","本科","研究生","不详"];
    var option_edu = "";
    for (var i = 0; i < edu.length; i++){
        option_edu += '<option value="' + (i + 1) + '">' + edu[i] + '</option>';
    }
    $('#edu').append(option_edu);
    var marital = ["未婚","已婚","离异","保密"];
    var option_marital = "";
    for (var i = 0; i < marital.length; i++){
        option_marital += '<option value="' + (i + 1) + '">' + marital[i] + '</option>';
    }
    $('#marital').append(option_marital);
    var sex = ["男","女"];
    var option_sex = "";
    for (var i = 0; i < sex.length; i++){
        option_sex += '<option value="' + (i + 1) + '">' + sex[i] + '</option>';
    }
    $('#sex').append(option_sex);
    form.render('select');


    //指定允许上传的文件类型
    upload.render({
        elem: '#u_checked'
        ,url: '/upload/u_file' //改成您自己的上传接口
        ,accept: 'file' //普通文件
        ,done: function(res){
            layer.msg('上传成功');
            console.log(res);
        }
    });

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
                    $('#verifyDate').val(data.data.birth);
                    $('#identity').val(data.data.identity);
                    $('#phone').val(data.data.phone);
                    $('#medicalnumber').val(data.data.medicalnumber);
                    $('#province').val(data.data.province);
                    $('#city').val(data.data.city);
                    $('#area').val(data.data.area);
                    $('#marital').val(data.data.marital);
                    $('#pre_history').val(data.data.pre_history);
                    $('#drug_history').val(data.data.drug_history);
                    $('#family_history').val(data.data.family_history);
                    $('#nation').val(data.data.nation);
                    $('#age').val(data.data.age);
                    $("input[name=bloodtype][value='A型']").attr("checked", data.data.bloodtype == 'A型' ? true : false);
                    $("input[name=bloodtype][value='B型']").attr("checked", data.data.bloodtype == 'B型' ? true : false);
                    $("input[name=bloodtype][value='O型']").attr("checked", data.data.bloodtype == 'O型' ? true : false);
                    $("input[name=bloodtype][value='AB型']").attr("checked", data.data.bloodtype == 'AB型' ? true : false);
                    $("input[name=bloodtype][value='不详']").attr("checked", data.data.bloodtype == '不详' ? true : false);
                    $("input[name=paymed][value='1']").attr("checked", data.data.paymed == 1 ? true : false);
                    $("input[name=paymed][value='2']").attr("checked", data.data.paymed == 2 ? true : false);
                    $("input[name=paymed][value='3']").attr("checked", data.data.paymed == 3 ? true : false);
                    $("input[name=paymed][value='4']").attr("checked", data.data.paymed == 4 ? true : false);
                    $("input[name=paymed][value='5']").attr("checked", data.data.paymed == 5 ? true : false);
                    $("input[name=paymed][value='6']").attr("checked", data.data.paymed == 6 ? true : false);
                    $("input[name=paymed][value='7']").attr("checked", data.data.paymed == 7 ? true : false);
                    $("input[name=paymed][value='8']").attr("checked", data.data.paymed == 8 ? true : false);
                    $("input[name=RHbloodtype][value='否']").attr("checked", data.data.rhbloodtype == '否' ? true : false);
                    $("input[name=RHbloodtype][value='是']").attr("checked", data.data.rhbloodtype == '是' ? true : false);
                    $("input[name=RHbloodtype][value='不详']").attr("checked", data.data.rhbloodtype == '不详' ? true : false);
                    form.render();
                }else{
                    parent.layer.msg('查询失败！', {icon: 2,time:3000,shade:0.2});
                }
            }
        })
    })

    $(function(){
        $("#msg").html()
    })

    //参数提交
    form.on("submit(save_file)",function(data){
        var index = layer.msg('提交中，请稍候',{icon: 16,time:false,shade:0.8});
        url = '/peis/addPeis';
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
                        $("#msg").show();
                        $("#form_div").hide();
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