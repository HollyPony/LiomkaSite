"use strict";

/**
 * Created by liomka on 03/07/2014.
 */

$(document).ready(function () {

    var sky = $('#sky');
    var city = $('#city');

    city.css({display: 'block', top: $(document).height() - city.height()});
    sky.css({display: 'block', top: $('.navbar').height(), height: city.position().top});

    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) )
        return;

    var animation = false; // --------- If animation is supported
    /*
    var    animationstring = 'animation',
    var    keyframeprefix = '',
    var    domPrefixes = 'Webkit Moz O ms Khtml'.split(' '),
    var    pfx  = '';
    */
    if( elm.style.animationName !== undefined ) { animation = true; }
    /*
    if( animation === false ) {
        for (var i = 0; i < domPrefixes.length; i++) {
            if (elm.style[ domPrefixes[i] + 'AnimationName' ] !== undefined) {
                pfx = domPrefixes[ i ];
                animationstring = pfx + 'Animation';
                keyframeprefix = '-' + pfx.toLowerCase() + '-';
                animation = true;
                break;
            }
        }
    }
    */

    if (!animation)
        return;

    function rand(max, min) {
        min = typeof min !== 'undefined' ? min: 0;
        return Math.floor(Math.random() * (max - min) + min);
    }

    var body = $('body');
    if (city.position().top > 0) {
        for (var i = 0; i < Math.floor((Math.random() * 23) + 4); ++i) {
            var chancetoHaveOne = Math.random() * (1.1 - 0.55) + 0.55;
            chancetoHaveOne = ( chancetoHaveOne > 0.999) ? 0.999  : chancetoHaveOne;
            city.prepend($(document.createElement('div')).addClass('cloud')
                    .css({animationDuration: rand(30, 10) + 's', zIndex: Math.floor(chancetoHaveOne.toPrecision(3) * 100)})
                    .attr({'data-stellar-ratio': chancetoHaveOne})
                    .delay(rand(10000)).queue(function (next) {
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