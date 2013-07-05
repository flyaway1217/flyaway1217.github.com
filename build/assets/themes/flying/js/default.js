$(document).ready(function(){
$("#random").click(function(){
	$.get('/atom.xml',function(data){
	var $xml=$(data);
	entry=$xml.find("entry")
	n = entry.size()
	n = getRandom(n)
	url=entry.get(n)
	url=url.getElementsByTagName("link")[0]
	url=url.getAttribute("href")
	location.href=url

  })
	
})
	//随机数发生器
       function getRandom(n){return Math.floor(Math.random()*(n+1))}
});
