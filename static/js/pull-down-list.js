	//右边列表的点击事件
	$(function(){
		
		//点击查看分类
		$(".right-classify").click(function(){
			
			//span的内容改变
			$(this).find("span").html("收起分类");
		    
		    //判断下拉列表是否显示，显示则隐藏	
		    if( $(".siftMeue").is(":visible")){			    	
				$(".siftMeue").fadeOut(500,function(){
					//隐藏后改变span的内容
					$(".right-classify").find("span").html("查看分类");				
				
				})
				
			}else{    //否则
				$(".siftMeue").fadeIn(500);
				/*
				 * 问题1；鼠标移出时li的样式发生改变
				 * 问题2；第一个li默认颜色问题
				 * 问题3；当收起分类列表时多个子列表一起显示的问题
				 */
				
				$(".sift-l li").first().find("a").css("color","white");	 //显示时默认第一个li的字体白色	
				$(".sift-l li").first().addClass("cur");		         //显示默认第一个添加样式
				$(".sift-r-list ul").first().addClass("getshow");        //显示时默认第一个li的列表显示
				
				$(".sift-r-list ul").first().siblings().removeClass("getshow");
				$(".sift-l li").first().siblings().removeClass("cur");
				$(".sift-l li").first().siblings().find("a").css("color","black"); 
			}
			
		});
		 
		
		
		
		//分类中的li的移入移出事件
		$(".sift-l li").hover(function(){
			
			//移入当前li的操作
			$(this).siblings().find("a").css("color","black");   //移入li时，li的兄弟节点字的颜色为黑色
			$(this).siblings().removeClass("cur");               //移入li时，移除兄弟节点的样式
			$(this).addClass("cur");                             //移入当前li是添加样式
			$(this).find("a").css("color","white");			     //移入当前li时，字体颜色为白色
			$(".sift-r-list").find("ul").removeClass("getshow"); //移入li时，移除找到的所有ul的样式
			$(".sift-r-list").find("ul").eq( $(this).index()).addClass("getshow");
		},function(){                                            //移入当前li 给当前li的ul添加样式显示 
			
		});
		
	 
})
