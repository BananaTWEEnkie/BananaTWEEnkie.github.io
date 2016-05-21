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

