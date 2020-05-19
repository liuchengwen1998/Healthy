var areaData = address;
var $form;
var form;
var $;
layui.config({
    base : "js/"
}).use(['form','layer','jquery','laypage','table','element','laydate'], function() {

    layer = parent.layer === undefined ? layui.layer : parent.layer;
    laypage = layui.laypage;
    $ = layui.jquery;
    table = layui.table;
    element = layui.element;
    form = layui.form;
    $form = $('form');
    layedit = layui.layedit;


    var laydate = layui.laydate;

    loadProvince(); //加载省信息

    //自定义格式
    laydate.render({
        elem: '#verifyDate'
        , format: 'yyyy年MM月dd日'
    });

    //绘制下拉框   民族 、 教育程度 、婚姻状况
    var nations = ["汉族", "蒙古族", "回族", "藏族", "维吾尔族", "苗族", "彝族", "壮族", "布依族", "朝鲜族", "满族", "侗族", "瑶族", "白族",
        "土家族", "哈尼族", "哈萨克族", "傣族", "黎族", "傈僳族", "佤族", "畲族", "高山族", "拉祜族", "水族", "东乡族", "纳西族", "景颇族", "柯尔克孜族", "土族",
        "达斡尔族", "仫佬族", "羌族", "布朗族", "撒拉族", "毛南族", "仡佬族", "锡伯族", "阿昌族", "普米族", "塔吉克族", "怒族", "乌孜别克族", "俄罗斯族", "鄂温克族",
        "德昂族", "保安族", "裕固族", "京族", "塔塔尔族", "独龙族", "鄂伦春族", "赫哲族", "门巴族", "珞巴族", "基诺族"];
    var option = "";
    for (var i = 0; i <
    nations.length; i++) {
        option += '<option value="' + (i + 1) + '">' + nations[i] + '</option>';
    }
    $('#nation').append(option);
    var edu = ["文盲", "小学", "初中", "高中", "专科", "本科", "研究生", "不详"];
    var option_edu = "";
    for (var i = 0; i < edu.length; i++) {
        option_edu += '<option value="' + (i + 1) + '">' + edu[i] + '</option>';
    }
    $('#edu').append(option_edu);
    var marital = ["未婚", "已婚", "离异", "保密"];
    var option_marital = "";
    for (var i = 0; i < marital.length; i++) {
        option_marital += '<option value="' + (i + 1) + '">' + marital[i] + '</option>';
    }
    $('#marital').append(option_marital);
    var sex = ["男", "女"];
    var option_sex = "";
    for (var i = 0; i < sex.length; i++) {
        option_sex += '<option value="' + (i + 1) + '">' + sex[i] + '</option>';
    }
    $('#sex').append(option_sex);
    form.render('select');

    $(function () {
        /*var res1 = getUrlParams('id');
        var res2 = getUrlParams('type');*/
        //if (res1 != undefined) {
        $.ajax({
            url: '/archives/self_achives',
            type: 'post',
            async: false,
            dataType: 'json',
            data: {},
            success(data) {
                console.log(data.data)
                data = data.data;
                $('#name').val(data.name);
                $('#sex').val(data.sex);
                $('#age').val(data.age);
                $('#verifyDate').val(data.birth);
                $('#identity').val(data.identity);
                $('#nation').val(data.nation);
                $('#phone').val(data.phone);
                $('#email').val(data.email);
                $('#province').val(data.province);
                $('#city').val(data.city);
                $('#area').val(data.area);
                $('#work').val(data.work);
                $('#edu').val(data.edu);
                $('#marital').val(data.marital);
                $('#profession').val(data.profession);
                $('#medicalnumber').val(data.medicalnumber);
                $('#pre_history').val(data.pre_history);
                $('#drug_history').val(data.drug_history);
                $('#family_history').val(data.family_history);
                $("input[name=bloodtype][value='A型']").attr("checked", data.bloodtype == 'A型' ? true : false);
                $("input[name=bloodtype][value='B型']").attr("checked", data.bloodtype == 'B型' ? true : false);
                $("input[name=bloodtype][value='O型']").attr("checked", data.bloodtype == 'O型' ? true : false);
                $("input[name=bloodtype][value='AB型']").attr("checked", data.bloodtype == 'AB型' ? true : false);
                $("input[name=bloodtype][value='不详']").attr("checked", data.bloodtype == '不详' ? true : false);
                $("input[name=paymed][value='1']").attr("checked", data.paymed == 1 ? true : false);
                $("input[name=paymed][value='2']").attr("checked", data.paymed == 2 ? true : false);
                $("input[name=paymed][value='3']").attr("checked", data.paymed == 3 ? true : false);
                $("input[name=paymed][value='4']").attr("checked", data.paymed == 4 ? true : false);
                $("input[name=paymed][value='5']").attr("checked", data.paymed == 5 ? true : false);
                $("input[name=paymed][value='6']").attr("checked", data.paymed == 6 ? true : false);
                $("input[name=paymed][value='7']").attr("checked", data.paymed == 7 ? true : false);
                $("input[name=paymed][value='8']").attr("checked", data.paymed == 8 ? true : false);
                $("input[name=RHbloodtype][value='否']").attr("checked", data.rhbloodtype == '否' ? true : false);
                $("input[name=RHbloodtype][value='是']").attr("checked", data.rhbloodtype == '是' ? true : false);
                $("input[name=RHbloodtype][value='不详']").attr("checked", data.rhbloodtype == '不详' ? true : false);
                form.render();
            }
        })

    })


    table.render({
        elem: '#test2' //指定原始表格元素选择器（推荐id选择器）
        , title: ""	//表格标题
        , url: '/peis/selfPeis'	//数据接口
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
                , {field: 'name', width: '10%', title: '姓名'}
                , {field: 'identity', width: '15%', title: '身份证号码'}
                , {field: 'phone', width: '15%', title: '手机号码'}
                , {field: 'result', width: '15%', title: '体检结果'}
                , {field: 'checkUser', width: '15%', title: '体检者'}
                , {field: 'creat_time', width: '15%', title: '体检时间'}
                , {fixed: 'right', title: '操作', align: 'left', toolbar: '#barDemo'} 	//添加工具条
            ]
        ]
        , id: 'testReload'

    });

    table.render({
        elem: '#test3' //指定原始表格元素选择器（推荐id选择器）
        , title: ""	//表格标题
        , url: '/treatment/prerecored'	//数据接口
        , method: 'post'
        , page: true
        , totalRow: true //开启合计行
        , limits: [10, 20, 50]
        , limit: 10
        , toolbar: '#toolbar0'
        , skin: 'line ' //表格风格 line （行边框风格）row （列边框风格）nob （无边框风格）
        , where: {
            type: 0,
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
            }, {
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


    layui.use(['form', 'layer', 'jquery', 'laypage', 'table', 'laytpl'], function () {
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
        window.Urladd = function (variable) {
            var query = window.location.search.substring(1);
            var vars = query.split("&");
            for (var i = 0; i < vars.length; i++) {
                var pair = vars[i].split("=");
                if (pair[0] == variable) {
                    return pair[1];
                }
            }
            return (false);
        }

    });


//加载省数据
    function loadProvince() {
        var proHtml = '';
        for (var i = 0; i < areaData.length; i++) {
            proHtml += '<option value="' + areaData[i].provinceCode + '_' + areaData[i].mallCityList.length + '_' + i + '">' + areaData[i].provinceName + '</option>';
        }
        //初始化省数据
        $form.find('select[name=province]').append(proHtml);
        form.render();
        form.on('select(province)', function (data) {
            $form.find('select[name=area]').html('<option value="">请选择县/区</option>');
            var value = data.value;
            var d = value.split('_');
            var code = d[0];
            var count = d[1];
            var index = d[2];
            if (count > 0) {
                loadCity(areaData[index].mallCityList);
            } else {
                $form.find('select[name=city]').attr("disabled", "disabled");
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
        form.on('select(city)', function (data) {
            var value = data.value;
            var d = value.split('_');
            var code = d[0];
            var count = d[1];
            var index = d[2];
            if (count > 0) {
                loadArea(citys[index].mallAreaList);
            } else {
                $form.find('select[name=area]').attr("disabled", "disabled");
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
        form.on('select(area)', function (data) {
        });
    }

    function getUrlParams(name) { // 不传name返回所有值，否则返回对应值
        var url = window.location.search;
        if (url.indexOf('?') == 1) {
            return false;
        }
        url = url.substr(1);
        url = url.split('&');
        var name = name || '';
        var nameres;
        // 获取全部参数及其值
        for (var i = 0; i < url.length; i++) {
            var info = url[i].split('=');
            var obj = {};
            obj[info[0]] = decodeURI(info[1]);
            url[i] = obj;
        }
        // 如果传入一个参数名称，就匹配其值
        if (name) {
            for (var i = 0; i < url.length; i++) {
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
})



