"use strict";

/**
 * Created by liomka on 03/07/2014.
 */

$.support.transition = (function(){
    var thisBody = document.body || document.documentElement,
        thisStyle = thisBody.style;
    return thisStyle.transition !== undefined;
})();

$.support.animation = (function(){
    var thisBody = document.body || document.documentElement,
        thisStyle = thisBody.style;
    return thisStyle.animation !== undefined;
})();

function rand(max, min) {
    min = typeof min !== 'undefined' ? min: 0;
    return Math.floor(Math.random() * (max - min) + min);
}

$(document).ready(function () {
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) )
        return;

    if ($.support.animation === undefined) {
        return;
    }

    var windowHeight = $(document).height();
    var city = $('#city');
    var ratio = city.attr('data-stellar-ratio');

    function updateStellarElement() {
        $(window).data('plugin_stellar').destroy();

        var newPosition = (windowHeight - $(window).height()) * ratio;
        city.css({top: newPosition}).animate({opacity: 1}, 1000);
        $(window).data('plugin_stellar').init();
    }

    $(window).resize(function(){
        console.log('triggered');
        updateStellarElement();
    });

    /*
    var nbClouds = rand(10, 4);
    for (var i = 0; i < nbClouds; ++i) {
        var animationDuration, chanceToHaveOne, zIndex, delay;

        animationDuration = rand(100, 50) + 's';
        chanceToHaveOne = Math.random() * (9.9 - 0.1) + 0.1;
        zIndex = Math.floor(chanceToHaveOne.toPrecision(3) * 10);
        delay = rand(15000);

        city.append($(document.createElement('div'))
                .addClass('cloud')
                .css({animationDuration: animationDuration
                    , zIndex: zIndex
                    , opacity: 0})
                .attr({'data-stellar-ratio': chanceToHaveOne
                    , 'data-sellar-offset-vertical': 400})
                .delay(delay).queue(function (next) {
                    $(this).animate({opacity: 1}, 1000);
                    next();
                })
        );
    }
    */

    $.stellar({
        horizontalScrolling: false
    });

    updateStellarElement();
});