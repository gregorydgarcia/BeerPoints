var BP = BP,
    turf = turf,
    L = L;

var markers = new L.MarkerClusterGroup();
                 
               

//FUNCTIONS
BP.assignPop = function (feature, layer) {
    layer.bindPopup(
        "<div class='popup'> " +
        "<span class='rank'> " + feature.properties.rank + "</span>" +
        "<span class='name'> <a href='http://www.beeradvocate.com/" + feature.properties.link +"' target='_blank'>" + feature.properties.name + "</a> </span>" +
        "<span class='brewery'> " + feature.properties.brewery + "</span>" +
        "<span class='location'> " + feature.properties.location + "</span>" +
        "</div>"
    );
};

BP.getColor = function(d) {
    return d > 15 ? '#ff9042' :
           d > 10  ? '#ff9f42' :
           d > 7  ? '#ffda42' :
           d > 5  ? '#ffbf42' :
           d > 3   ? '#ffcf42' :
           d > 0   ? '#ffde42' :
                      '#FFFFF0';
};

BP.style =  function(feature) {
    return {
        fillColor: BP.getColor(feature.properties.sum),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
};


BP.beerIcon = L.AwesomeMarkers.icon({
    prefix: 'ion', //font awesome rather than bootstrap
    markerColor: 'orange', // see colors above
    icon: 'beer'
});

BP.togglePoints = function(style) {
    markers = new L.MarkerClusterGroup();

    BP.toggleRef = L.geoJson(BP.styles[style], {
        onEachFeature: BP.assignPop,
        pointToLayer: function(feature, latlng) {
                return L.marker(latlng, {
                    icon: BP.beerIcon});
        }
    });


    markers.addLayer(BP.toggleRef);
    BP.map.addLayer(markers);
};

BP.toggleState = function(style){
    BP.map.removeLayer(BP.statesRef);
    BP.turf = turf.count(BP.statesData, BP.styles[style], 'sum');
    BP.statesRef = L.geoJson(BP.turf, {style: BP.style}).addTo(BP.map);


};
//INIT MAP
BP.map = L.map('map', {
    center: [40, -98],
    zoom: 4,
    maxZoom: 7
});
BP.tiles = new L.tileLayer('http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png').addTo(BP.map);
BP.statesRef = L.geoJson(BP.statesData);
BP.togglePoints('IPA');
BP.toggleState('IPA');




$('nav a').on('click', function() {
    BP.map.removeLayer(markers);
    
    $(".active").removeClass("active");
    $(this).addClass("active");

    var style = ($(this).attr('id'));
    BP.togglePoints(style);
    BP.toggleState(style);

});
























