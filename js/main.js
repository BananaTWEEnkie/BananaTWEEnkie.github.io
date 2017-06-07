$("#quote").mouseover(function() {
	$("#text1").text(function(i, oldText) {
		return oldText === 'WORK' ? 'JOBS' : oldText;
	});
	$("#text2").text(function(i, oldText) {
		return oldText === 'WORK' ? 'DONE' : oldText;
	});
	$("#text3").text(function(i, oldText) {
		return oldText === 'Peon' ? 'Peasant' : oldText;
	});
});

$("#quote").mouseout(function() {
	$("#text1").text(function(i, oldText) {
		return oldText === 'JOBS' ? 'WORK' : oldText;
	});
	$("#text2").text(function(i, oldText) {
		return oldText === 'DONE' ? 'WORK' : oldText;
	});
	$("#text3").text(function(i, oldText) {
		return oldText === 'Peasant' ? 'Peon' : oldText;
	});
});

function changeTheme() {
	var theme = document.getElementById("theme").innerHTML;
	
	if (theme == "Dark Theme") {
		document.getElementById("theme").innerHTML = "Light Theme";
	} else {
		document.getElementById("theme").innerHTML = "Dark Theme";
	}
	
	$('body').toggleClass('clicked');
	$('button').toggleClass('clicked2');
	$('.tooltiptext').toggleClass('clicked3');
}

$(document).ready(function() {
	$('body').css('display', 'none');
	$('body').fadeIn(2000);
	$('.link').click(function() {
		newLocation = $('.link a').attr("href");
		$('body').fadeOut(2000, newpage);
	});
	function newpage() {
		window.location = newLocation;
	}
}); 

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-76613025-1', 'auto');
  ga('send', 'pageview');

!function(n,r){"function"==typeof define&&define.amd?define(r):"object"==typeof exports?module.exports=r():n.transformicons=r()}(this||window,function(){"use strict";var n={},r="tcon-transform",t={transform:["click"],revert:["click"]},e=function(n){return"string"==typeof n?Array.prototype.slice.call(document.querySelectorAll(n)):"undefined"==typeof n||n instanceof Array?n:[n]},o=function(n){return"string"==typeof n?n.toLowerCase().split(" "):n},f=function(n,r,f){var c=(f?"remove":"add")+"EventListener",u=e(n),s=u.length,a={};for(var l in t)a[l]=r&&r[l]?o(r[l]):t[l];for(;s--;)for(var d in a)for(var v=a[d].length;v--;)u[s][c](a[d][v],i)},i=function(r){n.toggle(r.currentTarget)};return n.add=function(r,t){return f(r,t),n},n.remove=function(r,t){return f(r,t,!0),n},n.transform=function(t){return e(t).forEach(function(n){n.classList.add(r)}),n},n.revert=function(t){return e(t).forEach(function(n){n.classList.remove(r)}),n},n.toggle=function(t){return e(t).forEach(function(t){n[t.classList.contains(r)?"revert":"transform"](t)}),n},n});

