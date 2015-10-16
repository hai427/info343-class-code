/*
    script for the index.html page
    dependencies: jquery

    open weather API: 
    http://api.openweathermap.org/data/2.5/weather?zip=98195,us&units=imperial&appid=bd82977b86bf27fb59a04b61b657fb6f
*/

//when the DOM content has been loaded...
$(function() {
    'use strict';
    $('a').attr('target', '_blank');
    $('article').hide().fadeIn();
    $('#toggle-article').click(function() {
        $('article').fadeToggle();
    });

    var url = 'http://api.openweathermap.org/data/2.5/weather?zip=98195,us&units=imperial&appid=bd82977b86bf27fb59a04b61b657fb6f'
    $.getJSON(url).then(function(data) {
        console.log(data);
        var temp = data.main.temp;
        $('#temp').text(Math.round(temp));
    });


    console.log('test');
});