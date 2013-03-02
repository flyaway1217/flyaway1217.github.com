$(document).ready(function(){
    //建立目录框架
    var menu = $('<div class="ad_menu"><div class="ad_menu_title" title="点击展开/收起,Shift+z隐藏或打开">目录</div><ul class="ad_menu_ul"></ul></div>');
    var start = '<ul>';
    var end = '</ul>';
    //插入到DOM树中
    $(".content").prepend(menu);
    //标记是否是二级标题
    var flag=false;
    //用于跳过第一个H1
    var i=1
    //获取数据
    $(":header").each(function(){
	if (i==1){
		i=2
		return true
	}
	if ( $(this).is('h1')){
		if(flag==true){
			$('.ad_menu_ul').append(end)
		}
		flag=false;
		var str='<li><a href="#'+$(this).attr('id')+'">'+$(this).text()+'</a></li>';
		$('.ad_menu_ul').append(str);
	}
	if ( $(this).is('h2')){
		if(flag==false){
			flag=true;
			$('.ad_menu_ul').append(start)
		}
		var str='<li><a href="#'+$(this).attr('id')+'">'+$(this).text()+'</a></li>';
		$('.ad_menu ul').last().append(str)
	}
      })
    $(".ad_menu").delay(500)
    $(".ad_menu").fadeTo(500,"0.25")
    $(".ad_menu").hover(function(){
		$(this).stop().fadeTo(300,"0.9");
	},function(){
		$(this).stop().fadeTo(300,"0.25");
	})
    $(".ad_menu_title").click(function(){
		$('.ad_menu_ul').slideToggle("300");
	})


    $("html").keypress(function(e){
	if (e.shiftKey && (e.charCode || e.keyCode)=='90'){
		e.preventDefault();
		$(".ad_menu").toggle(200);
		}
	})

});

