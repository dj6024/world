			$(function(){			
				//1获取数据
				$.get("json/LunBo.json",function(data){
					
					//2.显示数据在页面上
					for(var i=0;i<data.length;i++){
						var obj = data[i];
						var img  =obj.img; 
						var id = obj.id;
						var back = obj.background;
						
						//将创建的节点添加大页面上
						var oliNode = $("<li></li>");
						var oImgNode = $("<img src="+img+"/>");
						oliNode.css("background",back);
						oliNode.append(oImgNode);
						$("#list").append(oliNode);
					    $("#list2").append( "<li></li>" ); 
					     
					}
					// 2）用jquery选择器获取页面元素
			            var box = $('#box');
			            var list1 = $('#list');
			            var list2 = $('#list2');
			
			            var index = 0;//显示图片索引
			            var len = list1.children('li').length;
			
			            // 初始化
			            show();
			
			            // 3）使用jquery事件与动画
			            var timer = setInterval(animation,3000);
			
			            // 鼠标移入停止，移除继续
			            box.on('mouseenter',function(){
			                clearInterval(timer);
			                $("#prev").show();
			                $("#next").show();
			            }).on('mouseleave',function(){
			                timer = setInterval(animation,3000);
			                $("#prev").hide();
			                $("#next").hide();
			            });
			
			            // 点击小图切换效果
			            list2.on('click','li',function(){
			                index = $(this).index();
			                show();
			            });
			
			            //前后按钮
			            box.on('click','#prev',function(){
			                index--;
			                show();
			            }).on('click','#next',function(){
			                index++;
			                show();
			            });
			
			            // 图片切换
			            function animation(){
			                index++;
			                show(); 
			            }
			
			            // 显示图片			            
			            function show(){
			                if(index==len){
			                    index=0;
			                }else if(index < 0){
			                    index = len - 1;
			                }
			                list1.children('li').eq(index).animate({opacity:1}).siblings().animate({opacity:0});
			                list2.children('li').eq(index).addClass("active").siblings().removeClass("active");
			            }
					
				});
		})
