$(function(){
	
	$.get("json/Icon.json",function(data){
		
			for(var i = 0;i<data.length;i++){
				var obj = data[i];
				var dImg = obj.img;
				var alt =obj.alt;
				
				
				var a =$("<a href='#'></a>").addClass("h-other-hot");
				var oimg = $("<img src="+dImg+"/>");
				var odiv = $("<div>"+alt+"</div>").addClass("h-other-b");
				a.append(oimg).append(odiv);
				$(".h-other-hot-box").append(a);
			}
			
			//icon动画==============
			$(".h-other-hot").hover(function(){
				
				$(this).addClass("shadow");
				$(this).find(".h-other-b").css("display","block");
			},function(){
				$(this).removeClass("shadow");
				$(this).find(".h-other-b").css("display","none");
			})
			
			
			$(".h-other-topic").hover(function(){
				$(this).addClass("shadow");
			},function(){
				$(this).removeClass("shadow");
			})
		
		})
		
})