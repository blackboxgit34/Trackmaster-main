var icons = [];
icons[1] = new google.maps.MarkerImage('icon61.png',new google.maps.Size(32, 32),new google.maps.Point(0, 0),new google.maps.Point(16, 16));

icons[2] = new google.maps.MarkerImage('moving.png', new google.maps.Size(28, 40), new google.maps.Point(0, 0), new google.maps.Point(14, 20));
icons[3] = new google.maps.MarkerImage('parked.png', new google.maps.Size(28, 40), new google.maps.Point(0, 0), new google.maps.Point(14, 20));
icons[4] = new google.maps.MarkerImage('unreach.png', new google.maps.Size(28, 40), new google.maps.Point(0, 0), new google.maps.Point(14, 20));
icons[6] = new google.maps.MarkerImage('towed.png', new google.maps.Size(28, 40), new google.maps.Point(0, 0), new google.maps.Point(14, 20));
icons[5] = new google.maps.MarkerImage('ignition.png', new google.maps.Size(28, 40), new google.maps.Point(0, 0), new google.maps.Point(14, 20));





function initMap(myLatlng, name, html, icon_type, status, map, angle) {
   
    //alert(icon_type);
    if (angle == 0) {
      
        icons[7] = new google.maps.MarkerImage(' http://maps.google.com/mapfiles/dir_' + angle +'.png ', new google.maps.Size(32, 32), new google.maps.Point(0, 0), new google.maps.Point(16, 16));
    }
    else {
        
        var check = angle / 3;
        
        var check = Math.round(check);
        
        var check = check + 1;
        
        var check = check * 3;
        
       
        if (check < 120) {

            var check = 120 - check;
                   
        }
        else {
            var check = check - 120;

        }

       

        
     
        icons[7] = new google.maps.MarkerImage(' http://maps.google.com/mapfiles/dir_' + check + '.png ', new google.maps.Size(32, 32), new google.maps.Point(0, 0), new google.maps.Point(16, 16));
        

    }
    var lineSymbol = {
        path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
        scale: 7
    };

    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        title: name
        , icon: icons[7],
        offset: '500%',
        scale: 5
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





