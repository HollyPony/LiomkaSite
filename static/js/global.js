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

    var city = $('#city');

    /*

    if (city.position().top > 0) {
        for (var i = 0; i < Math.floor((Math.random() * 23) + 4); ++i) {
            var animationDuration, chancetoHaveOne, zIndex, delay;

            animationDuration = rand(100, 50) + 's';
            chancetoHaveOne = Math.random() * (1.1 - 0.55) + 0.55;
            chancetoHaveOne = ( chancetoHaveOne > 0.999) ? 0.999  : chancetoHaveOne;
            zIndex = Math.floor(chancetoHaveOne.toPrecision(3) * 100);
            delay = rand(15000);

            city.prepend($(document.createElement('div')).addClass('cloud')
                    .css({animationDuration: animationDuration, zIndex: zIndex, display: 'none', opacity: 0, backgroundPosition: '40% initial'})
                    .attr({'data-stellar-ratio': chancetoHaveOne})
                    .delay(delay).queue(function (next) {
                        $(this).css({animationPlayState: 'running'});
                        $(this).css({animationPlayState: 'running', display: 'block'});
                        $(this).animate({opacity: 1}, 1000);
                        next();
                    })
            );
        }
    }*/

    $.stellar({
        responsive: true,
        horizontalScrolling: false,
        //verticalOffset: city.position().top,
        verticalOffset: -($(document).height() - $(window).height() - 50)
        /*positionProperty: 'position'*/
    });
});