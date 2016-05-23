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
		.css({bottom:-2223,position:'absolute'})
		.animate({bottom:-1850}, 1750, function() {
			//callback
		});
	});
	$('.popup').on('mouseleave', function() {
		$('.image-popup').fadeIn()
		.css({bottom:-1850,position:'absolute'})
		.animate({bottom:-2325}, 500, function() {
			//callback
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
	   content: '<img src="images/tmnt.jpg" style="height:180px; width:300px;" />'
   });
   
   $("#brief").tooltip({
	   content: '<img src="https://df2iqnjv15ch4.cloudfront.net/spree/products/840/large/boxerbrief-darksaphire-lowres_1403552847.jpg?1403552847" style="height: 179px; wdith: 300px;" />'
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