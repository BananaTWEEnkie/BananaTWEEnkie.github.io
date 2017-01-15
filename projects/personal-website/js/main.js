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
	$('.tooltiptext').toggleClass('clicked4');
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


