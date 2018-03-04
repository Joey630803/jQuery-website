$(function(){
	var hm = document.createElement("script");
	hm.src = "https://hm.baidu.com/hm.js?68aeaa48da4089c8f5319fcc9df004e1";
	var s = document.getElementsByTagName("script")[0];
	s.parentNode.insertBefore(hm, s);
	

	/*头部导航栏*/
	$('.nav').on('mouseover','li',function(){
		$(this).addClass('active').siblings().removeClass('active');
	})
	/*banner*/
	$(".focusBox").slide({  
		    titCell : ".num li",  
		    mainCell : ".pic",  
		    effect : "fade",
		    vis:"auto",   
		    autoPlay : true,  
		    trigger : "click",
		    interTime:4000,
		    delayTime:300
		});
	/*图片切换*/
	var partner = $(".partner") || "";
	var service_icon = $('.service_icon') || "";
	var dep_con = $('.dep_con') || "";
	var us_icon = $('.us_icon') || "";
	if(partner){
		changePic(partner);
	}
	if(service_icon)
	{
		changePic(service_icon);
	}
	if(dep_con){
		changePic(us_icon);
		changePic(dep_con);
	}
	function changePic(obj){
		obj.on('mouseover','img',function(){
			$(this).attr('src',$(this).attr('src').replace('nor','sel'))
		});
		obj.on('mouseout','img',function(){
			$(this).attr('src',$(this).attr('src').replace('sel','nor'))
		});
	}

	//医疗专题滚动效果
	$(".topics").slide({
		mainCell:".pic",
		autoPlay:true,
		effect:"leftMarquee",
		vis:5,
		interTime:50,
		trigger:"click"}
	); 
	
});
