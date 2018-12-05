$(function(){
	
	//手机登录和验证码登录得效果切换
	$(".login_nav li").click(function(){
		$(this).siblings().removeClass("current");
		$(this).addClass("current");
	})
	
	$(".login_nav li").first().click(function(){
		$(".login_one").css("display","block");
		$(".login_two").css("display","none");
	})
	
	$(".login_nav li").eq(1).click(function(){
		
		$(".login_two").css("display","block");
		$(".login_one").css("display","none");
	})
	
	//获得焦点事件
	
	$(".input_xlarge").focus(function(){
		$(this).parent($(".contr_group")).css("borderColor","#999");
	    $(this).next($(".tips_judge")).css("display","none");
		$(this).parent( $(".contr_group") ).addClass("contr_bor");  //获得焦点添加样式
	})
	
	//失去焦点事件
	$(".input_xlarge").blur(function(){
		
		if( $(this).val() ==""){  //判断内容是否为空
			$(this).next($(".tips_judge")).css("display","block");
			$(this).parent($(".contr_group")).css("borderColor","#E30483");
		}
	})
	
	//手机格式判断
	$("#login_username").blur(function(){
		var login_username = $.trim( $(this).val() );          //去掉左右两边的空格

		var reg = /^((13[4-9])|(147)|(15[0-2,7-9])|(178)|(18[2-4,7-8]))\d{8}|(1705)\d{7}$/; //移动号段为例
		if( login_username == ""){

			$(this).next(".tips_judge").css("display","block");
			$(this).next(".tips_judge").find("em").html("请输入手机号码");
			$(this).parent( $(".contr_group") ).css("borderColor","#E30483");

		}else{

			if( reg.test(login_username) ){  //如果匹配

				$(this).next(".tips_judge").css("display","none");
				$(this).parent( $(".contr_group") ).removeClass("contr_bor");


			}else{  						//如果不匹配

				$(this).next(".tips_judge").css("display","block");
				$(this).next(".tips_judge").find("em").html("手机格式有误，请重新输入");
				$(this).parent( $(".contr_group") ).css("borderColor","#E30483");

			}

		}
	})

	
	
		//密码判断
		$("#login_password").blur(function(){			
			var login_password = $.trim( $(this).val() );
			
			var reg = /^[0-9a-zA-Z_]{6,20}$/;			
			if( login_password ==""){    //先判断内容是否为空
				
				$(this).next(".tips_judge").css("display","block");
				$(this).next(".tips_judge").find("em").html("请输入密码");
				$(this).parent( $(".contr_group") ).css("borderColor","#E30483");
				
			}else{  //判断密码是否符合正则表达式
				
				if( reg.test( login_password) ){  //匹配
					
					$(this).next(".tips_judge").css("display","none");
					$(this).parent( $(".contr_group") ).removeClass("contr_bor");
					
				}else{   						 //不匹配
					
					$(this).next(".tips_judge").css("display","block");
					$(this).next(".tips_judge").find("em").html("请输入6-20位字母、数字或字符");
					$(this).parent( $(".contr_group") ).css("borderColor","#E30483");	
					
				}
			}
		})
	
		
				//点击登录按钮
				$(".gotwo").click(function(){

					//获取cookie中注册过的所有用户
					var user = $.cookie("user"); 
					if (user) {
						user = JSON.parse(user);
						
						//遍历查找是否有匹配的用户
						var isExist = false; //表示是否存在该用户
						for (var i=0; i<user.length; i++) { 
							if ( $("#login_username").val() == user[i].name && $("#login_password").val() == user[i].pwd ){
								isExist = true; //表示存在该用户
								
								var msg = {
									"name":$("#login_username").val()
								}
								
								$.cookie("login",JSON.stringify(msg),{expires:null,path:"/"});//暂时性的
								console.log(history.length)
								if( history.length<=1 ){
									location.href = "index.html";
								}else{
									history.back();
								}
								
								
								
							}
						}						
						if (!isExist) {
							alert("账号或密码错误!");
						}
						
					}
				})
				
							
}) 