"use strict";

/**
 * Created by liomka on 03/07/2014.
 */

var entriesDetails = $('.entry-details');
$(entriesDetails).css('marginLeft', '100%');
$(entriesDetails).css('opacity', '0');

$(document).ready(function () {
    function displayPanelBodies () {
        entriesDetails.each(function (i, entry) {
            if ($(entry).visible()) {
                $(entry).animate({marginLeft:'0%', opacity:'1'}, 'slow', 'easeOutExpo');
            }
        });
    }
    displayPanelBodies();

    $(window).scroll(function(){
        console.log(entriesDetails.length);
        displayPanelBodies();
    })
});
