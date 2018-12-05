 $(function(){
 	
 			//倒计时
   			var date1 = new Date("2016-10-31 00:00:00"); 
            var time = date1.getTime();
			var now = new Date();			
			var timeInterval =  time- now.getTime(); 
			var timeSec = timeInterval/1000; //秒 
			
			setInterval(function(){		//开启定时器, 开始倒计时	 	 
				timeSec--; 
				var day  = parseInt(timeSec/24/60/60);    //天
				var hour = parseInt(timeSec/60 /60) % 24; //时
				var min  = parseInt(timeSec/60) % 60;     //分
				var sec  = parseInt(timeSec % 60);        //秒 
				$(".h-item-r-title-interval").html( (day<10?"0"+day:day)+"天"+" "+(hour<10?"0"+hour:hour) + ":" + (min<10?"0"+min:min) + ":" + (sec<10?"0"+sec:sec));
				 
			}, 1000); 
			
			
		 	//获取json里的数据
		 	$.get("json/goodsList.json",function(data){
		 		
	 		//将数据显示在页面上
	 		for(var i= 0;i<data.length;i++){  //遍历json
 			var obj = data[i];
 			var goodsId  = obj.id;
 			var goodsImg = obj.goodsimg;
 			var cityImg  = obj.cityimg;
 			var sendMsg  = obj.send;
 			var msg      = obj.msg; 
 			var desc     = obj.desc;
 			var pri      = obj.price;
 			var price2   = obj.price2;		
 			
 			//创建元素 ,先获取所有的元素
 		    var ListCon = $("#recommendListCon"); 
 			var item = $("<div></div>").addClass("h-item");
   			//左边
 			var itemL =$("<div></div>").addClass("h-item-l");
 			var aimg  =$("<a href=goodsinfo.html?"+goodsId+"><img src="+goodsImg+"/></a>");  //item的左边创建完 			
 			itemL.append(aimg);  //正确 
 			
   			//右边
 			var itemR = $("<div></div>").addClass("h-item-r"); 			
 			var title = $("<div></div>").addClass("h-item-r-title");
 			var time  =$("<div>距结束</div>").addClass("h-item-r-title-time");
 			var timespan =$("<span></span>").addClass("h-item-r-title-interval");
 			time.append(timespan); 
 			var timg = $("<img src="+cityImg+"/>").addClass("h-item-r-title-flag");
 			var tspan = $("<span>"+sendMsg+"</span>").addClass("h-item-r-tt");
   			title.append(time).append(timg).append(tspan); 	 		
 			var msg = $("<p><a href=goodsinfo.html?"+goodsId+">"+msg+"</a></p>").addClass("h-item-r-text");
 			var desc  =$("<p>"+desc+"</p>").addClass("h-item-r-desc");
 			var itemR_b = $("<div></div>").addClass("h-item-b");
 			
 			var btn = $("<a href=goodsinfo.html?"+goodsId+">立即抢购</a>").addClass("h-item-btn");
 			
 			var price1 = $("<div></div>").addClass("h-item-price");
 			var num = $("<span>"+pri+"</span>").addClass("h-item-num");
 			var price2  =$("<span>"+price2+"</span>").addClass("h-item-price2"); 
 			
 			
 			price1.append(num).append(price2);
 			itemR_b.append(btn).append(price1);
 			
 			itemR.append(title).append(msg).append(desc).append(itemR_b);
 			item.append(itemL).append(itemR);
 			
 			ListCon.append(item);	
 		}	
 		
 		$('.h-item:gt(11)').css('display','none');

 		$(window).scroll(function(){
 			
 			var scrollTop = $(this).scrollTop();
			if( scrollTop>=$('.h-footer').offset().top-500 ){
				
				$('.h-item:lt(22)').css('display','block');
				
			}
			if( scrollTop>=$('.h-footer').offset().top-500 ){
				
				$('.h-item:lt(32)').css('display','block');
			}
 		})
 		
 		
 			//商品的移入移出事件
		 	$(".h-item-btn").mouseenter(function(){
		 		$(this).addClass("color");
		 	});
		 	
		 	$(".h-item-btn").mouseleave(function(){
		 	    $(this).removeClass("color"); 		 		
		 	});
		 	
		 	
		 	
			 //h-inner的动画
		    $(".h-inner a").hover(function(){
		    	
		    	$(this).stop(true).animate({"bottom":10},300);
		    },function(){
		
		    	$(this).animate({"bottom":0},300);
		    });
	    
	    
		    //h-goods商品的动画
		    $(".h-goods li").hover(function(){
		    	
		    	$(this).stop(true).animate({"bottom":10},300);
		    },function(){
		    	$(this).animate({"bottom":0},300); 
		    });
		    
		    $(".h-hot-l").hover(function(){
		    	$(this).stop(true).animate({"bottom":10},300);
		    },function(){
		    	$(this).animate({"bottom":0},300); 
		    })
	    
	    
		    //hot-brand的动画
		    $(".brand-r li").hover(function(){
		    	
		    	$(this).stop(true).animate({"opacity":0.7},100);
		    },function(){
		    	$(this).animate({"opacity":1},100);
		    })
		    
		    $(".brand-l").hover(function(){
		    	$(this).stop(true).animate({"opacity":0.7},100);
		    },function(){
		    	$(this).animate({"opacity":1},100);
		    })
		    
	    	
 	})
		 	
		 	
		 	
	 		var login =$.cookie("login")?JSON.parse($.cookie("login")):[]; //判断是否登录过
			if(login.name){ //如果登录过 
				$(".u-info a").eq(0).html("欢迎你,"+login.name);
				$(".u-info a").eq(1).css("display","none");
				var exit = $("<a href='index.html'>[退出]</a>");
				$(".u-info a").eq(0).after(exit);
				var cartName = login.name;				
				var arr = $.cookie(cartName)?JSON.parse($.cookie(cartName)):[]; 
   				$("#num").html(arr.length);	
			}
			
			$(".u-info a").eq(1).click(function(){  					
				$.cookie("login",JSON.stringify(login),{expires:0,path:"/"});
				
			});
			
			//判断是否登录，如果没登录点击进入购物车则提示登录
			$('.user-buy').click(function(){
				if(login.name){
					open("cart.html");
				}else{
					open("login.html");
				}
				return false;
			})
				
		 	
 })