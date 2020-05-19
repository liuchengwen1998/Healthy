layui.config({
	base : "/js/"
}).use(['form','element','layer','jquery','notice','table'],function(){
	var form = layui.form,
		layer = parent.layer === undefined ? layui.layer : parent.layer,
		element = layui.element,
		$ = layui.jquery,
		table = layui.table;
	var notice = layui.notice;

	$(".panel a").on("click",function(){
		window.parent.addTab($(this));
	})

	$(function () {
		$.ajax({
			type: 'GET',
			url: '/drug/counts',
			dataType: 'json',
			success: function(data) {
				$(".drugAll span").text(data.length);
			}

		});

		$.ajax({
			type: 'GET',
			url: '/user/counts',
			dataType: 'json',
			success: function(data) {
				$(".userAll span").text(data.length);
			}

		});
		$.ajax({
			type: 'GET',
			url: '/archives/counts',
			dataType: 'json',
			success: function(data) {
				$(".archives span").text(data.length);
			}

		});
		$.ajax({
			type: 'GET',
			url: '/treatment/allInHos',
			dataType: 'json',
			success: function(data) {
				$(".allInHos span").text(data.data);
			}

		});
		$.ajax({
			type: 'GET',
			url: '/treatment/allIncheck',
			dataType: 'json',
			success: function(data) {
				$(".Incheck span").text(data.data);
			}

		});
		$.ajax({
			type: 'GET',
			url: '/peis/allpeis',
			dataType: 'json',
			success: function(data) {
				$(".peis span").text(data.data);
			}

		});
	})



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
		, title: ""	//表格标题
		, url: '/treatment/recordInfo'	//数据接口
		, method: 'post'
		, page: true
		, totalRow: true //开启合计行
		, limits: [10, 20, 50]
		, limit: 10
		, toolbar: '#toolbar0'
		, skin: 'line ' //表格风格 line （行边框风格）row （列边框风格）nob （无边框风格）
		,where: {
			check: 0,
		}
		, cols: [
			[
				{type: 'checkbox'} //开启多选框
				, {field: 'name', width: '8%', title: '姓名'}
				, {
				field: 'sex', width: '8%', title: '性别'
				, templet: function (s) {
					return s.sex === 1 ? "男" : "女";
				}
			}
				, {field: 'identity', width: '15%', title: '身份证号'}
				, {field: 'medicalnumber', width: '12%', title: '医保卡号'}
				, {
				field: 'further_visit', width: '10%', title: '复诊'
				, templet: function (f) {
					return f.further_visit === 0 ? "需复诊" : "无需复诊";
				}
			}
				, {field: 'realname', width: '8%', title: '创建者'}
				, {field: 'create_time', width: '20%', title: '创建时间'}
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
		}
		;
	});

	//这里括号里对应table设置的lay-filter属性！！
	table.on('tool(demo)', function (obj) {
		//获取当前行数据
		var data = obj.data;
		//获取event对应的值
		var event = obj.event;
		//获取当前行的dom对象
		var tr = obj.tr;
		if (event === 'check') {
			$.ajax({
				type: 'post',
				url: '/notice/noticeCheck',
				data: {
					phone:data.phone,
					name:data.name,
				},
				dataType: 'json',
				success: function(data) {
					if (data.code==200){
						notice.success("通知成功");
					}else {
						notice.error(data.msg)
					}
				}

			});

		}
	});





	//数字格式化
	$(".panel span").each(function(){
		$(this).html($(this).text()>9999 ? ($(this).text()/10000).toFixed(2) + "<em>万</em>" : $(this).text());	
	})

	//系统基本参数
	if(window.sessionStorage.getItem("systemParameter")){
		var systemParameter = JSON.parse(window.sessionStorage.getItem("systemParameter"));
		fillParameter(systemParameter);
	}else{
		$.ajax({
			url : "../json/systemParameter.json",
			type : "get",
			dataType : "json",
			success : function(data){
				fillParameter(data);
			}
		})
	}

	//填充数据方法
 	function fillParameter(data){
 		//判断字段数据是否存在
 		function nullData(data){
 			if(data == '' || data == "undefined"){
 				return "未定义";
 			}else{
 				return data;
 			}
 		}
 		$(".version").text(nullData(data.version));      //当前版本
		$(".author").text(nullData(data.author));        //开发作者
		$(".homePage").text(nullData(data.homePage));    //网站首页
		$(".server").text(nullData(data.server));        //服务器环境
		$(".dataBase").text(nullData(data.dataBase));    //数据库版本
		$(".maxUpload").text(nullData(data.maxUpload));    //最大上传限制
		$(".userRights").text(nullData(data.userRights));//当前用户权限
 	}



})

