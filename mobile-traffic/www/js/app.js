/*
    app.js
    main script file for this mapping application
    source data URL: https://data.seattle.gov/resource/65fc-btcc.json
*/

$(function() {
    'use strict';

    function createMap(loc, zoom) {
        //Initilizes the map and maptiles
        var map = L.map('map').setView(loc, zoom);

        L.tileLayer('https://api.tiles.mapbox.com/v4/mapbox.light/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiaGFpNDI3IiwiYSI6ImNpZnZyYTAybjI1dmF1dW0wY3RjMGl4czcifQ.jv3YgcyfNb3cf_1igO47kw', {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>'
        }).addTo(map);
        
        var url = 'https://data.seattle.gov/resource/65fc-btcc.json';
        
        $.getJSON(url).then(function(data) {
            makeMarkers(data);
            
            //Filters markers based on input
            $('#header').keyup(function() {
                $('g').html('');
                var input = $('input').val().toLowerCase();
                var filteredGroup = data.filter(function(data) { 
                    return data.cameralabel.toLowerCase().indexOf(input) >= 0;
                });
                makeMarkers(filteredGroup);
            });
        });
        
        //Gets the data from traffic site for each camera and makes markers
        function makeMarkers(data) {
            var wsdotCount = 0;
            var sdotCount = 0;

            //Reads data from each object in JSON
            var i;
            for(i = 0; i < data.length; i++) {
                var long = data[i]['location']['longitude'];
                var lat = data[i]['location']['latitude'];
                var owner = data[i]['ownershipcd'];
                var cam = data[i]['cameralabel'];
                var image = data[i]['imageurl']['url'];
                var label = data[i]['cameralabel'];
                
                //Creates marker with label and popup
                var marker = L.circleMarker([lat, long]).addTo(map).bindPopup('<h2>' + label + '</h2>' + '<img src="' + image + '">');
                
                //Checks for the owner and adjusts color accordingly
                if (owner === 'WSDOT') {
                    marker.setStyle({fillColor: '#BC5A34', color: '#BC5A34'});
                    wsdotCount++;
                } else {
                    marker.setStyle({fillColor: '#0065B1', color: '#0065B1'});
                    sdotCount++;
                }
            }
            
            //Updates camera counts for each company
            $('#sdotCount').text(sdotCount);
            $('#wsdotCount').text(wsdotCount);
        }
    }

    createMap([47.6097, -122.3331], 12);
    
});
