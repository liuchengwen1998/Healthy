layui.config({
	base : "js/"
}).use(['form','layer','element'],function(){
	const form = layui.form,
		layer = parent.layer === undefined ? layui.layer : parent.layer,
		element = layui.element,
		$ = layui.jquery;
	element.on('tab(docDemoTabBrief)', function(data){
		console.log(data);


	});
	$(function(){

		$('#login').show();
		$('#editPwd').hide();


		var show_num = [];
		draw(show_num);

		$("#canvas").on('click',function(){
			draw(show_num);
		})

		//手机号码登录
		form.on("submit(phone_login)",function(data){
			//弹出loading
			var loginLoading = top.layer.msg('登陆中，请稍候',
				{
					icon : 16,
					time : false,
					shade : 1
				}
			);
			//记录ajax请求返回值
			let ajaxReturnData;
			//登陆验证
			$.ajax(
				{
					url : '/checklogin/login_phone',
					type : 'post',
					async : false,
					dataType:'json',
					data : data.field,
					success : function (data)
					{
						console.log(data)
						ajaxReturnData = data;
					}
				}
			);

			//登录成功
			if (ajaxReturnData.code === 200 )
			{
				window.location.href = "/index";
				top.layer.close(loginLoading);
				return false;
			}
			else
			{
				message = ajaxReturnData.msg;
				top.layer.close(loginLoading);
				top.layer.msg(message,
					{
						icon : 5,
						time: 1000,
						shade: 0.8,
					}
				);
				$('#smscode_L').val('');
				return false;
			}

		},

		//密码登录按钮事件
		form.on("submit(login)",function(data){


			var val = $("#code").val().toLowerCase();
			var num = show_num.join("");
			if(val !== num){
				top.layer.msg("验证码不正确",
					{
						icon : 5,
						time: 1000,
						shade: 0.8,
					}
				);
				$("#code").val('');
				draw(show_num);
				return false;
			}

			//弹出loading
			var loginLoading = top.layer.msg('登陆中，请稍候',
				{
					icon : 16,
					time : false,
					shade : 1
				}
			);
			//记录ajax请求返回值
			var ajaxReturnData;
			//登陆验证
			$.ajax(
				{
					url : '/checklogin/login',
					type : 'post',
					async : false,
					dataType:'json',
					data : data.field,
					success : function (data)
					{
						console.log(data)
						ajaxReturnData = data;
					}
				}
			);

			//登录成功
			if (ajaxReturnData.code === 200 )
			{
				window.location.href = "/index";
				top.layer.close(loginLoading);
				return false;
			}
			else
			{
				message = ajaxReturnData.msg;
				top.layer.close(loginLoading);
				top.layer.msg(message,
					{
						icon : 5,
						time: 1000,
						shade: 0.8,
					}
				);
				$("#code").val('');
				draw(show_num);
				return false;
			}


		})
	)});


	function draw(show_num) {
		var canvas_width=$('#canvas').width();
		var canvas_height=$('#canvas').height();
		var canvas = document.getElementById("canvas");//获取到canvas的对象，演员
		var context = canvas.getContext("2d");//获取到canvas画图的环境，演员表演的舞台
		canvas.width = canvas_width;
		canvas.height = canvas_height;
		var sCode = "A,B,C,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0";
		var aCode = sCode.split(",");
		var aLength = aCode.length;//获取到数组的长度

		for (var i = 0; i <= 3; i++) {
			var j = Math.floor(Math.random() * aLength);//获取到随机的索引值
			var deg = Math.random() * 30 * Math.PI / 180;//产生0~30之间的随机弧度
			var txt = aCode[j];//得到随机的一个内容
			show_num[i] = txt.toLowerCase();
			var x = 10 + i * 20;//文字在canvas上的x坐标
			var y = 20 + Math.random() * 8;//文字在canvas上的y坐标
			context.font = "bold 23px 微软雅黑";

			context.translate(x, y);
			context.rotate(deg);

			context.fillStyle = randomColor();
			context.fillText(txt, 0, 0);

			context.rotate(-deg);
			context.translate(-x, -y);
		}
		for (var i = 0; i <= 5; i++) { //验证码上显示线条
			context.strokeStyle = randomColor();
			context.beginPath();
			context.moveTo(Math.random() * canvas_width, Math.random() * canvas_height);
			context.lineTo(Math.random() * canvas_width, Math.random() * canvas_height);
			context.stroke();
		}
		for (var i = 0; i <= 30; i++) { //验证码上显示小点
			context.strokeStyle = randomColor();
			context.beginPath();
			var x = Math.random() * canvas_width;
			var y = Math.random() * canvas_height;
			context.moveTo(x, y);
			context.lineTo(x + 1, y + 1);
			context.stroke();
		}
	}

	function randomColor() {//得到随机的颜色值
		var r = Math.floor(Math.random() * 256);
		var g = Math.floor(Math.random() * 256);
		var b = Math.floor(Math.random() * 256);
		return "rgb(" + r + "," + g + "," + b + ")";
	}


	window.editDiv = function (v) {

		if (v==1){
			$('#login').hide();
			$('#editPwd').show();
		}else {
			$('#login').show();
			$('#editPwd').hide();
		}
	}

	$('#sendBtn_L').on('click',function () {
		var memPhone = $("#login_phone").val();
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


	window.sendCode =  function (){
		var memPhone = $("#phone").val();
		console.log(memPhone.length);
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
						timer();
					}else{
						layer.msg("获取验证码失败");
					}
				},
				error: function(data) {
					layer.msg('连接超时！');
				},
			});
		}
	}

	var wait = 60;
	//倒计时
	window.timer = function () {
		if(wait == 0){
			$("#sendBtn").val("获取验证码");
			$("#sendBtn").removeAttr("disabled");
			$("#sendBtn").css("border-color","1e9fff").css("background", "#ffffff").css("cursor", "pointer");
			wait = 60;
		}else{
			$("#sendBtn").attr("disabled","true");
			$("#sendBtn").css("border-color","fbfbfb").css("background", "#ccc").css("cursor", "not-allowed");
			$("#sendBtn").val(wait + "秒后重发");
			wait--;
			setTimeout(function() {timer()}, 1000);
		}
	};

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
			$("#sendBtn_L").val(wait + "秒后重发");
			wait_p--;
			setTimeout(function() {timer_L()}, 1000);
		}
	};


})




