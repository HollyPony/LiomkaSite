"use strict";

/**
 * Created by liomka on 03/07/2014.
 */

$(document).ready(function () {
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) )
        return;

    if ($.support.animation === undefined)
        return;


    // Init Vars
    var elementsList = $('#cv').find('li');
    var entriesDetails = elementsList.find('.entry-details');

    // Init DOM
    entriesDetails.css({ opacity: '0'});
    entriesDetails.waypoint(function() {
        $(this).css({'visibility':'visible', 'left': '50%'}).stop()
            .animate({left: '0%', opacity: '1'}, 1000, 'easeOutExpo');
    }, {
        offset: '80%',
        triggerOnce: true
    });
});
