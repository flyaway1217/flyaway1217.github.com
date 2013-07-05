$(document).ready(function(){
    //如果有超过1个一级标题，则建立目录
    if($("h1").size() > 1)
    {
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
    }//end of the if

//边注设置的代码
    var bianzhu = '<span class="bz"><span class="bz_back"><span class="bz_content">flyaway</span></span></span>';
    var sup='<span class="bz_sup"></span>'
    var footcontents = new Array()
    var i = 0
    //获取脚注内容
    $(".footnotes li").each(function(){
	footcontents[i]=$(this).html();
	i=i+1;
	})
    i=0
    $("sup").each(function(){
	$(this).text($(this).children("a").text())
	$(this).children("a").remove()
	$(this).after(bianzhu);
	var tmp=$(this).next(".bz").children(".bz_back").children(".bz_content")
	tmp.html(footcontents[i])
	tmp.children(":first").children(":last").remove()
 	tmp.children(":first").prepend(sup)
	var tmp=tmp.children(":first").children(".bz_sup")
	tmp.text(i+1)
	i=i+1
	});	
   $(".footnotes").remove()

       
});

