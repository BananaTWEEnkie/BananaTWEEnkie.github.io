// Code to scroll back up top when scrolled past a certain point
$(document).ready(function () {
   $(window).scroll(function () {
       if ($(this).scrollTop() > 100) {
           $('.scrollup').fadeIn();
       } else {
           $('.scrollup').fadeOut();
       }
   });

   $('.scrollup').click(function () {
       $("html, body").animate({
           scrollTop: 0
       }, 600);
       return false;
   });
	
	$('.popup').on('mouseenter', function() {
		$('.image-popup').fadeIn(2000)
		.css({bottom:-380,position:'absolute'}) 
		.animate({bottom:0}, 1750, function() { 
		
		});
	});
	$('.popup').on('mouseleave', function() {
		$('.image-popup').fadeIn()
		.css({bottom:0,position:'absolute'})
		.animate({bottom:-500}, 500, function() {
			$(this).fadeOut(100);
		});
	});

});

// Help from: https://css-tricks.com/examples/SmoothPageScroll/
$(function() {
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});

// Tooltip
$(function () {
   $("#tmnt").tooltip({
	   content: '<img src="images/tmnt.jpg" style="height:225px;" />'
   });
   
   $("#matt").tooltip({
	   content: '<img src="images/matt.jpg" style="height: 290px;" />'
   });
	
	 $("#nancy").tooltip({
	   content: '<img src="images/nancy.jpg" style="height: 300px;" />'
   });
	
	$("#thuy").tooltip({
	   content: '<img src="images/thuy.jpg" style="height: 300px;" />'
   });
	
	$("#eddy").tooltip({
	   content: '<img src="images/eddy.jpg" style="height: 300px;" />'
   });
});


// For sliding left animation
var $animation_elements = $('.animation-element');
var $window = $(window);

function check_if_in_view() {
  var window_height = $window.height();
  var window_top_position = $window.scrollTop();
  var window_bottom_position = (window_top_position + window_height);
 
  $.each($animation_elements, function() {
    var $element = $(this);
    var element_height = $element.outerHeight();
    var element_top_position = $element.offset().top;
    var element_bottom_position = (element_top_position + element_height);
 
    //check to see if this current container is within viewport
    if ((element_bottom_position >= window_top_position) &&
        (element_top_position <= window_bottom_position)) {
      $element.addClass('in-view');
    } else {
      $element.removeClass('in-view');
    }
  });
}

$window.on('scroll resize', check_if_in_view);
$window.trigger('scroll');