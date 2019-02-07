// navbar change color on page scroll
// $(window).scroll(function(){
//     $('nav').toggleClass('scrolled', $(this).scrollTop() > 650);
// });


$(document).ready(function() {
    // Optimalisation: Store the references outside the event handler:
    var $window = $(window);
    var $pane = $('#pane1');

    function checkWidth() {
        var windowsize = $window.width();
        if (windowsize > 399) {
            //if the window is greater than 440px wide then turn on jScrollPane..
            $(window).scroll(function(){
                $('nav').toggleClass('scrolled', $(this).scrollTop() > 650);
            });
        } else{
            $('nav').addClass('scrolled');
        }
    }
    // Execute on load
    checkWidth();
    // Bind event listener
    $(window).resize(checkWidth);
});

new WOW().init();
