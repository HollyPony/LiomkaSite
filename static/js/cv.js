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
    var entriesDetails = $('#cv').find('li').find('.entry-details');

    // Init DOM
    entriesDetails.css({ opacity: '0', left: '50%'});

    entriesDetails.waypoint({
        handler: function(direction) {
            if (direction == 'down')
                $(this).css({opacity: '0', left: '50%'})
        },
        offset: function() {
            return -$(this).height();
        }
    });

    entriesDetails.waypoint({
        handler: function(direction) {
            if (direction == 'up')
                $(this).animate({left: '0%', opacity: '1'}, 1000, 'easeOutExpo');
        },
        offset: function() {
            return -($(this).height() - 40 );
        }
    });

    entriesDetails.waypoint({
        handler: function (direction) {
            if (direction == 'down')
                $(this).animate({left: '0%', opacity: '1'}, 1000, 'easeOutExpo');
        },
        offset: function () {
            return $(window).height() - 40;
        }
    });

    entriesDetails.waypoint({
        handler: function (direction) {
            if (direction == 'up')
                $(this).css({opacity: '0', left: '50%'})
        },
        offset: function () {
            return $(window).height();
        }
    });
});
