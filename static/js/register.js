$(function(){
	
			$("#idcode").click(function(){

				var arr = [];
				for(var i=0;i<4;i++){
					var  str = parseInt( (Math.random()*10)%2 );
					if(str){
						arr += parseInt( Math.random()*10 );
					}else{
						arr += String.fromCharCode( parseInt(Math.random()*25+65) );
					}
				}
				$(this).html(arr);

				function randomColor(){
					return  "rgb("+parseInt(Math.random()*256)+","+parseInt(Math.random()*256)+","+parseInt(Math.random()*256)+")";
				}

				$("#idcode").css("color",randomColor);
			})


		//验证码判断
		$("#fast_login_code").blur(function(){
			if( $(this).val() ==""){

				$(this).next($(".tips_judge")).css("display","block");
				$(this).next($(".tips_judge")).find("em").html("请输入验证码");
				$(this).parent($(".contr_group")).css("borderColor","#E30483");

			}else{
				if( $(this).val().toLowerCase() ==$("#idcode").html().toLowerCase() ){
					$(this).next(".tips_judge").css("display","none");
					$(this).parent( $(".contr_group") ).removeClass("contr_bor");

				}else{
					$(this).next($(".tips_judge")).css("display","block");
					$(this).next($(".tips_judge")).find("em").html("验证码错误，请重新输入");
					$(this).parent($(".contr_group")).css("borderColor","#E30483");

				}
			}
		})

		//注册时把取得值保存到cookie
		$(".register").click(function(){

			//首先判断cookie中是否存在某用户
			var user =$.cookie("user")?JSON.parse( $.cookie("user") ):[];

			for(var i=0;i<user.length;i++ ){
				if($("#login_username").val() == 1){
					$("#login_username").next(".tips_judge").css("display","block");
					$("#login_username").parent($(".contr_group")).css("borderColor","#E30483");
					$("#login_username").next(".tips_judge").find("em").html("该用户已存在");
					return;
				}
			}
			//判断输入的内容是否符合规则
			var reg1 = /^((13[4-9])|(147)|(15[0-2,7-9])|(178)|(18[2-4,7-8]))\d{8}|(1705)\d{7}$/;
			var reg2 = /^[0-9a-zA-Z_]{6,20}$/;
			if(reg1.test( $("#login_username").val()) && reg2.test($("#login_password").val()) && $("#fast_login_code").val().toLowerCase()==$("#idcode").html().toLowerCase() ){

				var users = {
					name:$("#login_username").val(),
					pwd: $("#login_password").val()
				}
				user.push(users);
				$.cookie("user",JSON.stringify(user),{expires:30});
				$(".input_xlarge").val("");
				alert("注册成功!");
				// open("login.html");

			}else{
				alert("输入信息有误,请重新输入!");
			}
	})
})