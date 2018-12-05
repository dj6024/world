$(function(){
	
	$.get("json/collection.json",function(data){
		
		for(var i=0;i<data.length;i++){
			var obj = data[i];
			var goodsId  = obj.id;
			var coll = obj.collimg;
			
			$(".h-goods").append($("<li><a href=goodsinfo.html?"+goodsId+"><img src="+coll+"/></a></li>"));
		}
	})
})