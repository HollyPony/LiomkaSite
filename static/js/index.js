"use strict";

/**
 * Created by liomka on 03/07/2014.
 */


$(document).ready(function () {
    function displayPanelBodies () {
        elementsList.each(function (i, entry) {
            if ($(entry).visible(true)) {
                $(entry).find('.entry-details').animate({marginLeft: '0%', opacity: '1'}, 'slow', 'easeOutExpo', function() {
                    $(entry).css('height', 'auto');
                });
            }
        });
    }

    // Init Vars
    var elementsList = $('#cv').find('li');
    var entriesDetails = elementsList.find('.entry-details');

    // Init DOM
    elementsList.each(function (i, entry) {
        console.log($(entry).height());
        $(entry).css('height', $(entry).height());
    });
    entriesDetails.css({marginLeft: '100%', opacity: '0'});
    displayPanelBodies();

    // Init Events
    $(window).scroll(function(){
        displayPanelBodies();
    })
});
