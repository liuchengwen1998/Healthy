
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
	form.verify({
		confirmPass:function(value){
			if($('input[name=NewPassword]').val() !== value)
				return '两次密码输入不一致！';
		}
	});

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
		,url:'/user/userlist'	//数据接口
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
				,{field:'username', width:'10%', title: '用户名'}
				,{field:'realname', width:'10%', title: '姓名'}
				,{field:'rolename', width:'10%', title: '角色名'}
				,{field:'phone', width:'15%', title: '手机'}
				,{field:'email', width:'15%', title: '邮箱'}
				,{
					field:'status', width:'10%', title: '状态'
					,templet: function (d) {
						return d.status == 0 ? "已启用":"已禁用";
					}
				}
				,{fixed: 'right', title: '操作', align:'left', toolbar: '#barDemo'} 	//添加工具条
			]
		]
		,id: 'testReload'
	});

	var $ = layui.$, active = {
		reload: function(){
			var search_input = $('#search_input');
			//执行重载
			table.reload('testReload', {
				page: {
					curr: 1 //重新从第 1 页开始
				}
				,where: {
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

		if (event === 'status') {		//如果点击了查看按钮
			//执行修改状态的方法
			edit_stauts(data.id,data.status)

		} else if (event === 'del') {	//如果点击了删除按钮
			//执行异步删除方法
			var codeId= "";
			codeId = data.id+","
			layer.confirm("您确定要删除吗",function(){
				$.ajax({
					type:"POST",
					url: '/user/delids',
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

		} else if (event === 'edit') {	//如果点击了编辑按钮
			//执行修改方法
			openUser('编辑')
			$('#username').attr("disabled",true);
			$('#id').val(data.id);
			$('#username').val(data.username);
			$('#phone').val(data.phone);
			$('#roleid').val(data.roleid);
			$('#email').val(data.email);
			$('#realname').val(data.realname);
			$('#passworddiv').hide();
			form.render("select")
		}else if (event === 'reset'){
			$('#name').val(data.username);
			openReset('重置密码')
		}
	});


	var edit_stauts = function (id,status) {
		$.ajax({
			type:"POST",
			url: '/user/editstatus',
			data:{
				"id":id,
				"status":status,
			},
			success:function (data) {
				if(data.code==200){
					notice.success("修改状态成功");
					// parent.layer.msg('修改成功！', {icon: 1,time:2000,shade:0.2});
					load();
				}else{
					parent.layer.msg('修改失败！', {icon: 2,time:3000,shade:0.2});
				}
			}
		})
	}

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
				url: '/user/delids',
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

	//新建用户里面的按钮提交事件
	form.on('submit(userSubmit)', function(data){
		// TODO 校验
		//调用下面所写的提交函数
		formSubmituser(data);
		return false;
	});
	//重置密码按钮提交事件
	form.on('submit(resetSubmit)', function(data){
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
	window.formSubmituser = function (obj){
		var url = "";
		if ($('#id').val()==""){
			url = "/user/adduser";
		}else {
			url = "/user/edituser";
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
				}else if (data.code == 7){
					layer.close(index);
					parent.layer.msg(''+data.msg+'', {icon: 2,time:2000,shade:0.2});
				}else {
					layer.close(index);
					parent.layer.msg('失败！', {icon: 2,time:2000,shade:0.2});
				}

			}
		});
	}

	//新建表单的提交函数
	window.formSubmit = function (obj){
		var url = "/user/resetpassword";

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
				}else if (data.code == 7){
					layer.close(index);
					parent.layer.msg(''+data.msg+'', {icon: 2,time:2000,shade:0.2});
				}else {
					layer.close(index);
					parent.layer.msg('失败！', {icon: 2,time:2000,shade:0.2});
				}

			}
		});
	}

	//弹出编辑框
	window.adduser = function (){
		openUser("新建");
		$('#username').attr("disabled",false);
		$('#id').val("");
		$('#username').val("");
		$('#password').val("");
		$('#phone').val("");
		$('#realname').val("");
		$('#email').val("");
		$('#roleid').val("");
		$('#passworddiv').show();
	}
	window.openUser = function(title){
		layer.open({
			type:1,
			title: [''+title+'','font-size:18px'],
			fixed:false,
			resize :false,
			shadeClose: false,
			area: ['620px','420px'],
			offset: '100px',
			content:$('#edit'),
		});
	}

	window.openReset = function(title){
		layer.open({
			type:1,
			title: [''+title+'','font-size:18px'],
			fixed:false,
			resize :false,
			shadeClose: false,
			area: ['580px','400px'],
			offset: '100px',
			content:$('#reset'),
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