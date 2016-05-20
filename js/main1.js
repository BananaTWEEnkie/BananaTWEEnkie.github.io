function changeTheme() {
	var theme = document.getElementById("theme").innerHTML;
	
	if (theme == "Dark Theme") {
		document.getElementById("theme").innerHTML = "Light Theme";
	} else {
		document.getElementById("theme").innerHTML = "Dark Theme";
	}
	
	$('body').toggleClass('clicked');
	$('button').toggleClass('clicked2');
}

$(function() {

    var newHash      = "",
        $mainContent = $("#main-content"),
        $pageWrap    = $("#page-wrap"),
        baseHeight   = 0,
        $el;
        
    $pageWrap.height($pageWrap.height());
    baseHeight = $pageWrap.height() - $mainContent.height();
    
    $("nav").delegate("a", "click", function() {
        window.location.hash = $(this).attr("href");
        return false;
    });
    
    $(window).bind('hashchange', function(){
    
        newHash = window.location.hash.substring(1);
        
        if (newHash) {
            $mainContent
                .find("#guts")
                .fadeOut(200, function() {
                    $mainContent.hide().load(newHash + " #guts", function() {
                        $mainContent.fadeIn(200, function() {
                            $pageWrap.animate({
                                height: baseHeight + $mainContent.height() + "px"
                            });
                        });
                        $("nav a").removeClass("current");
                        $("nav a[href='"+newHash+"']").addClass("current");
                    });
                });
        };
        
    });
    
    $(window).trigger('hashchange');

});

