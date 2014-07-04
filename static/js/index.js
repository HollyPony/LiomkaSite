"use strict";

/**
 * Created by liomka on 03/07/2014.
 */

var entriesDetails = $('.entry-details');
$(entriesDetails).find('.panel-body').hide();

function displayPanelBodies () {
    entriesDetails.each(function (i, entry) {
        if ($(entry).visible()) {
            $(entry).find('.panel-body').fadeIn(1000, function () {
                ;
            });
        }
    });
}

$(document).ready(function () {

    displayPanelBodies();

    $(window).scroll(function(){
        displayPanelBodies();
    })
});