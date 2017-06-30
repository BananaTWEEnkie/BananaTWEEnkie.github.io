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

});

$(function () {
   $("#senior").tooltip({
	   content: '<img src="images/gamer_granny.jpg" style="height:180px; width:300px;" />'
   });
   
   $("#brief").tooltip({
	   content: '<img src="https://df2iqnjv15ch4.cloudfront.net/spree/products/840/large/boxerbrief-darksaphire-lowres_1403552847.jpg?1403552847" style="height: 179px; wdith: 300px;" />'
   });
});