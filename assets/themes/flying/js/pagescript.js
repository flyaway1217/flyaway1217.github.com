$(document).ready(function(){
	//$(function(){
			$("h3").bind("click",function(){
				var $content=$(this).next();
				$content.slideToggle("slow");
				})
			})
	//})
