var icons = [];
icons[1] = new google.maps.MarkerImage('/images/legends/bage-busy.png',
new google.maps.Size(48, 48),
new google.maps.Point(0, 0),
new google.maps.Point(16, 16));

icons[2] = new google.maps.MarkerImage('/images/legends/moving.png', new google.maps.Size(28, 40), new google.maps.Point(0, 0), new google.maps.Point(14, 20));

icons[3] = new google.maps.MarkerImage('/images/legends/stop.png', new google.maps.Size(28, 40), new google.maps.Point(0, 0), new google.maps.Point(14, 20));

icons[4] = new google.maps.MarkerImage('/images/pinkc.png',
new google.maps.Size(48, 48),
new google.maps.Point(0, 0),
new google.maps.Point(16, 16));

icons[5] = new google.maps.MarkerImage('/images/bluec.png',
new google.maps.Size(48, 48),
new google.maps.Point(0, 0),
new google.maps.Point(16, 16));

icons[6] = new google.maps.MarkerImage('/images/legends/ignion.png',
new google.maps.Size(48, 48),
new google.maps.Point(0, 0),
new google.maps.Point(16, 16));

icons[7] = new google.maps.MarkerImage('/images/greenc.png',
new google.maps.Size(48, 48),
new google.maps.Point(0, 0),
new google.maps.Point(16, 16));


function createMarker(myLatlng, name, html, icon_type, status, map) {
    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        title: name
        , icon: icons[icon_type]
        , optimized: false
    });
    var infowindow = new google.maps.InfoWindow({
        content: html
    });
    google.maps.event.addListener(marker, 'mouseover', function () {
        infowindow.open(map, marker);
    });
    google.maps.event.addListener(marker, 'mouseout', function () {
        infowindow.close(map, marker);
    });

    google.maps.event.addListener(infowindow, 'closeclick', function () {
        openedInfoWindow = null;
    });
    return marker;
}
