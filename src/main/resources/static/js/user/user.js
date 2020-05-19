var areaData = address;
var $form;
var form;
var $;
layui.config({
	base : "../../js/"
    , version: '1.0'
}).use(['form','layer','upload','laydate'],function(){
	form = layui.form;
	var layer = parent.layer === undefined ? layui.layer : parent.layer;
		$ = layui.jquery;
		$form = $('form');
		laydate = layui.laydate;
		upload = layui.upload;
        loadProvince(); //加载省信息

    // layui.upload({
    // 	url : "../../json/userface.json",
    // 	success: function(res){
    // 		var num = parseInt(4*Math.random());  //生成0-4的随机数
    // 		//随机显示一个头像信息
	//     	userFace.src = res.data[num].src;
	//     	window.sessionStorage.setItem('userFace',res.data[num].src);
	//     }
    // });

    //自定义格式
    // laydate.render({
    //     elem: '#test11'
    //     ,format: 'yyyy年MM月dd日'
    // });

    // layarea.render({
    //     elem: '#area-picker',
    //     // data: {
    //     //     province: '广东省',
    //     //     city: '深圳市',
    //     //     county: '龙岗区',
    //     // },
    //     change: function (res) {
    //         //选择结果
    //         console.log(res);
    //     }
    // });

    //个人信息显示
    $(function () {
        //展示用户名
        $('.username').val($('#_username').text());
        $.ajax(
            {
                url : '/user/userInfo',
                type : 'post',
                async : false,
                dataType:'json',
                data : {
                    username:$('#userId').text(),
                },
                success : function (data)
                {
                    if (data.code==200){
                        $('#username').val(data.data.username);
                        $('#rolename').val(data.data.rolename);
                        $('.realName').val(data.data.realname);
                        $('#email').val(data.data.email);
                        $('#phone').val(data.data.phone);
                        $('.address').val(data.data.address);
                        $(".userSex input[value="+data.data.sex+"]").attr("checked","checked");
                        $(".userAddress select[name='province']").val(data.data.province); //省

                        //填充省份信息，同时调取市级信息列表
                        var value = data.data.province;
                        console.log(value)
                        if (value!=null){
                            var d = data.data.province.split('_');
                            var code = d[0];
                            var count = d[1];
                            var index = d[2];
                            if (count > 0) {
                                loadCity(areaData[index].mallCityList);
                                citys = areaData[index].mallCityList
                            } else {
                                $form.find('select[name=city]').attr("disabled","disabled");
                            }
                            $(".userAddress select[name='city']").val(data.data.city); //市
                            //填充市级信息，同时调取区县信息列表
                            var value = data.data.city;
                            var d = value.split('_');
                            var code = d[0];
                            var count = d[1];
                            var index = d[2];
                            if (count > 0) {
                                loadArea(citys[index].mallAreaList);
                            } else {
                                $form.find('select[name=area]').attr("disabled","disabled");
                            }
                            var area = data.data.area;
                            $(".userAddress select[name='area']").val(area);
                            $("#area").find("option[value=area]").attr("selected",'selected');
                            console.log(area);
                            form.render('select',"area");
                        }


                    }
                }
            }
        );
    })

    //添加验证规则
    form.verify({
        newPwd : function(value, item){
            if(value.length < 6){
                return "密码长度不能小于6位";
            }
        },
        confirmPwd : function(value, item){
            if(!new RegExp($("#oldPwd").val()).test(value)){
                return "两次输入密码不一致，请重新输入！";
            }
        }
    })

    //判断是否修改过头像，如果修改过则显示修改后的头像，否则显示默认头像
    if(window.sessionStorage.getItem('userFace')){
    	$("#userFace").attr("src",window.sessionStorage.getItem('userFace'));
    }else{
    	$("#userFace").attr("src","../../images/face.jpg");
    }

    //提交个人资料
    form.on("submit(changeUser)",function(data){
    	var index = layer.msg('提交中，请稍候',{icon: 16,time:false,shade:0.8});
        $.ajax(
            {
                url : '/user/editUser',
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

    //修改密码
    form.on("submit(changePwd)",function(data){
    	var index = layer.msg('提交中，请稍候',{icon: 16,time:false,shade:0.8});
        $.ajax(
            {
                url : '/user/editPwd',
                type : 'post',
                async : false,
                dataType:'json',
                data : data.field,
                success : function (data)
                {
                    if (data.code==200){
                        setTimeout(function(){
                            layer.close(index);
                            layer.msg("修改成功！");
                        },2000);
                    }else {
                        setTimeout(function(){
                            layer.close(index);
                            layer.msg(data.msg);
                        },2000);
                    }
                }
            }
        );
    	return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
    })

    $('#sendBtn_L').on('click',function () {
        var memPhone = $("#phone").val();
        if(memPhone == '' || memPhone.length != 11){
            layer.msg("请输入正确的手机号！");
            return;
        }else{
            $.ajax({
                type: 'GET',
                url: '/fitness/code',
                data: {
                    memPhone : memPhone
                },
                dataType: 'json',
                success: function(data) {
                    if(data){
                        timer_L();
                    }else{
                        layer.msg("获取验证码失败");
                    }
                },
                error: function(data) {
                    layer.msg('连接超时！');
                },
            });
        }
    })

    var wait_p = 60;
    //倒计时
    window.timer_L = function () {
        if(wait_p == 0){
            $("#sendBtn_L").val("获取验证码");
            $("#sendBtn_L").removeAttr("disabled");
            $("#sendBtn_L").css("border-color","b2b2b2").css("background", "#b2b2b2").css("cursor", "pointer");
            wait_p = 60;
        }else{
            $("#sendBtn_L").attr("disabled","true");
            $("#sendBtn_L").css("border-color","fbfbfb").css("background", "#ccc").css("cursor", "not-allowed");
            $("#sendBtn_L").val(wait_p + "秒后重发");
            wait_p--;
            setTimeout(function() {timer_L()}, 1000);
        }
    };

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


    // //普通图片上传
    // var uploadInst = upload.render({
    //     elem: '#photo'
    //     ,url: '/user/updateimg' //改成您自己的上传接口
    //     ,before: function(obj){
    //         //预读本地文件示例，不支持ie8
    //         obj.preview(function(index, file, result){
    //             $('#showphoto').attr('src', result); //图片链接（base64）
    //         });
    //     }
    //     ,size: 1024 //限制文件大小，单位 KB
    //     ,done: function(res){
    //         //如果上传失败
    //         if(res.code > 0){
    //             return layer.msg('上传失败');
    //         }
    //         //上传成功
    //     }
    //     ,error: function(){
    //         //演示失败状态，并实现重传
    //         var demoText = $('#demoText');
    //         demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-xs demo-reload">重试</a>');
    //         demoText.find('.demo-reload').on('click', function(){
    //             uploadInst.upload();
    //         });
    //     }
    // });
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