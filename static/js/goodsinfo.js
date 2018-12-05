$(function(){
	
	        //倒计时
	   		var date1 = new Date("2016-10-31 00:00:00"); 
	        var time = date1.getTime();
			var now = new Date();			
			var timeInterval =  time- now.getTime(); 			
			var timeSec = timeInterval/1000;  	//秒
			setInterval(function(){			//开启定时器, 开始倒计时 	 
				timeSec--; 
				var day = parseInt(timeSec/24/60/60); //天
				var hour = parseInt(timeSec/60 /60) % 24  ; //时
				var min = parseInt(timeSec/60) % 60; //分
				var sec =  parseInt(timeSec % 60); //秒 
				$(".time").html( (day<10?"0"+day:day)+"天"+" "+(hour<10?"0"+hour:hour) + ":" + (min<10?"0"+min:min) + ":" + (sec<10?"0"+sec:sec));		 
			}, 1000); 

		
		//添加购物车中的商品
		var login = $.cookie("login");		
		if(login){  
			login = JSON.parse(login);
			$(".u-info a").eq(0).html("欢迎你,"+login.name);
			$(".u-info a").eq(1).css("display","none");
   			var exit = $("<span>[退出]</span>");
   			$(".u-info a").eq(0).after(exit);
			var cartName = login.name;
			
			var arr = $.cookie(cartName)?JSON.parse($.cookie(cartName)):[]; 
			$("#num").html(arr.length);	
		}
		
		//点击退出
		$(".u-info span").click(function(){
   			$.cookie("login","",{expires:0,path:"/"});
   			history.go(0);
   		});
   		
   		
   		//点击进入购物车,判断是否登录，如果没登录则提示登录
		$('.user-buy').click(function(){
	 		var login =$.cookie("login")?JSON.parse($.cookie("login")):[]; //判断是否登录
			if(login.name){
				open("cart.html");
			}else{
				open("login.html");
			}
			return false;
		})
		
		
      	  //动态获取json
	  	  $.get("json/goodsList.json",function(data){
	  	  	
	   	  var goodId = location.search.replace("?","");
	   	  for(var i=0;i<data.length;i++){
	   	  	var obj = data[i]; 
	   	  	if( obj.id ==goodId ){
	   	  		var path1 = obj.path1;
	   	  		var path2 = obj.path2;
	   	  		var goodsImg = obj.goodsimg;
	 			var cityImg = obj.cityimg;
	 			var sendmsg  =obj.send;
	 			var msg  = obj.msg; 
	 			var desc  = obj.desc;
	 			var price1  = obj.price;
	 			var price2  =obj.price2;
	 			var coll = obj.coll;
	 			var comd  = obj.commend;
	 			var prod = obj.product;
	 			var prodimg = obj.productImg;
	 			var para = obj.parameter;
	 			
	 			for(var r=0;r<para.length;r++){
	 				var tipc = para[r].tipc;
	 				var exp = para[r].exp;
	 				var dd = $("<dd><span class='brand'>"+tipc+"</span>"+exp+"</dd>");
	 				$(".pro_param_list").append(dd);
	 			}
	 			
	 			
	 			if( comd ==""){
	 				
	 			}else{	 				
	 				var h3  = $("<h3>热销推荐</h3>").addClass("tit_guess");
	 				var ul = $("<ul></ul>").addClass("guess_list");
	 				$(".mod_side").before(ul);
	 				ul.before(h3);
	 				for(var j=0;j<comd.length;j++){	 					
	 					var comdobj = comd[j];
						var comimg  = comdobj.img;
						var comdes  = comdobj.des;
						var comprice = comdobj.price;
						
						var li = $("<li></li>");
						var a = $("<a></a>");
						var img = $("<img src="+comimg+"/>").css("width",64,"height",64);
						var pro_info = $("<div></div>").addClass("pro_info");
						var name = $("<p>"+comdes+"</p>").addClass("name");
						var price = $("<p></p>").addClass("price");
						var b = $("<b>"+comprice+"</b>").addClass("guess_price");
						
						pro_info.append(name).append(price.append(b));						
						li.append(a.append(img).append(pro_info));
						ul.append(li);
	 				}
	 			}
	 			
	 			
	 			for(var k=0;k<prod.length;k++){
	 				var proimg = prod[k];
	 				$(".product_img").append( $("<img src="+proimg+"/>") );
	 			}
	 			//商品介绍和评论
				$(".ht_tab li").click(function(){
					$(this).addClass("light").siblings().removeClass("light");
           			 $(".product_pro").removeClass("dis").eq($(this).index()).addClass("dis");
				})
	 			
	 			$(".dt").append( $("<img src="+prodimg+"/>")).css("width",210,"height",210);
	 			
	 			var load1 = $("<a href='index.html'>"+path1+"</a><span>></span>");
	 			var load2 = $("<a href='index.html'>"+path2+"</a><span>></span>");
	 			$(".mbq").append("<a href='index.html'>首页</a><span >></span>").append(load1).append(load2).append(msg);
	 			
	 			var flag = $("<span><img src="+cityImg+"/></span>").addClass("flag");
	 			var pro_name= $("<h3>[特卖]"+msg+"</h3>").addClass("pro_name");
	 			$(".brand_name").append(flag).append(pro_name);
	 			
	 			var lover = $("<span></span>").addClass("icon_lover");
	 			var ospan = $("<span>"+coll+"</span>");
	 		
	 			$(".lover").append(lover).append(ospan).append("人收藏");
	 			
	 			var bigpicture  = $("<img src="+goodsImg+"/>").addClass("bigpicture");
	 			var small_area = $("<div></div>").addClass("small_area");
	 			$(".ht_pic").append(bigpicture).append(small_area);
	 			
	 			var big_areaImg = $("<img src="+goodsImg+"/>");
	 			$(".big_area").append(big_areaImg);
	 			
				var time = $("<span></span>").addClass("time");
	 			$(".cout_down").append(time);
	 			
	 			var descible = $("<p>"+desc+"</p>").addClass("dec");
	 			$(".cout_down").after(descible);
	 			
	 			var pri1 = $("<b>"+price1+"</b>").addClass("while_min");
	 			$(".buy").before(pri1);
	 			
	 			var pri2 = $("<del>"+price2+"</del>").addClass("while_max");
	 			$(".details-zh").append(pri2); 
	 			
	 			
	 			var place = $("<p>"+sendmsg+"</p>").addClass("place");
	 			$(".ht_amount").before(place);
	 			
	 			
	 			$(".lover").hover(function(){
					$(".icon_lover").css("backgroundPosition","-138px -52px");
				},function(){
					$(".icon_lover").css("backgroundPosition","-118px -52px");
				})
	 			
	 			
	 			   //=============放大镜=======================
	 			
					var _smallImg  = $(".ht_pic"); //小图
					var _smallArea = $(".small_area"); //小区域
					var _bigImg    = $(".big_area img"); //大图
					var _bigArea   = $(".big_area"); //大区域
					
					//bigImg.width / smallImg.width = bigArea.width/smallArea.width
					//smallArea.width = bigArea.width * smallImg.width / bigImg.width
					//计算小区域的宽高
					//width() == innnerWidth() == outerWidth()
					_smallArea.width( _bigArea.width()   * _smallImg.width() / _bigImg.width() );
					_smallArea.height( _bigArea.height() * _smallImg.height() / _bigImg.height() );
					
					//放大系数/放大倍数
					var scale = _bigImg.width() / _smallImg.width();  
					//scale = 4
					
					//mousemove
					_smallImg.mousemove(function(e){
					_smallArea.show(); //显示小区域
					_bigArea.show();   //显示大区域
					//clientX: 可视区域的x值
					//pageX: 距离窗口左边的x值
					var x = e.pageX - _smallImg.offset().left - _smallArea.width()/2;
					var y = e.pageY - _smallImg.offset().top  - _smallArea.height()/2; 
					//console.log(e.clientX);
					//console.log(e.pageX);
					
					//控制小区域范围在小图内
					if (x <= 0) { //不超出左边
						x = 0;
					}
					else if (x >= _smallImg.width()-_smallArea.width()) { //不超出右边
						x = _smallImg.width()-_smallArea.width();
					}
					if (y <= 0) { //不超出上边
						y = 0;
					}
					else if (y >= _smallImg.height()-_smallArea.height()) { //不超出下边
						y = _smallImg.height()-_smallArea.height();
					}
					
					
					
					_smallArea.css({left: x, top: y});//移动小区域
					_bigImg.css({left: -x*scale, top: -y*scale});//移动大图					
					})
					
					_smallImg.mouseleave(function(){
						_smallArea.hide(); //隐藏小区域
						_bigArea.hide(); //隐藏大区域
					})
	 			
	 			
				 	//点击加减数量增加或减少
					$(".btn_plus").click(function(){
						var Num =parseInt( $("#buyNum").val() );						
						Num ++;
						if(Num >=2){
							$(".btn_minus").css("background","white");
						}
						$("#buyNum").val(Num);
					})
					
					$(".btn_minus").click(function(){
						var Num =parseInt( $("#buyNum").val() );
						Num --;
						if(Num <= 1){
							$(".btn_minus").css("background","#f2f2f2");
							$("#buyNum").val(1);
						}else{
							$("#buyNum").val(Num);
						}
					})
	 			
	 			
	 			//点击加入购物袋
				$("#add_cart_btn").click(function(){										
					//点击加入购物车 
					/*
					 * 1；获取商品id
					 * 2；获取商品图片
					 * 3；获取商品的信息
					 * 4；获取商品的价格（单价）
					 */
					
					//获取之前保存在cookie中的购物车信息
					if(login){   //如果登录呢
						//商品飞入效果
						$(this).stop(true);
						var cloneImg = $(".bigpicture").clone().addClass("cloneImg");
						$("#add_cart_btn").append(cloneImg); 
						setTimeout(function(){
							cloneImg.animate({
								left: $("#num").offset().left - cloneImg.offset().left -  $("#num").width(),
								top:  $("#num").offset().top  - cloneImg.offset().top  -  cloneImg.height(),
								opacity:0
						},1000,function(){  
				            cloneImg.remove();
				            
				            var cookie = JSON.parse($.cookie(cartName));
				            
				            var num =  parseInt( $("#num").html() );
							$("#num").html(cookie.length);
					   	})
						},500)
						
						var arr = $.cookie(cartName) ? JSON.parse( $.cookie(cartName) ) : [];
					
						//遍历查找是否之前的购物车cookie中存在即将添加的商品
						var isExist = false; //表示是否存在该商品
						for(var i=0; i<arr.length; i++) {
							//如果存在该商品, 把数量增加
							if (goodId == arr[i].id) {
								var inputVal = parseInt($("#buyNum").val());
								arr[i].num   = inputVal + parseInt(arr[i].num);
								isExist = true; //表示存在该商品
							}
							
						}
						
						//如果不存在, 则添加一个新商品
						if (!isExist) {
							//商品对象
							var goods = {
								id: goodId,
								img:prodimg,
								name: msg,
								price: price1,
								num: $("#buyNum").val(),
								send:sendmsg,
							    
							}
							arr.push(goods);
						}
						
						//保存到cookie中
						$.cookie(cartName, JSON.stringify(arr), {expires:30, path:"/"});
					}else{
						location.href = "login.html";
					}		
				})
			
	   	  	}
	        }
	   	})
	   	
	   	
	   	
	   	
	   	
	   	$.get("json/guessLove.json",function(data){
			for(var i=0;i<data.length;i++){
				var obj = data[i];
				var guessimg = obj.img;
				var guessdes = obj.des;
				var guessprice = obj.price;
				
				
				var li = $("<li></li>");
				var a = $("<a></a>");
				var img = $("<img src="+guessimg+"/>").css("width",64,"height",64);
				var pro_info = $("<div></div>").addClass("pro_info");
				var name = $("<p>"+guessdes+"</p>").addClass("name");
				var price = $("<p></p>").addClass("price");
				var b = $("<b>"+guessprice+"</b>").addClass("guess_price");
				
				pro_info.append(name).append(price.append(b));
				
				li.append(a.append(img).append(pro_info));
				$(".guess_love").append(li);
			}
		})
	
	
		
	
	    //免税说明的下拉效果
		$(".icon_wx").hover(function(){
			$(".qrcode").css("display","block");
		},function(){
			$(".qrcode").css("display","none");
		})
		
		$("#terms a").hover(function(){
			$(".price-terms-shows").stop().slideDown();
		},function(){
			$(".price-terms-shows").stop().slideUp();
		})
		
		
		//点击立即购买
		$("#buy_goods_btn span").click(function(){
			$("#buy_goods_btn").css("background","#D5D5D5");
		})
			
	  	
})
	
		
		
		