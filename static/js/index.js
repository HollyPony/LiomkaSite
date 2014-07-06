"use strict";

/**
 * Created by liomka on 03/07/2014.
 */


$(document).ready(function () {
    var projects = $('.project');
    var navigator = $('#navigator');

    navigator.css({width: navigator.width()});

    //entriesDetails.css({ opacity: '0'});

    projects.waypoint(function(direction) {

        var project = $(this).attr('id');
        //console.log(project + ' -- ' + direction);
        var selected = navigator.find("a[href='#"+ project +"']").parent();

        navigator.find('.active').removeClass('active');

        selected.addClass('active');
        if (selected.parent().parent().parent().is('ul'))
            selected.parent().parent().parent().addClass('active');
    }, {
        //offset: function() {
        //    return -$(this).height();
        //}
    });
});
