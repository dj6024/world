$(function(){
	  	
   			var login = JSON.parse($.cookie("login"));
   			var cartName;
				if(login){   
					console.log(login);
					$(".u-info a").eq(0).html("欢迎你,"+login.name);
					$(".u-info a").eq(1).css("display","none");
			    var exit = $("<a href='login.html'>[退出]</a>");
				  $(".u-info a").eq(0).after(exit);
					cartName = login.name;
					var arr = $.cookie(cartName)?JSON.parse($.cookie(cartName)):[]; 
					console.log(arr);
					$("#num").html(arr.length);	
				}
				
				$(".u-info a").eq(1).click(function(){
					
   				$.cookie("login",JSON.stringify(login),{expires:0,path:"/"});
   					
   			});
				
				
				
		    //获取json自动生成热销推荐
				$.get("json/cart.json",function(data){
				
				for(var i=0;i<data.length;i++){
					var cartobj = data[i];
					var cartimg = cartobj.img;
					var cartdesc = cartobj.desc;
					var cartprice = cartobj.price;
					
		            var li = $("<li></li>");
		            var a  = $("<a href='#'></a>");
		            var img = $("<img src="+cartimg+"/>");
		            var p1 = $("<p>"+cartdesc+"</p>").addClass("name");
		            var p2 = $("<p><i>"+cartprice+"</i></p>").addClass("price");
		            var btn = $("<div><span>立即购买</span></div>").addClass("btn_buy");
		            li.append(a.append(img).append(p1).append(p2).append(btn));
		            $(".mod_history ul").append(li);
				}
				
				//移入移出立即购买样式
				$(".btn_buy").hover(function(){
					$(this).css("background","#E30483");
					$(this).find("span").css("color","white");
				},function(){
					$(this).css("background","white");
					$(this).find("span").css("color","#E30483");
				})
				
			})
			
		
		
		     
		
     				//添加购物车中的商品
   				function cookie(){
   				  arr = $.cookie(cartName)?JSON.parse($.cookie(cartName)):[];
   					$("#num").html(arr.length);
   					if(arr.length == 0){				
						    $(".address_onne").css("display","block");
						    $(".w990").css("display","none");
						    $(".mod_cart_foot").css("display","none");
						    				
						}else{			
						    $(".address_onne").css("display","none");
						    $(".w990").css("display","block");
						    $(".mod_cart_foot").css("display","block");
						    				
						}
   				}
   				cookie();
   				
   				
   				var arr =$.cookie(cartName)?JSON.parse($.cookie(cartName)):[];
   				
					if (arr.length) {
						
						//遍历数组, 显示所有商品的信息
						for (var i=0; i<arr.length; i++) {
							var obj = arr[i];
							var goodsId = obj.id;
							var goodsImg = obj.img;
							var goodsMsg = obj.name;
							var goodsPrice = parseFloat(obj.price.replace("￥",""));
							var goodsNum = parseInt(obj.num);
							var sendMsg = obj.send;
							
							var trfirst = $("<tr></tr>");
							//第一个td
							var check = $("<td width='5%'><input type='checkbox' checked='checked'/></td>");
							
							//第二个td
							var goods = $("<td width='43%'></td>");
							var goodsDiv = $("<div></div>").addClass("goods");
							var goods_img = $("<a href=goodsinfo.html?"+goodsId+"><img src="+goodsImg+"/></a>").addClass("goods_img");
							var goods_info = $("<div></div>").addClass("goods_info");
							var name = $("<a href=goodsinfo.html?"+goodsId+">"+goodsMsg+"</a>");
							var act = $("<div><span class='act_name'>特卖</span></div>").addClass("act");
						    goods.append(goodsDiv.append(goods_img).append(goods_info.append(name).append(act)));
						    
						    
							//第三个td
							var price = $("<td width='16%'><strong class='single_price'>￥"+goodsPrice+".00</strong></td>");
						
						    //第四个td
						    var amount = $("<td width='12%'></td>");
						    var count = $("<div></div>").addClass("count");
						    var minus = $("<a href=''>-</a>").addClass("minus");
						    var zongshu = $("<input type='text' value="+goodsNum+">").addClass("zongshu");
						    var plus = $("<a href=''>+</a>").addClass("plus");
						    amount.append(count.append(minus).append(zongshu).append(plus));	
						    
						    //第五个td
						    var xiaoji = $("<td width='12%'><strong class='subtotal'>￥"+(goodsPrice*goodsNum)+".00</strong></td>");
						    
						    //第六个td
						    var del = $("<td width='10%'><a href='' class='del' title='删除'>删除</a></td>");
						    
						    trfirst.append(check).append(goods).append(price).append(amount).append(xiaoji).append(del);
						    
						    $(".mod_tb_cart tbody").before(trfirst); 
						    
						}
						
							//点击删除
							var index;
						    $(".del").click(function(){
						    	index = $(this).parents("tr").index();
						    	$(".pop_over").show();
						    	$(".pop_info").show();
						    	return false;
						    })
						    
						    //点击关闭
						    $(".close").click(function(){
						    	$(".pop_info").hide();
						    	$(".pop_over").hide();				    	
						    })
						    
						    //点击取消
						    $(".false").click(function(){
						    	$(".pop_info").hide();
						    	$(".pop_over").hide();
						    	return false;
						    })
						    
						    //点击确定
						    $(".true").click(function(){
						    		$(".mod_tb_cart table tr").eq(index).remove();
						    		var cart = JSON.parse($.cookie(cartName));
						    		cart.splice(index,1);
						    		$.cookie(cartName,JSON.stringify(cart),{expires:30,path:"/"});
						    		cookie();						    		
						    })
						
						    //点击加减					   
						    $(".minus").click(function(){
						    	$(this).parents("tr").find(":checkbox").prop("checked",true);
						    	$(".mod_main_cart").find(":checkbox").prop("checked",true);
						    	isAll();
						    	var zongshu =  parseInt( $(this).siblings("input").val() ); //先获取到input的值			    	
						    	var xiaoji = $(this).parent().parent().prev().find("strong").html(); //单价
						    	var xiaoji1 = parseInt(xiaoji.replace("￥",""));				    	
						    	var xiaoji2 = $(this).parent().parent().next().find("strong").html();// 小计
						    	var xiaoji3 = parseInt(xiaoji2.replace("￥",""));	
						    	
						    	zongshu --;
						    	if (zongshu < 1){
						    		$(this).siblings("input").val(1);
						    		$(this).parent().parent().next().find("strong").html("￥"+xiaoji1+".00");
						    		zongji();
						    	}else{
						    		
						    		var mius =JSON.parse($.cookie(cartName)); //该用户下的购物车cookie	
		    						var name = $(this).parents("td").siblings().eq(1).find(".goods_info a").html();
							    	for(var i=0;i<mius.length;i++){
							    		if( mius[i].name ==name){
							    			mius[i].num = zongshu;
							    		}
							    		
							    		$.cookie(cartName,JSON.stringify(mius),{expires:null,path:"/"});
							    	}
							    	
						    		$(this).siblings("input").val(zongshu);
						    		$(this).parent().parent().next().find("strong").html("￥"+(xiaoji3-xiaoji1)+".00");
						    		zongji();
						    	}	    	
						    	return false;
						    })
						    
						    $(".plus").click(function(){
						    	$(this).parents("tr").find(":checkbox").prop("checked",true);
						    	$(".mod_main_cart").find(":checkbox").prop("checked",true);
						    	isAll();
						    	var zongshu =  parseInt( $(this).siblings("input").val() ); //先获取到input的值
						    	var xiaoji = $(this).parent().parent().prev().find("strong").html();//单价
						    	var xiaoji1 = parseInt(xiaoji.replace("￥","")); 
						    	zongshu ++;
						    	var mius =JSON.parse($.cookie(cartName)); //该用户下的购物车cookie	
	    						var name = $(this).parents("td").siblings().eq(1).find(".goods_info a").html();
						    	for(var i=0;i<mius.length;i++){
						    		if( mius[i].name ==name){
						    			mius[i].num = zongshu;
						    		}
						    		
						    		$.cookie(cartName,JSON.stringify(mius),{expires:null,path:"/"});
						    	}
						    	$(this).siblings("input").val(zongshu);
						    	$(this).parent().parent().next().find("strong").html("￥"+xiaoji1*zongshu+".00");
						    	zongji();
						    	return false;
						    })
						
						
								
							//遍历所有tr中的小计，通过判断checkbox的状态
							function zongji(){
								var count = 0;
								var sum = 0;
								for(var j=0;j<$(".mod_tb_cart table tr").not(":last").length;j++){ //2									
									var trNode = $(".mod_tb_cart table tr").eq(j);//2
									if(trNode.find(":checkbox").prop("checked")){
									   count += parseInt(trNode.find(".subtotal").html().replace("￥",""));
									   sum++;//2
									   if( count>2000 ){
									   		$("#topic").show();
									   }else{
									   		$("#topic").hide();
									   }
									}
								}
								$("#goods_sum").html(sum);
								$(".goods_amount").html("￥"+count+".00");
								$("#goods_amount").html(count+".00");
								$("#pay_amount").html(count+".00");
						}
						
						zongji();
						
						//在加减input中的change()事件
						$(".zongshu").change(function(){
							var inputVal =$(this).val().replace(/^0+/g,"");
							$(this).val(inputVal);
							if( parseInt(inputVal) < 1 || inputVal == "" || /^[^0-9]$/g.test(inputVal)){								
								alert("数量不能小于1且瞎几把填什么字母、非法字符和空");
								$(this).val(1);
								var xiaoji = $(this).parent().parent().prev().find("strong").html(); //单价
					    		var xiaoji1 = parseInt(xiaoji.replace("￥",""));	
							 	$(this).parent().parent().next().find("strong").html("￥"+xiaoji1+".00");
							 	zongji();
							}else{
								var xiaoji = $(this).parent().parent().prev().find("strong").html(); //单价
					    		var xiaoji1 = parseInt(xiaoji.replace("￥",""));	
							 	$(this).parent().parent().next().find("strong").html("￥"+(inputVal*xiaoji1)+".00");
							 	zongji();	

							 	var mius =JSON.parse($.cookie(cartName)); //该用户下的购物车cookie	
    							var name = $(this).parents("td").siblings().eq(1).find(".goods_info a").html();
					    		for(var i=0;i<mius.length;i++){
					    			if( mius[i].name ==name){
					    				mius[i].num = inputVal;
					    			}
					    			$.cookie(cartName,JSON.stringify(mius),{expires:null,path:"/"});
					    		}
							}
								
						});
						
						
						function isAll(){
							 var trLen = $(".mod_tb_cart table tr").not(":last").length;
							 var checkLen = $(".mod_tb_cart table :checkbox:checked").length;
							 if(trLen == checkLen){
							 	  $("#checkall").prop("checked",true);
					   			  $(".btn_count").css("background","#E10482");
							 	  
							 }else{
							 		$("#checkall").prop("checked",false);
					   				$(".btn_count").css("background","#979797");
							 		
							 }
		   	   				$("#checkall").prop("checked",trLen==checkLen);	 
						}
						
						//点击全选
					   $("#checkall").click(function(){
		   	 				$(':checkbox').not(':first').prop("checked",$(this).prop("checked"));   
					   		isAll();
					   		zongji();
					   	});
					   
					   $(".mod_main_cart :checkbox").click(function(){
		   	 				$(':checkbox').not(':first').prop("checked",$(this).prop("checked"));   
					   		isAll();
					   		zongji();
					   });
									
						//单选
						$(":checkbox").click(function(){ 
							var ischeck = $(this).prop("checked");
								if(ischeck ==true){
							  		$(".mod_main_cart :checkbox").prop("checked",true);								  		
							  		
								}else{
							 		 $(".mod_main_cart :checkbox").prop("checked",false);	
								}
								isAll();
								zongji();
						})
						
						
						
						
					}
   		
		
		
})