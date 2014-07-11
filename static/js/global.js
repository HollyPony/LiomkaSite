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

    if ($.support.animation === undefined)
        return;

    // VARS ------------------------------------------------------------------------------------------------------------
    var windowHeight = $(document).height();
    var city = $('#city');
    var clouds = $('#clouds');
    var ratio = city.attr('data-stellar-ratio');

    var moonButton = $('#moon-symbol-button');
    var cloudsButton = $('#little-clouds-button');
    var currentWeatherElement = $('#current-weather');
    var currentWeatherImage = currentWeatherElement.children();

    // FUNCTIONS -------------------------------------------------------------------------------------------------------
    function updateStellarElement() {
        //var newPosition = windowHeight + $(window).height();
        //city.attr({'data-stellar-vertical-offset': -newPosition}).animate({opacity: 1}, 1000);
        $(window).data('plugin_stellar').destroy();

        var newPosition = (windowHeight - $(window).height()) * ratio;
        city.css({top: newPosition}).animate({opacity: 1}, 1000);
        $(window).data('plugin_stellar').init();
    }

    function activateClouds() {
        var nbClouds = rand(10, 4);
        for (var i = 0; i < nbClouds; ++i) {
            var animationDuration, ratio, zIndex, delay, offset;

            animationDuration = rand(100, 80) + 's';
            ratio = Math.random() * (1.9 - 0.1) + 0.1;
            zIndex = Math.floor(ratio.toPrecision(3) * 10);
            delay = rand(45000);
            offset = rand($(window).height());

            clouds.append($(document.createElement('div'))
                    .addClass('cloud')
                    .css({animationDuration: animationDuration
                        , zIndex: zIndex
                        , top: offset * ratio})
                    .attr({'data-stellar-ratio': ratio})
                    .delay(delay).queue(function (next) {
                        $(this).css('animation-play-state', 'running');
                        next();
                    })

            );
        }

        $.stellar('refresh');
    }

    function initWeather () {
        var src = currentWeatherImage.attr('src');
        var begin = src.indexOf('icons/');
        var end = src.lastIndexOf('-white');
        var currentWeather = src.substring(begin + 6, end);

        currentWeatherElement.parent()
            .find('#' + currentWeather + '-button')
            .addClass('hidden');

        switch (currentWeather) {
            case 'little-cloud':
                activateClouds();
                break;
        }
    }

    // CONNECT TO EVENTS -----------------------------------------------------------------------------------------------
    function disableClouds() {
        clouds.empty();
    }

    moonButton.click(function (event) {
        event.preventDefault();

        disableClouds();

        currentWeatherImage.attr('src', "/static/icons/moon-symbol-white-24px.png");

        moonButton.addClass('hidden');
        cloudsButton.removeClass('hidden');
    });

    cloudsButton.click(function(event) {
        event.preventDefault();

        activateClouds();

        currentWeatherImage.attr('src', "/static/icons/little-clouds-white-24px.png");

        cloudsButton.addClass('hidden');
        moonButton.removeClass('hidden');
    });

    $(window).resize(function(){
        updateStellarElement();
    });


    // INIT COMPONENTS -------------------------------------------------------------------------------------------------
    $.stellar({
        horizontalScrolling: false
    });

    updateStellarElement();
    initWeather();
});