"use strict";

/**
 * Created by liomka on 03/07/2014.
 */

var entriesDetails = $('.entry-details');
//entriesDetails.hide();


$(document).ready(function() {

    function isScrolledIntoView(elem)
    {
        var docViewTop = $(window).scrollTop();
        var docViewBottom = docViewTop + $(window).height();

        var elemTop = $(elem).offset().top;
        var elemBottom = elemTop + $(elem).height();

        return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
    }

    entriesDetails.each(function (entry) {
       console.log(entry.id + ": " + $("#"+entry.id).visible());
    });
    //$(this).fadeIn(500);
});