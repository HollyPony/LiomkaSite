"use strict";

/**
 * Created by liomka on 03/07/2014.
 */

$.support.transition = (function(){
    var thisBody = document.body || document.documentElement,
        thisStyle = thisBody.style;
    return thisStyle.transition !== undefined
        || thisStyle.WebkitTransition !== undefined
        || thisStyle.MozTransition !== undefined
        || thisStyle.msTransition !== undefined
        || thisStyle.OTransition !== undefined;
})();

$.support.animation = (function(){
    var thisBody = document.body || document.documentElement,
        thisStyle = thisBody.style;
    return thisStyle.animation !== undefined
        || thisStyle.WebkitAnimation !== undefined
        || thisStyle.MozAnimation !== undefined
        || thisStyle.msAnimation !== undefined
        || thisStyle.KhtmlAnimation !== undefined
        || thisStyle.OAnimation !== undefined;
})();

$(document).ready(function () {

    var sky = $('#sky');
    var city = $('#city');

    city.css({display: 'block', top: $(document).height() - city.height()});
    sky.css({display: 'block', top: $('.navbar').height(), height: city.position().top});

    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) )
        return;

    if ($.support.animation === undefined) {
        return;
    }

    function rand(max, min) {
        min = typeof min !== 'undefined' ? min: 0;
        return Math.floor(Math.random() * (max - min) + min);
    }

    var body = $('body');
    if (city.position().top > 0) {
        for (var i = 0; i < Math.floor((Math.random() * 23) + 4); ++i) {
            var animationDuration, chancetoHaveOne, zIndex, delay;

            animationDuration = rand(100, 50) + 's';
            chancetoHaveOne = Math.random() * (1.1 - 0.55) + 0.55;
            chancetoHaveOne = ( chancetoHaveOne > 0.999) ? 0.999  : chancetoHaveOne;
            zIndex = Math.floor(chancetoHaveOne.toPrecision(3) * 100);
            delay = rand(15000);

            city.prepend($(document.createElement('div')).addClass('cloud')
                    .css({animationDuration: animationDuration, zIndex: zIndex})
                    .attr({'data-stellar-ratio': chancetoHaveOne})
                    .delay(delay).queue(function (next) {
                        $(this).css({animationPlayState: 'running'});
                        next();
                    })
            );
        }
    }

    $.stellar({
        /*responsive: true,*/
        horizontalScrolling: false,
        verticalOffset: city.position().top,
        /*positionProperty: 'position'*/
    });
});