$(function(){
	
	       //我的收藏动画
			$(".user_col").hover(function(){
				$(".user_collection").css("display","block");
				$(".user_collection").stop(true).animate({opacity:1,right:30},400);
			},function(){
				$(".user_collection").css("display","none");				
				$(".user_collection").animate({opacity:0,right:55},400); 
			});
			
			//我的优惠券的动画
			$(".user_ticket").hover(function(){
				$(".user_tick").css("display","block");
				$(".user_tick").stop(true).animate({opacity:1,right:30},400);
			},function(){
				$(".user_tick").css("display","none");
				
				$(".user_tick").animate({opacity:0,right:55},400);
				
			});
			
			//扫描二维码的动画
			$(".user_code").hover(function(){
				$(".hitao_code").css("display","block");
				$(".hitao_code").stop(true).animate({opacity:1,right:30},400);
			},function(){
				$(".hitao_code").css("display","none");
				
				$(".hitao_code").animate({opacity:0,right:55},400);
				
			});
			
			//联系客服的动画
			$(".user_cs").hover(function(){
				$(".hitao_service").css("display","block");
				$(".hitao_service").stop(true).animate({opacity:1,right:30},400)
			},function(){
				$(".hitao_service").css("display","none");
				
				$(".hitao_service").animate({opacity:0,right:55},400)
				
			});
			
			//回到顶部
			$(".user_uptop").click(function(){
				$("body").animate({scrollTop:0},500);
			})
})
